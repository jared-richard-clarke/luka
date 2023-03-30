import {
    assert,
    assertStrictEquals,
} from "../deps.ts";
import op from "../luka.ts";

Deno.test("negation", () => {
    // distributive: -(x + y) = -x + -y
    assertStrictEquals(op.neg(7 + 11), op.neg(7) + op.neg(11), "distributive");
    // double negation: --x = x
    assertStrictEquals(op.neg(op.neg(7)), 7, "double negation");
});

Deno.test("addition", () => {
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

Deno.test("subtraction", () => {
    // distributive: x * (y - z) = (x * y) - (x * z)
    assertStrictEquals(
        2 * op.sub(11, 7),
        op.sub(2 * 11, 2 * 7),
        "distributive",
    );
    // identity: x - 0 = x
    assertStrictEquals(op.sub(7, 0), 7, "identity");
});

Deno.test("multiplication", () => {
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

Deno.test("division", () => {
    // identity: x / 1 = x
    assertStrictEquals(op.div(7, 1), 7, "identity");
    // divide by self: x / x = 1
    assertStrictEquals(op.div(7, 7), 1, "divide by self");
});

Deno.test("exponent", () => {
    // right associative
    assertStrictEquals(
        op.pow(2, op.pow(3, 4)),
        2 ** 3 ** 4,
        "right associative",
    );
});

Deno.test("remainder", () => {
    // positive dividend
    assertStrictEquals(op.rem(11, -5), 1, "positive dividend");
    // negative dividend
    assertStrictEquals(op.rem(-11, 5), -1, "negative dividend");
});

Deno.test("equal", () => {
    const x = 7;
    const y = 7;
    const z = 7;
    // reflexive
    assert(op.eq(x, x), "reflexive");
    // symmetric
    assert(op.eq(x, y) && op.eq(y, x), "symmetric");
    // transitive
    assert(op.eq(x, y) && op.eq(y, z) && op.eq(x, z), "transitive");
});

Deno.test("sum", () => {
    // associative
    assertStrictEquals(op.sum(1, 2, 3), op.sum(3, 2, 1), "associative");
    // identity
    assertStrictEquals(op.sum(7), 7, "identity");
});

Deno.test("product", () => {
    // associative
    assertStrictEquals(op.product(2, 3, 4), op.product(4, 3, 2), "associative");
    // identity
    assertStrictEquals(op.product(7), 7, "identity");
});
