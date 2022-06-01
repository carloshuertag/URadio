class RadioShow {
    constructor(managerId, name, schedule, host, availableAt) {
        this.#managerId = managerId;
        this.#name = name;
        this.#schedule = schedule;
        this.#host = host;
        this.#availableAt = availableAt;
    }
    get managerId() { return this.#managerId; }
    set managerId(managerId) { this.#managerId = managerId; }
    get name() { return this.#name; }
    set name(name) { this.#name = name; }
    get schedule() { return this.#schedule; }
    set schedule(schedule) { this.#schedule = schedule; }
    get host() { return this.#host; }
    set host(host) { this.#host = host; }
    get availableAt() { return this.#availableAt; }
    set availableAt(availableAt) { this.#availableAt = availableAt; }
    toJSON() {
        return {
            managerId: this.#managerId,
            name: this.#name,
            schedule: this.#schedule,
            host: this.#host,
            availableAt: this.#availableAt,
        };
    }
    toJSONString() { return JSON.stringify(this.toJSON()); }
}
module.exports = RadioShow;