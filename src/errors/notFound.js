import { AppError } from "./appError";

export class NotFound extends AppError{
    constructor(message){
        super(message,404);
    }
}