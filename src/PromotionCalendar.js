class PromotionCalendar {
    #calendar = new Map();
    #endDate;
    #startDate;
    constructor(year, month) {
        const promotionDate = new Date(year, month, 0);
        this.#endDate = new Date(year, month, promotionDate.getDate());
        this.#startDate = new Date(year, month, 1);
        this.#initializeCalendar();
    }

    #initializeCalendar() {
        const start = this.#startDate.getDate();
        const end = this.#endDate.getDate();
        for (let date = start; date <= end; date += 1) {
            this.#calendar.set(date, []);
        }
    }

    setPromotionToCalendar(date, event) {
        const eventList = this.#calendar.get(date);
        eventList.push(event);
        this.#calendar.set(date, eventList);
    }

    setPromotionsToCalendar(promotions) {
        const start = this.#startDate.getDate();
        const end = this.#endDate.getDate();

        for (let date = start; date <= end; date += 1) {
            promotions.forEach((promotion) => {
                const { CONFIG } = promotion;
                const { TARGET_DATES } = CONFIG;
                if (TARGET_DATES.includes(date)) {
                    this.setPromotionToCalendar(date, promotion);
                }
            });
        }
    }

    getCalendarByDate(date) {
        return this.#calendar.get(Number(date));
    }
}

export default PromotionCalendar;
