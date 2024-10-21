//map的key可以是引用类型
let obj = { name: "chen" };
let map: Map<object, any> = new Map();
map.set(obj, "chen")
console.log(map); //{ { name: 'chen' } => 'chen' }

console.log(map.get(obj));//chen
console.log(map.size); //1

console.log(map.has(obj)); //true

// console.log(map.delete(obj)); //true

// map.clear()

//map 也有iterator函数 支持遍历 for of 循环 forEach

for (const iterator of map) {
    console.log(iterator); // [ { name: 'chen' }, 'chen' ]
}

map.forEach((value, key) => {
    console.log(key, value);//{ name: 'chen' } chen
})