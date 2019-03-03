// @flow
export const CommonFormatter = {
    setZeros: (number: number | string): string => (parseInt(number, 10) < 10 ? `0${number}` : number.toString()),
};
