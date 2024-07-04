const input = require('sync-input');

function Gift(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.getInfo = function() {
        return `${this.id}- ${this.name}, Cost: ${this.price} tickets`;
    }
}

const gifts = [
    new Gift(1, 'Teddy Bear', 10),
    new Gift(2, 'Big Red Ball', 5),
    new Gift(3, 'Huge Bear', 50),
    new Gift(4, 'Candy', 8),
    new Gift(5, 'Stuffed Tiger', 15),
    new Gift(6, 'Stuffed Dragon',30),
    new Gift(7, 'Skateboard', 100),
    new Gift(8, 'Toy Car', 25),
    new Gift(9, 'Basketball', 20),
    new Gift(10, 'Scary Mask', 75)];


class visitor {
    constructor(tickets) {
        this.tickets = tickets;
    }
}

class shop {
    constructor(gifts, visitor) {
        this.gifts = gifts;
        this.visitor = visitor;
    }

    sellGift(gift) {
        if (this.gifts.length === 0) {
            console.log('Wow! There are no gifts to buy.');
            return;
        }
        if (gift < 1 || gift > this.gifts.length) {
            console.log('There is no gift with that number!');
            return;
        }
        if (this.visitor.tickets < this.gifts[gift - 1].price) {
            console.log('You don\'t have enough tickets to buy this gift.');
            return;
        }
        if (isNaN(gift)) {
            console.log('Please enter a valid number!');
            return;
        }
        for (let item of this.gifts) {
            if (item.id === gift) {
                this.visitor.tickets -= item.price;
                console.log(`Here you go, one ${item.name}!`);
                console.log(`Total tickets:${this.visitor.tickets}`);
                this.gifts.splice(this.gifts.indexOf(item), 1);
            }
        }
    }

    addTickets(tickets) {
        if (isNaN(tickets) || tickets < 0 || tickets > 1000) {
            console.log('Please enter a valid number between 0 and 1000.');
            return;
        }

        this.visitor.tickets += tickets;
        console.log(`Total tickets: ${this.visitor.tickets}`);
    }

    checkTickets() {
        console.log(`Total tickets: ${this.visitor.tickets}`);
    }

    showGifts() {
        console.log('Here\'s the list of gifts:\n');
        if (this.gifts.length === 0) {
            console.log('Wow! There are no gifts to buy.');
            return;
        }
        gifts.forEach((gift) => console.log(gift.getInfo()));
    }

    openShop() {
        while (true) {
            const selection = Number(input(`
What do you want to do?
1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop
`));
            switch (selection) {
                case 1:
                    let gift = Number(input('Enter the number of the gift you want to get: '));
                    this.sellGift(gift);
                    break;
                case 2:
                    let tickets = Number(input('Enter the ticket amount: '));
                    this.addTickets(tickets);
                    break;
                case 3:
                    this.checkTickets();
                    break;
                case 4:
                    console.log("Here's the list of gifts:\n");
                    this.showGifts();
                    break;
                case 5:
                    console.log('Have a nice day!');
                    return;
                default:
                    console.log('Invalid selection');
            }
        }
    }
}


let visitor1 = new visitor(0);
let shop1 = new shop(gifts, visitor1);

console.log('WELCOME TO THE CARNIVAL GIFT SHOP!\nHello friend! Thank you for visiting the carnival!');
shop1.showGifts();
shop1.openShop();



