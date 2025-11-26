<template>
  <video :src="video" controls />
  <br />
  <button @click="transcode">Start</button>
  <p>{{ message }}</p>
  -----log-----
  <p v-for="item in log" :key="item">{{ item }}</p>
</template>

<script lang="ts">
import { FFmpeg } from "@ffmpeg/ffmpeg";
import type { LogEvent } from "@ffmpeg/ffmpeg/dist/esm/types";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { defineComponent, ref } from "vue";

const baseURL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.10/dist/esm";
// const videoURL ="https://dev-resource.thedeer.cn/pre/resource-media/video/d98a2129c8143bf585ce4513351a92fccpbowkdd6dejeftw.mp4"; //48.7m 视频

const videoURL =
  "https://dev-resource.thedeer.cn/pre/resource-media/video/5f45033c8bdb8729be4a6f76de0de1d2xszmpepvedqbivq4.mp4"; //21.9m 视频

export default defineComponent({
  name: "App",
  setup() {
    const ffmpeg = new FFmpeg();
    const message = ref("Click Start to Transcode");
    const log = ref([]);

    let video = ref("");

    async function transcode() {
      message.value = "Loading ffmpeg-core.js";
      ffmpeg.on("log", ({ message: msg }: LogEvent) => {
        message.value = msg;
        msg.indexOf("time") >= 0 && log.value.unshift(msg);
      });
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript"),
      });
      message.value = "Start transcoding";
      await ffmpeg.writeFile("input.mp4", await fetchFile(videoURL));
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-vcodec",
        "libx264",
        "-crf",
        "23",
        "test.mp4",
      ]);
      message.value = "Complete transcoding";
      const data = await ffmpeg.readFile("test.mp4");
      video.value = URL.createObjectURL(
        new Blob([(data as Uint8Array).buffer], { type: "video/mp4" })
      );
    }
    return {
      video,
      message,
      transcode,
      log,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
