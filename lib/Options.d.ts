interface Options {
    interval: number;
    numAttempts: number;
    onAttempt?: (iteration: number, success: boolean) => void;
}
export default Options;
