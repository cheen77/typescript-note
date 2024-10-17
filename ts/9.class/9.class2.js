"use strict";
// 1.class的基本用法  类型约束 implements 和 继承
// 2.class的修饰符 readonly  private  protected  public
// 3.super 原理
// 4.静态方法static
// 5.get  set
// 6.抽象类abstract
//=======================================================================================
//2.class的修饰符 readonly  private  protected  public
// private 只能在类内部使用
// protected 给子类和内部去使用
// public 哪儿都能用
// // public
// class Animal {
//     public name;
//     public constructor(name) {
//         this.name = name;
//     }
// }
// let jack = new Animal("Jack");
// console.log(jack.name); // Jack
// jack.name = "Tom";
// console.log(jack.name); // Tom
// // private
// class Animal2 {
//     private name;
//     public constructor(name) {
//         this.name = name;
//     }
// }
// let jack2 = new Animal2("Jack");
// console.log(jack2.name); //私有name,只能类中访问
// jack2.name = "Tom";
// // protected
// class Animal3 {
//     protected name;
//     public constructor(name) {
//         this.name = name;
//     }
// }
// class Cat extends Animal3 {
//     constructor(name) {
//         super(name);
//         console.log(this.name);
//     }
// }
//=======================================================================================
// 4.静态方法static
class Animal4 {
    constructor() { }
    static printName() {
        return "Animal4";
    }
}
console.log(Animal4.printName); //Animal4
//=======================================================================================
// 5.get  set
// 使用 getter 和 setter 可以改变属性的赋值和读取行为：
class Animal5 {
    constructor(name) {
        this.name = name; // name()可以通过属性访问的方式调用  this.name  === > this.name()
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}
let val = new Animal5('Kitty'); // setter: Kitty
console.log(val.name); //getter    Jack
val.name = 'Tom'; // setter: Tom  
