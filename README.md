# Luka

A JavaScript module providing functional replacements for a handful of
arithmetic operations.

## API

```js
import op from "./luka.js";

// Unary Operations
const negation         = op.neg(7) // ----------->    -7
const boolean_negation = op.not(7 === 11) // ---->  true

// Binary Operations
const addition         = op.add(1, 6) // -------->     7
const subtraction      = op.sub(8, 1) // -------->     7
const multiplication   = op.mul(2, 7) // -------->    14
const division         = op.div(14, 2) // ------->     7
const power            = op.pow(2, 7) // -------->   128
const remainder        = op.rem(15, 7) // ------->     1

// Binary Boolean Operations
const equal            = op.eq(7, 7) // --------->  true
const not_equal        = op.ne(7, 7) // ---------> false
const less             = op.lt(7, 11) // -------->  true
const less_equal       = op.le(11, 11) // ------->  true
const greater          = op.gt(7, 11) // --------> false
const greater_equal    = op.ge(11, 11) // ------->  true

// Folding Operations
const sum              = op.sum(1, 2, 3) // ----->     6
const sum_id           = op.sum() // ------------>     0
const product          = op.product(2, 2, 2) // ->     8
const product_id       = op.product() // -------->     1
```
