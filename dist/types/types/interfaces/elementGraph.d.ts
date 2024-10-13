import * as Types from '../../types';
/**
 * Интерфейс для создания и управления графом элементов.
 * Обеспечивает методы для генерации графа, поиска элементов, получения информации о подключённых и неподключённых соединениях,
 * а также выполнения обхода графа различными способами.
 */
interface ElementGraph {
    /**
     * Граф элементов, представленный в виде массива узлов графа.
     * Каждый узел описывает элемент и его связи в графе.
     */
    tree: Types.elementGraph.node[];
    /**
     * Генерирует граф элементов начиная с указанного элемента.
     * @param pointElement - Начальный элемент для генерации графа.
     */
    genGraph(pointElement: Types.Interface.Element): void;
    /**
     * Находит элемент в графе.
     * Возвращает узел графа, связанный с указанным элементом, или `false`, если элемент не найден.
     * @param pointElement - Элемент, который нужно найти в графе.
     * @returns Узел графа или `false`, если элемент не найден.
     */
    findElement(pointElement: Types.Interface.Element): Types.elementGraph.node | false;
    /**
     * Находит все соединения, к которым подключен данный узел
     * @param node Данный узел
     * @returns Массив соединений
     */
    getConnectionsNode(node: Types.elementGraph.node): Types.Interface.Connection[];
    /**
     * Возвращает массив выходных соединений, которые ни к чему не подключены.
     * @returns Массив незадействованных выходных соединений.
     */
    getOutputs(): Types.Interface.Connection[];
    /**
     * Возвращает массив входных соединений, которые ни к чему не подключены.
     * @returns Массив незадействованных входных соединений.
     */
    getInputs(): Types.source.array;
    /**
     * Возвращает массив генераторов, которые присутствуют в графе.
     * Генераторы — это элементы, создающие сигнал (например, генераторы меандра).
     * @returns Массив элементов-генераторов.
     */
    getGenerators(): Types.Interface.Element[];
    /**
     * Возвращает все элементы графа, используя алгоритм обхода в глубину (DFS).
     * Элементы возвращаются в порядке обхода.
     * @returns Массив элементов, отсортированный по результатам обхода в глубину.
     */
    getAllElementsDFS(): Types.Interface.Element[];
    /**
     * Возвращает все элементы графа, используя алгоритм обхода в ширину (BFS).
     * Элементы возвращаются в порядке обхода.
     * @returns Массив элементов, отсортированный по результатам обхода в ширину.
     */
    getAllElementsBFS(): Types.Interface.Element[];
    /**
     * Возвращает все узлы графа, используя алгоритм обхода в глубину (DFS).
     * Узлы содержат элементы и их соединения.
     * @returns Массив узлов графа, отсортированный по результатам обхода в глубину.
     */
    getAllNodeDFS(): Types.elementGraph.node[];
    /**
     * Возвращает узлы графа с уникальными элементами, используя алгоритм обхода в ширину (BFS).
     * Алгоритм устроен так: если все элементы, к которым подключен текущий
     * анализируемый элемент уже есть в массиве, то элемент подключается.
     * Это позволяет избежать при симуляциях неизвестных значений и симулировать все элементы по порядку.
     * Узлы содержат элементы и их соединения.
     * @returns Массив узлов графа, отсортированный по результатам обхода в ширину.
     */
    getAllNodeBFS(): Types.elementGraph.node[];
    /**
     * Возвращает уникальные узлы графа, используя алгоритм обхода в глубину (DFS).
     * Уникальные узлы — это узлы, которые встречаются в графе только один раз.
     * @returns Массив уникальных узлов графа, отсортированных по результатам обхода в глубину.
     */
    getSetNodeDFS(): Types.elementGraph.node[];
    /**
     * Экспортирует граф для фронта
     * @returns Экспортированный граф
     */
    getDataElementGraph(): Types.server.elementGraph;
}
export { ElementGraph };
