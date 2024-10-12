import * as Types from '../../types';

/**
 * Класс-шаблон, который предоставляет возможность другим классам 
 * создавать объект типа Interface.Connection
 */
class ConnectionFactory<ConnectionType extends Types.Interface.Connection> {
    private connectionClass: new (
        outSource: Types.source.it,
        arg2?: Types.source.it | Types.source.array
    ) => ConnectionType;

    /**
     * Конструктор фабрики, принимает класс, который необходимо создать
     * @param connectionClass класс который необходимо создать
     */
    constructor(
        connectionClass: new (
            outSource: Types.source.it,
            arg2?: Types.source.it | Types.source.array
        ) => ConnectionType
    ) {
        this.connectionClass = connectionClass;
    }

    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     */
    create(outSource: Types.source.it): ConnectionType;
    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     */
    create(outSource: Types.source.it, inSource: Types.source.it): ConnectionType;
    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     */
    create(outSource: Types.source.it, inSourceArray: Types.source.array): ConnectionType;

    /**
     * Перегрузка метода создания Сonnection подробнее см. {@link Connection}
     * @param outSource
     * @param arg2
     * @returns элемент Connection
     */
    create(outSource: Types.source.it, arg2?: Types.source.it | Types.source.array): ConnectionType {
        if (arg2) {
            return new this.connectionClass(outSource, arg2);
        }
        return new this.connectionClass(outSource);
    }
}

export {ConnectionFactory}