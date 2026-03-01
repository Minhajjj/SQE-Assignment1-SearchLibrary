/**
 * All-Paths Test Suite – OrderSearch.searchByOrderId()
 *
 * Control Flow Graph nodes:
 *   N1 → guard (orders null/empty)
 *   N2 → initialise bottom=0, top=n-1
 *   N3 → while bottom <= top         (C1)
 *   N4 → compute mid
 *   N5 → orders[mid].orderId === id   (C2)
 *   N6 → orders[mid].orderId < id    (C3)
 *
 * All distinct paths through the CFG:
 *   P1:  N1 → return null              (empty/null input)
 *   P2:  N1→N2→N3(F)→return null      (impossible with non-empty; absorbed in P3)
 *   P3:  N1→N2→N3(T)→N4→N5(T)→return  (found on first check)
 *   P4:  N1→N2→N3(T)→N4→N5(F)→N6(T)→N3(T)→…→N5(T) (right-half pivot)
 *   P5:  N1→N2→N3(T)→N4→N5(F)→N6(F)→N3(T)→…→N5(T) (left-half pivot)
 *   P6:  N1→N2→N3(T)→…→N3(F)→return null             (not found, exhaustion)
 */
const Order = require("../src/domain/Order");
const OrderSearch = require("../src/domain/OrderSearch");

// ── Helpers ──────────────────────────────────────────────────────────────────
const makeOrders = (...defs) =>
  defs.map(([id, name, status, amt]) => new Order(id, name, status, amt));

// ── Shared dataset (sorted by orderId) ───────────────────────────────────────
const ORDERS = makeOrders(
  [101, "Alice", "PENDING", 250],
  [205, "Bob", "SHIPPED", 1200],
  [310, "Carol", "DELIVERED", 75],
  [415, "Dave", "CANCELLED", 500],
  [520, "Eve", "PENDING", 3000],
);

describe("OrderSearch – All-Paths Coverage", () => {
  let os;
  beforeEach(() => {
    os = new OrderSearch(ORDERS);
  });

  // ── Path P1: guard fires ──────────────────────────────────────────────────
  test("TC_OS_01 | P1 – empty orders list returns null", () => {
    const emptyOs = new OrderSearch([]);
    expect(emptyOs.searchByOrderId(101)).toBeNull();
  });

  test("TC_OS_02 | P1 – null orders list returns null", () => {
    const nullOs = new OrderSearch(null);
    expect(nullOs.searchByOrderId(101)).toBeNull();
  });

  // ── Path P3: found on first mid check ────────────────────────────────────
  test("TC_OS_03 | P3 – key found at exact mid (310 in 5-element list)", () => {
    const result = os.searchByOrderId(310);
    expect(result).not.toBeNull();
    expect(result.orderId).toBe(310);
    expect(result.customerName).toBe("Carol");
  });

  // ── Path P4: right-half traversal ────────────────────────────────────────
  test("TC_OS_04 | P4 – key in right half (415), bottom advances", () => {
    const result = os.searchByOrderId(415);
    expect(result).not.toBeNull();
    expect(result.orderId).toBe(415);
    expect(result.status).toBe("CANCELLED");
  });

  test("TC_OS_05 | P4 – key at last position (520)", () => {
    const result = os.searchByOrderId(520);
    expect(result).not.toBeNull();
    expect(result.orderId).toBe(520);
    expect(result.isHighValue()).toBe(true);
  });

  // ── Path P5: left-half traversal ─────────────────────────────────────────
  test("TC_OS_06 | P5 – key in left half (101), top retreats", () => {
    const result = os.searchByOrderId(101);
    expect(result).not.toBeNull();
    expect(result.orderId).toBe(101);
    expect(result.isActive()).toBe(true);
  });

  test("TC_OS_07 | P5 – key near left half (205)", () => {
    const result = os.searchByOrderId(205);
    expect(result).not.toBeNull();
    expect(result.orderId).toBe(205);
    expect(result.isHighValue()).toBe(true);
    expect(result.isActive()).toBe(true);
  });

  // ── Path P6: key not found → exhaustion ──────────────────────────────────
  test("TC_OS_08 | P6 – key smaller than all, not found", () => {
    expect(os.searchByOrderId(1)).toBeNull();
  });

  test("TC_OS_09 | P6 – key larger than all, not found", () => {
    expect(os.searchByOrderId(9999)).toBeNull();
  });

  test("TC_OS_10 | P6 – key in gap between existing IDs", () => {
    expect(os.searchByOrderId(300)).toBeNull();
  });

  // ── getActiveOrders ───────────────────────────────────────────────────────
  test("TC_OS_11 | getActiveOrders returns PENDING and SHIPPED only", () => {
    const active = os.getActiveOrders();
    expect(active.length).toBe(3); // Alice(PENDING), Bob(SHIPPED), Eve(PENDING)
    active.forEach((o) => expect(["PENDING", "SHIPPED"]).toContain(o.status));
  });

  // ── getHighValueOrders ────────────────────────────────────────────────────
  test("TC_OS_12 | getHighValueOrders returns orders with totalAmount > 1000", () => {
    const hv = os.getHighValueOrders();
    expect(hv.length).toBe(2);
    hv.forEach((o) => expect(o.totalAmount).toBeGreaterThan(1000));
  });
});

// ── Order domain unit tests ───────────────────────────────────────────────────
describe("Order – Domain Unit Tests", () => {
  test("TC_OD_01 | valid order constructs successfully", () => {
    const o = new Order(1, "Test", "PENDING", 100);
    expect(o.orderId).toBe(1);
  });

  test("TC_OD_02 | invalid status throws error", () => {
    expect(() => new Order(1, "Test", "UNKNOWN", 100)).toThrow();
  });

  test("TC_OD_03 | negative totalAmount throws error", () => {
    expect(() => new Order(1, "Test", "PENDING", -1)).toThrow();
  });

  test("TC_OD_04 | isActive true for PENDING", () => {
    const o = new Order(1, "A", "PENDING", 50);
    expect(o.isActive()).toBe(true);
  });

  test("TC_OD_05 | isActive true for SHIPPED", () => {
    const o = new Order(2, "B", "SHIPPED", 50);
    expect(o.isActive()).toBe(true);
  });

  test("TC_OD_06 | isActive false for DELIVERED", () => {
    const o = new Order(3, "C", "DELIVERED", 50);
    expect(o.isActive()).toBe(false);
  });

  test("TC_OD_07 | isHighValue true when amount > 1000", () => {
    const o = new Order(4, "D", "PENDING", 1500);
    expect(o.isHighValue()).toBe(true);
  });

  test("TC_OD_08 | isHighValue false when amount <= 1000", () => {
    const o = new Order(5, "E", "PENDING", 1000);
    expect(o.isHighValue()).toBe(false);
  });
});
