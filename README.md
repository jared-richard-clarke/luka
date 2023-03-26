# Luka

A JavaScript module providing functional replacements for a handful of
arithmetic operations.

## Examples

```javascript
import op from "./luka.js";

const infix = 1 + 2 * 3;

const prefix = op.add(1, op.mul(2, 3));

const sum = op.sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
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
