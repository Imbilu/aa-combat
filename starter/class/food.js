const { Item } = require('./item');

class Food extends Item {
  constructor(name, description, price) {
    super(name, description, price);
    this.isFood = true;
  }
}

module.exports = {
  Food,
};
