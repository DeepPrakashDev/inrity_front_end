
// function replaceShortCodes(template, shortCodes) {
//     if (typeof template == "" || !shortCodes || typeof shortCodes !== "object") {
//         return template; // safety fallback
//     }

//     // Loop through each key-value in shortCodes
//     for (const [key, value] of Object.entries(shortCodes)) {
//         // Only replace if the value is non-null/defined and not an empty string
//         if (value !== undefined && value !== null && value !== "") {
//             const placeholder = `{{${key.toUpperCase()}}}`;
//             template = template.replaceAll(placeholder, value);
//         }
//     }

//     return template;
// }

// const getMarketValueByYear = (year, marketValues) =>
//   Array.isArray(marketValues)
//     ? marketValues.find(v => v.year === year) || null
//     : null;

// export { replaceShortCodes, getMarketValueByYear };





// Define types for clarity and IntelliSense support
type ShortCodes = Record<string, string | number | null | undefined>;

interface MarketValue {
    year: number;
    markety_price?: string | number;
    currency?: string;
    unit?: string;
}

export function replaceShortCodes(template: string, shortCodes: ShortCodes): string {
    if (!template || typeof shortCodes !== "object" || shortCodes === null) {
        return template; // Safety fallback
    }

    let updatedTemplate = template;

    for (const [key, value] of Object.entries(shortCodes)) {
        if (value !== undefined && value !== null && value !== "") {
            const placeholder = `{{${key.toUpperCase()}}}`;
            updatedTemplate = updatedTemplate.replaceAll(placeholder, String(value));
        }
    }

    return updatedTemplate;
}

export const getMarketValueByYear = (
    year: number,
    marketValues: MarketValue[] | null | undefined
): MarketValue | null =>
    Array.isArray(marketValues)
        ? marketValues.find(v => v.year === year) || null
        : null;
