/**
 * textDiff.js
 * Deterministic, client-side word-level diff.
 *
 * Tokenizes on whitespace boundaries (keeping whitespace as its own tokens
 * so spacing differences are preserved), then finds the longest common
 * subsequence between the two token streams via dynamic programming.
 * Anything not in the LCS is marked as removed (from the original) or
 * added (from the changed text); everything else is unchanged.
 */

function tokenize(text) {
  if (!text) return [];
  return text.match(/\s+|[^\s]+/g) || [];
}

function buildLcsTable(oldTokens, newTokens) {
  const n = oldTokens.length;
  const m = newTokens.length;
  const table = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      table[i][j] =
        oldTokens[i] === newTokens[j]
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }
  return table;
}

function walkDiff(oldTokens, newTokens, table) {
  const segments = [];
  let i = 0;
  let j = 0;

  while (i < oldTokens.length && j < newTokens.length) {
    if (oldTokens[i] === newTokens[j]) {
      segments.push({ type: 'unchanged', value: oldTokens[i] });
      i++;
      j++;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      segments.push({ type: 'removed', value: oldTokens[i] });
      i++;
    } else {
      segments.push({ type: 'added', value: newTokens[j] });
      j++;
    }
  }
  while (i < oldTokens.length) {
    segments.push({ type: 'removed', value: oldTokens[i] });
    i++;
  }
  while (j < newTokens.length) {
    segments.push({ type: 'added', value: newTokens[j] });
    j++;
  }
  return segments;
}

function mergeAdjacent(segments) {
  const merged = [];
  for (const segment of segments) {
    const last = merged[merged.length - 1];
    if (last && last.type === segment.type) {
      last.value += segment.value;
    } else {
      merged.push({ ...segment });
    }
  }
  return merged;
}

/**
 * Compares two blocks of text and returns an array of segments:
 * { type: 'unchanged' | 'added' | 'removed', value: string }
 */
export function compareTexts(originalText, changedText) {
  const oldTokens = tokenize(originalText);
  const newTokens = tokenize(changedText);
  const table = buildLcsTable(oldTokens, newTokens);
  const rawSegments = walkDiff(oldTokens, newTokens, table);
  return mergeAdjacent(rawSegments);
}

/**
 * Returns a simple word-count tally for the diff, ignoring pure-whitespace
 * segments, so the result view can show "N added / M removed".
 */
export function getDiffStats(segments) {
  const countWords = (value) => {
    const trimmed = value.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  };

  return segments.reduce(
    (stats, segment) => {
      if (segment.type === 'added') stats.added += countWords(segment.value);
      if (segment.type === 'removed') stats.removed += countWords(segment.value);
      return stats;
    },
    { added: 0, removed: 0 }
  );
}
