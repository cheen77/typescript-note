//编写发布订阅
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.events = new Map();
    }
    EventBus.prototype.on = function (event, callback) {
        // 证明存过了 
        if (this.events.has(event)) {
            var callbackList = this.events.get(event);
            callbackList && callbackList.push(callback);
        }
        else {
            // 第一次存
            this.events.set(event, [callback]);
        }
    };
    // 参数不确定，可能有多个：...args: any[]
    EventBus.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callbackList = this.events.get(event);
        callbackList && callbackList.forEach(function (fn) { return fn.apply(void 0, args); });
    };
    EventBus.prototype.off = function (event, callback) {
        var callbackList = this.events.get(event);
        callbackList && callbackList.splice(callbackList.indexOf(callback), 1);
    };
    EventBus.prototype.once = function (event, callback) {
        var _this = this;
        //1.创建一个自定义函数，通过on触发，触发完后立马通过off回收掉
        var cb = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            callback.apply(void 0, args);
            _this.off(event, cb);
        };
        this.on(event, cb);
    };
    return EventBus;
}());
var bus = new EventBus();
var fnc = function (a, b) {
    console.log(a, b);
};
// 1.具体结构
// 有一个问题： 我的callback数组在on的订阅中心中，每次都会push进去，所以会有重复的callback，当off一次只会删除一个，
// bus.on("message", fnc) // 1 false
// bus.on("message", fnc)// 1 false
// bus.off("message", fnc)  //发现还会打印一次  1 false
// console.log(bus);
// on可以监听多个，所以说callback用数组存
bus.once("message", fnc); // 2 false
bus.emit("message", 2, false);
bus.emit("message", 3, false);
bus.emit("message", 4, false);
// 然后需要把 message 和对应的callback 放入订阅中心map中
