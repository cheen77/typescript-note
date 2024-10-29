// 字典 Dictionaries  expire 过期时间key   permanent 永久不过期
var Dictionaries;
(function (Dictionaries) {
    Dictionaries["permanent"] = "permanent";
    Dictionaries["expire"] = "_expire_"; //私有属性名称
})(Dictionaries || (Dictionaries = {}));

class Storage {
    set(key, value, expire = Dictionaries.permanent) {
        const data = {
            value, //用户的value值
            [Dictionaries.expire]: expire // 存过期时间
        };
        localStorage.setItem(key, JSON.stringify(data));
    }
    get(key) {
        const value = localStorage.getItem(key);
        if (value) {
            const data = JSON.parse(value);
            const now = new Date().getTime(); //获取电脑系统时间
            // 判断过期时间
            if (typeof data[Dictionaries.expire] == 'number' && data[Dictionaries.expire] < now) {
                this.remove(key);
                return {
                    message: `${key}已经过期`,
                    value: null
                };
            }
            else {
                return {
                    message: "成功",
                    value: data.value
                };
            }
        }
        else {
            return {
                message: "值无效",
                value: null
            };
        }
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}

export { Storage };
