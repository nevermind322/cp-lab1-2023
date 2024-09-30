import {Cache} from "../src/cache";
describe('basic set/get tests', () => {
    const k = 'key1';
    const v = 1;

    it('should return data that was set', () => {
        const c = new Cache();
        c.set(k, v);
        expect(c.get(k)).toBe(v);
    });

    it('should return null if data that wasn\'t set', () => {
        const c = new Cache();
        expect(c.get(k)).toBeNull();
    });
});

describe('limit functionality tests', () => {
    const k = 'key1';
    const k2 = 'key2';
    const v = 1;

    it('shouldn\'t return value if limit reaches zero', () => {
        const c = new Cache();
        c.set(k, v);
        expect(c.get(k)).toEqual(v);
        expect(c.get(k)).toBeNull();
    })

    it('should respect specified limit', () => {
        const c = new Cache();
        c.set(k, v, 0);
        expect(c.get(k)).toBeNull();

        c.set(k2, v, 10);
        for (let i = 0; i < 10; i++) {
            expect(c.get(k2)).toEqual(v);
        }
        expect(c.get(k2)).toBeNull();
    });
});

describe('stats tests', () => {
    const k = 'test';
    const k2 = 'jest';
    const v = 1;

    it('should return empty list if data wasn\'t set', () => {
        const c = new Cache();
        expect(c.stats()).toEqual([]);
    });

    it('should return different stats when data is setted/getted', () => {
        const c = new Cache();
        c.set(k, v, 2)
        c.get(k);
        c.set(k2, v, 3);
        c.get(k2);
        expect(c.stats().sort()).toEqual([
            { key: k, value: v, limit: 1 },
            { key: k2, value: v, limit: 2 }
        ].sort());
    });
});
