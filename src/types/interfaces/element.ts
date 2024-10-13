import * as Types from '../../types';

interface Element {
    // Соединения/названия сигналов входа
    in_connections?: (Types.Interface.Connection | string)[];

    // Соединения сигналов выхода
    out_connections: Types.Interface.Connection[];

    // Массив состояний сигнала

    state?: Types.signal.func;

    // Числовое значение частоты переключения элемента
    frequency?: number;

    // Имя элемента
    name?: string;

    // Стили элемента для отображения
    style: Types.style.element;

    /**
     * Устанавливает параметры элемента: входы, выходы и сигналы.
     */
    setParams?(inName: string[], outName: string[], signals: Types.signal.func): Element;

    /**
     * Объединение двух элементов
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
     * Подключает текущий элемент к другому
     * Выходы первого элемента последовательно соединяются со входами второго.
     * Если у первого элемента больше выходов, чем у второго входов, неиспользованные
     * выходы становятся выходами нового элемента. Если у второго элемента
     * больше входов, то неиспользованные входы становятся входами нового элемента.
     * @param elementOut Элемент, чьи выходы соединяются с входами текущего
     * @returns соединенный элемент
     */
    add?(elementOut: Element): Element;

    /**
     * Подключает вход с заданным именем к соединению
     * @param name Имя входа
     * @param connection Соединение с выходом другого (или того же) элемента
     * @returns Общее соединение
     */
    in?(name: string, connection: Types.Interface.Connection): Types.Interface.Connection | string;

    /**
     * Ищет вход с заданным именем
     * @param name Имя входа
     * @returns Соединение, если вход подключен, или имя входа, если не подключен
     */
    in?(name: string): Types.Interface.Connection | string;

    /**
     * Ищет вход с заданным именем и возвращает его индекс
     * @param name Имя входа
     * @returns Индекс в массиве in_connections
     */
    inIndex?(name: string): number;

    /**
     * Ищет выход с заданным именем
     * @param name Имя выхода
     * @returns Соединение
     */
    out(name: string): Types.Interface.Connection;

    /**
     * Преобразует упрощенную/полную/стандартную формы записи сигнала в функцию
     * Сигналы могут задаваться последовательно, например: {{0,0,0,0},{1,1,0,0}}
     * Или можно использовать механизм частичного задания: сначала вводится
     * один сигнал, затем остальные недостающие вводятся по порядку:
     * {{"E_n", 0, {0,0,0,0}}, {0,1,0,0}...}
     * Сигналы могут быть заданы последовательным перечислением или группами.
     * Особый случай: `"else"` — все необъявленные состояния принимают
     * указанный массив сигналов при `signal = "x"`, при `signal = 0|1|"z"`
     * все необъявленные состояния принимают `0|1|"z"` соответственно, независимо от массива.
     * Подробнее см. Типы: Сигналы [@link Types.Signal].
     * @param array Упрощенная/полная/стандартная форма записи
     * @returns Стандартная форма записи сигнала
     */
    genState?(array: Types.signal.detailStateArray): Types.signal.func;

    // Клонирует элемент вместе с подключениями
    clone(): Element;

    // Проверяет, подключены ли все входы
    isAllInConnected(): boolean;

     /**
      * Выдает массив входов в виде строки
      * @param name Имя входа.
      * @returns Индекс входа или -1, если не найдено.
      */
     inArray?(): string[];
}

export {Element};
