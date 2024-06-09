export const getCssVar = (v: string) => window.getComputedStyle(document.documentElement).getPropertyValue(v);
