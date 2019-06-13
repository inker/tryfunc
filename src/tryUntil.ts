import delay from 'delay.js'

import Options from './Options'

interface TryUntilOptions<ReturnValueType> extends Options {
  onAttempt?: (result: ReturnValueType, iteration: number, success: boolean) => void,
}

export default async <ReturnValueType>(
  func: (iteration: number) => ReturnValueType,
  validate: (val: ReturnValueType) => boolean,
  {
    numAttempts,
    interval,
    onAttempt,
  }: TryUntilOptions<ReturnValueType>,
) => {
  if (!Number.isFinite(interval) || interval < 0) {
    throw new Error('the interval should be a positive finite integer')
  }
  for (let i = 0; i < numAttempts; ++i) {
    const val = await func(i)
    if (validate(val)) {
      if (onAttempt) {
        onAttempt(val, i, true)
      }
      return val
    }
    const delayPromise = delay(interval)
    if (onAttempt) {
      onAttempt(val, i, false)
    }
    await delayPromise
  }
  throw new Error('rejected')
}
