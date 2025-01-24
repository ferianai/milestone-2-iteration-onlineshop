import { setupServer } from "msw/node";
import { handlers, productHandlers, categoryHandlers} from "./handlers";

export const server = setupServer(
    ...handlers, 
    ...productHandlers, 
    ...categoryHandlers
);