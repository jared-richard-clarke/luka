// Factory function that produces binary functions.
function binary(operation) {
    return Object.freeze(function (x, y) {
        return operation(x, y);
    });
}

// Factory function that produces folding functions
// with variable arity — in this case semigroups.
// A semigroup is a set with an associative
// binary operation.
function semigroup(operation) {
    return Object.freeze(function (...xs) {
        return xs.reduce(
            (total, x) => operation(total, x),
        );
    });
}

// Factory function that produces folding functions
// with variable arity — in this case, monoids.
// A monoid is a set equipped with an associative
// binary operation AND an identity element.
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

// Binary Operations
op.add = monoid((x, y) => x + y, 0);
op.sub = semigroup((x, y) => x - y);
op.mul = monoid((x, y) => x * y, 1);
op.div = semigroup((x, y) => x / y);
op.exp = binary((x, y) => Math.pow(x, y));
op.rem = binary((x, y) => x % y);

// Binary Comparison Operations
op.eq = binary((x, y) => x === y);
op.ne = binary((x, y) => x !== y);
op.lt = binary((x, y) => x < y);
op.le = binary((x, y) => x <= y);
op.gt = binary((x, y) => x > y);
op.ge = binary((x, y) => x >= y);

/**
 * Module `luka.js` provides functional replacements
 * for a handful of infix operations:
 *
 * [ `+`, `-`, `*`, `/`, `**`, `%`, `===`, `!==`, `<`, `<=`, `>`, `>=`].
 *
 * @example
 * ```js
 * import op from "./luka.js";
 *
 * // Binary Arithmetic Operations
 * const addition         = op.add(1, 6) // -------->     7
 * const subtraction      = op.sub(8, 1) // -------->     7
 * const multiplication   = op.mul(2, 7) // -------->    14
 * const division         = op.div(14, 2) // ------->     7
 * const exponent         = op.exp(2, 7) // -------->   128
 * const remainder        = op.rem(15, 7) // ------->     1
 *
 * // Binary Comparison Operations
 * const equal            = op.eq(7, 7) // --------->  true
 * const not_equal        = op.ne(7, 7) // ---------> false
 * const lesser           = op.lt(7, 11) // -------->  true
 * const lesser_equal     = op.le(7, 11) // -------->  true
 * const greater          = op.gt(7, 11) // --------> false
 * const greater_equal    = op.ge(7, 11) // --------> false
 * 
 * // Monoid Operations
 * const sum              = op.add(1, 2, 3) // ----->     6
 * const sum_id           = op.add() // ------------>     0
 * const product          = op.mul(2, 2, 2) // ----->     8
 * const product_id       = op.mul() // ------------>     1
 * ```
 */
export default Object.freeze(op);
