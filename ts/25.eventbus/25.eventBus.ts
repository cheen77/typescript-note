//编写发布订阅

/**
 * 第一种方式，通过Map<事件名称,[Function]订阅者集合> ,
 * 这种方式 用于存callback的数组并没有进行去重，比如我一个bus.emit，但是两次bus.on，你会发现两次on中的callback都push到数组
 * 如果有特殊业务需求，其实是不需要触发两次callback的
 */

// 实现on emit once off 订阅中心Map<事件名称,[Function]订阅者集合>
interface BaseEventBus {
    events: Map<string, Function[]>//订阅中心Map
    once: (event: string, callback: Function) => void //订阅一次
    on: (event: string, callback: Function) => void //订阅   
    emit: (event: string, ...args: any[]) => void //派发
    off: (event: string, callback: Function) => void //删除监听器

}


class EventBus implements BaseEventBus {
    events: Map<string, Function[]>;
    constructor() {
        this.events = new Map();
    }

    on(event: string, callback: Function): void {

        // 证明存过了 
        if (this.events.has(event)) {
            const callbackList = this.events.get(event)
            callbackList && callbackList.push(callback)

        } else {
            // 第一次存
            this.events.set(event, [callback])
        }


    }
    // 参数不确定，可能有多个：...args: any[]
    emit(event: string, ...args: any[]): void {
        const callbackList = this.events.get(event)
        callbackList && callbackList.forEach(fn => fn(...args))
    }

    off(event: string, callback: Function): void {
        const callbackList = this.events.get(event)
        callbackList && callbackList.splice(callbackList.indexOf(callback), 1)
    }
    once(event: string, callback: Function): void {
        //1.创建一个自定义函数，通过on触发，触发完后立马通过off回收掉
        const cb = (...args: any[]) => {
            callback(...args)
            this.off(event, cb)
        }
        this.on(event, cb)
    }
}



const bus = new EventBus();


const fnc = (a: number, b: boolean) => {
    console.log(a, b);

}
// 1.具体结构

// 有一个问题： 我的callback数组在on的订阅中心中，每次都会push进去，所以会有重复的callback，当off一次只会删除一个，
// bus.on("message", fnc) // 1 false

// bus.on("message", fnc)// 1 false

// bus.off("message", fnc)  //发现还会打印一次  1 false

// console.log(bus);


// on可以监听多个，所以说callback用数组存


bus.once("message", fnc) // 2 false
bus.emit("message", 2, false)
bus.emit("message", 3, false)
bus.emit("message", 4, false)

// 然后需要把 message 和对应的callback 放入订阅中心map中