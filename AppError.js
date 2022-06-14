class AppError extends Error{
    constructor(message, status){
        super();
        this.message = message;
        this.status = message;
    }
}
module.exports = AppError;