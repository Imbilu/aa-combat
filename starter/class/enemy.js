const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    setTimeout(function () {
      const availableExits = this.currentRoom.getExits();
      if (availableExits.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableExits.length);
        const newRoom = this.currentRoom.getRoomInDirection(availableExits[randomIndex]);
        this.currentRoom = newRoom;
      }
    }, this.cooldown);

  }

  takeSandwich() {

  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 3000;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      this.player.applyDamage(this.strength);
      // this.alert(`${this.name} attacks you for ${this.strength} damage!`);
      this.cooldown = 3000; // Reset cooldown after attack
    } else {
      // this.alert(`${this.name} cannot find you!`);
    }
  }

  applyDamage(amount) {
    this.health -= amount;
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else if (this.player) {
      this.attack();
      this.rest();
    } else {
      this.randomMove(); // Move randomly if no target
      this.rest();
    }
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


  hit(damage) {
    this.applyDamage(damage);
    if (this.health > 0) {
      this.targetPlayer();
    }
  }

  targetPlayer() {
    this.attackTarget = this.currentRoom.getEnemies().find(enemy => enemy === this); // Assuming only one enemy per room
    //this.alert(`${this.name} is enraged!`);
  }


}

module.exports = {
  Enemy,
};
