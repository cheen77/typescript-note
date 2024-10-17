"use strict";
//1.数字枚举
// 默认从0往上
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["BLue"] = 2] = "BLue";
})(Color || (Color = {}));
// 增长枚举
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 1] = "Red";
    Color2[Color2["Green"] = 2] = "Green";
    Color2[Color2["BLue"] = 3] = "BLue";
})(Color2 || (Color2 = {}));
// 2.字符串枚举
var Color3;
(function (Color3) {
    Color3["Red"] = "red";
    Color3["Green"] = "green";
    Color3["BLue"] = "blue";
})(Color3 || (Color3 = {}));
// 3.异构枚举 
// 枚举可以混合字符串和数字成员
var Types;
(function (Types) {
    Types["No"] = "No";
    Types[Types["Yes"] = 1] = "Yes";
})(Types || (Types = {}));
// 4.接口枚举
// 定义一个枚举Types 定义一个接口A 他有一个属性red 值为Types.yyds
// 声明对象的时候要遵循这个规则
(function (Types) {
    Types[Types["yyds"] = 0] = "yyds";
    Types[Types["dddd"] = 1] = "dddd";
})(Types || (Types = {}));
let obj1 = {
    red: Types.yyds
};
// 6.反向映射
// 它包含了正向映射（ name -> value）和反向映射（ value -> name）
// 要注意的是 不会为字符串枚举成员生成反向映射。
var Types3;
(function (Types3) {
    Types3[Types3["success"] = 0] = "success";
})(Types3 || (Types3 = {}));
let success = Types3.success;
let key = Types3[success];
console.log(`key--------${key}`, `value--------${success}`); // key--------success value--------0
