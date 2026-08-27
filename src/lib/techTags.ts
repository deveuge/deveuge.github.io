/**
 * Splits a free-text technologies string (e.g. "Java Spring, Hibernate,
 * SonarQube. PostgreSQL Databases.") into individual tag labels — on commas
 * and sentence-ending periods, but not on commas inside parentheses (e.g.
 * "Spring (MVC, Security, JPA)") or periods inside an abbreviation (e.g.
 * ".NET"), which only a period followed by whitespace/end-of-string counts.
 */
export function techTags(text: string): string[] {
  const tags: string[] = []
  let current = ""
  let depth = 0

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === "(") depth++
    if (char === ")") depth--

    const isListComma = char === "," && depth === 0
    const isSentenceEnd = char === "." && depth === 0 && (i === text.length - 1 || /\s/.test(text[i + 1]))

    if (isListComma || isSentenceEnd) {
      if (current.trim()) tags.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  if (current.trim()) tags.push(current.trim())
  return tags
}
