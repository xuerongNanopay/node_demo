// Decorator

function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hoodId: string) {
  return function<T extends {new(...args: any[]): {name: string}}>(o_constructor: T) {
    console.log(hoodId);
    //weave code.
    return class extends o_constructor{
      constructor(..._: any[]) {
        super();
        console.log('aaaa: ', this.name);
      }
    }
  }
}

@Logger('Logger')
@WithTemplate('aa', 'WithTemplate')
class Person {
  name = 'Max';

  constructor() {
    console.log('Create a person')
  }
}

// const per1 = new Person();

function Log(target: any, propertyName: string) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator');
  console.log(target, name, descriptor)
}

class Product {
  @Log
  title: string;
  @Log
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const OldCass= {
  new(args: any[]) {
    console.log('aaaa')
  }
}

function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log('methodName: ', methodName, target)
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor;
}

// new OldCass();
interface Account {
  name: string;
  owner: string;
}
class BankAccount implements Account {
  name: string;
  owner: string;

  constructor(option: Account) {
    this.name = option.name;
    this.owner = option.owner;
  }

  @Autobind
  showBankDetail() {
    console.log(this.name);
  }
}

const account = new BankAccount({name: 'a bank Account', owner:'b'});
account.showBankDetail();

const pkAccount = { showBankDetail: account.showBankDetail }
pkAccount.showBankDetail()

interface ValidatorConfig {
  [property: string]: {
    [validatorableProp: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target?.contructor?.name] = {
    [propName]: ['required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target?.contructor?.name] = {
    [propName]: ['positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if ( ! objValidatorConfig ) return true;
  let isValid = true;
  for ( const prop in objValidatorConfig ) {
    for ( const validator of objValidatorConfig[prop] ) {
      switch ( validator ) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positve':
          isValid = isValid && obj[prop] > 0;;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

console.log(registeredValidators)