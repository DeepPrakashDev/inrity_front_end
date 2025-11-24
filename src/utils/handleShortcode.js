
function replaceShortCodes(template, shortCodes) {
    if (typeof template == "" || !shortCodes || typeof shortCodes !== "object") {
        return template; // safety fallback
    }

    // Loop through each key-value in shortCodes
    for (const [key, value] of Object.entries(shortCodes)) {
        // Only replace if the value is non-null/defined and not an empty string
        if (value !== undefined && value !== null && value !== "") {
            const placeholder = `{{${key.toUpperCase()}}}`;
            template = template.replaceAll(placeholder, value);
        }
    }

    return template;
}

const getMarketValueByYear = (year, marketValues) =>
  Array.isArray(marketValues)
    ? marketValues.find(v => v.year === year) || null
    : null;


export { replaceShortCodes, getMarketValueByYear };