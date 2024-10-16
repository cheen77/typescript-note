// 1.class的基本用法  类型约束 implements 和 继承
// 2.class的修饰符 readonly  private  protected  public
// 3.super 原理
// 4.静态方法static
// 5.get  set
// 6.抽象类abstract
// private 只能在类内部使用
// protected 给子类和内部去使用
// public 哪儿都能用
class Dom {
  constructor() {}
  /**
   * 创建真实dom
   * @param tag   标签名
   */
  createElement(tag) {
    return document.createElement(tag);
  }
  /**
   * 设置文本
   * @param el 标签名生成的真实dom
   * @param text  文本内容
   */
  setText(el, text) {
    el.textContent = text;
  }
  /**
   *  渲染dom
   * @param domList 虚拟dom列表
   */
  render(domList) {
    var _a;
    const el = this.createElement(domList.tag);
    if (domList.children && Array.isArray(domList.children)) {
      domList.children.forEach((item) => {
        var _a;
        const child = this.render(item);
        this.setText(
          child,
          (_a = item.text) !== null && _a !== void 0 ? _a : null
        );
        el.appendChild(child);
      });
    } else {
      this.setText(
        el,
        (_a = domList.text) !== null && _a !== void 0 ? _a : null
      );
    }
    return el;
  }
}
// interface后通过implements来约束Vue类
class Vue extends Dom {
  constructor(options) {
    super(); //必须放在最前面,相当于调用父级构造函数,原理是通过 父类的prototype.call实现
    this.options = options; //赋值
    this.init(); //初始调用
  }
  init() {
    // 判断根节点是否为字符串还是dom节点
    let app =
      typeof this.options.el == "string"
        ? document.querySelector(this.options.el)
        : this.options.el;
    // 虚拟dom列表
    let data = {
      tag: "div",
      props: {
        id: 1,
        key: 1,
      },
      children: [
        {
          tag: "div",
          text: "子集1",
        },
        {
          tag: "div",
          text: "子集2",
        },
      ],
    };

    app === null || app === void 0
      ? void 0
      : app.appendChild(this.render(data)); //当 Vue 类继承 Dom 类时，Dom 类中的所有实例方法（比如 render()）都会成为 Vue 类实例的一部分,this.render
    this.mount(app);
  }
  // 负责根节点挂载
  mount(app) {
    document.body.append(app);
  }
}
let vue = new Vue({
  el: "#app",
});

//=======================================================================================
// 2.class的修饰符 readonly  private  protected public
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
//=======================================================================================
