(function () {
  // This is intentionally un-minified to be transparent about the analytics data
  const fairlytiscScriptElement = document.getElementById(
    "fairlytics-id-ajcu6jd9k7ysd6"
  );
  const fairlyticskey =
    fairlytiscScriptElement &&
    "fairlyticskey" in fairlytiscScriptElement.attributes
      ? fairlytiscScriptElement.attributes.fairlyticskey.value
      : "data-fairlyticskey" in fairlytiscScriptElement.attributes
      ? fairlytiscScriptElement.attributes["data-fairlyticskey"].value
      : "";

  const bodyElement = document.querySelector("body");
  var oldHref = "";

  function hit() {
    const newHref = document.location.href;
    if (oldHref !== newHref) {
      oldHref = newHref;
      var xhr = new XMLHttpRequest();
      const payload = {
        hostname: document.location.hostname,
        href: newHref,
        page: document.location.pathname,
        utm: document.location.search,
        referrer: document.referrer,
        fairlyticskey: fairlyticskey,
      };
      xhr.open("POST", "@@TAG_URL@@", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(payload));
    }
  }

  window.onload = () => {
    if (oldHref === "") hit();
    new MutationObserver((mutations) => mutations.forEach(hit)).observe(
      bodyElement,
      {
        childList: true,
        subtree: true,
      }
    );
  };
})();
