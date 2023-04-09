"use strict";

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
 * Module `luka.js` provides functional replacements
 * for a handful of arithmetic operations.
 *
 * @example
 * ```js
 * import op from "./luka.js";
 *
 * // Unary Operations
 * const negation         = op.neg(7) // ----------->    -7
 * const boolean_negation = op.not(7 === 11) // ---->  true
 *
 * // Binary Operations
 * const addition         = op.add(1, 6) // -------->     7
 * const subtraction      = op.sub(8, 1) // -------->     7
 * const multiplication   = op.mul(2, 7) // -------->    14
 * const division         = op.div(14, 2) // ------->     7
 * const power            = op.pow(2, 7) // -------->   128
 * const remainder        = op.rem(15, 7) // ------->     1
 *
 * // Binary Boolean Operations
 * const equal            = op.eq(7, 7) // --------->  true
 * const not_equal        = op.ne(7, 7) // ---------> false
 * const less             = op.lt(7, 11) // -------->  true
 * const less_equal       = op.le(11, 11) // ------->  true
 * const greater          = op.gt(7, 11) // --------> false
 * const greater_equal    = op.ge(11, 11) // ------->  true
 *
 * // Folding Operations
 * const sum              = op.sum(1, 2, 3) // ----->     6
 * const sum_id           = op.sum() // ------------>     0
 * const product          = op.product(2, 2, 2) // ->     8
 * const product_id       = op.product() // -------->     1
 * ```
 */
export default Object.freeze(op);
