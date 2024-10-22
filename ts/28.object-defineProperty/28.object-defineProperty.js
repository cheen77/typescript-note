// Object.defineProperty
//1.Object.defineProperty(obj, prop, descriptor)
//     obj 对象   prop 属性   descriptor描述符  =》 value 值
// 2.使用
var object = {};
var newObj = Object.defineProperty(object, "name", {
    value: "zhangsan",
});
console.log(newObj === object); // true
// 3.默认不允许修改属性,删除属性,枚举属性
var object2 = {};
Object.defineProperty(object2, "name", {
    value: "zhangsan",
});
console.log(object2); // {name: "zhangsan"}
object2.name = "lisi"; // {name: "zhangsan"}
delete object2.name; // {name: "zhangsan"}
for (var key in object2) {
    console.log(key, object2[key]); //无答应
}
//@ts-ignore
Object.prototype.sex = "male";
console.log("1", Object.keys(object2)); //[]
console.log("2", Object.getOwnPropertyNames(object2)); //['name']
/**
 * 面试： Object.keys和Object.getOwnPropertyNames区别
 *     1.Object.keys()  只返回可枚举的属性
 *     2.Object.getOwnPropertyNames()  返回所有属性，包括不可枚举的，但是原型上继承而来的属性拿不到
 */
// 4.描述符   =》 数据描述符  存取描述符
// 4.1 数据描述符
// value  与属性绑定的值
// configurable 是否可 删除
// enumerable 属性是否可枚举
// writable  属性是否可修改
// configurable 是否可 删除
var object3 = {};
Object.defineProperty(object3, "name", {
    value: "zhangsan",
    // configurable: true
    writable: true
});
// delete object3.name//{}
object3.name = "Tom"; // {name: "zhangsan"}
console.log(object3);
// writable  属性是否可修改
var object4 = {};
Object.defineProperty(object4, "name", {
    value: "zhangsan",
    writable: true
});
object4.name = "Tom"; // {name: "zhangsan"}
console.log(object4);
var object5 = {};
Object.defineProperty(object5, "name", {
    value: "zhangsan",
    configurable: true,
    writable: true,
    enumerable: true
});
object5.name = "Tom"; // {name: "zhangsan"}
console.log(object5);
for (var key in object5) {
    console.log("3", key, object5[key]); //name Tom
}
// 4.2 存取描述符 
// get
// set
// 与typescript中类的get set很类似
// 注意  value/writable  和 get/set 不能同时存在
var object6 = {};
Object.defineProperty(object6, "name", {
    // value: "zhangsan",
    get: function () {
        console.log("getter", "zhangsan");
        return "zhangsan";
    },
    set: function (newvalue) {
        console.log("setter", newvalue);
    }
});
object6.name = "Tom"; // setter Tom
console.log(object6.name); // getter zhangsan
