// 泛型工具
// Partial 所有属性 可选 和 Required 所有属性 必选
// Pick 提取部分属性 和 Omit 排除部分属性 并且返回新的类型    interface用
// Exclude 排除部分属性   非interface用 
// Extract 
// Record  约束对象的key 和 value
// ReturnType<Fn>获取函数类型的返回值


//===================================================================

// 1.Partial 所有属性 可选 
interface Person {
    name: string;
    age: number;
    sex: string;
}

// Partial<T>
type PartialPerson = Partial<Person>
// 原理
type CoustomPartial<T> = {
    [key in keyof T]?: T[key]
}
type PartialPerson1 = CoustomPartial<Person>


//===================================================================

// 2. Required 所有属性 必选

interface Person1 {
    name?: string;
    age?: number;
    sex?: string;
}
// Required<T>
type RequiredPerson = Required<Person1>

// 原理  -? 代表去掉问号
type CoustomRequired<T> = {
    [key in keyof T]-?: T[key]
}
type RequiredPerson1 = CoustomRequired<Person1>

//===================================================================

// 3. Pick 提取部分属性 
// 如果我们只想用age这个属性，但是又不想重新写interface，就可以使用Pick提取部分属性
interface Person2 {
    name: string;
    age: number;
    sex: string;
}
// Pick<T,K>
type pick = Pick<Person2, 'age'>

// 也支持联合类型
type pick1 = Pick<Person2, 'age' | 'sex'>
// 原理
type CoustomPick<T, K extends keyof T> = {
    [key in K]: T[key]
}

type pick2 = CoustomPick<Person2, 'age' | 'sex'>


//===================================================================

// 4. Exclude 排除部分属性   非interface用

type ExcludePerson1 = Exclude<'name' | 'age' | 'sex', 'age' | 'sex'>

// 原理
type CoustomExclude<T, K> = T extends K ? never : T
// 为什么是never  ？ 
//never 在联合类型中会被排除掉
type test2 = "a" | "b" | never //type test2 = "a" | "b"
// T: 'name' | 'age' | 'sex'    K:'age'    
// 一个一个来: 
// 'name' extends 'age' ? never : 'name' => 'name'
// 'age' extends 'age' ? never : 'age' => never
// 'sex' extends 'age' ? never : 'sex' => 'sex'
// 最后剩下  'name' | 'sex' | never  => 'name' | 'sex'
type ExcludePerson2 = CoustomExclude<'name' | 'age' | 'sex', 'age'>


//===================================================================

// 5. Omit 排除部分属性 并且返回新的类型 interface用
interface One {
    name: string;
    age: number;
    sex: string;
}
type one = Omit<One, 'age'>
// 原理
// 需要先Exclude 去除不要的属性
// 再用Pick 提取剩下的属性


type CoustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type one1 = CoustomOmit<One, 'age' | 'sex'>


//====================================================================
// 6.Record  约束对象的key 和 value

// type _key = 'name' | 'age' | 'sex' //key不能少
// type _value = string | number//value 随便取


// let zhangsan: Record<_key, _value> = {
//     name: '张三',
//     age: 19,
//     sex: '男'
// }


// let zhangsan2: Record<_key, Record<_key, _value>> = {
//     name: {
//         name: '张三',
//         age: 19,
//         sex: '男'
//     },
//     age: {
//         name: '张三',
//         age: 19,
//         sex: '男'
//     },
//     sex: {
//         name: '张三',
//         age: 19,
//         sex: '男'
//     },
// }

interface Foo {
    a: string
}
interface Bar {
    b: string
}

// 我想把Foo和Bar两个类型的 key 合并到一起，并给它们重新指定成 number 类型，可以使用Record这样实现：
type FooBar = Record<keyof Foo | keyof Bar, number>



//原理
// 对象的key 只能是string number symbol
type Objkey = keyof any //type Oky = string | number | symbol
type CoustomRecord<T extends Objkey, K> = {
    [key in T]: K
}


//====================================================================

//7. ReturnType<Fn> 获取函数类型的返回值

const Fn = () => [1, "fff", false]

type FnReturnType = ReturnType<typeof Fn>//type FnReturnType = (string | number | boolean)[]

// 原理: 返回值是动态的 需要用 infer推断返回值
type CoustomReturnType<Fn extends Function> = Fn extends (...args: any[]) => infer Res ? Res : never


// ====================================================================
// 8.Extract
// 恰好与Exclude相反，提取出T中U类型的部分
// 原理
type CoustomExtract<T, U> = T extends U ? T : never

type ExtractPerson = Extract<'name' | 'age' | 'sex', 'age' | 'like'>