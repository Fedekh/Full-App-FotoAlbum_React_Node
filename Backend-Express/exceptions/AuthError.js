module.exports = class AuthError {
    constructor(message, status = 401) {
        this.message = message;
        this.status = status;
    }
    resp() {
        return {
            message: this.message,
            status: this.status
        };
    }
}

