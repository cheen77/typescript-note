// 1.最简版
// let personObj = { name: "张三", age: 18 }
// // 封装一个监听函数变化的函数
// function dproptry(obj: any, key: string, value: any) {
//     Object.defineProperty(obj, key, {
//         get() {
//             console.log("获取", key, "为", value, "成功");
//             return value
//         },
//         set(newvalue) {
//             if (newvalue === value) return
//             console.log("设置", key, "为", newvalue, "成功");
//             value = newvalue
//             // 触发依赖，解析模板....
//         },
//     })
// }
// function observe(obj: any) {
//     if (typeof obj !== "object" || obj == null) {
//         return
//     }
//     for (const key in obj) {
//         // 给对象的每一个属性设置监听
//         dproptry(obj, key, obj[key])
//     }
// }
// observe(personObj)
// // 1.对象没有嵌套情况，能够触发get set
// console.log("getter", personObj.name);//触发get   zhangsan
// personObj.name = "李四" //触发set
// 2. 其他一些情况
var personObj = { name: "张三", age: 18, job: { code: "厨师" } };
// 封装一个监听函数变化的函数
function dproptry(obj, key, value) {
    // 如果obj存在嵌套对象value的情况，通过递归去给对象内每一个属性添加监听
    observer(value);
    Object.defineProperty(obj, key, {
        get: function () {
            console.log("获取", key, "为", value, "成功");
            return value;
        },
        set: function (newvalue) {
            if (newvalue === value)
                return;
            // 如果出现赋值为一个对象的情况，需要再次调用observe函数，给这个对象添加监听
            observer(newvalue);
            console.log("设置", key, "为", newvalue, "成功");
            value = newvalue;
            // 触发依赖，解析模板....
        },
    });
}
function observer(obj) {
    if (typeof obj !== "object" || obj == null) {
        return;
    }
    for (var key in obj) {
        // 给对象的每一个属性设置监听
        dproptry(obj, key, obj[key]);
    }
}
observer(personObj);
// 情况一：嵌套对象
// console.log("getter", personObj.job.code); //触发两次 get  获取 job 为 {code: '厨师'} 成功
// personObj.job.code = "司机"  //不加递归是 不触发set ，加了递归会 打印两次 设置 code 为 司机 成功
// 情况二：将原有key的value赋值成对象
// personObj.name = { sname: "李四" } // 会触发set函数，    设置 name 为 {sname: '李四'} 成功
// console.log("getter", personObj.name.sname);////触发两次 get  获取 name  为 { sname: "李四" } 成功
// personObj.name.sname = "王五" //不在set函数加递归是 不触发set ，加了递归会打印 设置 sname 为 王五 成功
// 情况三：对象添加属性，无法get set 劫持     ==>增加set方法
personObj.sex = "男";
// console.log(personObj.sex); //男   但是不会走get set
// 情况四：对象删除属性，无法get set 劫持   ==> 增加delete方法
delete personObj.age;
// 情况五： 对数组的 api 无法get set劫持
var list = [1, 2, 3];
observer(list);
list.push(444);
console.log(list);
