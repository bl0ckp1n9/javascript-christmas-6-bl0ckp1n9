import { DAYS } from './constant.js';

export const getWeekendsDates = (year, month) => {
    const date = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const weekends = [];
    while (date <= endDate) {
        if (date.getDay() === DAYS.FRI || date.getDay() === DAYS.SAT) {
            weekends.push(date.getDate());
        }

        date.setDate(date.getDate() + 1);
    }
    return weekends;
};
export const getWeekdaysDates = (year, month) => {
    const date = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const weekdays = [];
    while (date <= endDate) {
        if (date.getDay() !== DAYS.FRI && date.getDay() !== DAYS.SAT) {
            weekdays.push(date.getDate());
        }
        date.setDate(date.getDate() + 1);
    }
    return weekdays;
};

export const fillArrayToDates = (end) => [...Array(end)].map((v, i) => i + 1);
