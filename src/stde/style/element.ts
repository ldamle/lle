import * as Types from '../../types';
const Default: Types.style.element = {
    disp: 'ru_el_notation',
    display_name: true,
    adder_name_array: [],
    preffix_name_in_connection: '',
    suffix_name_in_connection: '',
    preffix_name_out_connection: '',
    suffix_name_out_connection: '',
    display_in_connections: true,
    display_out_connections: true,
    display_line_in_connections: true,
    display_line_out_connections: true,
    rotate: '0',
    sizes: {
        MarginConn: {
            v: '10pt',
            h: '10pt'
        },
        MarginCenter: {
            v: '10pt',
            h: '10pt',
            vb: '10pt'
        },
        strokeWidth: '10pt',
        font: {
            center: '10pt',
            conn: '10pt'
        },
        color: {
            background: '#',
            foregtound: '10pt'
        }
    }
};
const Generator: Types.style.element = {
    disp: 'ru_el_notation',
    display_name: false,
    adder_name_array: [],
    preffix_name_in_connection: '',
    suffix_name_in_connection: '',
    preffix_name_out_connection: '',
    suffix_name_out_connection: '',
    display_in_connections: false,
    display_out_connections: true,
    display_line_in_connections: false,
    display_line_out_connections: false,
    rotate: '0',
    sizes: {
        MarginConn: {
            v: '10pt',
            h: '10pt'
        },
        MarginCenter: {
            v: '10pt',
            h: '10pt',
            vb: '10pt'
        },
        strokeWidth: '10pt',
        font: {
            center: '10pt',
            conn: '10pt'
        },
        color: {
            background: '#',
            foregtound: '10pt'
        }
    }
};
export {Default, Generator};
