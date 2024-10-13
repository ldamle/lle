type element = {
    disp: 'ru_el_notation' | 'en_el_notation';
    en_el_notation?: string;
    display_name: boolean;
    adder_name_array: string[];
    preffix_name_in_connection: string;
    suffix_name_in_connection: string;
    preffix_name_out_connection: string;
    suffix_name_out_connection: string;
    display_in_connections: boolean;
    display_out_connections: boolean;
    display_line_in_connections: boolean;
    display_line_out_connections: boolean;
    rotate: '0' | '90' | '180' | '270';
    sizes: {
        MarginConn: {
            v: string;
            h: string;
        };
        MarginCenter: {
            v: string;
            h: string;
            vb: string;
        };
        strokeWidth: string;
        font: {
            center: string;
            conn: string;
        };
        color: {
            background: string;
            foregtound: string;
        };
    };
};
export { element };
