// Factory function that produces binary functions.
function binary(operation) {
    return Object.freeze(function (x, y) {
        return operation(x, y);
    });
}

// Factory function that produces folding functions with variable arity.
function fold(operation) {
    return Object.freeze(function (...xs) {
        return xs.reduce(
            (total, x) => operation(total, x),
        );
    });
}

// Factory function that produces folding functions with variable arity — in this case, monoids.
// A monoid is a set equipped with an associative binary operation and an identity element.
function monoid(operation, identity) {
    return Object.freeze(function (...xs) {
        return xs.reduce(
            (total, x) => operation(total, x),
            identity,
        );
    });
}

// "op" acts as namespace for arithmetic functions. Its null prototype prevents namespace pollution
// from inherited objects.
const op = Object.create(null);

// Binary Operations
op.add = monoid((x, y) => x + y, 0);
op.sub = fold((x, y) => x - y);
op.mul = monoid((x, y) => x * y, 1);
op.div = fold((x, y) => x / y);
op.exp = binary((x, y) => Math.pow(x, y));
op.rem = binary((x, y) => x % y);

/**
 * Module `luka.js` provides functional replacements for a handful of infix, arithmetic operations:
 *
 * [ `+`, `-`, `*`, `/`, `**`, `%`].
 *
 * @example
 * ```js
 * import op from "./luka.js";
 *
 * // Binary Arithmetic Operations
 * const addition         = op.add(1, 6); // --------->   7
 * const subtraction      = op.sub(8, 1); // --------->   7
 * const multiplication   = op.mul(2, 7); // --------->  14
 * const division         = op.div(14, 2); // -------->   7
 * const exponent         = op.exp(2, 7); // ---------> 128
 * const remainder        = op.rem(15, 7); // -------->   1
 *
 * // Monoid Operations
 * const sum              = op.add(1, 2, 3); // ------>   6
 * const sum_id           = op.add(); // ------------->   0
 * const product          = op.mul(2, 4, 8, 10); // --> 640
 * const product_id       = op.mul(); // ------------->   1
 *
 * // Folding Operations
 * const difference       = op.sub(10, 5, 5); // ----->   0
 * const quotient         = op.div(1000, 10, 10); // ->  10
 * ```
 */
export default Object.freeze(op);
