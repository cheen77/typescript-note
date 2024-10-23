// vue3 响应式   reactive ref
function reactive(obj) {
    return new Proxy(obj, {
        get: function (target, key) {
            console.log("get", key);
            var result = Reflect.get(target, key);
            return isObject(result) ? reactive(result) : result;
        },
        set: function (target, key, value) {
            console.log("set", key, value);
            return Reflect.set(target, key, value);
        },
        deleteProperty: function (target, key) {
            console.log("delete", key);
            return Reflect.deleteProperty(target, key);
        },
    });
}
/**
 * 1.解决vue2中对对象的添加和删除操作，无法劫持到

 */
// let onePerson = reactive<OnePerson>({ name: "张三", age: 18 });
// console.log(onePerson.name); // 张三
// onePerson.age = 30
// onePerson.gender = "男" // set gender 男
// delete onePerson.age // delete age
/**
 * 2.解决vue2中对数组的 api 无法劫持到
 */
// let oneArr = reactive<number[]>([1, 2, 3])
// oneArr.push(4) // [1,2,3,4]
// /** get push
//     get length
//     set 3 4
//     set length 4
// */
// oneArr.pop() // [1,2,3]
// /**
//  *  get pop
//     get length
//     get 3
//     delete 3
//     set length 3
//  */
/**
 * 3.解决vue2中存在深层嵌套关系，性能问题 无脑递归造成  =》懒加载
 */
function isObject(obj) {
    if (typeof obj !== "object" || obj == null) {
        return false;
    }
    return true;
}
var oneUser = reactive({
    name: "张三",
    age: 18,
    info: {
        address: "中国",
        height: 180
    }
});
// console.log(oneUser.info.address);
// oneUser.info.address = "新加坡"
// get info
// 中国
// get info
// ===》
// get info
// get address
// 中国
// get info
// set address 新加坡
// 发现key也只打印了info这一层，说明proxy还是不能解决嵌套问题，需要用递归（但是proxy是一个懒加载，用到才递归）
// 赋值对象
// @ts-ignore
oneUser.name = { sname: "Tom" };
