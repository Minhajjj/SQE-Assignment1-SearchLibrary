/**
 * LinearSearch
 * Scans every element sequentially – does NOT require sorted input.
 * Time:  O(n)   Space: O(1)
 */
class LinearSearch {
  /**
   * @param {number} key – value to find
   * @param {number[]} elemArray – array to search
   * @returns {number} index of key, or -1 if not found
   */
  search(key, elemArray) {
    if (!elemArray || elemArray.length === 0) return -1; // C1: null/empty guard

    for (let i = 0; i < elemArray.length; i++) {         // C2: i < length
      if (elemArray[i] === key) {                        // C3: element == key
        return i;
      }
    }
    return -1;
  }
}

module.exports = LinearSearch;
