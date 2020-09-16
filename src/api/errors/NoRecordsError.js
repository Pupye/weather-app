export default class NoRecordsFound extends Error {
    constructor(message, status = 404) {
        super(message); // (1)
        this.status = status
    }
}
