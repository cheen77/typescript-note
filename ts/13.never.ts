// 返回never的函数必须存在无法达到的终点

type CC = string & number //never
// 因为必定抛出异常，所以 error 将不会有返回值
function error(message: string): never {
    throw new Error(message);
}

// 因为存在死循环，所以 loop 将不会有返回值
function loop(): never {
    while (true) {
    }
}

type AAA = void | number | never



// 场景

type KUN = "唱" | "跳" | "rap"

function IKun(value: KUN) {
    switch (value) {
        case "唱":
            break
        case "跳":
            break
        case "rap":
            break
        default:
            //是用于场景兜底逻辑
            const error: never = value;
            return error
    }
}