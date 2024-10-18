//1.类装饰器 ClassDecorator  
//2.装饰器工厂
//3.方法装饰器 MethodDecorator PropertyDescriptor 'https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10'
//4.参数装饰器 ParameterDecorator
//import 'reflect-metadata';
//axios   node环境可以用
//5.属性装饰器 PropertyDecorator
import axios from 'axios'
import 'reflect-metadata';
//===================================================================
//1.类装饰器 ClassDecorator
// target :返回Http构造函数
const Base: ClassDecorator = (target) => {
    // console.log(target);//[class Http]
    target.prototype._baseUrl = 'http://api.apiopen.top/'
    target.prototype._getName = () => {
        // console.log("Tom");
    }
}

@Base //编译阶段自己调用，不需要我们手动调用  相当于调用Base(Http)
class Http {
    //......
}

/**
 * 面试题：类装饰器读到类的构造函数，有什么作用？
   可以实现在不破坏Http类的结构，在构造函数的原型上增加属性和方法，实现AOP面向切面编程
 */
const http = new Http() as any
http._getName() //Tom
// console.log(http._baseUrl); //http://api.apiopen.top/



//===================================================================

// 2.装饰器工厂

/**
 * 如果我们还希望给@Base("str")传参，比如传一个str，那么就需要用到装饰器工厂
 */

// 需要借助高阶函数实现，也就是函数中返回函数 ,外层函数接受额外的参数
const Base2 = (str: string) => {
    const fn: ClassDecorator = (target) => {
        // console.log(target);//[class Http]
        target.prototype._baseUrl = str
    }
    return fn
}

@Base2("str")
class Http2 {
    //......
}

const http2 = new Http2() as any
// console.log(http2._baseUrl); //str

//===================================================================

// 3.方法装饰器 MethodDecorator
// 三个参数   target 返回原型对象, propertyKey 返回方法名字, descriptor 返回描述符


const Get = (url: string) => {
    const fn: MethodDecorator = (target, propertyKey, descriptor: PropertyDescriptor) => {
        // console.log(target);//原型对象{}
        // console.log(propertyKey);//方法名称getData
        // console.log(descriptor); //描述符{value: [Function: getData],writable: true,enumerable: false,configurable: true}

        // 取出元数据
        const key = Reflect.getMetadata('key', target)

        axios.get(url).then(res => {
            const fnc = descriptor.value; //拿到对应的getData方法
            fnc(key ? res.data[key] : res.data) //相当于给getData(res.data)赋值
        })
    }
    return fn
}

class Http3 {
    //......
    @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
    getData(res: any) {
        // console.log(res.data.result);
        /**
         * {
                code: 200,       
                message: '成功!',
                result: {        
                    total: 14782,
                    list: [
                    [Object], [Object],
                    [Object], [Object],
                    [Object], [Object],
                    [Object], [Object],
                    [Object], [Object]
                    ]
                }
            }
         */
    }

}
new Http3()

//===================================================================

//4.参数装饰器 ParameterDecorator
// 三个参数 target, propertyKey, parameterIndex
// npm i reflect-metadata
//  reflect-metadata 元数据的反射
//我们使用@Result()参数装饰器将方法装饰器返回到方法的参数，进行结构 
const Result = () => {
    const fn: ParameterDecorator = (target, propertyKey, parameterIndex) => {
        console.log(target);//原型对象{}
        console.log(propertyKey);//方法名称getData
        console.log(parameterIndex);//参数所在的位置 0
        //   因为接口返回是 res.data.result  ,第二个值填result ，因为后续取元数据会res.data[key]取
        Reflect.defineMetadata("key", "result", target)// 在代码运行时为 target 添加元数据
    }

    return fn
}

class Http4 {
    //......
    @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
    getData(@Result() res: any) {
        // console.log(res);
    }
}
new Http4()

//===================================================================

// 5.属性装饰器 PropertyDecorator
//两个参数 target  原型对象{} , propertyKey    属性名name   

const Name: PropertyDecorator = (target, propertyKey) => {
    console.log(target);
    console.log(propertyKey);

}

class Http5 {
    @Name
    name: string
    constructor() {
        this.name = 'Tom'
    }
    @Get("https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10")
    getData(res: any) {

    }
}

new Http5()