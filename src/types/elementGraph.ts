import * as Types from '../types';
type node = {
    element: Types.Interface.Element;
    connection: Types.Interface.Connection[]; //TODO
    out: node[];
};
export {node};
