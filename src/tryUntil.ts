import delay from 'delay.js'

import Options from './Options'

export default async <ReturnValueType>(
  func: (iteration: number) => ReturnValueType,
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
    const val = func(i)
    if (validate(val)) {
      if (onAttempt) {
        onAttempt(i, true)
      }
      return val
    }
    const delayPromise = delay(interval)
    if (onAttempt) {
      onAttempt(i, false)
    }
    await delayPromise
  }
  throw new Error('rejected')
}
