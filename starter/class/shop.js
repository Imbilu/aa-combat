const { Room } = require('./room');

class Shop extends Room {
    listItems() {
        let items = {};
        for (const item of this.items) {
            items[item.name] = item.price;
        }
        return items;
    }
}


module.exports = Shop;
