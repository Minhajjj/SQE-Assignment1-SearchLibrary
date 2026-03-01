/**
 * OrderSearch
 * Integrates BinarySearch with the Order domain class.
 * Orders array must be pre-sorted by orderId (ascending).
 *
 * Control Flow Graph (searchByOrderId):
 *
 *  [Start]
 *    │
 *    ▼
 *  N1: orders null/empty?  ──YES──► return null
 *    │ NO
 *    ▼
 *  N2: bottom=0, top=n-1
 *    │
 *    ▼
 *  N3: bottom <= top?  ──NO──► return null
 *    │ YES
 *    ▼
 *  N4: mid = floor((top+bottom)/2)
 *    │
 *    ▼
 *  N5: orders[mid].orderId === orderId?  ──YES──► return orders[mid]
 *    │ NO
 *    ▼
 *  N6: orders[mid].orderId < orderId?
 *    │ YES ──► bottom = mid+1  ──► N3
 *    │ NO  ──► top   = mid-1  ──► N3
 *
 * All-paths test cases are in tests/OrderSearch.test.js
 */
const BinarySearch = require('../algorithms/BinarySearch');

class OrderSearch {
  /**
   * @param {import('../domain/Order')[]} orders – sorted by orderId ASC
   */
  constructor(orders) {
    this.orders = orders || [];
    this._bs = new BinarySearch();
  }

  /**
   * Search for an Order by its orderId.
   * @param {number} orderId
   * @returns {import('../domain/Order')|null}
   */
  searchByOrderId(orderId) {
    const orders = this.orders;

    // N1 – guard
    if (!orders || orders.length === 0) return null;

    let bottom = 0;
    let top    = orders.length - 1;

    // N3 – loop condition
    while (bottom <= top) {
      const mid = Math.floor((top + bottom) / 2);  // N4

      if (orders[mid].orderId === orderId) {        // N5
        return orders[mid];
      }

      if (orders[mid].orderId < orderId) {          // N6
        bottom = mid + 1;
      } else {
        top = mid - 1;
      }
    }

    return null;
  }

  /**
   * Return all active (PENDING or SHIPPED) orders.
   * @returns {import('../domain/Order')[]}
   */
  getActiveOrders() {
    return this.orders.filter(o => o.isActive());
  }

  /**
   * Return all high-value orders (totalAmount > 1000).
   * @returns {import('../domain/Order')[]}
   */
  getHighValueOrders() {
    return this.orders.filter(o => o.isHighValue());
  }
}

module.exports = OrderSearch;
