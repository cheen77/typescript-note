//1.Object
let a: Object = 1
let a1: Object = "aaa"
let a2: Object = null
let a3: Object = undefined
let a4: Object = []
let a5: Object = {}
let a6: Object = () => { }


//2.object
let o: object = {}; //正确
let o1: object = []; //正确
let o2: object = () => 123; //正确
let b: object = "123"; //错误
let c: object = 123; //错误

//3.{} 
//  相当于 new Object()

let b1: {} = { name: 1 } //正确
let b2: {} = () => 123//正确
let b3: {} = 123//正确