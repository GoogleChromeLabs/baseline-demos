/* ES2015 (ES6) features */

// Arrow functions
const add = (a, b) => a + b;
console.log(add(5, 3));

// Template literals
const name = "Alice";
const greeting = `Hello, ${name}!`;
console.log(greeting);

// Classes
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`My name is ${this.name}`);
  }
}

const person = new Person("Bob");
person.sayHello();

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2);

// Nullish coalescing operator
const nullishValue = null ?? "default";
console.log(nullishValue);

// const and let
let changeable = 10;
changeable = 20;
const constant = 30;
console.log(changeable, constant);

// for...of loop
const iterable = [10, 20, 30];
for (const item of iterable) {
  console.log(item);
}

// Promises
const result = Promise.resolve();


/* ES2016 features */

// exponentiation
const three_squared = 3 ** 2;


/* ES2017 features */

// async/await
async function foo() {
  await Promise.resolve();
}

// padStart
const month = '3'.padStart(2, '0')


/* ES2018 features */

// rest and spread
const numbers = [90, 10, -1, 46, 22];
const biggestNumber = Math.max(...numbers);


/* ES2019 features */

Object.fromEntries(Object.toEntries({a: 1, b: 2}));


/* ES2020 features */

// Optional chaining
const obj = { a: { b: { c: 42 } } };
const value = obj?.a?.b?.c;
console.log(value);
