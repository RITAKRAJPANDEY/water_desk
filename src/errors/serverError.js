import { AppError } from "./appError";

export class ServerError extends AppError{
    constructor(message="Internal Server Error"){
        super(message,500);
    }
}