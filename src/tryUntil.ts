import delay from 'delay.js'

import Options from './Options'

export default async <ReturnValueType>(
  func: () => ReturnValueType,
  validate: (val: ReturnValueType) => boolean,
  {
    numAttempts,
    interval,
    onAttempt,
  }: Options,
) => {
  if (!Number.isFinite(interval) || interval < 0) {
    throw new Error('the interval should be a positive finite integer')
  }
  for (let i = 0; i < numAttempts; ++i) {
    const val = func()
    if (validate(val)) {
      if (onAttempt) {
        onAttempt(true)
      }
      return val
    }
    const delayPromise = delay(interval)
    if (onAttempt) {
      onAttempt(false)
    }
    await delayPromise
  }
  throw new Error('rejected')
}
