# tryfunc

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

`tryCall`: try calling function until it runs without throwing. Returns the value returned by the function.

`tryUntil`: try calling function until the returned value satisfies the provided validating function.   try {
    tryCall(throwingFunc, {
      interval: 100,
      numAttempts: 10,
      onAttempt: (success) => {
        console.log(`attempt ${sucess ? 'was successful' : 'failed'}`)
      },
    })
  } catch (err) {
    console.error('function timed out')
  }

## Installation
```
npm install --save tryfunc
```

## Usage
Basic usage:
```javascript
import { tryCall, tryUntil } from 'tryfunc'

function throwingFunction {
  // ...
}

async function foo() {
  
  // try calling function
  try {
    const val = tryCall(throwingFunc, {
      interval: 100,
      numAttempts: 10,
      onAttempt: (success) => {
        console.log(`attempt ${sucess ? 'was successful' : 'failed'}`)
      },
    })
    console.log('val', val)
  } catch (err) {
    console.error('function timed out')
  }

  // repeat until
  try {
    const val = tryUntil(
      () => Math.random(),
      (val) => val < 0.1,
      {
        interval: 100,
        numAttempts: 10,
        onAttempt: (success) => {
          console.log(`attempt ${sucess ? 'was successful' : 'failed'}`)
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
