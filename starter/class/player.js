const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  // Picks up an item from a room into the player's inventory
  takeItem(itemName) {
    let pickedItem = this.currentRoom.getItemByName(itemName);
    this.items = this.items.concat(pickedItem);
  }


  eatItem(itemName) {
    let idx;
    for (const item of this.items) {
        if (item.name === itemName) {
            idx = this.items.indexOf(item);
            break;
        }
    }
    if (this.items[idx].isFood === true) {
        this.items.splice(idx, 1);
    }
  }

  getItemByName(name) {
    let idx;
    for (const item of this.items) {
        if (item.name === name) {
            idx = this.items.indexOf(item);
            break;
        }
    }
    let gotItem = this.items.splice(idx, 1);
    return gotItem[0];
  }

  hit(name) {
    if (name.currentRoom === this.currentRoom) {
      name.applyDamage();
      return true;
    }
    return false;
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
