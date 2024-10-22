export const useStrictData = (data, define) => {
  if (typeof data !== "object" || data === null) {
    throw new Error("data must be an object");
  }

  if (!Array.isArray(data)) {
    return defineObject(data, define);
  }

  return data.map((item) => {
    return defineObject(item, define);
  });
};

const defineObject = (data, define) => {
  //   let _obj = {};
  let _obj = new ConstructObject(); //采用构造函数的形式，在其原型上增加方法
  for (const key in data) {
    Object.defineProperty(_obj, key, {
      ...define[key],
      value: data[key],
    });
  }
  return _obj;
};

// 修改特定属性的特定属性

function ConstructObject(obj) {
  // 不让for in  打印出 setConfig
  for (const key in ConstructObject.prototype) {
    Object.defineProperty(ConstructObject.prototype, key, {
      enumerable: false,
      writable: false,
      configurable: false,
    });
  }
}

ConstructObject.prototype.setConfig = function (prop, desc, value) {
  // this在构造函数中指向调用者_obj
  Object.defineProperty(this, prop, {
    [desc]: value, // 动态计算属性名,[desc]: value 表示将变量 desc 的值作为属性名，而不是字面量 desc。
  });
};
