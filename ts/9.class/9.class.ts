// 1.class的基本用法  类型约束 implements 和 继承
// 2.class的修饰符 readonly  private  protected  public
// 3.super 原理
// 4.静态方法static
// 5.get  set
// 6.抽象类abstract
// private 只能在类内部使用
// protected 给子类和内部去使用
// public 哪儿都能用




//=======================================================================================

// 1.class的基本用法  类型约束 implements 和 继承
// 通过实现一个简易版vue 虚拟dom来解释

/**
 * 1.1 implements
 */

// interface Options {
//     el: string | HTMLElement
// }

// interface VueCls {
//     options: Options //定义需要通过构造函数传入的参数
//     init(): void     //定义需要实现的init方法
// }

// // interface后通过implements来约束Vue类
// class Vue implements VueCls {
//     options: Options  //在类中定义需要传入的参数
//     constructor(options: Options) {
//         this.options = options //赋值
//         this.init() //初始调用
//     }
//     init(): void {//定义需要实现的init方法
//     }
// }

// let vue = new Vue({
//     el: "#app"
// })

// 这样我们就实现了一个implements约束Vue类





/**
 *  1.2 继承
 */

// 接着上面的代码思考,那么我们init方法具体需要实现什么内容呢?  
// 我们希望通过一个专门的Dom类处理dom生成,那么init()中我们只需要指定虚拟dom列表,然后调用Dom类的render方法就行了,所以我们需要借助继承去实现
// 我们将代码copy下来
// interface Options {
//     el: string | HTMLElement
// }

// interface VueCls {
//     options: Options //定义需要通过构造函数传入的参数
//     init(): void     //定义需要实现的init方法
// }

// // 定义一个虚拟dom列表格式
// interface Vnode {
//     tag: string
//     text?: string
//     props?: {
//         id?: number | string
//         key?: number | string | object
//     }
//     children?: Vnode[]
// }


// class Dom {
//     constructor() { }
//     /**
//      * 创建真实dom
//      * @param tag   标签名
//      */
//     createElement(tag: string): HTMLElement {
//         return document.createElement(tag)
//     }

//     /**
//      * 设置文本
//      * @param el 标签名生成的真实dom
//      * @param text  文本内容
//      */
//     setText(el: Element, text: string | null) {
//         el.textContent = text;
//     }

//     /**
//      *  渲染dom
//      * @param domList 虚拟dom列表
//      */
//     render(domList: Vnode): HTMLElement {
//         // 根据tag生成真实dom ,比如 'div'生成<div></div>
//         const el = this.createElement(domList.tag)
//         // 判断节点下是否有子集,然后递归添加
//         if (domList.children && Array.isArray(domList.children)) {
//             domList.children.forEach(item => {
//                 const child = this.render(item)
//                 this.setText(child, item.text ?? null)
//                 el.appendChild(child)
//             })
//         } else {
//             this.setText(el, domList.text ?? null)
//         }
//         return el;
//     }
// }



// // interface后通过implements来约束Vue类
// class Vue extends Dom implements VueCls {
//     options: Options  //在类中定义需要传入的参数
//     constructor(options: Options) {
//         super();//必须放在最前面,相当于调用父级构造函数,原理是通过 父类的prototype.call实现
//         this.options = options //赋值
//         this.init() //初始调用
//     }
//     init(): void {//定义需要实现的init方法

//         // 判断根节点是否为字符串还是dom节点
//         let app = typeof this.options.el == 'string' ? document.querySelector(this.options.el) : this.options.el;
//         let data: Vnode = {
//             tag: "div",
//             props: {
//                 id: 1,
//                 key: 1
//             },
//             children: [
//                 {
//                     tag: "div",
//                     text: "子集1",
//                 },
//                 {
//                     tag: "div",
//                     text: "子集2"
//                 }
//             ]
//         }

//         //当 Vue 类继承 Dom 类时，Dom 类中的所有实例方法（比如 render()）都会成为 Vue 类实例的一部分,this.render
//         app?.appendChild(this.render(data))

//         this.mount(app as Element)
//     }

//     // 负责根节点挂载
//     mount(app: Element) {
//         document.body.append(app)
//     }
// }

// let vue = new Vue({
//     el: "#app"
// })

//此时我们已经实现了vue的虚拟dom渲染,只需要新建一个index.html然后引入index.js和写一个挂载点<div class= "app"></div>即可




//=======================================================================================

// 2.class的修饰符 readonly  private  protected public

// 接下来我们来使用修饰符完善上面的代码

interface Options {
    el: string | HTMLElement
}

interface VueCls {
    options: Options //定义需要通过构造函数传入的参数
    init(): void     //定义需要实现的init方法
}

// 定义一个虚拟dom列表格式
interface Vnode {
    tag: string
    text?: string
    props?: {
        id?: number | string
        key?: number | string | object
    }
    children?: Vnode[]
}

// 这是一个父类,用于创建dom
class Dom {
    constructor() { }
    /**
     * 创建真实dom
     * @param tag   标签名
     */
    private createElement(tag: string): HTMLElement {
        return document.createElement(tag)
    }

    /**
     * 设置文本
     * @param el 标签名生成的真实dom
     * @param text  文本内容
     */
    private setText(el: Element, text: string | null) {
        el.textContent = text;
    }

    /**
     *  渲染dom
     * @param domList 虚拟dom列表
     */
    protected render(domList: Vnode): HTMLElement {
        // 根据tag生成真实dom ,比如 'div'生成<div></div>
        const el = this.createElement(domList.tag)
        // 判断节点下是否有子集,然后递归添加
        if (domList.children && Array.isArray(domList.children)) {
            domList.children.forEach(item => {
                const child = this.render(item)
                this.setText(child, item.text ?? null)
                el.appendChild(child)
            })
        } else {
            this.setText(el, domList.text ?? null)
        }
        return el;
    }
}



// interface后通过implements来约束Vue类
class Vue extends Dom implements VueCls {
    readonly options: Options  //在类中定义需要传入的参数
    public constructor(options: Options) {
        super();//必须放在最前面,相当于调用父级构造函数,原理是通过 父类的prototype.call实现
        this.options = options //赋值
        this.init() //初始调用
    }

    // 通过 类. version()访问
    static version() {
        return '1.0.0'
    }


    public init(): void {//定义需要实现的init方法

        // 判断根节点是否为字符串还是dom节点
        let app = typeof this.options.el == 'string' ? document.querySelector(this.options.el) : this.options.el;
        let data: Vnode = {
            tag: "div",
            props: {
                id: 1,
                key: 1
            },
            children: [
                {
                    tag: "div",
                    text: "子集1",
                },
                {
                    tag: "div",
                    text: "子集2"
                }
            ]
        }

        //当 Vue 类继承 Dom 类时，Dom 类中的所有实例方法（比如 render()）都会成为 Vue 类实例的一部分,this.render
        app?.appendChild(this.render(data))

        this.mount(app as Element)
    }

    // 负责根节点挂载
    public mount(app: Element) {
        document.body.append(app)
    }
}

let vue = new Vue({
    el: "#app"
})

console.log(Vue.version); //1.0.0


