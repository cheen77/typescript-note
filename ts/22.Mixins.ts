//Mixins可以理解成合并
// 1，对象混入 合并 Am对象 Am对象 合并到一起
// 2.类的混入 A类 B类 合并到一起


//1.对象混入

interface Am {
    name: string
}

interface Bm {
    age: number
}

let am: Am = { name: 'a' }
let bm: Bm = { age: 12 }

//1. 扩展运算符  浅拷贝 返回新的类型 let cm: {age: number; name: string;}

let cm = { ...am, ...bm } //{ name: 'a', age: 12 }

//2.es6  Object.assign  浅拷贝  返回交叉类型 let dm: Am & Bm
let dm = Object.assign({}, am, bm) //{ name: 'a', age: 12 }


//2.类混入

class Html {
    render() {
        console.log('render');

    }
}


class Logger {
    log(log: string) {
        console.log(log);
    }
}

class App {
    run() {

    }
}
// 如果我们希望 App作为基类，将Html,Logger类混入到App类中

type Constructor<T = {}> = new (...args: any[]) => T;
function MixinsPlugins<T extends Constructor<App>>(base: T) {

    // 返回一个类
    return class extends base {
        private Logger
        private Html

        constructor(...args: any[]) {
            super(...args)
            this.Logger = new Logger()
            this.Html = new Html()
        }

        run(): void {
            this.log("run")
        }

        log(log: string): void {
            this.Logger.log(log)
        }

        render(): void {
            this.Html.render()
        }
    }

}

const mixins = MixinsPlugins(App) //返回的类就是App混入Html和Logger

const app = new mixins()

app.run() //run
app.render() //render