# Luka

A JavaScript module providing LISP-like functional replacements for a handful of arithmetic operations.

## Example

```javascript
import op from "./lukas.js";

const infix = 1 + 2 * 3;

const prefix = op.add(1, op.mul(2, 3));

const sum = op.sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
```
