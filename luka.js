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
