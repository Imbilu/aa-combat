const { expect } = require('chai');
const Shop = require('../class/shop');
const { Item } = require('../class/item');
const {Food} = require('../class/food');
const { Player } = require('../class/player');

describe('shop class', () => {
    let shop;
    let item1 = new Food('bagel', 'tasty bagel', 10);
    let item2 = new Item('sword', 'for self defence', 12);
    let item3 = new Item('rock', 'another rock for your sling', 5);

    beforeEach(() => {
        shop = new Shop('shop', 'you can buy items here');
        shop.items.push(item1, item2, item3);
    });


    describe('constructor method', () => {
        it('should create a new instance of shop class', () => {
            expect(shop).to.exist;
            expect(shop).to.have.property('name');
            expect(shop).to.have.property('description');
        });

        it('should set the properties of a new instance to the passed in values', () => {
            expect(shop.name).to.eq('shop');
            expect(shop.description).to.eq('you can buy items here');
        });
    });

    describe('listItems function', () => {
        it('should list items available in the shop and their prices', () => {

            let objList = shop.listItems();

            expect(objList).to.deep.equal({'bagel':10, 'sword':12, 'rock':5});
        });
    });
});

describe('Player class', () => {
    let shop;
    let item1 = new Food('bagel', 'tasty bagel', 10);
    let item2 = new Item('sword', 'for self defence', 12);
    let item3 = new Item('rock', 'another rock for your sling', 5);
    let player;

    beforeEach(() => {
        shop = new Shop('shop', 'you can buy items here');
        shop.items.push(item1, item2, item3);
        player = new Player('player', shop);
    });

    describe('buy function', () => {
        it('should remove an item from the list if the player buys it', () => {
            player.buy('bagel');
            itemsObj = shop.listItems();

            expect(itemsObj).to.deep.eq({'sword':12, 'rock':5})
        });

        it("should add the item to the player's items", () => {
            player.buy('bagel');
            let arr = [];
            arr.push(item1);

            expect(player.items).to.deep.eq(arr);
        });

        it("should reduce the player's gold by the item price", () => {
            player.buy('bagel');

            expect(player.gold).to.eq(90);
        });
    })
});
