# Luka

Module `luka.js` provides functional replacements for a handful of infix operations:

[ `+`, `-`, `*`, `/`, `**`, `%`].

## Background

A binary operation is a rule for combining two values to create another. In arithmetic,
the preferred syntax for binary operations is infix notation, where the operator sits
between its operands.

But infix syntax is ambiguous. It's unclear whether `1 + 2 * 3` evaluates to `(1 + 2) * 3`
or `1 + (2 * 3)`. Mathematicians use a set of conventions, the order of operations, to resolve
this ambiguity.

The order of operations, however, is arbitrary. It varies from person to person and region to region.
Many programming languages come with their own precedence tables — each subtly different from the other.

In JavaScript, I prefer to sidestep these ambiguities by using function application.
JavaScript functions evaluate their arguments inward to outward precisely when they are called.
`1 + 2 * 3` becomes `add(1, mul(2, 3))`. This notation is ugly but explicit.

## API

```js
import op from "./luka.js";

// Binary Operations
const addition         = op.add(1, 6); // --------->   7
const subtraction      = op.sub(8, 1); // --------->   7
const multiplication   = op.mul(2, 7); // --------->  14
const division         = op.div(14, 2); // -------->   7
const exponent         = op.exp(2, 7); // ---------> 128
const remainder        = op.rem(15, 7); // -------->   1

// Folding Operations
const sum              = op.add(1, 2, 3); // ------>   6
const product          = op.mul(2, 4, 8, 10); // --> 640
const difference       = op.sub(10, 5, 5); // ----->   0
const quotient         = op.div(1000, 10, 10); // ->  10
```
