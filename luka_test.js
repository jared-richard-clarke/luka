import {
    assert,
    assertStrictEquals,
} from "https://deno.land/std@0.180.0/testing/asserts.ts";
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

Deno.test("equality", function () {
    const { eq, ne } = op;
    const x = 7;
    const y = 6 + 1;
    const z = 14 / 2;
    // reflexive
    assert(eq(x, x), "reflexive");
    // symmetric
    assert(eq(x, y) && eq(y, x), "symmetric");
    // transitive
    assert(eq(x, y) && eq(y, z) && eq(x, z), "transitive");
    // inverse
    assert(eq(x, y) && !ne(x, y), "inverse");
});

Deno.test("ordering", function () {
    const { eq, lt, le, gt, ge } = op;
    const x = 7;
    const y = 11;
    // duality
    assert(lt(x, y) && gt(y, x), "duality");
    // lesser equal
    assert(le(x, y) && (lt(x, y) || eq(x, y)), "lesser equal");
    // greater equal
    assert(ge(x, x) && (gt(x, x) || eq(x, x)), "greater equal");
});

Deno.test("sum", function () {
    const { sum } = op;
    // associative
    assertStrictEquals(sum(1, 2, 3), sum(3, 2, 1), "associative");
    // identity
    assertStrictEquals(sum(7), 7, "identity");
});

Deno.test("product", function () {
    const { product } = op;
    // associative
    assertStrictEquals(product(2, 3, 4), product(4, 3, 2), "associative");
    // identity
    assertStrictEquals(product(7), 7, "identity");
});

Deno.test("floating point imprecision", function () {
    const { add, sub, eq } = op;
    const x = 0.1;
    const y = 0.3;
    const z = 0.4;
    assert(eq(add(x, y), z) && !eq(sub(z, y), x), "non-reflexive");
    assert(!eq(NaN, NaN), "not a number");
});
