// proxy 代理13个方法 参数一模一样
// Reflect 反射13个方法 参数一模一样
//mobx observable观察者模式  类似于vuex redux
// proxy支持对象 数组 函数 set map

let lucyObj = { name: 'lucy', age: 19 }
console.log(lucyObj.age);//19
console.log(Reflect.get(lucyObj, "age", lucyObj)); //19
console.log(Reflect.set(lucyObj, "age", "20", lucyObj)); //true


let proxy = new Proxy(lucyObj, {
    //receiver 可以保证上下文的this正确
    get(target, propKey, receiver) {
        console.log(target); //{ name: 'lucy', age: 19 }
        console.log(propKey);//age
        console.log(receiver); //{ name: 'lucy', age: 19 }
        return Reflect.get(target, propKey, receiver) //Reflect是es6推荐的对对象操作的方法,更加语义化 此处相当于 return target[propKey]
    },
    set(target, propKey, value, receiver) {


        return Reflect.set(target, propKey, value, receiver)
    }
})

console.log(proxy.age); //触发get



// mobx observable 观察者模式

const Slist: Set<Function> = new Set() //事件存储器
//订阅函数
const subscribe = (fn: Function) => {
    if (!Slist.has(fn)) {
        Slist.add(fn)
    }
}

// 观察函数
const observable = <T extends object>(params: T) => {

    return new Proxy(params, {
        set(target, propKey, value, receiver) {
            const result = Reflect.set(target, propKey, value, receiver)
            Slist.forEach(fn => fn())
            return result
        }
    })
}

const personProxy = observable({ name: 'Jack', age: 30 })

subscribe(() => {
    console.log("订阅函数变化", personProxy.name, personProxy.age); //订阅函数 Tom 30   订阅函数变化 Tom 20
})

personProxy.name = 'Tom'//触发set
personProxy.age = 20//触发set
