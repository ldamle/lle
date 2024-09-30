import * as Types from './types';
interface Scene {
    width: number;
    height: number;
}
interface Element {
    /**
     * * Устанавливает параметры элемента: входы, выходы и сигналы.
     * Сигналы могут задаваться последовательно, например: {{0,0,0,0},{1,1,0,0}}
     * Или можно использовать механизм частичного задания: сначала вводится
     * один сигнал, затем остальные недостающие вводятся по порядку:
     * {{"E_n", 0, {0,0,0,0}}, {0,1,0,0}...}
     * @param inName Имена входов
     * @param outName Имена выходов
     * @param signals Массив сигналов
     * Сигналы могут быть заданы последовательным перечислением или группами.
     * Особый случай: `"else"` — все необъявленные состояния принимают
     * указанный массив сигналов при `signal = "x"`, при `signal = 0|1|"z"`
     * все необъявленные состояния принимают `0|1|"z"` соответственно, независимо от массива.
     * Подробнее см. Типы: Сигналы.
     */
    setParams?(inName: string[], outName: string[], signals: Types.DSSSArray): Element;
    /**
     * * Объединение двух элементов
     * Выходы первого элемента последовательно соединяются со входами второго.
     * Если у первого элемента больше выходов, чем у второго входов, то
     * неиспользованные выходы становятся выходами нового элемента.
     * Если у второго элемента больше входов, чем выходов у первого, неиспользованные
     * входы становятся входами нового элемента.
     * @param elementOut Элемент, чьи выходы будут соединены с входами
     * @param elementIn Элемент, чьи входы будут соединены с выходами
     */
    concat?(elementOut: Element, elementIn: Element): Element;
    /**
     * * Подключает текущий элемент к другому
     * Выходы первого элемента последовательно соединяются со входами второго.
     * Если у первого элемента больше выходов, чем у второго входов, неиспользованные
     * выходы становятся выходами нового элемента. Если у второго элемента
     * больше входов, то неиспользованные входы становятся входами нового элемента.
     * @param elementOut Элемент, чьи выходы соединяются с входами текущего
     * @returns соединенный элемент
     */
    add?(elementOut: Element): Element;
    /**
     * * Подключает вход с заданным именем к соединению
     * @param name Имя входа, который нужно подключить
     * @param connection Соединение с выходом другого (или того же) элемента
     * @returns Общее соединение
     */
    in?(name: string, connection: Connection): (Connection | string);
    /**
     * * Ищет вход с заданным именем
     * @param name Имя входа
     * @returns Соединение, если вход подключен, или имя входа, если не подключен
     */
    in?(name: string): (Connection | string);
    /**
     * * Ищет вход с заданным именем и возвращает его индекс
     * @param name Имя входа
     * @returns Индекс в массиве in_connections
     */
    inIndex?(name: string): number;
    /**
     * * Ищет выход с заданным именем
     * @param name Имя выхода
     * @returns Соединение
     */
    out(name: string): Connection;
    /**
     * * Преобразует упрощенную/полную форму записи сигнала в стандартную
     * @param array Упрощенная/полная/стандартная форма записи
     * @returns Стандартная форма записи сигнала
     */
    genState?(array: Types.DSSSArray): Types.SignalArray[];
    /**
     * * Клонирует элемент вместе с подключениями
     * @returns Новый элемент -- копия текущего
     */
    clone(): Element;
    /**
     * * Проверяет, подключены ли все входы
     * @returns True, если все входы подключены
     */
    isAllInConnected(): boolean;
    /**
     * * Проверяет, находится ли хотя бы один сигнал в неопределенном состоянии
     * @returns True, если ни один сигнал не находится в неопределенном состоянии
     */
    isAllSignalNotZ?(): boolean;
    /**
     * * Проверяет готовность элемента к симуляции
     * @returns True, если элемент готов к симуляции
     */
    isReady(): boolean;
    /**
     * * Соединения/названия сигналов входа
     */
    in_connections?: (Connection | string)[];
    /**
     * * Соединения сигналов выхода
     */
    out_connections: Connection[];
    /**
     * * Массив состояний сигнала
     */
    state?: Types.SignalArray[];
    /**
     * * Имя элемента
     */
    name?: string;
}
interface Connection {
    /**
     * * Подключает соединение ко входу
     * @param inSource Вход соединения
     * @returns Соединение
     */
    inConnect(inSource: Types.Sources): Connection;
    /**
     * * Отключает соединение от входа
     * @param inSource Вход соединения
     * @returns Соединение
     */
    disConnect(inSource: Types.Sources): Connection;
    /**
     * * Подключает соединение ко множеству входов
     * @param inSourceArray Массив входов соединения
     * @returns Соединение
     */
    inConnects(inSourceArray: Types.SourcesArray): Connection;
    /**
     * * Отключает соединение от множественных входов
     * @param inSourceArray Массив входов соединения
     * @returns Соединение
     */
    disConnects(inSourceArray: Types.SourcesArray): Connection;
    /**
     * * Возвращает количество подключенных входов
     * @returns Количество подключенных входов
     */
    lenInConnected(): number;
    /**
     * * Клонирует текущее соединение с новыми элементами
     * @param element Элемент, к которому будет подключено новое соединение
     * @returns Новое соединение с клонированными входами
     */
    clone(element: Element): Connection;
    /**
     * * Возвращает массив входов в виде строковых значений
     * @returns Массив строк, представляющих входы
     */
    getArrayInString(): string[];
    /**
     * * Находит строковое представление входа по элементу
     * @param element Элемент, для которого нужно найти подключенный вход
     * @returns Название входа
     */
    findInString(element: Element): string;
    /**
     * * Проверяет, подключено ли соединение хотя бы к одному входу
     * @returns True, если хотя бы один вход подключен
     */
    isConnected(): boolean;
    /**
     * * Массив подключенных входов или false, если входы отсутствуют
     */
    in: (Types.SourcesArray | false);
    /**
     * * Выход соединения (только для чтения)
     */
    readonly out: Types.Sources;
}
interface Model {
    /**
     * * Массив генераторов для моделирования
     */
    generators: Element[];
    /**
     * * Массив всех элементов, учавствующих в моделировании
     */
    elements_array: Element[];
    /**
     * * Объект времени, содержащий текущее время, частоту, начало/конец моделирования и конец паттерна
     */
    time: {
        now: number;
        freq: number;
        begin: number;
        end: number;
        pattern_end: number;
    };
    /**
     * * Таблица-результат моделирования, содержащий информацию о времени, генераторах и элементах
     */
    model_table: {
        t: number;
        generators: Types.SignalArray;
        elements: Types.SignalArray[];
    }[];
    /**
     * * Автоматически устанавливает частоту моделирования по частотам генераторов
     */
    autoFreq(): void;
    /**
     * * Автоматически устанавливает конец паттерна (наверное с триггерами плохо будет работать)
     */
    autoPatternEnd(): void;
    /**
     * * Переходит к следующему такту, записывая поведение всех элементов текущего
     */
    modelNext(): void;
    /**
     * * Моделируем весь паттерн до конца
     */
    modelPattern(): void;
    /**
     * * Моделируем все до конца
     */
    modelAll(): void;
    /**
     * * Удаляет текущий такт и его состояние модели. Может быть полезно при изменении входов-выходов.
     */
    deleteNowModel(): void;
    /**
     * * Удаляет все моделирование
     */
    deleteModel(): void;
    /**
     * * Удаляет и еще раз выполняет текущий такт
     */
    remodelNow(): void;
    /**
     * * Удаляет все отмоделированное и еще раз выполняет
     */
    remodelAll(): void;
    /**
     * * Находит выход по соединению
     * @param out Соединение
     * @returns Массив сигналов для данного соединения
     */
    findOutput(out: Connection): Types.SignalArray;
    /**
     * * Находит выход по соединению с указанием времени
     * @param out Соединение
     * @returns Массив объектов, содержащих время и сигнал
     */
    findOutputT(out: Connection): {
        t: number;
        signal: Types.Signal;
    }[];
    /**
     * * Находит все выходы по соединению
     * @param out Соединение
     * @returns Массив массивов сигналов для данного соединения
     */
    findOutputs(out: Connection): Types.SignalArray[];
    /**
     * * Находит все выходы по соединению с указанием времени
     * @param out Соединение
     * @returns Массив объектов, содержащих время и массив сигналов
     */
    findOutputsT(out: Connection): {
        t: number;
        signals: Types.Signal[];
    }[];
}
/**
 * Интерфейс для создания и управления графом элементов.
 * Обеспечивает методы для генерации графа, поиска элементов, получения информации о подключённых и неподключённых соединениях,
 * а также выполнения обхода графа различными способами.
 */
interface ElementGraph {
    /**
     * * Граф элементов, представленный в виде массива узлов графа.
     * Каждый узел описывает элемент и его связи в графе.
     */
    tree: Types.ElementGraphNode[];
    /**
     * * Генерирует граф элементов начиная с указанного элемента.
     * @param pointElement - Начальный элемент для генерации графа.
     */
    genGraph(pointElement: Element): void;
    /**
     * * Находит элемент в графе.
     * Возвращает узел графа, связанный с указанным элементом, или `false`, если элемент не найден.
     * @param pointElement - Элемент, который нужно найти в графе.
     * @returns Узел графа или `false`, если элемент не найден.
     */
    findElement(pointElement: Element): (Types.ElementGraphNode | false);
    /**
     * * Возвращает массив выходных соединений, которые ни к чему не подключены.
     * Это может быть полезно для анализа недостающих связей в графе.
     * @returns Массив незадействованных выходных соединений.
     */
    getOutputs(): Connection[];
    /**
     * * Возвращает массив входных соединений, которые ни к чему не подключены.
     * Это может помочь в поиске недостающих входных соединений в графе.
     * @returns Массив незадействованных входных соединений.
     */
    getInputs(): Connection[];
    /**
     * * Возвращает массив генераторов, которые присутствуют в графе.
     * Генераторы — это элементы, создающие сигнал (например, генераторы меандра).
     * @returns Массив элементов-генераторов.
     */
    getGenerators(): Element[];
    /**
     * * Возвращает все элементы графа, используя алгоритм обхода в глубину (DFS).
     * Элементы возвращаются в порядке обхода.
     * @returns Массив элементов, отсортированный по результатам обхода в глубину.
     */
    getAllElementsDFS(): Element[];
    /**
     * * Возвращает все элементы графа, используя алгоритм обхода в ширину (BFS).
     * Элементы возвращаются в порядке обхода.
     * @returns Массив элементов, отсортированный по результатам обхода в ширину.
     */
    getAllElementsBFS(): Element[];
    /**
     * * Возвращает все узлы графа, используя алгоритм обхода в глубину (DFS).
     * Узлы содержат элементы и их соединения.
     * @returns Массив узлов графа, отсортированный по результатам обхода в глубину.
     */
    getAllNodeDFS(): Types.ElementGraphNode[];
    /**
     * * Возвращает узлы графа с уникальными элементами, используя алгоритм обхода в ширину (BFS).
     * Алгоритм устроен не совсем так как у обычного дерева: если все элементы,
     * к которым подключен текущий анализируемый элемент уже есть в массиве то
     * элемент подключается. Это позволяет избежать при симуляциях неизвестных значений
     * и симулировать все элементы по порядку.
     * Узлы содержат элементы и их соединения.
     * @returns Массив узлов графа, отсортированный по результатам обхода в ширину.
     */
    getAllNodeBFS(): Types.ElementGraphNode[];
    /**
     * * Возвращает уникальные узлы графа, используя алгоритм обхода в глубину (DFS).
     * Уникальные узлы — это узлы, которые встречаются в графе только один раз.
     * @returns Массив уникальных узлов графа, отсортированных по результатам обхода в глубину.
     */
    getSetNodeDFS(): Types.ElementGraphNode[];
}
export { Scene, Model, Element, Connection, ElementGraph };
//# sourceMappingURL=interface.d.ts.map