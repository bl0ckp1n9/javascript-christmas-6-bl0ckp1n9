import { DAYS } from './constant.js';

class Promotion {
    #dateMemory = new Map();
    #discountPrice = 0;
    #eventDate;
    #expirationDate;

    constructor(year, month, discountPrice, expirationDate = 0) {
        this.#eventDate = new Date(year, month, 0);
        this.#discountPrice = discountPrice;
        this.#expirationDate = expirationDate === 0 ? this.#eventDate.getDate() : expirationDate;
        this.#memorizeDate();
    }

    #isWeekend(date) {
        this.#eventDate.setDate(date);
        const day = this.#eventDate.getDay();

        if (day === DAYS.FRI || day === DAYS.SAT) return true;
        return false;
    }

    #memorizeDate() {
        const daysInMonth = this.#eventDate.getDate();
        let weekendCount = 0;
        let weekDayCount = 0;
        for (let date = 1; date <= daysInMonth; date += 1) {
            if (this.#isWeekend(date)) weekendCount += 1;
            else weekDayCount += 1;

            this.#dateMemory.set(date, {
                isWeekend: weekendCount,
                isWeekday: weekDayCount,
                passedDay: date - 1,
            });
        }
    }

    getMemorizedDateByDate(date) {
        return this.#dateMemory.get(date);
    }

    getPromotionPrice(orders, targetDate) {
        if (!this.#isWithinPeriod(targetDate)) return 0;

        const menuCount = orders.reduce((acc, cur) => acc + Number(cur.count), 0);

        return this.#discountPrice * menuCount;
    }

    #isWithinPeriod(date) {
        const expirationDate = this.#expirationDate.getDate();
        const startDate = expirationDate - this.#expirationDate + 1;

        if (startDate <= date || date <= expirationDate) return true;
        return false;
    }
}

export default Promotion;
