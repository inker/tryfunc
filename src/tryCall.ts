import delay from 'delay.js'

import Options from './Options'

export default async <ReturnValueType>(
  func: () => ReturnValueType,
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
      const val = func()
      if (onAttempt) {
        onAttempt(true)
      }
      return val
    } catch (e) {
      const delayPromise = delay(interval)
      if (onAttempt) {
        onAttempt(false)
      }
      await delayPromise
    }
  }
  throw new Error('rejected')
}
