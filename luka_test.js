import { assertEquals } from "https://deno.land/std@0.180.0/testing/asserts.ts";
import op from "./luka.js";

Deno.test("test negate", () => {
    // distributive: -(x + y) = -x + -y
    assertEquals(op.neg(7 + 11), op.neg(7) + op.neg(11));
    // double negation: --x = x
    assertEquals(op.neg(op.neg(7)), 7);
});

Deno.test("test add", () => {
    // commutative: x + y = y + x
    assertEquals(op.add(7, 11), op.add(11, 7));
    // associative: (x + y) + z = x + (y + z)
    assertEquals(op.add(1, op.add(2, 3)), op.add(op.add(1, 2), 3));
    // distributive: x * (y + z) = (x * y) + (x * z)
    assertEquals(2 * op.add(3, 4), op.add(2 * 3, 2 * 4));
    // identity: x + 0 = x
    assertEquals(op.add(7, 0), 7);
});

Deno.test("test subtract", () => {
    // distributive: x * (y - z) = (x * y) - (x * z)
    assertEquals(2 * op.sub(11, 7), op.sub(2 * 11, 2 * 7));
    // identity: x - 0 = x
    assertEquals(op.sub(7, 0), 7);
});

Deno.test("test multiply", () => {
    // commutative: x * y = y * x
    assertEquals(op.mul(2, 7), op.mul(7, 2));
    // associative: (x * y) * z = x * (y * z)
    assertEquals(op.mul(op.mul(3, 4), 5), op.mul(3, op.mul(4, 5)));
    // distributive: x * (y + z) = (x * y) + (x * z)
    assertEquals(op.mul(2, 7 + 11), op.mul(2, 7) + op.mul(2, 11));
    // identity: x * 1 = x
    assertEquals(op.mul(7, 1), 7);
});

Deno.test("test divide", () => {
    // identity: x / 1 = x
    assertEquals(op.div(7, 1), 7);
    // divide by self: x / x = 1
    assertEquals(op.div(7, 7), 1);
});

Deno.test("test exponent", () => {
    // right associative
    assertEquals(op.exp(2, op.exp(3, 4)), 2 ** 3 ** 4);
});

Deno.test("test remainder", () => {
    // positive dividend
    assertEquals(op.rem(11, -5), 1);
    // negative dividend
    assertEquals(op.rem(-11, 5), -1);
});

Deno.test("test sum", () => {
    // associative
    assertEquals(op.sum(1, 2, 3), op.sum(3, 2, 1));
    // identity
    assertEquals(op.sum(7), 7);
});

Deno.test("test product", () => {
    // associative
    assertEquals(op.product(2, 3, 4), op.product(4, 3, 2));
    // identity
    assertEquals(op.product(7), 7);
});
