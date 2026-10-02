/**
 * KERNELSCRIPT // Anti-Redirect & Frame-Busting Shield
 * Defends the website against unauthorized background redirects, frame-busting,
 * and malicious auto-redirects from third-party advertising networks.
 */

(function () {
  'use strict';

  let isUserAction = false;
  let userActionTimer = null;

  // Track legitimate, authentic user interaction (isTrusted = true)
  function markUserAction(event) {
    if (event && event.isTrusted === false) {
      // Reject synthetic programmatic clicks created by ad scripts
      return;
    }
    isUserAction = true;
    clearTimeout(userActionTimer);
    userActionTimer = setTimeout(() => {
      isUserAction = false;
    }, 2500);
  }

  // Intercept real user clicks, taps, keypresses, and form submissions
  const userEvents = ['pointerdown', 'mousedown', 'click', 'keydown', 'submit', 'touchstart'];
  userEvents.forEach((eventType) => {
    window.addEventListener(eventType, markUserAction, { capture: true, passive: true });
  });

  // 1. Block unauthorized window.open (popunder / popup redirects)
  try {
    const originalWindowOpen = window.open;
    window.open = function (url, target, features) {
      if (!isUserAction) {
        console.warn('[Anti-Redirect Shield] Blocked background window.open:', url);
        return null;
      }
      return originalWindowOpen.call(window, url, target, features);
    };
  } catch (e) {}

  // 2. Intercept Location.prototype.assign and Location.prototype.replace
  try {
    if (window.Location && window.Location.prototype) {
      const origAssign = window.Location.prototype.assign;
      window.Location.prototype.assign = function (url) {
        if (!isUserAction) {
          console.warn('[Anti-Redirect Shield] Blocked unauthorized location.assign:', url);
          return;
        }
        return origAssign.call(this, url);
      };

      const origReplace = window.Location.prototype.replace;
      window.Location.prototype.replace = function (url) {
        if (!isUserAction) {
          console.warn('[Anti-Redirect Shield] Blocked unauthorized location.replace:', url);
          return;
        }
        return origReplace.call(this, url);
      };
    }
  } catch (e) {}

  // 3. Protect window.top and window.parent from direct location manipulation
  try {
    const realTop = window.top;
    const topProxy = new Proxy(realTop, {
      get(target, prop) {
        if (prop === 'location') {
          return new Proxy(target.location, {
            set(locTarget, locProp, locVal) {
              if (!isUserAction) {
                console.warn('[Anti-Redirect Shield] Blocked top.location property write:', locProp, locVal);
                return true;
              }
              locTarget[locProp] = locVal;
              return true;
            }
          });
        }
        const val = target[prop];
        return typeof val === 'function' ? val.bind(target) : val;
      },
      set(target, prop, val) {
        if (prop === 'location' && !isUserAction) {
          console.warn('[Anti-Redirect Shield] Blocked top.location assignment:', val);
          return true;
        }
        target[prop] = val;
        return true;
      }
    });

    Object.defineProperty(window, 'top', {
      get: () => topProxy,
      configurable: true
    });
  } catch (e) {}

  // 4. Sandbox all dynamically created <iframe> tags to disallow top-navigation
  function enforceIframeSandbox(iframe) {
    if (!iframe || iframe.nodeType !== 1 || iframe.tagName !== 'IFRAME') return;
    try {
      const currentSandbox = iframe.getAttribute('sandbox');
      if (currentSandbox === null || currentSandbox.includes('allow-top-navigation')) {
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
      }
    } catch (e) {}
  }

  try {
    const originalCreateElement = document.createElement;
    document.createElement = function (tagName, options) {
      const element = originalCreateElement.call(document, tagName, options);
      if (element && typeof tagName === 'string' && tagName.toLowerCase() === 'iframe') {
        enforceIframeSandbox(element);
      }
      return element;
    };
  } catch (e) {}

  // 5. Observe DOM for any injected iframes that bypass createElement
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        const addedNodes = mutations[i].addedNodes;
        for (let j = 0; j < addedNodes.length; j++) {
          const node = addedNodes[j];
          if (node.nodeType === 1) {
            if (node.tagName === 'IFRAME') {
              enforceIframeSandbox(node);
            } else if (node.querySelectorAll) {
              const iframes = node.querySelectorAll('iframe');
              for (let k = 0; k < iframes.length; k++) {
                enforceIframeSandbox(iframes[k]);
              }
            }
          }
        }
      }
    });

    if (document.documentElement) {
      observer.observe(document.documentElement, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.documentElement, { childList: true, subtree: true });
      });
    }
  }

  // 6. Beforeunload guard against automated background navigation
  window.addEventListener('beforeunload', (event) => {
    if (!isUserAction) {
      // If navigation is occurring with zero user clicks/input, stop it
      event.preventDefault();
      event.returnValue = '';
      return '';
    }
  });

  console.info('[Anti-Redirect Shield] Protection active: blocking auto-redirects & frame-busting.');
})();
