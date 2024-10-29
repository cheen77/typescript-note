import { Dictionaries } from "../enum"
// expire过期时间key   permanent永久不过期
export type Key = string
export type Expire = number | Dictionaries.permanent //可以传时间戳 或者 永久
export interface Data<T> {
    value: T
    [Dictionaries.expire]: Expire
}
export interface Result<T> {
    message: string
    value: T | null
}
export interface StorageCls {
    get: <T> (key: Key) => Result<T>
    set: <T> (key: Key, value: T, expire: Expire) => void
    remove: (key: Key) => void
    clear: () => void
}