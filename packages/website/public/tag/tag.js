(function () {
  const fairlytiscScriptElement = document.getElementById(
    "fairlytics-id-ajcu6jd9k7ysd6"
  );
  const fairlyticskey =
    fairlytiscScriptElement &&
    "fairlyticskey" in fairlytiscScriptElement.attributes
      ? fairlytiscScriptElement.attributes.fairlyticskey.value
      : "";
  var xhr = new XMLHttpRequest();
  const payload = {
    hostname: window.location.hostname, // Le nom de l'hôte (sans son numéro de port).
    href: window.location.href, // L'URL entière
    page: window.location.pathname,
    utm: window.location.search,
    referrer: document.referrer,
    fairlyticskey: fairlyticskey,
  };
  xhr.open("POST", "http://localhost/hit", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(payload));
})();
