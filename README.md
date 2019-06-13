# tryfunc

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

`tryCall`: try invoking the function until it runs without throwing. Returns the value returned by the function.

`tryUntil`: try invoking the function until the returned value satisfies the provided validating function. Returns the value returned by the function.

Arguments:
* `func`: the function to invoke with the `iteration` as a parameter
* (only in `tryUntil`) `validate`: the validating function. Stops executing once the validator returns `true`.
* `Options` object:
  * `numAttempts`: the number of iterations
  * `interval`: the interval between each attempt
  * `onAttempt` (optional):  the function to invoke after each attempt

## Installation
```
npm install --save tryfunc
```

## Usage
Basic usage:
```javascript
import { tryCall, tryUntil } from 'tryfunc'

function throwingFunction() {
  // ...
}

async function foo() {
  
  // try calling function
  try {
    const val = await tryCall(throwingFunc, {
      interval: 100,
      numAttempts: 10,
      onAttempt: (err, i, success) => {
        if (err) {
          console.error(err)
        }
        console.log(`attempt ${i} ${success ? 'was successful' : 'failed'}`)
      },
    })
    console.log('val', val)
  } catch (err) {
    console.error('function timed out')
  }

  // repeat until
  try {
    const val = await tryUntil(
      () => Math.random(),
      (val) => val < 0.1,
      {
        interval: 100,
        numAttempts: 10,
        onAttempt: (result, i, success) => {
          console.log('received', result)
          console.log(`attempt ${i} ${success ? 'was successful' : 'failed'}`)
        },
      },
    )
    console.log('val', val)
  } catch (err) {
    console.error('no value smaller than 0.1 produced')
  }

}
```

[npm-url]: https://npmjs.org/package/tryfunc
[downloads-image]: http://img.shields.io/npm/dm/tryfunc.svg
[npm-image]: http://img.shields.io/npm/v/tryfunc.svg
[david-dm-url]:https://david-dm.org/inker/tryfunc
[david-dm-image]:https://david-dm.org/inker/tryfunc.svg
[david-dm-dev-url]:https://david-dm.org/inker/tryfunc#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/inker/tryfunc/dev-status.svg
