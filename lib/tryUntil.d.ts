import Options from './Options';
interface TryUntilOptions<ReturnValueType> extends Options {
    onAttempt?: (result: ReturnValueType, iteration: number, success: boolean) => void;
}
declare const _default: <ReturnValueType>(func: (iteration: number) => ReturnValueType, validate: (val: ReturnValueType) => boolean, { numAttempts, interval, onAttempt, }: TryUntilOptions<ReturnValueType>) => Promise<ReturnValueType>;
export default _default;
