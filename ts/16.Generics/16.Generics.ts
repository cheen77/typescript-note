// 泛型

// 1.泛型函数

function chen(a: number, b: number): Array<number> {
    return [a, b];
}
chen(1, 2)
function chen1(a: string, b: string): Array<string> {
    return [a, b];
}
chen1('独孤', '求败')

// 这俩函数功能一样，如果写多个函数显然是一个不好的选择，我们可以：

function chen3<T>(a: T, b: T): Array<T> {
    return [a, b];
}
// chen3<number>(1, 2) //这是全称，但是没必要，因为ts会类型推断为number
chen3(1, 2)
chen3("ggg", "bbb")

// 1.1可以定义多个泛型
function chen4<T, K>(a: T, b: K): Array<T | K> {
    return [a, b];
}

// 1.2可以定义泛型默认值
function chen5<T = number, K = string>(a: T, b: K): Array<T | K> {
    return [a, b];
}
chen5(false, 1)

//2. type interface 泛型
type MMM<T> = string | T
let mmm: MMM<boolean> = true

interface CHEN<T> {
    msg: T
}
let cchen: CHEN<string> = {
    msg: 'chen'
}

//  接口的时候特别爱用，  封装一个axios理解

const axios = {

    get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.responseText))
                    }
                }
            }
            xhr.send(null)
        })

    }

}

//axios.get('./data.json').then(res => { }) 
// 当我们res. 的时候，发现没有推断 ，我们希望返回的res能够给我们进行自动类型推断，如何实现呢 ？ 

// 首先需要定义类型
interface JsonData {
    msg: string
    code: number
    data: any
}

axios.get<JsonData>('./data.json').then(res => {
    console.log(res.data);
})

// 注意运行的时候 node环境没有XMLHttpRequest，需要编译程js   tsc 然后下载live server 插件在本地起一个服务通过浏览器打开html文件
