class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.health = 100;
    this.strength = 10;
    this.items = [];
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health === 0) {
      this.die();
    }
  }

  dropItem(itemName) {
    let idx;
    for (const item of this.items) {
        if (item.name === itemName) {
            idx = this.items.indexOf(item);
        }
    }
    let droppedItem = this.items.splice(idx, 1);
    this.currentRoom.items.push(droppedItem[0]);
  }

  die() {
    for (const item of this.items) {
      this.dropItem(item);
    }
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
