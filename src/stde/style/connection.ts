import * as Types from '../../types';
const Default: Types.style.connection = {
    class_name: 'Connection',
    label_out: '',
    label_in: '',
    stroke: 3,
    color: '#000'
};

function copy(it: Types.style.connection): Types.style.connection {
    return {...it};
}
export {Default, copy};
