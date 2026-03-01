/**
 * JumpSearch
 * Jumps ahead by sqrt(n) blocks then does a linear scan.
 * Requires a SORTED array.
 * Time:  O(sqrt n)   Space: O(1)
 */
class JumpSearch {
  /**
   * @param {number} key – value to find
   * @param {number[]} elemArray – sorted array to search
   * @returns {number} index of key, or -1 if not found
   */
  search(key, elemArray) {
    if (!elemArray || elemArray.length === 0) return -1; // C1: null/empty guard

    const n = elemArray.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;

    // Phase 1 – jump forward until block end >= key or array exhausted
    while (elemArray[Math.min(step * (Math.floor(prev / step) + 1), n) - 1] < key) { // C2
      prev += step;
      if (prev >= n) return -1;                          // C3: out of bounds
    }

    // Phase 2 – linear scan in the identified block
    const blockEnd = Math.min(prev + step, n);
    for (let i = prev; i < blockEnd; i++) {              // C4: i < blockEnd
      if (elemArray[i] === key) return i;                // C5: element == key
    }

    return -1;
  }
}

module.exports = JumpSearch;
