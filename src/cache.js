class Cache{
    constructor() {
        this.cache = new Map();
    }

    set(key, value, limit = 1) {
        this.cache.set(key, { value, limit });
    }

    get(key) {
        const entry = this.cache.get(key);
        if (entry === null || entry === undefined)
            return null;
        
        
        if (entry.limit <= 0) {
            return null;
        }
        else {
            entry.limit--;
            return entry.value;
        }
    }

    stats(){
        const stats = [];
        this.cache.forEach((value, key) => {
            stats.push({ key: key, value: value.value, limit: value.limit });
        });
        return stats;
    }
}
export {Cache}