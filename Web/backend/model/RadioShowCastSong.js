class RadioShowListItem {
    constructor(isrc, managerId, castDate, valid) {
        this.#isrc = isrc;
        this.#managerId = managerId;
        this.#castDate = castDate;
        this.#valid = valid;
    }
    get isrc() { return this.#isrc; }
    set isrc(isrc) { this.#isrc = isrc; }
    get managerId() { return this.#managerId; }
    set managerId(managerId) { this.#managerId = managerId; }
    get castDate() { return this.#castDate; }
    set castDate(castDate) { this.#castDate = castDate; }
    get valid() { return this.#valid; }
    set valid(valid) { this.#valid = valid; }
    toJSON() {
        return {
            isrc: this.#isrc,
            managerId: this.#managerId,
            castDate: this.#castDate,
            valid: this.#valid,
        };
    }
    toJSONString() { return JSON.stringify(this.toJSON()); }
}
module.exports = RadioShowListItem;