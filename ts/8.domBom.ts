//1.ECMA Number Date RegExp Error XMLHttpRequest
//2.DOM querySelector MouseEvent...
//4.BOM  promise localStorage location cookie
//4.案例

//=========================================================================================

//1.ECMA Number Date RegExp Error XMLHttpRequest
let b8: Boolean = new Boolean(1);
console.log(b8); //[Boolean: true]
let n8: Number = new Number(true);
console.log(n8); //[Number: 1]
let s8: String = new String("哈哈哈");
// console.log(s8);/[String: '哈哈哈']
let d8: Date = new Date();
console.log(d8);//2024-10-15T09:15:53.395Z
let r8: RegExp = /^1/;
console.log(r8);///^1/
let e8: Error = new Error("error!");
console.log(e8);//Error: error!

//=========================================================================================

//2.DOM querySelector MouseEvent...

// HTML(标签名)Element       
let div1: HTMLDivElement = document.querySelector("div");
let canvas1: HTMLCanvasElement = document.querySelector("canvas");

// h5语义化标签归类到 HTMLElement
let article1: HTMLElement = document.querySelector("article");
let section1: HTMLElement = document.querySelector("section");

// 或者  as  Element       
let div2 = document.querySelector("div") as Element;


// 集合
let divs2: NodeList = document.querySelectorAll("div");
//or
let divs1: NodeListOf<HTMLDivElement> = document.querySelectorAll("div ");

// 多个dom节点
let divs3: NodeListOf<HTMLDivElement | HTMLCanvasElement> = document.querySelectorAll("div ,canvas");

let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function (e: MouseEvent) {
    // Do something
});


//=========================================================================================

//4.BOM  promise localStorage location cookie

let local: Storage = localStorage
let lo: Location = location
let promise: Promise<number> = new Promise((resolve) => resolve(1))
promise.then(res => console.log(res))

let cookie: string = document.cookie