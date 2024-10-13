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
            v: number;
            h: number;
        };
        MarginCenter: {
            v: number;
            h: number;
            vb: number;
        };
        strokeWidth: number;
        font: {
            center: number;
            conn: number;
        };
        color: {
            background: string;
            foreground: string;
        };
    };
};
export { element };
