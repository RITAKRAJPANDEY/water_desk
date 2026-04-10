import { AppError } from "./appError";

export class Forbidden extends AppError{
    constructor(message="forbidden"){
        super(message,403);
    }
}