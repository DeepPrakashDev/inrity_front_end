export const formatNumberWithCommas = (value: number | string | null | undefined): string => {
    if (value === null || value === undefined || value === "") return "";
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return num.toLocaleString("en-US"); // use "en-US" for Western, "en-IN" for Indian style
};
