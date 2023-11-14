class PromotionCalendar {
    #dateMemory = new Map();
    #endDate;
    #startDate;
    constructor(year, month) {
        const promotionDate = new Date(year, month - 1, 0);
        this.#endDate = new Date(year, month - 1, promotionDate.getDate());
        this.#startDate = new Date(year, month - 1, 1);
        this.#initalizeDate();
    }

    #initalizeDate() {
        const start = this.#startDate.getDate();
        const end = this.#endDate.getDate();
        for (let date = start; date <= end; date += 1) {
            this.#dateMemory.set(date, []);
        }
    }

    setEventToCalendar(date, event) {
        const eventList = this.#dateMemory.get(date);
        eventList.push(event);
        this.#dateMemory.set(date, eventList);
    }

    getCalendarByDate(date) {
        return this.#dateMemory.get(date);
    }
}

export default PromotionCalendar;
