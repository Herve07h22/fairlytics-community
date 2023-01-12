(function () {
  // This is intentionally un-minified to be transparent about the analytics data
  const fairlytiscScriptElement = document.getElementById(
    "fairlytics-id-ajcu6jd9k7ysd6"
  );
  const fairlyticskey =
    fairlytiscScriptElement &&
    "fairlyticskey" in fairlytiscScriptElement.attributes
      ? fairlytiscScriptElement.attributes.fairlyticskey.value
      : "";

  function hit() {
    var xhr = new XMLHttpRequest();
    const payload = {
      hostname: window.location.hostname, // Le nom de l'hôte (sans son numéro de port).
      href: window.location.href, // L'URL entière
      page: window.location.pathname,
      utm: window.location.search,
      referrer: document.referrer,
      fairlyticskey: fairlyticskey,
    };
    xhr.open("POST", "@@TAG_URL@@", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(payload));
  }

  var oldHref;

  return new MutationObserver((mutations) =>
    mutations.forEach(
      () =>
        oldHref !== document.location.href &&
        ((oldHref = document.location.href), hit())
    )
  ).observe(document.querySelector("body"), {
    childList: true,
    subtree: true,
  });
})();
