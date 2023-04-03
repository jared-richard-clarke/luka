import {
    assert,
    assertStrictEquals,
} from "https://deno.land/std@0.180.0/testing/asserts.ts";
import op from "./luka.js";

Deno.test("negation", function () {
    // distributive: -(x + y) = -x + -y
    assertStrictEquals(op.neg(7 + 11), op.neg(7) + op.neg(11), "distributive");
    // double negation: --x = x
    assertStrictEquals(op.neg(op.neg(7)), 7, "double negation");
});

Deno.test("addition", function () {
    // commutative: x + y = y + x
    assertStrictEquals(op.add(7, 11), op.add(11, 7), "commutative");
    // associative: (x + y) + z = x + (y + z)
    assertStrictEquals(
        op.add(1, op.add(2, 3)),
        op.add(op.add(1, 2), 3),
        "associative",
    );
    // distributive: x * (y + z) = (x * y) + (x * z)
    assertStrictEquals(2 * op.add(3, 4), op.add(2 * 3, 2 * 4), "distributive");
    // identity: x + 0 = x
    assertStrictEquals(op.add(7, 0), 7, "identity");
});

Deno.test("subtraction", function () {
    // distributive: x * (y - z) = (x * y) - (x * z)
    assertStrictEquals(
        2 * op.sub(11, 7),
        op.sub(2 * 11, 2 * 7),
        "distributive",
    );
    // identity: x - 0 = x
    assertStrictEquals(op.sub(7, 0), 7, "identity");
});

Deno.test("multiplication", function () {
    // commutative: x * y = y * x
    assertStrictEquals(op.mul(2, 7), op.mul(7, 2), "commutative");
    // associative: (x * y) * z = x * (y * z)
    assertStrictEquals(
        op.mul(op.mul(3, 4), 5),
        op.mul(3, op.mul(4, 5)),
        "associative",
    );
    // distributive: x * (y + z) = (x * y) + (x * z)
    assertStrictEquals(
        op.mul(2, 7 + 11),
        op.mul(2, 7) + op.mul(2, 11),
        "distributive",
    );
    // identity: x * 1 = x
    assertStrictEquals(op.mul(7, 1), 7, "identity");
});

Deno.test("division", function () {
    // identity: x / 1 = x
    assertStrictEquals(op.div(7, 1), 7, "identity");
    // divide by self: x / x = 1
    assertStrictEquals(op.div(7, 7), 1, "divide by self");
});

Deno.test("exponent", function () {
    // right associative
    assertStrictEquals(
        op.pow(2, op.pow(3, 4)),
        2 ** 3 ** 4,
        "right associative",
    );
});

Deno.test("remainder", function () {
    // positive dividend
    assertStrictEquals(op.rem(11, -5), 1, "positive dividend");
    // negative dividend
    assertStrictEquals(op.rem(-11, 5), -1, "negative dividend");
});

Deno.test("equality", function () {
    const x = 7;
    const y = 6 + 1;
    const z = 14 / 2;
    // reflexive
    assert(op.eq(x, x), "reflexive");
    // symmetric
    assert(op.eq(x, y) && op.eq(y, x), "symmetric");
    // transitive
    assert(op.eq(x, y) && op.eq(y, z) && op.eq(x, z), "transitive");
    // boolean inverses
    assertStrictEquals(op.eq(x, x), !op.ne(x, x), "equal vs. not-equal");
    assertStrictEquals(
        op.lt(x, x),
        !op.ge(x, x),
        "less than vs. greater than or equal",
    );
    assertStrictEquals(
        op.le(x, x),
        !op.gt(x, x),
        "less than or equal vs. greater than",
    );
});

Deno.test("sum", function () {
    // associative
    assertStrictEquals(op.sum(1, 2, 3), op.sum(3, 2, 1), "associative");
    // identity
    assertStrictEquals(op.sum(7), 7, "identity");
});

Deno.test("product", function () {
    // associative
    assertStrictEquals(op.product(2, 3, 4), op.product(4, 3, 2), "associative");
    // identity
    assertStrictEquals(op.product(7), 7, "identity");
});

Deno.test("floating point imprecision", function () {
    const x = 0.1;
    const y = 0.3;
    const z = 0.4;
    assert(op.eq(op.add(x, y), z) && op.ne(op.sub(z, y), x), "non-reflexive");
    assert(op.ne(NaN, NaN), "not a number");
});
