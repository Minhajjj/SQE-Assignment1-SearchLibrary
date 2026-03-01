/**
 * MC/DC Test Suite – LinearSearch
 *
 * Conditions under test:
 *   C1: elemArray === null || length === 0   (guard)
 *   C2: i < elemArray.length                 (loop continuation)
 *   C3: elemArray[i] === key                 (match found)
 */
const LinearSearch = require('../src/algorithms/LinearSearch');

describe('LinearSearch – MC/DC Test Suite', () => {
  let ls;
  beforeEach(() => { ls = new LinearSearch(); });

  // ── C1 TRUE – guard fires ────────────────────────────────────────
  test('TC_LS_01 | null array returns -1 (C1=T)', () => {
    expect(ls.search(5, null)).toBe(-1);
  });

  test('TC_LS_02 | empty array returns -1 (C1=T)', () => {
    expect(ls.search(5, [])).toBe(-1);
  });

  // ── C1 FALSE, C3 TRUE – key found ───────────────────────────────
  test('TC_LS_03 | key is first element (C3=T at i=0)', () => {
    expect(ls.search(1, [1, 2, 3])).toBe(0);
  });

  test('TC_LS_04 | key is last element (C3=T at last iteration)', () => {
    expect(ls.search(3, [1, 2, 3])).toBe(2);
  });

  test('TC_LS_05 | key is in middle (C3=T mid-loop)', () => {
    expect(ls.search(2, [1, 2, 3])).toBe(1);
  });

  // ── C2 FALSE – loop runs to exhaustion ──────────────────────────
  test('TC_LS_06 | key absent, C2 becomes false, returns -1', () => {
    expect(ls.search(9, [1, 2, 3])).toBe(-1);
  });

  // ── Unsorted array (Linear Search works on unsorted) ────────────
  test('TC_LS_07 | unsorted array, key present', () => {
    expect(ls.search(5, [9, 3, 5, 1, 7])).toBe(2);
  });

  // ── Single-element arrays ────────────────────────────────────────
  test('TC_LS_08 | single element, match', () => {
    expect(ls.search(42, [42])).toBe(0);
  });

  test('TC_LS_09 | single element, no match', () => {
    expect(ls.search(99, [42])).toBe(-1);
  });

  // ── Negative numbers ────────────────────────────────────────────
  test('TC_LS_10 | array with negative values, key found', () => {
    expect(ls.search(-5, [-10, -5, 0, 5, 10])).toBe(1);
  });
});
