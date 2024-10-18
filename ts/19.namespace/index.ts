
import { Test } from './19.namespace'

import add = Test.ChildTest.add //抽离

{
    let tom: Test.A = {
        name: "Tom",
        age: 15,
    }
    console.log(add())// [1,2]

}