import { errorHandeler } from "./error-handeler";



export function errorHandlerWraper(handler) {
  return async function (req,context) {
    try {
      return await handler(req,context);
    } catch (error) {
      return errorHandeler(error);
    }
  };
}