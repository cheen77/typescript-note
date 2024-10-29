// expire过期时间key   permanent永久不过期
import { StorageCls, Key, Expire, Data, Result } from "./type";
import { Dictionaries, } from "./enum"

export class Storage implements StorageCls {
    set<T>(key: Key, value: T, expire: Expire = Dictionaries.permanent) {
        const data = {
            value,//用户的value值
            [Dictionaries.expire]: expire// 存过期时间
        }
        localStorage.setItem(key, JSON.stringify(data))
    }
    get<T>(key: Key): Result<T | null> {
        const value = localStorage.getItem(key)
        if (value) {
            const data: Data<T> = JSON.parse(value)
            const now = new Date().getTime()//获取电脑系统时间
            // 判断过期时间
            if (typeof data[Dictionaries.expire] == 'number' && data[Dictionaries.expire] < now) {
                this.remove(key)
                return {
                    message: `${key}已经过期`,
                    value: null
                }
            } else {
                return {
                    message: "成功",
                    value: data.value
                }
            }
        } else {
            return {
                message: "值无效",
                value: null
            }
        }
    }
    remove(key: Key) {
        localStorage.removeItem(key)
    }
    clear() {
        localStorage.clear()
    }
}