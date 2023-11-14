import { DAYS } from './constant.js';

class WeeksPromotion {
    #dateMemory = new Map();
    #discountPrice = 0;
    #targetDate;
    constructor(year, month, discountPrice) {
        this.#targetDate = new Date(year, month, 0);
        this.#discountPrice = discountPrice;
        this.#memorizeDate();
    }

    #isWeekend(targetDay) {
        this.#targetDate.setDate(targetDay);
        const day = this.#targetDate.getDay();

        if (day === DAYS.FRI || day === DAYS.SAT) return true;
        return false;
    }

    #memorizeDate() {
        const daysInMonth = this.#targetDate.getDate();
        let weekendCount = 0;
        let weekDayCount = 0;
        for (let day = 1; day <= daysInMonth; day += 1) {
            if (this.#isWeekend(day)) weekendCount += 1;
            else weekDayCount += 1;

            this.#dateMemory.set(day, {
                isWeekend: weekendCount,
                isWeekday: weekDayCount,
            });
        }
    }

    getWeeksPromotionPrice(orders) {
        const menuCount = orders.reduce((acc, cur) => acc + Number(cur.count), 0);

        return this.#discountPrice * menuCount;
    }
}

export default WeeksPromotion;
