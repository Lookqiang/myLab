import { add } from "@repo/math/add";
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

console.log(add(1, 2));
createApp(App).mount("#app");
