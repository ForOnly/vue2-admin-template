import defaultSettings from "@/settings";

export function getPageTitle(pageTitle) {
  const title = defaultSettings.title || "Vue Admin Template";
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

export default { getPageTitle, isExternal, validUsername };
