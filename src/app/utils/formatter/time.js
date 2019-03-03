// @flow
import { CommonFormatter } from './common';

const { setZeros } = CommonFormatter;


function secondsToTime(
    seconds: number
) {
    const hours = parseInt(seconds / 3600, 10);
    let minutes = parseInt(seconds / 60, 10);
    const rseconds = parseInt(seconds % 60, 10);
    while (minutes >= 60) {
        minutes -= 60;
    }
    return `${hours ? `${setZeros(hours)}:` : ''}${setZeros(minutes)}:${setZeros(rseconds)}`;
}

export const TimeFormatter = {
    secondsToTime,
};
