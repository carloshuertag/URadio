class RadioShowManager {
    constructor(managerId, mail, psswd) {
        this.#managerId = managerId;
        this.#mail = mail;
        this.#psswd = psswd;
    }
    get managerId() { return this.#managerId; }
    set managerId(managerId) { this.#managerId = managerId; }
    get mail() { return this.#mail; }
    set mail(mail) { this.#mail = mail; }
    get psswd() { return this.#psswd; }
    set psswd(psswd) { this.#psswd = psswd; }
    toJSON() {
        return {
            managerId: this.#managerId,
            mail: this.#mail,
            psswd: this.#psswd,
        };
    }
    toJSONString() { return JSON.stringify(this.toJSON()); }
}
module.exports = RadioShowManager;