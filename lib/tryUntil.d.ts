import Options from './Options';
declare const _default: <ReturnValueType>(func: () => ReturnValueType, validate: (val: ReturnValueType) => boolean, {numAttempts, interval, onAttempt}: Options) => Promise<ReturnValueType>;
export default _default;
