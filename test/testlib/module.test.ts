import {Element} from 'ldamle.lle/src/lle';

test('should correctly import module ldamle', () => {
    const element = new Element();
    expect(typeof element).toBe('object');
    expect(element.out_connections).toStrictEqual([]);
    expect(element.in_connections).toStrictEqual([]);
});
