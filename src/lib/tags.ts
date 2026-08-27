/** Matches the legacy `lodash.kebabCase` output for the site's plain, space-separated tags. */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}
