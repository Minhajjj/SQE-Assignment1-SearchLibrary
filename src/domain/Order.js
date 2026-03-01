/**
 * Order – domain class representing a customer order.
 */
class Order {
  /**
   * @param {number} orderId
   * @param {string} customerName
   * @param {string} status  – 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
   * @param {number} totalAmount
   */
  constructor(orderId, customerName, status, totalAmount) {
    if (!orderId || typeof orderId !== 'number')
      throw new Error('orderId must be a positive number');
    if (!customerName || typeof customerName !== 'string')
      throw new Error('customerName must be a non-empty string');

    const VALID_STATUSES = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!VALID_STATUSES.includes(status))
      throw new Error(`status must be one of: ${VALID_STATUSES.join(', ')}`);
    if (typeof totalAmount !== 'number' || totalAmount < 0)
      throw new Error('totalAmount must be a non-negative number');

    this.orderId      = orderId;
    this.customerName = customerName;
    this.status       = status;
    this.totalAmount  = totalAmount;
  }

  isActive() {
    return this.status === 'PENDING' || this.status === 'SHIPPED';
  }

  isHighValue() {
    return this.totalAmount > 1000;
  }

  toString() {
    return `Order[${this.orderId}] ${this.customerName} – ${this.status} ($${this.totalAmount})`;
  }
}

module.exports = Order;
