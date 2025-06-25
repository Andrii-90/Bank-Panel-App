class Account {
    static count = 0;

    constructor(owner, initialBalance, currency) {
        this.owner = owner;
        this.initialBalance = initialBalance;
        this.currency = currency;
        Account.count++;
    }

    get balance() {
        return this.initialBalance;
    }

    deposit(amount) {
        amount = Math.abs(amount);
        if (amount > 0) {
            this.initialBalance += amount;
            console.log(`Your balance has increased by ${amount} ${this.currency}`);
        }
        if (amount < 0) {
            console.log("ERROR! Your deposit couldn't be a negative value!");
        }
    }

    withdraw(amount) {
        amount = Math.abs(amount);
        if (this.initialBalance >= amount && Math.abs(amount) != 0 ) {
            this.initialBalance -= amount;
            this.initialBalance = Number(this.initialBalance.toFixed(2));
            console.log(`Your balance has dropped by ${amount} ${this.currency}`);
        }  else if (Math.abs(amount) === 0){
            return;
        } else {
            console.log("ERROR! LACK OF FUNDS!");
        }
    }

    getInfo() {
        console.log(`Account owner: ${this.owner},
Balance: ${this.initialBalance} ${this.currency}
    `);
    }
}

class BusinessAccount extends Account {
    static count = 0;

    constructor(owner, initialBalance, currency, creditLimit = -5000) {
        super(owner, initialBalance, currency);
        this.creditLimit = creditLimit;
        BusinessAccount.count++;
    }

    withdraw(amount) {
        amount = Math.abs(amount);
        this.initialBalance -= amount;
        this.initialBalance = Number(this.initialBalance.toFixed(2));
        if (this.initialBalance > 0) {
            console.log(`Your balance has dropped by ${amount} ${this.currency} `);
        } else if (this.creditLimit <= this.initialBalance && this.initialBalance < 0) {
            console.log(`Your balance is negative: ${this.initialBalance} ${this.currency} (limit: ${this.creditLimit})`);

        } else if (this.initialBalance < this.creditLimit) {
            this.initialBalance += amount;  // withdraw payment
            console.log("ERROR! LACK OF FUNDS! You have exceeded your credit limit");
        } else {
            console.log("ERROR! Something went wrong!");
        }
    }

    getInfo() {
        console.log(`Type of account: Business,
Account owner: ${this.owner},
Balance: ${this.initialBalance} ${this.currency},
Credit limit: ${this.creditLimit} ${this.currency}
    `);
    }
}

const account1 = new Account("John Smith", 0, "USA");

const owner = document.getElementById("owner");
const balance = document.getElementById("balance");
const currency = document.getElementById("currency");
const amount = document.getElementById("amount");

function updateUI() {
    balance.textContent = account1.balance;
    owner.textContent = account1.owner;
    currency.textContent = account1.currency;
}

function deposit() {
    account1.deposit(amount.value);
    updateUI();
}

function withdraw() {
    account1.withdraw(amount.value);
    updateUI();
}

updateUI();