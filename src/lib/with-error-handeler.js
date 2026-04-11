import { errorHandeler } from "./error-handeler";



export function errorHandlerWraper(handler) {
  return async  (req,...args)=> {
    try {
      return await handler(req,...args);
    } catch (error) {
      return errorHandeler(error);
    }
  };
}