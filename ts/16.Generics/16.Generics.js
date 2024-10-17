"use strict";
// 泛型
// 1.泛型函数
function chen(a, b) {
    return [a, b];
}
chen(1, 2);
function chen1(a, b) {
    return [a, b];
}
chen1('独孤', '求败');
// 这俩函数功能一样，如果写多个函数显然是一个不好的选择，我们可以：
function chen3(a, b) {
    return [a, b];
}
// chen3<number>(1, 2) //这是全称，但是没必要，因为ts会类型推断为number
chen3(1, 2);
chen3("ggg", "bbb");
// 1.1可以定义多个泛型
function chen4(a, b) {
    return [a, b];
}
// 1.2可以定义泛型默认值
function chen5(a, b) {
    return [a, b];
}
chen5(false, 1);
let mmm = true;
let cchen = {
    msg: 'chen'
};
//  接口的时候特别爱用，  封装一个axios理解
const axios = {
    get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                }
            };
            xhr.send(null);
        });
    }
};
axios.get('./data.json').then(res => {
    console.log(res.data);
});
// 注意运行的时候 node环境没有XMLHttpRequest，需要编译程js   tsc
