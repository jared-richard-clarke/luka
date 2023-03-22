// Module provides functional replacements
// for a handful of infix arithmetic operations.

type Unary<T> = (x: T) => T;
type Binary<T, U> = (x: T, y: T) => U;
type Foldable<T> = (...xs: T[]) => T;

// Factory function produces unary functions.
function unary(operation) {
    return Object.freeze(function (x) {
        return operation(x);
    });
}

// Factory function produces binary functions.
function binary(operation) {
    return Object.freeze(function (x, y) {
        return operation(x, y);
    });
}

// Factory function produces folding functions
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
    neg: Unary<number>;
    add: Binary<number, number>;
    sub: Binary<number, number>;
    mul: Binary<number, number>;
    div: Binary<number, number>;
    pow: Binary<number, number>;
    rem: Binary<number, number>;
    equal: Binary<number, boolean>;
    sum: Foldable<number>;
    product: Foldable<number>;
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
