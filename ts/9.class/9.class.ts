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
interface Options {
    el: string | HTMLElement
}

interface VueCls {
    options: Options //定义需要通过构造函数传入的参数
    init(): void     //定义需要实现的init方法
}





class Dom {
    constructor() {

    }


    render() {
        console.log('render');

    }

}



// interface后通过implements来约束Vue类
class Vue extends Dom implements VueCls {
    options: Options  //在类中定义需要传入的参数
    constructor(options: Options) {
        super();//必须放在最前面,相当于调用父级构造函数,原理是通过 父类的prototype.call实现
        this.options = options //赋值
        this.init() //初始调用
    }
    init(): void {//定义需要实现的init方法
        this.render()//当 Vue 类继承 Dom 类时，Dom 类中的所有实例方法（比如 render()）都会成为 Vue 类实例的一部分
    }
}

let vue = new Vue({
    el: "#app"
})






//=======================================================================================

// 2.class的修饰符 readonly  private  protected public




//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================