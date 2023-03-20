// Provides LISP-like functional replacements
// for infix arithmetic operations.

function unary(operation) {
    return Object.freeze(function (x) {
        return operation(x);
    });
}

function binary(operation) {
    return Object.freeze(function (x, y) {
        return operation(x, y);
    });
}

// A monoid is a set equipped with an associative
// binary operation and an identity element.
// Useful for aggregation.
function monoid(operation, identity) {
    return Object.freeze(function (...operands) {
        return operands.reduce(
            (total, operand) => operation(total, operand),
            identity,
        );
    });
}

const op = Object.create(null);

op.neg = unary((x) => -x);

op.add = binary((x, y) => x + y);
op.sub = binary((x, y) => x - y);
op.mul = binary((x, y) => x * y);
op.div = binary((x, y) => x / y);
op.exp = binary((x, y) => x ** y);
op.rem = binary((x, y) => x % y);

op.sum = monoid((x, y) => x + y, 0);
op.product = monoid((x, y) => x * y, 1);

export default Object.freeze(op);
