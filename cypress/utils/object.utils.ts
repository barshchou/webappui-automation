/**
* ernst: If you try to call any `class.prototype` - you will get access to it's methods and properties (since its a plain object)
* We get names of all methods and props, iterate over them
* And on every iteration - define in class object (derivedCtor.prototype kak class.prototype - is a plain object) new property,
* with `name` as propertyKey
* and `value`, which is PropertyDescriptor ("configurable value")
* @see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

* This `value` we can be retrieved by `Object.getOwnPropertyDescriptor` method. 
* Basically, we directly get the "value" of object's property
* */  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
        );
      });
    });
}