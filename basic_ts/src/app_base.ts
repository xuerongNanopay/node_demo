function add(n1: number, n2: number, showResult: boolean): number | undefined {
  if ( showResult ) {
    console.log(n1+n2);
  } else {
    return n1 + n2;
  }
}
const ret = add(1,1, true)!;
// const ret1 = ret + 2;

console.log(add(1,1, true));

Promise
  .resolve('aaa')
  .then(aa => {
    if ( aa = 'aaa') {
      return aa;
    } else {
      return 1;
    }
  })
  .then(result => {
    const b = result as number + 1;
  })

// type personType = {
//   name: string,
//   age: number,
//   nickname?: string
// }
enum Role {
  ADMIN = 'admin',
  READ_ONLY = 'read_only'
}

interface personType {
  name: string,
  age: number,
  nickname?: string,
  role: Role
}

const person: personType = {
  name: 'aaa',
  age: 30,
  role: Role.ADMIN
}
console.log(person.role)

function combine(input1: number|string, input2: number|string): void {
  // return input1.toString() + input2;
}

let fa:Function;
let fb:() => null;
let fc:() => number;

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';

userName = userInput as string;

function throwError(): never {
  throw new Error("aaa");
}