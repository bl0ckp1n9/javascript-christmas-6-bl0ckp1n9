class PromotionCalendar {
    #dateMemory = new Map();
    #endDate;
    #startDate;
    constructor(year, month) {
        const promotionDate = new Date(year, month - 1, 0);
        this.#endDate = new Date(year, month - 1, promotionDate.getDate());
        this.#startDate = new Date(year, month - 1, 1);
        this.#memorizeDate();
    }

    #memorizeDate() {
        const start = this.#startDate.getDate();
        const end = this.#endDate.getDate();
        for (let date = start; date <= end; date += 1) {
            this.#dateMemory.set(date);
        }
    }
}

export default PromotionDate;
