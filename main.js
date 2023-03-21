// Provides LISP-like functional replacements
// for a handful of infix arithmetic operations.
//
// module: readonly {
//    neg,
//    add,
//    sub,
//    mul,
//    div,
//    exp,
//    rem,
//    sum,
//    product
// }

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
// A monoid is an aggregation pattern.
function monoid(operation, identity) {
    return Object.freeze(function (...operands) {
        return operands.reduce(
            (total, operand) => operation(total, operand),
            identity,
        );
    });
}

const op = Object.create(null);

// neg(number) -> -number
// Flips the sign of a number.
// neg(7) -> -7
op.neg = unary((x) => -x);

// add(number, number) -> number
// Returns the sum of two numbers.
// add(3, 4) -> 7
op.add = binary((x, y) => x + y);

// sub(number, number) -> number
// Returns the difference of two numbers.
// sub(11, 4) -> 7
op.sub = binary((x, y) => x - y);

// mul(number, number) -> number
// Returns the product of two numbers.
// mul(2, 7) -> 14
op.mul = binary((x, y) => x * y);

// div(number, number) -> number
// Returns the quotient of two numbers.
// div(10, 2) -> 5
op.div = binary((x, y) => x / y);

// exp(number, number) -> number
// Returns the first number to the power of the second number.
// exp(2, 8) -> 256
op.exp = binary((x, y) => x ** y);

// rem(number, number) -> number
// Returns the remainder of the first number divided by the second number.
// rem(11, 2) -> 1
op.rem = binary((x, y) => x % y);

// sum(...number) -> number
// Returns the sum of a variable arity of numbers.
// sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10) -> 55
op.sum = monoid((x, y) => x + y, 0);

// product(...number) -> number
// Returns the product of a variable arity of numbers.
// product(2, 2, 2) -> 8
op.product = monoid((x, y) => x * y, 1);

export default Object.freeze(op);
