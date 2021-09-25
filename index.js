class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  getValue() {
    return this.amount;
  }
  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.account.addTransaction(this);
    return true;
  }

  isAllowed() {
    return true;
  }
}
class Withdrawal extends Transaction {

  getValue() {
    return -(this.amount);
  }

  isAllowed() {
    let remaining = this.account.balance - this.amount;
    if (remaining >= 0) {
      return true;
    }
    return false;
  }
}

class Deposit extends Transaction {

}

class Account {
  constructor(user) {
    this.user = user;
    this.transactions = [];
  }

  get balance() {
    let val = 0;
    for (const tx of this.transactions) {
      val += tx.getValue();
    }
    return val;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const ac1 = new Account('user1');

let t3 = new Deposit(1000, ac1);
t3.commit();
console.log({ t3 });
console.log(`Account balance of ${ac1.user} is ${ac1.balance}`);

let t1 = new Withdrawal(50.25, ac1);
t1.commit();
console.log('Transaction 1:', t1);

let t2 = new Withdrawal(9.99, ac1);
t2.commit();
console.log('Transaction 2:', t2);

console.log({ ac1 });
console.log(`Account balance of ${ac1.user} is ${ac1.balance}`);
