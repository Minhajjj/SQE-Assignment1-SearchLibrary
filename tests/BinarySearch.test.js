/**
 * MC/DC Test Suite – BinarySearch
 *
 * Conditions under test:
 *   C1: bottom <= top          (loop entry condition, part 1)
 *   C2: found === false        (loop entry condition, part 2)
 *   C3: elemArray[mid] === key (found exact match)
 *   C4: elemArray[mid] < key   (target is in right half)
 *
 * MC/DC requires each condition to independently affect the outcome.
 * All-paths coverage is achieved by covering every branch of the CFG.
 */
const BinarySearch = require('../src/algorithms/BinarySearch');

describe('BinarySearch – MC/DC Test Suite', () => {
  let bs;
  beforeEach(() => { bs = new BinarySearch(); });

  // ── Guard conditions ────────────────────────────────────────────
  test('TC_BS_01 | null array returns -1', () => {
    expect(bs.search(5, null)).toBe(-1);
  });

  test('TC_BS_02 | empty array returns -1', () => {
    expect(bs.search(5, [])).toBe(-1);
  });

  // ── C3 TRUE – exact match found ─────────────────────────────────
  test('TC_BS_03 | key found at mid (single element)', () => {
    expect(bs.search(7, [7])).toBe(0);
  });

  test('TC_BS_04 | key found at mid (odd-length array)', () => {
    expect(bs.search(5, [1, 3, 5, 7, 9])).toBe(2);
  });

  test('TC_BS_05 | key found at first element', () => {
    expect(bs.search(1, [1, 3, 5, 7, 9])).toBe(0);
  });

  test('TC_BS_06 | key found at last element', () => {
    expect(bs.search(9, [1, 3, 5, 7, 9])).toBe(4);
  });

  // ── C4 TRUE – target in right half (bottom advances) ───────────
  test('TC_BS_07 | C4=T: key > mid → bottom = mid+1 → found later', () => {
    expect(bs.search(7, [1, 3, 5, 7, 9])).toBe(3);
  });

  // ── C4 FALSE – target in left half (top retreats) ──────────────
  test('TC_BS_08 | C4=F: key < mid → top = mid-1 → found later', () => {
    expect(bs.search(3, [1, 3, 5, 7, 9])).toBe(1);
  });

  // ── C1 FALSE – loop never entered (bottom > top at start) ───────
  // Not possible with non-empty array (bottom=0, top=len-1 ≥ 0)
  // Covered by key not present: loop exits when C1 becomes false
  test('TC_BS_09 | C1=F at exit: key not in array, returns -1', () => {
    expect(bs.search(4, [1, 3, 5, 7, 9])).toBe(-1);
  });

  // ── C2 FALSE – loop exits because found=true ───────────────────
  test('TC_BS_10 | C2=F at exit: key found, found flag set to true', () => {
    // found is set true only on match – confirmed by non-(-1) return
    expect(bs.search(5, [1, 3, 5, 7, 9])).not.toBe(-1);
  });

  // ── Additional edge cases ───────────────────────────────────────
  test('TC_BS_11 | two-element array, key is second', () => {
    expect(bs.search(10, [5, 10])).toBe(1);
  });

  test('TC_BS_12 | two-element array, key is first', () => {
    expect(bs.search(5, [5, 10])).toBe(0);
  });

  test('TC_BS_13 | large array, key present', () => {
    const arr = Array.from({ length: 100 }, (_, i) => i * 2); // 0,2,4,...,198
    expect(bs.search(88, arr)).toBe(44);
  });

  test('TC_BS_14 | large array, key absent', () => {
    const arr = Array.from({ length: 100 }, (_, i) => i * 2);
    expect(bs.search(99, arr)).toBe(-1);
  });
});
