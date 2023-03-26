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
const op: {
    /** **negation**: changes sign of `x` */
    neg: (x: number) => number;
    /** **addition**: returns sum of `x` and `y` */
    add: (x: number, y: number) => number;
    /** **subtraction**: returns difference of `x` and `y` */
    sub: (x: number, y: number) => number;
    /** **multiplication**: returns product of `x` and `y` */
    mul: (x: number, y: number) => number;
    /** **division**: returns quotient of `x` and `y` */
    div: (x: number, y: number) => number;
    /** **exponent**: returns base `x` to the power of `y` */
    pow: (x: number, y: number) => number;
    /** **remainder**: returns remainder of `x` divided by `y` */
    rem: (x: number, y: number) => number;
    /** **equality**: checks whether `x` and `y` are equal */
    equal: (x: number, y: number) => boolean;
    /**
     * **sum**: returns sum of `n` numbers
     * ```js
     * sum(1, 2, 3) // -> 6
     * sum()        // -> 0 (identity)
     * ```
     */
    sum: (...xs: number[]) => number;
    /**
     * **product**: returns product of `n` numbers
     * ```js
     * product(2, 3, 4) // -> 24
     * product()        // -> 1 (identity)
     * ``` */
    product: (...xs: number[]) => number;
} = Object.create(null);

// Unary Operations
op.neg = unary((x) => -x);

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

// Make "op" immutable prior to export.
export default Object.freeze(op);
