if (typeof window === "object") {
  const button = document.querySelector('button')!;

  button.addEventListener('click', _ => {
    console.log('aaaa')
  })
}
console.log('aaa')
let logged;

logged = 1;
logged = '2';

function myFunc() {
  if ( 1 === 1) {
    return 11;
  }
  return;
}

class Container<T> {
  private _store: Array<T>;
  length: number = 0;

  constructor() {
    this._store = new Array<T>();
  }

  add(t: T) {
    this._store.push(t);
  }
}
//Do not find error
let arr = new Array<number>(5).fill(1);

let m = {
  a: '11',
  fa: function(this) {
    console.log('aaa', this.a);
  }
}

console.log(m.fa());

let mc = {

}

class Department {
  protected employees: string[] = [];

  constructor(private readonly id: number, private name: string) {
  }

  describe(this: Department) {
    console.log('Department: ' + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }
}

const accounting = new Department(1, "Accounting");

class ITDepartment extends Department {
  private lastEmployer: string = 'a';

  get LastEmployer() {
    return this.lastEmployer;
  }

  // set lastEmployer

  constructor(id: number, public admin: string[]) {
    super(id, 'IT')
  }

  addEmployee(employee: string): void {
    this.employees.push(employee);
  }
}

const itDepartment = new ITDepartment(1, []);
console.log(itDepartment.LastEmployer)

// console.log(`aaavvv: ${accounting.name}`)

interface Person {
  name: string;
  age: number;

  greet: () => void;
  sayHello(to: string): void;
}

type Admin = {
  name: string;
  priviledges: string[];
}

type Employee = {
  name: string;
  stateDate: Date;
}

type ElevateEmployee = Admin & Employee;

//Generic
const promise: Promise<string> = new Promise((resolve, reject) => {
  resolve("1");
})

promise.then(data => {
  data.split('')
  return 'a';
})
.then(data => {
  data.split('')
})

function merge<T extends {}, U>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

const mergeObject = merge({name: 'aaa'}, {age: 30})
console.log(mergeObject.age, mergeObject.name)

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal() {
  
}