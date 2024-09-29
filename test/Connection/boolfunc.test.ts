describe('bool function', () => {
    var lle = require('../../src/lle');

    test('should return false when there are no connections', () => {
        let connect = new lle.Connection({name: 'A', element: new lle.Element()}, []);
        expect(connect.isConnected()).toBe(false);
    });

    test('should return true when there are connections', () => {
        let elem = new lle.Element();
        let connect = new lle.Connection({name: 'A', element: new lle.Element()}, [
            {name: 'A', element: elem}
        ]);
        expect(connect.isConnected()).toBe(true);
    });

    test('should return 0 when there are no connections', () => {
        let connect = new lle.Connection({name: 'A', element: new lle.Element()}, []);
        expect(connect.lenInConnected()).toBe(0);
    });

    test('should return 0 when there are no connections', () => {
        let connect = new lle.Connection();
        expect(connect.lenInConnected()).toBe(0);
    });

    test('should return the correct number of connections', () => {
        let elem = new lle.Element();
        let connect = new lle.Connection({name: 'A', element: new lle.Element()}, [
            {name: 'A', element: elem},
            {name: 'B', element: elem}
        ]);
        expect(connect.lenInConnected()).toBe(2);
    });
});
