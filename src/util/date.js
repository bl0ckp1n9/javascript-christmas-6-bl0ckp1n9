import { DAYS } from '../constant/date.js';

export const getWeekendsDates = (year, month) => {
    const endDate = new Date(year, month, 0).getDate();
    const startDate = new Date(year, month - 1, 1);
    const weekends = [];
    for (let date = 1; date <= endDate; date += 1) {
        if (startDate.getDay() === DAYS.FRI || startDate.getDay() === DAYS.SAT) {
            weekends.push(date);
        }
        startDate.setDate(startDate.getDate() + 1);
    }

    return weekends;
};
export const getWeekdaysDates = (year, month) => {
    const endDate = new Date(year, month, 0).getDate();
    const startDate = new Date(year, month - 1, 1);
    const weekdays = [];
    for (let date = 1; date <= endDate; date += 1) {
        if (startDate.getDay() !== DAYS.FRI && startDate.getDay() !== DAYS.SAT) {
            weekdays.push(date);
        }
        startDate.setDate(startDate.getDate() + 1);
    }

    return weekdays;
};
export const fillArrayToDates = (end) => [...Array(end)].map((v, i) => i + 1);
