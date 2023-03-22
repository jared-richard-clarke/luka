# Luka

A JavaScript module providing LISP-like functional replacements for a handful of arithmetic operations.

## Examples

```javascript
import op from "./luka.js";

const infix = 1 + 2 * 3;

const prefix = op.add(1, op.mul(2, 3));

const sum = op.sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
```

## API

| description    | operators    | luka               |
| -------------- | ------------ | ------------------ |
| negation       | `-x`         | `neg(x)`           |
| addition       | `x + y`      | `add(x, y)`        |
| subtraction    | `x - y`      | `sub(x, y)`        |
| multiplication | `x * y`      | `mul(x, y)`        |
| division       | `x / y`      | `div(x, y)`        |
| exponent       | `x ** y`     | `exp(x, y)`        |
| remainder      | `x % y`      | `rem(x, y)`        |
| equality       | `x === y`    | `equals(x, y)`     |
| sum            | `x + y + z`  | `sum(x, y, z)`     |
| product        | `x * y * z`  | `product(x, y, z)` |
