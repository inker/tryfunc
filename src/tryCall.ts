import delay from 'delay.js'

import Options from './Options'

export default async <ReturnValueType>(
  func: (iteration: number) => ReturnValueType,
  {
    interval,
    numAttempts,
    onAttempt,
  }: Options
) => {
  if (!Number.isFinite(interval) || interval < 0) {
    throw new Error('the interval should be a positive finite integer')
  }
  for (let i = 0; i < numAttempts; ++i) {
    try {
      const val = func(i)
      if (onAttempt) {
        onAttempt(i, true)
      }
      return val
    } catch (e) {
      const delayPromise = delay(interval)
      if (onAttempt) {
        onAttempt(i, false)
      }
      await delayPromise
    }
  }
  throw new Error('rejected')
}
