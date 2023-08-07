// Constants
const ZERO = 0;

// Checks if x = 0.
function is_zero(x) {
    return x === ZERO;
}

// Produces unary functions.
function unary(operation) {
    return Object.freeze(function (x) {
        return operation(x);
    });
}

// Produces binary functions.
function binary(operation) {
    return Object.freeze(function (x, y) {
        return operation(x, y);
    });
}

// Produces functions that fold a set into a summary value.
function foldable(operation) {
    return Object.freeze(function (...xs) {
        return xs.reduce(
            (total, x) => operation(total, x),
        );
    });
}

// "op" acts as namespace for arithmetic functions. Its null prototype 
// prevents namespace pollution from inherited objects.
const op = Object.create(null);

// Unary Operations
// If "x" is 0, "-x" will return -0. Subtracting "x" from 0 will prevent this.
op.neg = unary((x) => ZERO - x);
// Binary Operations
op.add = foldable((x, y) => x + y);
op.sub = foldable((x, y) => x - y);
op.mul = foldable((x, y) => {
    if (is_zero(x) || is_zero(y)) {
        return ZERO;
    }
    return x * y;
});
op.div = foldable((x, y) => {
    if (is_zero(x)) {
        return ZERO;
    }
    if (is_zero(y)) {
        return undefined;
    }
    return x / y;
});
op.exp = binary((x, y) => Math.pow(x, y));
op.rem = binary((x, y) => x % y);

/**
 * Module `luka.js` provides functional replacements
 * for a handful of arithmetic operations:
 *
 * [ `+`, `-`, `*`, `/`, `**`, `%`].
 *
 * @example
 * ```js
 * import op from "./luka.js";
 *
 * // Unary Operations
 * const negation         = op.neg(7); // ------------>  -7
 * 
 * // Binary Operations
 * const addition         = op.add(1, 6); // --------->   7
 * const subtraction      = op.sub(8, 1); // --------->   7
 * const multiplication   = op.mul(2, 7); // --------->  14
 * const division         = op.div(14, 2); // -------->   7
 * const exponent         = op.exp(2, 7); // ---------> 128
 * const remainder        = op.rem(15, 7); // -------->   1
 *
 * // Folding Operations
 * const sum              = op.add(1, 2, 3); // ------>   6
 * const product          = op.mul(2, 4, 8, 10); // --> 640
 * const difference       = op.sub(10, 5, 5); // ----->   0
 * const quotient         = op.div(1000, 10, 10); // ->  10
 * ```
 */
export default Object.freeze(op);
