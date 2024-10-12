import * as Types from '../../types';

function getFuncElement(
    array: Types.signal.detailStateArray,
    elem: Types.Interface.Element
): Types.signal.func {
    return getFunc(
        array,
        elem.in_connections ? elem.in_connections.length : 0,
        elem.out_connections.length,
        elem.inArray ? elem.inArray() : ['']
    );
}

/**
 * Генерирует состояние на выходах элемента.
 * Про состояния подробнее см. {@link Types.signal.detailStateArray}
 * @param array Массив сигналов.
 * @returns Обновленный массив состояний.
 */
function getFunc(
    array: Types.signal.detailStateArray,
    inLen: number,
    outLen: number,
    inNameArr?: string[]
): Types.signal.func {
    let gState: Types.signal.array[] = new Array(2 ** inLen).fill('z'.repeat(outLen));
    for (let i = 0; i < array.length; i++) {
        if (
            typeof array[i] === 'object' &&
            'in' in (array[i] as object) &&
            'out' in (array[i] as object)
        ) {
            genStateDetailSignal(array[i] as Types.signal.detail, gState);
        } else if (
            typeof array[i] === 'object' &&
            'name' in (array[i] as object) &&
            'state' in (array[i] as object) &&
            'out' in (array[i] as object) &&
            inNameArr instanceof Array
        ) {
            genStateSignal(array[i] as Types.signal.state, gState, inNameArr, outLen);
        } else {
            genSignal(array[i] as Types.signal.array, gState, outLen);
        }
    }
    return (a: Types.signal.array): Types.signal.array => {
        let int = gState[parseInt(a, 2)];
        if (int) {
            return int;
        } else if (gState.length > 0) {
            return 'z'.repeat(gState[0].length);
        } else {
            return '';
        }
    };
}

/**
 * Дополнительная функция для getFunc
 * @param state
 */
function genSignal(state: Types.signal.array, gState: Types.signal.array[], outLen: number): void {
    const eqArray: Types.signal.array = 'z'.repeat(outLen);
    for (let i = 0; i < gState.length; i++) {
        if (JSON.stringify(gState[i]) === JSON.stringify(eqArray)) {
            gState[i] = state as Types.signal.array;
            break;
        }
    }
}

/**
 * Дополнительная функция для getFunc
 * @param state
 */
function genStateDetailSignal(state: Types.signal.detail, gState: Types.signal.array[]): void {
    if (Array.isArray(state.in)) {
        state.in = state.in.join('');
    }
    const ie = getSignalGenerateVariations(state.in);
    for (let i = 0; i < ie.length; i++) {
        gState[parseInt(ie[i], 2)] = state.out as Types.signal.array;
    }
}

/**
 * Дополнительная функция для getFunc
 * @param s
 * @returns
 */
function getSignalGenerateVariations(s: string): string[] {
    if (!s.includes('x')) {
        return [s]; // Если нет 'x', возвращаем строку как есть
    }
    const variations: string[] = [];
    const firstXIndex = s.indexOf('x');
    variations.push(
        ...getSignalGenerateVariations(s.slice(0, firstXIndex) + '0' + s.slice(firstXIndex + 1))
    );
    variations.push(
        ...getSignalGenerateVariations(s.slice(0, firstXIndex) + '1' + s.slice(firstXIndex + 1))
    );
    return variations;
}

/**
 * Дополнительная функция для getFunc
 * @param state
 * @param arri
 */
function genStateSignal(
    state: Types.signal.state,
    gState: Types.signal.array[],
    inNameArr: string[],
    outLen: number,
    arri?: [number, Types.signal.it][]
): void {
    if (state.name === 'else') {
        const eqArray: Types.signal.array = 'z'.repeat(outLen);
        for (let i = 0; i < gState.length; i++) {
            if (JSON.stringify(gState[i]) === JSON.stringify(eqArray)) {
                gState[i] = state.out as Types.signal.array;
            }
        }
        return;
    }
    if (
        typeof state.out === 'object' &&
        'name' in (state.out as object) &&
        'state' in (state.out as object) &&
        'out' in (state.out as object)
    ) {
        if (arri) {
            arri.push([inNameArr.indexOf(state.name), state.state]);
            genStateSignal(state.out, gState, inNameArr, outLen, arri);
        } else {
            genStateSignal(state.out as Types.signal.state, gState, inNameArr, outLen, [
                [inNameArr.indexOf(state.name), state.state]
            ]);
        }
        return;
    }
    let ie: Types.signal.array = 'x'.repeat(inNameArr.length);

    if (arri) {
        for (let i = 0; i < arri.length; i++) {
            ie = Types.signal.__replByIndex(ie, arri[i][1], arri[i][0]);
        }
    }
    ie = Types.signal.__replByIndex(ie, state.state, inNameArr.indexOf(state.name));
    genStateDetailSignal({in: ie, out: state.out as Types.signal.array}, gState);
}

export {getFunc, getFuncElement};
