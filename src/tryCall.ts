import delay from 'delay.js'

import Options from './Options'

interface TryCallOptions extends Options {
  onAttempt?: (err: Error | null, iteration: number, success: boolean) => void,
}

export default async <ReturnValueType>(
  func: (iteration: number) => ReturnValueType,
  {
    interval,
    numAttempts,
    onAttempt,
  }: TryCallOptions
) => {
  if (!Number.isFinite(interval) || interval < 0) {
    throw new Error('the interval should be a positive finite integer')
  }
  for (let i = 0; i < numAttempts; ++i) {
    try {
      const val = func(i)
      if (onAttempt) {
        onAttempt(null, i, true)
      }
      return val
    } catch (err) {
      const delayPromise = delay(interval)
      if (onAttempt) {
        onAttempt(err, i, false)
      }
      await delayPromise
    }
  }
  throw new Error('rejected')
}
