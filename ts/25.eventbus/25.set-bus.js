/**
 * 方式二，我不通过数组去存callback，而是通过set存callback函数(...args: any[]) => void>，这样天然去重
 */
var _EventBus = /** @class */ (function () {
    function _EventBus() {
        this.events = {};
    }
    _EventBus.prototype.on = function (event, callback) {
        // //  证明存过了
        // if (this.events[event]) {
        //     this.events[event].add(callback)
        // } else {
        //     // 如果没有该事件，则创建一个
        //     this.events[event] = new Set()
        // }
        var _a;
        var _b;
        // 简化写法,等价于上面
        ((_a = (_b = this.events)[event]) !== null && _a !== void 0 ? _a : (_b[event] = new Set())).add(callback);
    };
    _EventBus.prototype.emit = function (event) {
        // const callbackList = this.events[event]
        // callbackList && callbackList.forEach(fn => fn(...args))
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        //   简化写法
        (_a = this.events[event]) === null || _a === void 0 ? void 0 : _a.forEach(function (fn) { return fn.apply(void 0, args); });
    };
    _EventBus.prototype.off = function (event, callback) {
        var _a;
        (_a = this.events[event]) === null || _a === void 0 ? void 0 : _a.delete(callback);
    };
    _EventBus.prototype.once = function (event, callback) {
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
    return _EventBus;
}());
var eventbus = new _EventBus();
var fnn = function (a, b) {
    console.log(a, b);
};
// eventbus.on('message', fnn)//只打印一次 1, false
// eventbus.on('message', fnn)
// eventbus.off('message', fnn) 
eventbus.once('message', fnn); //只打印555, false
eventbus.emit('message', 555, false);
eventbus.emit('message', 2, false);
eventbus.emit('message', 3, false);
