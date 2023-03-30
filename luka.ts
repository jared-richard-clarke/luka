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

/**
 * Generic type alias for unary functions.
 * `T`: input, `U`: output
 */
type Unary<T, U> = (x: T) => U;
/**
 * Generic type alias for binary functions.
 * `T`: input, `U`: output
 */
type Binary<T, U> = (x: T, y: T) => U;
/**
 * Generic type alias for folding functions.
 * `T`: input, `U`: output
 */
type Fold<T, U> = (...xs: T[]) => U;

// "op" acts as namespace for arithmetic functions.
// Its null prototype prevents namespace pollution
// from inherited objects.
const op: {
    // Unary Operations
    neg: Unary<number, number>;
    not: Unary<boolean, boolean>;
    // Binary Operations
    add: Binary<number, number>;
    sub: Binary<number, number>;
    mul: Binary<number, number>;
    div: Binary<number, number>;
    pow: Binary<number, number>;
    rem: Binary<number, number>;
    // Binary Boolean Operations
    eq: Binary<number, boolean>;
    ne: Binary<number, boolean>;
    lt: Binary<number, boolean>;
    le: Binary<number, boolean>;
    gt: Binary<number, boolean>;
    ge: Binary<number, boolean>;
    // Folding Operations
    sum: Fold<number, number>;
    product: Fold<number, number>;
} = Object.create(null);

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

// Binary Boolean Operations
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
 * Module `luka.ts` provides functional replacements
 * for a handful of arithmetic operations.
 *
 * @example
 * ```ts
 * import { add, eq, mul } from "./luka.ts";
 * import { assert } from "https://deno.land/std@0.180.0/testing/asserts.ts";
 *
 * function hypotenuse(x: number, y: number): number {
 *    return Math.sqrt(add(mul(x, x), mul(y, y)));
 * }
 *
 * assert(eq(hypotenuse(3, 4), 5));
 * ```
 */
export default Object.freeze(op);
