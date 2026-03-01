/**
 * MC/DC Test Suite – JumpSearch
 *
 * Conditions under test:
 *   C1: elemArray === null || length === 0  (guard)
 *   C2: arr[blockEnd-1] < key              (jump-phase loop condition)
 *   C3: prev >= n                          (array exhausted in jump phase)
 *   C4: i < blockEnd                       (linear-scan loop condition)
 *   C5: elemArray[i] === key               (match found in linear scan)
 */
const JumpSearch = require('../src/algorithms/JumpSearch');

describe('JumpSearch – MC/DC Test Suite', () => {
  let js;
  beforeEach(() => { js = new JumpSearch(); });

  // ── C1 TRUE – guard ──────────────────────────────────────────────
  test('TC_JS_01 | null array returns -1 (C1=T)', () => {
    expect(js.search(5, null)).toBe(-1);
  });

  test('TC_JS_02 | empty array returns -1 (C1=T)', () => {
    expect(js.search(5, [])).toBe(-1);
  });

  // ── C2 FALSE immediately – key in first block ────────────────────
  test('TC_JS_03 | key in first block, no jumping needed (C2=F at start)', () => {
    expect(js.search(2, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(1);
  });

  // ── C2 TRUE – one or more jumps required ─────────────────────────
  test('TC_JS_04 | key requires one jump forward (C2=T once)', () => {
    expect(js.search(7, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(6);
  });

  test('TC_JS_05 | key requires multiple jumps (C2=T multiple times)', () => {
    const arr = Array.from({ length: 25 }, (_, i) => i + 1); // 1..25
    expect(js.search(22, arr)).toBe(21);
  });

  // ── C3 TRUE – array exhausted during jump phase ──────────────────
  test('TC_JS_06 | key larger than all elements, C3=T, returns -1', () => {
    expect(js.search(999, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(-1);
  });

  // ── C5 TRUE – exact match during linear scan ─────────────────────
  test('TC_JS_07 | key at start of block (C5=T first linear iteration)', () => {
    expect(js.search(4, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(3);
  });

  test('TC_JS_08 | key at end of block (C5=T last linear iteration)', () => {
    expect(js.search(6, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(5);
  });

  // ── C4 & C5 FALSE – key not found in scanned block ───────────────
  test('TC_JS_09 | key absent from array, returns -1', () => {
    expect(js.search(10, [1, 3, 5, 7, 9])).toBe(-1);
  });

  // ── Single-element array ─────────────────────────────────────────
  test('TC_JS_10 | single element, match', () => {
    expect(js.search(1, [1])).toBe(0);
  });

  test('TC_JS_11 | single element, no match', () => {
    expect(js.search(2, [1])).toBe(-1);
  });

  // ── First and last element ───────────────────────────────────────
  test('TC_JS_12 | key is first element', () => {
    expect(js.search(1, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(0);
  });

  test('TC_JS_13 | key is last element', () => {
    expect(js.search(9, [1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(8);
  });
});
