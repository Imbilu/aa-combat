class Item {
  constructor(name, description, isFood=false) {
    this.name = name;
    this.description = description;
    this.isFood = isFood;
  }

}

module.exports = {
  Item,
};
