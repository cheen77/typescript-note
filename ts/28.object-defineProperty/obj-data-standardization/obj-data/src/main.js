import { createApp } from "vue";
import App from "./App.vue";

import { data } from "./data"; //模拟后端数据
import { dataDefine } from "./dataDefine";
import { useStrictData } from "./useStrictData";
(() => {
  const _data = useStrictData(data, dataDefine);

  //   _data[0].job = "前端工程师"; //  writable
  //   _data[0].name = "chen"; //not writable  报错
  console.log(_data);

  _data[2].setConfig("publicKey", "enumerable", true); //修改 将publicKey变成可枚举

  _data.forEach((item) => {
    for (const key in item) {
      console.log(key); // name age job    没有publicKey，因为publicKey是不可枚举
    }
  });
})();

createApp(App).mount("#app");
