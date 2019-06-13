import Options from './Options';
interface TryCallOptions extends Options {
    onAttempt?: (err: Error | null, iteration: number, success: boolean) => void;
}
declare const _default: <ReturnValueType>(func: (iteration: number) => ReturnValueType, { interval, numAttempts, onAttempt, }: TryCallOptions) => Promise<ReturnValueType>;
export default _default;
