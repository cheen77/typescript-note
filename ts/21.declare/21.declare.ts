import axios from 'axios'
import express from 'express' //无法找到模块“express”的声明文件。
//尝试使用 `npm i --save-dev @types/express` (如果存在)，
// 或者添加一个包含 `declare module 'express';` 的新声明(.d.ts)文件
// @types开头是规范

// 但是有一个问题，如果遇到冷门库，恰好没有写ts的声明文件，那么只能自己写declare module 'xxx'


// 这里我们以declare module 'express'为例子 新建一个express.d.ts声明文件

const app = express()

const router = express.Router()

app.use("/api", router)

router.get('/api', (res: any, req: any) => {
    res.json({
        code: 200
    })
})

app.listen(9001, () => {
    console.log(`server is running at 9001`);

})