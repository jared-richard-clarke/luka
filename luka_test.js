import {
    assert,
    assertStrictEquals,
} from "https://deno.land/std@0.190.0/testing/asserts.ts";
import op from "./luka.js";

Deno.test("addition", function () {
    const { add } = op;
    // commutative: x + y = y + x
    assertStrictEquals(add(7, 11), add(11, 7), "commutative");
    // associative: (x + y) + z = x + (y + z)
    assertStrictEquals(add(1, add(2, 3)), add(add(1, 2), 3), "associative");
    // distributive: x * (y + z) = (x * y) + (x * z)
    assertStrictEquals(2 * add(3, 4), add(2 * 3, 2 * 4), "distributive");
    // identity: x + 0 = x
    assertStrictEquals(add(7, 0), 7, "identity");
});

Deno.test("subtraction", function () {
    const { sub } = op;
    // distributive: x * (y - z) = (x * y) - (x * z)
    assertStrictEquals(2 * sub(11, 7), sub(2 * 11, 2 * 7), "distributive");
    // identity: x - 0 = x
    assertStrictEquals(sub(7, 0), 7, "identity");
});

Deno.test("multiplication", function () {
    const { mul } = op;
    // commutative: x * y = y * x
    assertStrictEquals(mul(2, 7), mul(7, 2), "commutative");
    // associative: (x * y) * z = x * (y * z)
    assertStrictEquals(mul(mul(3, 4), 5), mul(3, mul(4, 5)), "associative");
    // distributive: x * (y + z) = (x * y) + (x * z)
    assertStrictEquals(mul(2, 7 + 11), mul(2, 7) + mul(2, 11), "distributive");
    // identity: x * 1 = x
    assertStrictEquals(mul(7, 1), 7, "identity");
});

Deno.test("division", function () {
    const { div } = op;
    // identity: x / 1 = x
    assertStrictEquals(div(7, 1), 7, "identity");
    // divide by self: x / x = 1
    assertStrictEquals(div(7, 7), 1, "divide by self");
});

Deno.test("exponent", function () {
    const { exp } = op;
    // right associative
    assertStrictEquals(exp(2, exp(3, 4)), 2 ** 3 ** 4, "right associative");
});

Deno.test("remainder", function () {
    const { rem } = op;
    // positive dividend
    assertStrictEquals(rem(11, -5), 1, "positive dividend");
    // negative dividend
    assertStrictEquals(rem(-11, 5), -1, "negative dividend");
});

Deno.test("monoid", function () {
    const { add, mul } = op;
    // add fold
    assertStrictEquals(add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), 55, "add fold");
    // add identity
    assertStrictEquals(add(), 0, "add identity");
    // multiply fold
    assertStrictEquals(mul(10, 10, 10), 1000, "multiply fold");
    // multiply identity
    assertStrictEquals(mul(), 1, "multiply identity");
});

Deno.test("foldable", function () {
    const { sub, div } = op;
    // subtract fold
    assertStrictEquals(sub(55, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10), 0, "subtract fold");
    // divide fold
    assertStrictEquals(div(1000, 10, 10), 10, "divide fold");
});

Deno.test("floating point imprecision", function () {
    const { add, sub } = op;
    const x = 0.1;
    const y = 0.3;
    const z = 0.4;
    assert(add(x, y) === z && !(sub(z, y) === x), "non-reflexive");
});
