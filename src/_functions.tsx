export function unixToNormalDate(unixTimeStamp: number) {
    return new Date(unixTimeStamp * 1000);
}
export function toEuropeanYearFormat(date: Date) {
    const formated =
        date.getFullYear() +
        "." +
        pushZeroToDateNumber(date.getMonth() + 1) +
        "." +
        pushZeroToDateNumber(date.getDate());
    return formated;
}
export function pushZeroToDateNumber(number: number) {
    return number < 10 ? "0" + number.toString() : number;
}
export function netChange(num1: number, num2: number) {
    return (((num2 - num1) / num1) * 100).toFixed(2).toString() + "%";
}
