"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const delay_js_1 = require("delay.js");
exports.default = (func, validate, { numAttempts, interval, onAttempt, }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    if (!Number.isFinite(interval) || interval < 0) {
        throw new Error('the interval should be a positive finite integer');
    }
    for (let i = 0; i < numAttempts; ++i) {
        const val = yield func(i);
        if (validate(val)) {
            if (onAttempt) {
                onAttempt(val, i, true);
            }
            return val;
        }
        const delayPromise = delay_js_1.default(interval);
        if (onAttempt) {
            onAttempt(val, i, false);
        }
        yield delayPromise;
    }
    throw new Error('rejected');
});
//# sourceMappingURL=tryUntil.js.map