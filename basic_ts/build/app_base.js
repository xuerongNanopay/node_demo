"use strict";
function add(n1, n2, showResult) {
    if (showResult) {
        console.log(n1 + n2);
    }
    else {
        return n1 + n2;
    }
}
const ret = add(1, 1, true);
// const ret1 = ret + 2;
console.log(add(1, 1, true));
Promise
    .resolve('aaa')
    .then(aa => {
    if (aa = 'aaa') {
        return aa;
    }
    else {
        return 1;
    }
})
    .then(result => {
    const b = result + 1;
});
// type personType = {
//   name: string,
//   age: number,
//   nickname?: string
// }
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["READ_ONLY"] = "read_only";
})(Role || (Role = {}));
const person = {
    name: 'aaa',
    age: 30,
    role: Role.ADMIN
};
console.log(person.role);
function combine(input1, input2) {
    // return input1.toString() + input2;
}
let fa;
let fb;
let fc;
let userInput;
let userName;
userInput = 5;
userInput = 'Max';
userName = userInput;
function throwError() {
    throw new Error("aaa");
}
