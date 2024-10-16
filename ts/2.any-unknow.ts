// any

let anys: any = 123;
anys = "123";
anys = true;

let anys1;
anys1 = "123";

// unknow

//unknown 可以定义任何类型的值
let value: unknown;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = null;             // OK
value = undefined;        // OK
value = Symbol("type");   // OK

//这样写会报错unknow类型不能作为子类型只能作为父类型 any可以作为父类型和子类型
//unknown类型不能赋值给其他类型
let names: unknown = '123'
let names2: string = names

//这样就没问题 any类型是可以的
let _names: any = '123'
let _names2: string = _names

//unknown可赋值对象只有unknown 和 any
let bbb: unknown = '123'
let aaa: any = '456'

aaa = bbb





//区别

// 如果是any类型在对象没有这个属性的时候还在获取是不会报错的
let __obj: any = { b: 1 };
__obj.a;

// 如果是unknow 是不能调用属性和方法
let _obj: unknown = { b: 1, ccc: (): number => 213 };
_obj.b;
_obj.ccc();