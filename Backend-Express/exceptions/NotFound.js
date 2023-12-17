module.exports = class NotFound {
    constructor(message) {
        this.message = message;
        this.status = 404;
    }

    resp() {
        return {
            message: this.message,
            status: this.status
        };
    }
};