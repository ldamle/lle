import * as Types from '../types';
import * as stde from '../stde/stde';
import {Factories} from '../factories';

/**
 * Класс Element представляет элемент схемы с входными и выходными соединениями.
 * Он используется для моделирования сигналов и управления связями между элементами.
 */
class Element implements Types.Interface.Element {
    /**
     * Имя элемента
     */
    name: string;

    /**
     * Входные соединения (могут быть строками или объектами Connection)
     */
    in_connections: (Types.Interface.Connection | string)[];

    /**
     * Выходные соединения
     */
    out_connections: Types.Interface.Connection[];

    /**
     * Текущее состояние сигнала на выходах
     */
    state: Types.signal.func;

    /**
     * Стили элемента для отображения
     */
    style: Types.style.element;

    /**
     * Настройки для элемента, используются при моделировании и отображении
     */
    props: Types.props;

    /**
     * Конструктор класса Element.
     * Создает пустой элемент без входов, выходов, состояний и названия.
     */
    constructor();
    /**
     * Конструктор класса Element.
     * Создает пустой элемент с именем без входов, выходов, состояний
     * @param name Название элемента
     */
    constructor(name: string);
    /**
     * Конструктор класса Element.
     * Создает элемент без названия с входами, выходами и состояниями
     * @param inName Массив имен входов элемента
     * @param outName Массив имен выходов элемента
     * @param signals Сигналы на выходе элемента при входных сигналах (подробнее {@link Types.signal.detailStateArray})
     */
    constructor(inName: string[], outName: string[], signals: Types.signal.detailStateArray);
    /**
     * Конструктор класса Element.
     * Создает элемент с названием с входами, выходами и состояниями
     * @param name Название элемента
     * @param inName Массив имен входов элемента
     * @param outName Массив имен выходов элемента
     * @param signals Сигналы на выходе элемента при входных сигналах (подробнее {@link Types.signal.detailStateArray})
     */
    constructor(
        name: string,
        inName: string[],
        outName: string[],
        signals: Types.signal.detailStateArray
    );
    /**
     * Конструктор класса Element.
     * Создает элемент без названия с входами, выходами и функцией состояний
     * @param inName Массив имен входов элемента
     * @param outName Массив имен выходов элемента
     * @param signals Функция, задающая выходные сигналы на основе входных
     */
    constructor(inName: string[], outName: string[], signals: Types.signal.func);
    /**
     * Конструктор класса Element.
     * Создает элемент с названием с входами, выходами и функцией состояний
     * @param name Название элемента
     * @param inName Массив имен входов элемента
     * @param outName Массив имен выходов элемента
     * @param signals Функция, задающая выходные сигналы на основе входных
     */
    constructor(name: string, inName: string[], outName: string[], signals: Types.signal.func);
    /**
     * Конструктор класса Element.
     * Создает элемент без названия через клонирование
     * и соединение двух переданных (подробнее {@link Element.concat})
     * @param elementOut Первый элемент, чьи выходы соединяться со входами второго
     * @param elementIn Второй элемент
     */
    constructor(elementOut: Element, elementIn: Element);
    /**
     * Конструктор класса Element.
     * Создает элемент c названием через клонирование
     * и соединение двух переданных (подробнее {@link Element.concat})
     * @param name Название элемента
     * @param elementOut Первый элемент, чьи выходы соединяться со входами второго
     * @param elementIn Второй элемент
     */
    constructor(name: string, elementOut: Element, elementIn: Element);
    /**
     * Конструктор класса Element. (см. перегрузки)
     * @param arg1 Может быть строкой (имя), массивом строк (входные имена), либо экземпляром Element (элемент для соединения).
     * @param arg2 Может быть массивом строк (выходные имена) или элементом Element (элемент для соединения).
     * @param arg3 Массив сигналов или экземпляр Element.
     * @param signals Массив сигналов для состояния.
     */
    constructor(
        arg1?: string | string[] | Element,
        arg2?: string[] | Element,
        arg3?: Types.signal.detailStateArray | Element | string[] | Types.signal.func,
        signals?: Types.signal.detailStateArray | Types.signal.func
    ) {
        this.props = {}
        this.in_connections = [];
        this.out_connections = [];
        this.state = () => '';
        this.name = '';
        this.style = stde.style.element.copy(stde.style.element.Default)
        if (typeof arg1 === 'string') {
            this.name = arg1;
            if (arg2 instanceof Element && arg3 instanceof Element) {
                this.concat(arg2, arg3);
            }
            if (arg2 instanceof Array && arg3 instanceof Array && signals instanceof Array) {
                this.setParams(
                    arg2,
                    arg3 as string[],
                    stde.signal.getFunc(
                        signals,
                        this.in_connections.length,
                        this.out_connections.length,
                        this.inArray()
                    )
                );
            }
            if (arg2 instanceof Array && arg3 instanceof Array && typeof signals === 'function') {
                this.setParams(arg2, arg3 as string[], signals);
            }
        } else {
            if (arg1 instanceof Element && arg2 instanceof Element) {
                this.concat(arg1, arg2);
            }
            if (arg1 instanceof Array && arg2 instanceof Array && arg3 instanceof Array) {
                this.setParams(
                    arg1,
                    arg2,
                    stde.signal.getFunc(
                        arg3,
                        this.in_connections.length,
                        this.out_connections.length,
                        this.inArray()
                    )
                );
            }
            if (arg2 instanceof Array && arg3 instanceof Array && typeof signals === 'function') {
                this.setParams(arg2, arg3 as string[], signals);
            }
        }
    }

    /**
     * Устанавливает параметры элемента.
     * @param inName Массив входных имен.
     * @param outName Массив выходных имен.
     * @param signals Массив сигналов для состояния.
     * @returns Экземпляр текущего элемента.
     */
    setParams(inName: string[], outName: string[], signals: Types.signal.func): Element {
        for (let i = 0; i < outName.length; i++) {
            this.out_connections.push(
                Factories.Connection.create({
                    name: outName[i],
                    element: this,
                    no_source: i,
                    is_out: true
                })
            );
        }
        this.in_connections = inName;
        this.state = signals;
        return this;
    }

    /**
     * Клонирует два элемента и соединяет выходы нового первого элемента с входами другого.
     *
     * Если у первого элемента больше выходов, чем у второго входов, то
     * неиспользованные выходы становятся выходами нового элемента.
     *
     * Если у второго элемента больше входов, чем выходов у первого, неиспользованные
     * входы становятся входами нового элемента.
     *
     * @param elementOut Элемент, выходы которого соединяются.
     * @param elementIn Элемент, входы которого принимают соединение.
     * @returns Экземпляр текущего элемента после соединения.
     * TODO сделать no_source
     */
    concat(elementOut: Element, elementIn: Element): Types.Interface.Element {
        const elementOutn = elementOut.clone();
        const elementInn = elementIn.clone();
        if (elementOutn.out_connections.length < elementInn.in_connections.length) {
            for (let i = 0; i < elementOutn.out_connections.length; i++) {
                elementInn.in(
                    elementInn.in_connections[i] as string,
                    elementOutn.out_connections[i]
                );
            }
            for (let i = 0; i < elementOutn.in_connections.length; i++) {
                this.in_connections.push(elementOutn.in_connections[i] as string);
            }
            for (
                let i = elementOutn.out_connections.length;
                i < elementInn.in_connections.length;
                i++
            ) {
                this.in_connections.push(elementInn.in_connections[i] as string);
            }
            for (let i = 0; i < elementInn.out_connections.length; i++) {
                this.out_connections.push(elementInn.out_connections[i]);
            }
        } else {
            for (let i = 0; i < elementInn.in_connections.length; i++) {
                elementInn.in(
                    elementInn.in_connections[i] as string,
                    elementOutn.out_connections[i]
                );
            }
            for (let i = 0; i < elementInn.out_connections.length; i++) {
                this.out_connections.push(elementInn.out_connections[i]);
            }
            for (
                let i = elementInn.in_connections.length;
                i < elementOutn.out_connections.length;
                i++
            ) {
                this.out_connections.push(elementOutn.out_connections[i]);
            }
            for (let i = 0; i < elementOutn.in_connections.length; i++) {
                this.in_connections.push(elementOutn.in_connections[i]);
            }
        }
        for (let i = 0; i < this.out_connections.length; i++) {
            this.out_connections[i] = this.out_connections[i].clone(this);
        }

        // далее для state тут надо просимулировать
        return this;
    }

    /**
     * Подключает текущий элемент к другому
     * Выходы первого элемента последовательно соединяются со входами второго.
     * Если у первого элемента больше выходов, чем у второго входов, неиспользованные
     * выходы становятся выходами нового элемента. Если у второго элемента
     * больше входов, то неиспользованные входы становятся входами нового элемента.
     * @param elementOut Элемент, чьи выходы соединяются с входами текущего
     * @returns соединенный элемент
     */
    add(elementOut: Element): Element {
        if (this.in_connections.length < elementOut.out_connections.length) {
            const len = this.in_connections.length;
            for (let i = 0; i < len; i++) {
                this.in(this.in_connections[i] as string, elementOut.out_connections[i]);
            }
        } else {
            for (let i = 0; i < elementOut.out_connections.length; i++) {
                this.in(this.in_connections[i] as string, elementOut.out_connections[i]);
            }
        }
        return this;
    }

    /**
     * Соедиеняет текущий вход name с соединением connection
     * @param name Название входа
     * @param connection Соединение с которым вход соединяется
     */
    in(name: string, connection: Types.Interface.Connection): Types.Interface.Connection | string;
    /**
     * Выдает текущее соединение входа (если оно есть) или просто название входа
     * @param name Название входа
     */
    in(name: string): Types.Interface.Connection | string;
    /**
     * Добавляет в соединение/просто возвращяет уже добавленное
     * входное соединение элемента. (см. перегрузки)
     * @param name Имя входа.
     * @param connection Объект соединения (необязательный параметр).
     * @returns Объект соединения или строку имени.
     */
    in(name: string, connection?: Types.Interface.Connection): Types.Interface.Connection | string {
        if (connection) {
            let iOut = -1;
            for (let i = 0; i < this.in_connections.length; i++) {
                console.log(this.in_connections, name)
                if (this.in_connections[i] === name) {
                    this.in_connections[i] = connection;
                    iOut = i;
                    break;
                }
            }
            connection.inConnect({
                name: name,
                element: this,
                no_source: iOut,
                is_out: false
            });
            return connection;
        }
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                if (this.in_connections[i] === name) {
                    return this.in_connections[i];
                }
            } else if (
                (this.in_connections[i] as Types.Interface.Connection).findInString(this) === name
            ) {
                return this.in_connections[i];
            }
        }
        return '';
    }

    /**
     * Находит индекс входа по его имени.
     * @param name Имя входа.
     * @returns Индекс входа или -1, если не найдено.
     */
    inIndex(name: string): number {
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                if (this.in_connections[i] === name) {
                    return i;
                }
            } else if (
                (this.in_connections[i] as Types.Interface.Connection).findInString(this) === name
            ) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Выдает массив входов в виде строки
     * @returns Массив входов
     */
    inArray(): string[] {
        const arr: string[] = [];
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                arr.push(this.in_connections[i] as string);
            } else {
                arr.push((this.in_connections[i] as Types.Interface.Connection).findInString(this));
            }
        }
        return arr;
    }

    /**
     * Возвращает выходное соединение по имени.
     * @param name Имя выхода.
     * @returns Объект соединения.
     */
    out(name: string): Types.Interface.Connection {
        for (let i = 0; i < this.out_connections.length; i++) {
            if (this.out_connections[i].out.name === name) {
                return this.out_connections[i];
            }
        }
        return {} as Types.Interface.Connection;
    }

    /**
     * Клонирует текущий элемент.
     * Вместе с элементом клонируются его выходные соединения.
     * Входы отсоединяются.
     *
     * @returns Новый экземпляр элемента с теми же параметрами.
     */
    clone(): Element {
        const newElement = new Element();
        for (let i = 0; i < this.out_connections.length; i++) {
            newElement.out_connections.push(this.out_connections[i].clone(newElement));
        }
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                newElement.in_connections.push(this.in_connections[i]);
            } else {
                newElement.in_connections.push(
                    (this.in_connections[i] as Types.Interface.Connection).findInString(this)
                );
            }
        }
        newElement.state = this.state;
        return newElement;
    }

    /**
     * Проверяет, все ли входы элемента подключены.
     * @returns true, если все входы подключены, иначе false.
     */
    isAllInConnected(): boolean {
        for (let i = 0; i < this.in_connections.length; i++) {
            if (typeof this.in_connections[i] === 'string') {
                return false;
            }
        }
        return true;
    }
}

/**
 * Класс Generator представляет активный элемент цепи,
 * который генерирует сигнал (чередующийся меандр 0 и 1) с заданной частотой.
 * У генератора нет входных соединений, но есть одно выходное,
 * через которое передаётся сигнал.
 */
class Generator implements Types.Interface.Element {

    /**
     * Массив выходных соединений элемента.
     * В данном случае у генератора есть только одно выходное соединение.
     */
    out_connections: Types.Interface.Connection[];

    /**
     * Частота генератора, определяющая, с какой скоростью
     * будет происходить переключение сигнала (меандра).
     */
    frequency: number;

    /**
     * Стили элемента для отображения
     */
    style: Types.style.element;

    /**
     * Настройки для элемента, используются при моделировании и отображении
     */
    props: Types.props;

    /**
     * Конструктор для создания генератора с указанной частотой.
     * @param frequency - Частота переключения сигнала (число).
     */
    constructor(frequency: number);

    /**
     * Конструктор для создания генератора с заданным именем выхода и частотой.
     * @param name - Имя выходного соединения.
     * @param frequency - Частота переключения сигнала.
     */
    constructor(name: string, frequency: number);

    /**
     * Основной конструктор, принимающий либо частоту, либо имя и частоту.
     * Если передано имя (строка), оно присваивается выходному соединению, и задаётся частота.
     * Если имя не передано, создаётся выходное соединение с пустым именем.
     *
     * @param arg1 - Имя (строка) выходного соединения или частота (число).
     * @param frequency - Частота переключения сигнала, если передано имя.
     */
    constructor(arg1: number | string, frequency?: number) {
        this.props = {}
        this.style = stde.style.element.copy(stde.style.element.Generator);
        if (typeof arg1 === 'string' && frequency) {
            this.frequency = frequency;
            this.out_connections = [
                Factories.Connection.create({
                    name: arg1,
                    element: this,
                    no_source: 0,
                    is_out: true
                })
            ];
        } else {
            this.frequency = arg1 as number;
            this.out_connections = [
                Factories.Connection.create({
                    name: '',
                    element: this,
                    no_source: 0,
                    is_out: true
                })
            ];
        }
    }

    /**
     * Метод для получения выходного соединения.
     * Если передано имя, обновляет имя выхода, если оно отличается от текущего.
     *
     * @param name - Имя для выходного соединения (необязательно).
     * @returns Возвращает выходное соединение.
     */
    out(name?: string): Types.Interface.Connection {
        if (name) {
            if (name !== this.out_connections[0].out.name) {
                this.out_connections[0].out.name = name;
            }
        }
        return this.out_connections[0];
    }

    /**
     * Метод для клонирования текущего генератора.
     * Клонирует частоту и имя выходного соединения.
     *
     * @returns Новый объект Generator с теми же параметрами.
     */
    clone(): Generator {
        const ne = new Generator(this.frequency);
        ne.out(this.out().out.name);
        return ne;
    }

    /**
     * Проверяет, подключено ли выходное соединение.
     * Если выходное соединение не подключено (значение `in` равно `false`),
     * возвращает `false`.
     *
     * @returns `true`, если выход подключён, иначе `false`.
     */
    isAllInConnected(): boolean {
        if (this.out_connections[0].in === false) {
            return false;
        } else {
            return true;
        }
    }
}

export {Element, Generator};
