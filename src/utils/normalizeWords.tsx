export const toTitleCase = (input: string): string =>
  input
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

// toTitleCase('  jANE   wanjiku ') -> 'Jane Wanjiku'
// toTitleCase('algebra')           -> 'Algebra'