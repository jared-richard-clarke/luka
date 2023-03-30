// Module provides functional replacements
// for a handful of arithmetic operations.

// Factory function that produces unary functions.
function unary(operation) {
    return Object.freeze(function (x) {
        return operation(x);
    });
}

// Factory function that produces binary functions.
function binary(operation) {
    return Object.freeze(function (x, y) {
        return operation(x, y);
    });
}

// Factory function that produces folding functions
// with variable arity — in this case, monoids.
// A monoid is a set equipped with an associative
// binary operation and an identity element.
function monoid(operation, identity) {
    return Object.freeze(function (...operands) {
        return operands.reduce(
            (total, operand) => operation(total, operand),
            identity,
        );
    });
}

// "op" acts as namespace for arithmetic functions.
// Its null prototype prevents namespace pollution
// from inherited objects.
const op = Object.create(null);

// Unary Operations
op.neg = unary((x) => -x);
op.not = unary((x) => !x);

// Binary Operations
op.add = binary((x, y) => x + y);
op.sub = binary((x, y) => x - y);
op.mul = binary((x, y) => x * y);
op.div = binary((x, y) => x / y);
op.pow = binary((x, y) => Math.pow(x, y));
op.rem = binary((x, y) => x % y);
op.eq = binary((x, y) => x === y);
op.ne = binary((x, y) => x !== y);
op.lt = binary((x, y) => x < y);
op.le = binary((x, y) => x <= y);
op.gt = binary((x, y) => x > y);
op.ge = binary((x, y) => x >= y);

// Folding Operations
op.sum = monoid((x, y) => x + y, 0);
op.product = monoid((x, y) => x * y, 1);

/**
 * Module `luka.js` provides functional replacements
 * for a handful of arithmetic operations.
 *
 * @example
 * ```js
 * import op from "./luka.js";
 * import { assert } from "https://deno.land/std@0.180.0/testing/asserts.ts";
 *
 * function square(x) {
 *    return op.mul(x, x);
 * }
 *
 * function hypotenuse(x, y) {
 *    return Math.sqrt(op.add(square(x), square(y)));
 * }
 *
 * assert(op.eq(hypotenuse(3, 4), 5));
 * ```
 */
export default Object.freeze(op);
