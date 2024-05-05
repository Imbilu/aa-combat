class Item {
  constructor(name, description, price=0) {
    this.name = name;
    this.description = description;
    this.isFood = false;
    this.price = price;
  }

}

module.exports = {
  Item,
};
