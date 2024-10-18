// 1.命名空间的用法 嵌套 抽离 导出 简化 合并
// 2.命名空间的案例
// namespace 所有的变量以及方法必须导出才能访问，嵌套时内层namespace也需要导出

// 1.命名空间的用法 嵌套 抽离 导出 简化 合并
export namespace Test {
    export interface A {
        name: string
        age: number
    }
    export namespace ChildTest {
        export const add = () => [1, 2]
    }
}

{
    let tom: Test.A = {
        name: "Tom",
        age: 15,
    }
    console.log(Test.ChildTest.add()); // [1,2]

}



// 2.命名空间的案例
// 跨端的项目 h5 android ios 小程序 等

namespace ios { }
namespace android { }
namespace h5 { }
namespace miniprogram { }