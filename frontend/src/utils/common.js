// Helper to parse text and wrap active variables in spans for offset measurement
export const renderParsedText = (text, activeVars) => {
  if (!text) return ' ';
  const varSet = new Set(activeVars);
  if (varSet.size === 0) return text;

  const regex = new RegExp(`(\\{\\{\\s*(?:${activeVars.join('|')})\\s*\\}\\})`, 'g');

  const parts = text.split(regex);
  return parts.map((part, index) => {
    const match = part.match(/^\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}$/);
    if (match && varSet.has(match[1])) {
      const varName = match[1];
      return (
        <span
          key={index}
          data-var={varName}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};
