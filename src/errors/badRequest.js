import { AppError } from "./appError";

export class BadRequest extends AppError{
    constructor(message,errors=[]){
        super(message,400,errors);
    }
}