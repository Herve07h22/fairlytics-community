function extractUtm(source, regex) {
  const match = source.match(regex);
  if (match && Array.isArray(match) && match.length > 1) {
    return match[1];
  }
  return null;
}

module.exports = function (doc, options = {}) {
  // do something to doc
  if (doc === null) {
    return doc;
  }

  if (doc._source.utm) {
    doc._source.utm_campaign = extractUtm(
      doc._source.utm,
      /utm_campaign=([^&]*)/
    );
    doc._source.utm_medium = extractUtm(doc._source.utm, /utm_medium=([^&]*)/);
    doc._source.utm_source = extractUtm(doc._source.utm, /utm_source=([^&]*)/);
  }

  return doc;
};
