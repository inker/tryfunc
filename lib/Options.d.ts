interface Options {
    interval: number;
    numAttempts: number;
    onAttempt?: (success: boolean) => void;
}
export default Options;
