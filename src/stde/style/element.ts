import * as Types from '../../types';
const Default: Types.style.element = {
    class_name: 'Element', 
    disp: 'ru_el_notation',
    display_name: true,
    adder_name_array: [],
    preffix_name_in_connection: '$',
    suffix_name_in_connection: '',
    preffix_name_out_connection: '$',
    suffix_name_out_connection: '',
    display_in_connections: true,
    display_out_connections: true,
    display_line_in_connections: true,
    display_line_out_connections: true,
    xcIndent: 10,
    minIndent: 20,
    rotate: '0',
    sizes: {
        MarginConn: {
            v: 30,
            h: 12
        },
        MarginCenter: {
            v: 15,
            h: 40,
            vb: 10
        },
        strokeWidth: 3,
        font: {
            center: 35,
            conn: 28
        },
        color: {
            background: '#ffffff',
            foreground: '#000000'
        }
    }
};
const Generator: Types.style.element = {
    class_name: 'Element', 
    disp: 'ru_el_notation',
    display_name: true,
    adder_name_array: [
        '%<svg width="100" height="40" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg"><path d="M0 50L60 50L60 20" stroke="black" stroke-width="3" fill="none"/><path d="M60 20L140 20" stroke="black" stroke-width="3" fill="none"/><path d="M140 20L140 50L200 50" stroke="black" stroke-width="3" fill="none"/></svg>'
    ],
    preffix_name_in_connection: '$',
    suffix_name_in_connection: '',
    preffix_name_out_connection: '$',
    suffix_name_out_connection: '',
    display_in_connections: false,
    display_out_connections: true,
    display_line_in_connections: false,
    display_line_out_connections: false,
    rotate: '0',
    xcIndent: 10,
    minIndent: 20,
    sizes: {
        MarginConn: {
            v: 20,
            h: 0
        },
        MarginCenter: {
            v: 17,
            h: 10,
            vb: 10
        },
        strokeWidth: 3,
        font: {
            center: 35,
            conn: 28
        },
        color: {
            background: '#ffffff',
            foreground: '#000000'
        }
    }
};

function copy(it: Types.style.element): Types.style.element {
    return {
        ...it,
        sizes: {
            ...it.sizes,
            MarginConn: {
                ...it.sizes.MarginConn
            },
            MarginCenter: {
                ...it.sizes.MarginCenter
            },
            font: {
                ...it.sizes.font
            },
            color: {
                ...it.sizes.color
            }
        }
    };
}
export {Default, Generator, copy};
