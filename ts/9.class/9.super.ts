// 3.super 原理

/**
 * 原型链继承： `TypeScript `通过原型链的机制让子类继承父类的属性和方法。`super` 允许子类显式调用父类的构造函数和方法。
    在` JavaScript` 中，每个对象都有一个内部的` [[Prototype]] 属性`指向它的父类，继承关系就是通过这个机制实现的。

    调用父类构造函数： 当你在子类中调用 `super()`，`JavaScript/TypeScript` 的内部机制会：

    查找父类的构造函数。
    调用父类的构造函数并传入参数。
    如果父类的构造函数有返回值，`super()` 会返回那个值。

    访问父类方法：
    使用 `super.method()`，`JavaScript` 会从子类的原型链向上查找，找到父类的 method 方法并执行它。
 */

// class Parent {
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
//     greet() {
//         console.log(`Hello from ${this.name}`);
//     }
// }

// class Child extends Parent {
//     constructor(name: string) {
//         // 调用父类构造函数
//         super(name);
//     }
//     greet() {
//         console.log("This is the child speaking");
//         // 调用父类的 greet 方法
//         super.greet();
//     }
// }

// const child = new Child("Alice");
// child.greet();



// 假设编译后的 JavaScript 代码，super 在 JavaScript 内部通过对父类的原型对象的引用来实现：
function Parent(name) {
    this.name = name;
}

Parent.prototype.greet = function () {
    console.log(`Hello from ${this.name}`);
};

function Child(name) {
    // .call作用于函数,相当于是将this指向Child,然后把name传给Parent函数,这样this.name就是子集传入的name
    Parent.call(this, name); // 相当于 super(name)
}


/**
 
* 让 Child 继承 Parent 的原型链，具体来说，它是创建一个新的对象，这个对象的原型指向 Parent.prototype，并将这个新对象赋值给 Child.prototype。
 
* 详细解释：
Parent.prototype：指的是父类 Parent 的原型对象，它包含了 Parent 类的所有共享方法和属性（比如 Parent 定义的方法）。
Object.create(Parent.prototype)：这一方法创建一个新的对象，这个对象的 __proto__（也叫 [[Prototype]]）指向 Parent.prototype，
也就是说，这个新对象会继承 Parent.prototype 上的所有方法和属性。
Child.prototype = Object.create(Parent.prototype)：将 Child.prototype 设置为一个继承自 Parent.prototype 的新对象。
这样一来，Child 的实例可以通过原型链访问 Parent.prototype 上的方法和属性。

为什么不直接用 Child.prototype = Parent.prototype？
这是为了避免对父类原型对象的直接修改。假如我们直接这样做：
Child.prototype = Parent.prototype;
此时 Child.prototype 和 Parent.prototype 指向同一个对象，如果我们对 Child.prototype 进行修改，父类 Parent.prototype 也会被修改。
通过 Object.create(Parent.prototype)，我们创建了一个新的对象，这个对象的 __proto__ 指向 Parent.prototype，但它本身是独立的，不会影响父类。

 */


Child.prototype = Object.create(Parent.prototype); // 继承父类的原型链
/**
 * 详细解释：
constructor 属性：每个函数（包括类）都有一个 prototype 对象，而 prototype 对象通常会有一个 constructor 属性，指向该函数自身。
也就是说，Child.prototype.constructor 默认应该指向 Child 本身。
但是，执行了 Child.prototype = Object.create(Parent.prototype) 后，
Child.prototype 是一个新创建的对象，它的 constructor 属性默认指向 Parent，而不是 Child。
为了修复这个指向错误，我们需要手动将 Child.prototype.constructor 重新指向 Child，确保 Child 实例的 constructor 属性正确指向它的构造函数。
 */
Child.prototype.constructor = Child;//修复 Child 构造函数的 constructor 属性指向。

Child.prototype.greet = function () {
    console.log("This is the child speaking");
    Parent.prototype.greet.call(this); // 相当于 super.greet()
};

const child = new Child("Alice");
child.greet();