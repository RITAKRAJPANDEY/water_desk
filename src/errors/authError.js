import { AppError } from "./appError";

export class AuthError extends AppError{
    constructor(message='unauthorized'){
        super(message,401);
    }
}