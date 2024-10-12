// Массив элементов для передачи их на фронт (для отрисовки)
type exportElements = {
    name: string;
    id: number;
    connections_in: {
        conn_name: string;
        id: number;
    }[];
    connections_out: {
        conn_name: string;
        id: number[];
    }[];
}[];


// Граф элементов для передачи на фронт для отрисовки
type exportElementGraph = {
    id: number;
    out: exportElementGraph;
}[];


// Граф и массив элементов для передачи на фронт для отрисовки
type elementGraph = {
    elements: exportElements;
    elementGraph: exportElementGraph;
};

// Тема siblime text
type themeSCS = {
    globals: {
        accent: string;
        background: string;
        foreground: string;
        [key: string]: string;
    };
    rules: {
        name: string;
        scope: string;
        foreground: string;
        [key: string]: string;
    }[];
};

export {
    exportElements,
    exportElementGraph,
    elementGraph,
    themeSCS
}