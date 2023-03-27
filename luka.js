// Module provides functional replacements
// for a handful of arithmetic operations.

// Factory function that produces unary functions.
// Makes functions immutable.
function unary(operation) {
    return Object.freeze(function (x) {
        return operation(x);
    });
}

// Factory function that produces binary functions.
// Makes functions immutable.
function binary(operation) {
    return Object.freeze(function (x, y) {
        return operation(x, y);
    });
}

// Factory function that produces folding functions
// with variable arity — in this case, monoids.
// A monoid is a set equipped with an associative
// binary operation and an identity element.
// Makes functions immutable.
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
op.neg = unary((x) => -x); // <----------------- negation

// Binary Operations
op.add = binary((x, y) => x + y); // <---------- addition
op.sub = binary((x, y) => x - y); // <---------- subtraction
op.mul = binary((x, y) => x * y); // <---------- multiplication
op.div = binary((x, y) => x / y); // <---------- division
op.pow = binary((x, y) => Math.pow(x, y)); // <- exponent
op.rem = binary((x, y) => x % y); // <---------- remainder
op.equal = binary((x, y) => x === y); // <------ equality

// Folding Operations
op.sum = monoid((x, y) => x + y, 0); // <------- sum
op.product = monoid((x, y) => x * y, 1); // <--- product

/**
 * Module `luka.js` provides functional replacements
 * for a handful of arithmetic operations.
 *
 * @example
 * ```js
 * import op from "./luka.js";
 *
 * // Unary Operations
 * const negation         = op.neg(7) // ----------->   -7
 * 
 * // Binary Operations
 * const addition         = op.add(1, 6) // -------->    7
 * const subtraction      = op.sub(8, 1) // -------->    7
 * const multiplication   = op.mul(2, 7) // -------->   14
 * const division         = op.div(14, 2) // ------->    7
 * const exponent         = op.pow(2, 7) // -------->  128
 * const remainder        = op.rem(15, 7) // ------->    1
 * const equal            = op.equal(7, 7) // ------> true
 * 
 * // Folding Operations
 * const sum              = op.sum(1, 2, 3) // ----->    6
 * const sum_identity     = op.sum() // ------------>    0
 * const product          = op.product(2, 2, 2) // ->    8
 * const product_identity = op.product() // -------->    1
 * ```
 */
export default Object.freeze(op);
