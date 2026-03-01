/**
 * BinarySearch
 * Operates on a SORTED integer array.
 * Time:  O(log n)   Space: O(1)
 */
class BinarySearch {
  /**
   * @param {number} key – value to find
   * @param {number[]} elemArray – sorted array to search
   * @returns {number} index of key, or -1 if not found
   */
  search(key, elemArray) {
    if (!elemArray || elemArray.length === 0) return -1;

    let bottom = 0;
    let top = elemArray.length - 1;
    let index = -1;
    let found = false;

    while (bottom <= top && found === false) {       // C1: bottom<=top  C2: !found
      const mid = Math.floor((top + bottom) / 2);

      if (elemArray[mid] === key) {                  // C3: mid == key
        index = mid;
        found = true;
        return index;
      } else {
        if (elemArray[mid] < key) {                  // C4: mid < key
          bottom = mid + 1;
        } else {
          top = mid - 1;
        }
      }
    }
    return index;
  }
}

module.exports = BinarySearch;
