/**
 * 方式二，我不通过数组去存callback，而是通过set存callback函数(...args: any[]) => void>，这样天然去重
 */

interface _BaseEventBus {
    events: Record<string, Set<(...args: any[]) => void>>
    on: (event: string, callback: (...args: any[]) => void) => void
    emit: (event: string, ...args: any[]) => void
    off: (event: string, callback: (...args: any[]) => void) => void
    once: (event: string, callback: (...args: any[]) => void) => void
}


class _EventBus implements _BaseEventBus {
    events: Record<string, Set<(...args: any[]) => void>> = {};


    on(event: string, callback: (...args: any[]) => void): void {
        // //  证明存过了
        // if (this.events[event]) {
        //     this.events[event].add(callback)
        // } else {
        //     // 如果没有该事件，则创建一个
        //     this.events[event] = new Set()
        // }

        // 简化写法,等价于上面
        (this.events[event] ??= new Set()).add(callback)
    }

    emit(event: string, ...args: any[]): void {
        // const callbackList = this.events[event]
        // callbackList && callbackList.forEach(fn => fn(...args))

        //   简化写法
        this.events[event]?.forEach(fn => fn(...args))


    }
    off(event: string, callback: (...args: any[]) => void): void {
        this.events[event]?.delete(callback)
    }
    once(event: string, callback: (...args: any[]) => void): void {
        //1.创建一个自定义函数，通过on触发，触发完后立马通过off回收掉
        const cb = (...args: any[]) => {
            callback(...args)
            this.off(event, cb)
        }
        this.on(event, cb)
    }
}

const eventbus = new _EventBus()

const fnn = (a: number, b: boolean) => {
    console.log(a, b);
}
// eventbus.on('message', fnn)//只打印一次 1, false
// eventbus.on('message', fnn)

// eventbus.off('message', fnn) 



eventbus.once('message', fnn) //只打印555, false  一次

eventbus.emit('message', 555, false)
eventbus.emit('message', 2, false)
eventbus.emit('message', 3, false)