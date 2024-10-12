import {Connection} from './interface';
type node = {
    element: Element;
    connection: Connection[]; //TODO
    out: node[];
};
export {node};
