// 基类  抽象类
//abstract 所定义的抽象类
//abstract 所定义的方法,都只能描述不能进行一个实现


// 6.抽象类abstract


abstract class BaseClass {
    name: string

    constructor(name: string) {
        this.name = name
    }

    abstract init(name: string): void

    getName() {
        return this.name
    }
}

// 抽象类不能实例化
// new BaseClass()


// 用途: 顶层设计,作为基类,供派生类继承

class A extends BaseClass {
    constructor() {
        super("Tom")
    }
    init(name: string): void {
    }

    setName(name: string) {
        this.name = name  //super父类实例化后能够拿到所有属性和方法
    }
}

const v = new A()
v.setName("Jack")

console.log(v.getName()); //Jack
