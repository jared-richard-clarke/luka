# Luka

A JavaScript module providing functional replacements for a handful of
arithmetic operations.

## Examples

```javascript
import op from "./luka.js";

// Unary Operations
const negation         = op.neg(7) // ----------->   -7

// Binary Operations
const addition         = op.add(1, 6) // -------->    7
const subtraction      = op.sub(8, 1) // -------->    7
const multiplication   = op.mul(2, 7) // -------->   14
const division         = op.div(14, 2) // ------->    7
const exponent         = op.pow(2, 7) // -------->  128
const remainder        = op.rem(15, 7) // ------->    1
const equal            = op.equal(7, 7) // ------> true

// Folding Operations
const sum              = op.sum(1, 2, 3) // ----->    6
const sum_identity     = op.sum() // ------------>    0
const product          = op.product(2, 2, 2) // ->    8
const product_identity = op.product() // -------->    1
```

## API

| description                                            | operation         | `luka.js`               |
| ------------------------------------------------------ | ----------------- | ----------------------- |
| **negation**: changes sign of `x`                      | `-x`              | `neg(x)`                |
| **addition**: returns sum of `x` and `y`               | `x + y`           | `add(x, y)`             |
| **subtraction**: returns difference of `x` and `y`     | `x - y`           | `sub(x, y)`             |
| **multiplication**: returns product of `x` and `y`     | `x * y`           | `mul(x, y)`             |
| **division**: returns quotient of `x` and `y`          | `x / y`           | `div(x, y)`             |
| **exponent**: returns base `x` to the power of `y`     | `x ** y`          | `pow(x, y)`             |
| **remainder**: returns remainder of `x` divided by `y` | `x % y`           | `rem(x, y)`             |
| **equality**: checks whether `x` and `y` are equal     | `x === y`         | `equal(x, y)`           |
| **sum**: returns sum of `n` numbers                    | `x + y + z + ...` | `sum(x, y, z, ...)`     |
| **product**: returns product of `n` numbers            | `x * y * z * ...` | `product(x, y, z, ...)` |
