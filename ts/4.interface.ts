//interface  重名 合并
//interface  任意key
//interface  ? readonly
//interface  接口继承
//interface  定义函数类型
//不能多属性 也不能少属性




// 接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀。
interface Person {
    name: string;
    age: number;
}

//interface  重名 合并
interface Person {
    sex: string
}


//约束了 tom 的形状必须和接口 Person 一致。
let tom: Person = {
    name: "Tom",
    age: 25,
    sex: "男"
};

//================================================================================

//任意属性 [propName: string]
interface Person2 {
    name: string;
    age: number;
    [propName: string]: any;
}

let Jack: Person2 = {
    name: "Tom",
    age: 25,
    a: 1,
    b: 2
};


interface Person3 {
    name: string;
    age: number;
    // 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集，这里定义为string,那么上面的属性都必须是string
    [propName: string]: string;
}

interface Person3_ {
    name: string;
    age: number;
    // 可以使用联合类型解决
    [propName: string]: string | number;
}



//================================================================================

// ? readonly

interface Person4 {
    name: string;
    age?: number;
    readonly id: number
    readonly cb: () => boolean
}

let Davaid: Person4 = {
    name: "Davaid",
    id: 1,
    cb: () => {
        return true
    }
}

// 如果我希望 你可以 通过  Davaid.cb() 访问  但是不能 修改 Davaid.cb = () => {return false}，可以通过readonly属性
Davaid.cb()

Davaid.cb = () => { return false }

// readonly应用场景：不希望随便修改的值：比如函数 、 id 等



//================================================================================


//继承  和重名类似效果
interface A {
    name: string
}

interface B extends A {
    age: number
}

let boy: B = {
    name: "Tom",
    age: 25
}

// ================================================================================

//定义函数类型

interface Fn {
    (name: string): number[]
}

const fn: Fn = (name: string) => {
    return [1, 2, 3]
}

// 如果没有返回值
interface Fn2 {
    (name: string): void
}

const fn2: Fn2 = (name: string) => {

}