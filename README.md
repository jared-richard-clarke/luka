# Luka

A JavaScript module providing functional replacements for a handful of
arithmetic operations.

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
`1 + 2 * 3` becomes `add(1, mul(2, 3))`. This notation is perhaps uglier but definitely 
more explicit.

## API

```js
import op from "./luka.js";

// Unary Operations
const negation         = op.neg(7) // ----------->    -7

// Binary Operations
const addition         = op.add(1, 6) // -------->     7
const subtraction      = op.sub(8, 1) // -------->     7
const multiplication   = op.mul(2, 7) // -------->    14
const division         = op.div(14, 2) // ------->     7
const power            = op.pow(2, 7) // -------->   128
const remainder        = op.rem(15, 7) // ------->     1
const equal            = op.equal(7, 7) // ------>  true

// Folding Operations
const sum              = op.sum(1, 2, 3) // ----->     6
const sum_id           = op.sum() // ------------>     0
const product          = op.product(2, 2, 2) // ->     8
const product_id       = op.product() // -------->     1
```
