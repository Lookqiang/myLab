<script setup lang="ts">
function isWakeLockSupported() {
  return "wakeLock" in navigator;
}

let wakeLock = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request("screen"); // 关键
    console.log("Screen wake lock acquired");
    console.log(wakeLock);
    // 无论是你手动释放，还是系统自动释放，都会触发
    wakeLock.addEventListener("release", () => {
      console.log("Wake lock was released");
      // TODO: 更新 UI 状态（例如按钮文字）
    });
  } catch (err) {
    console.error(`${err.name}: ${err.message}`);
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}
</script>

<template>
  <div>ScreenWakeLockAPI</div>
  <button @click="requestWakeLock">Request Wake Lock</button>
  <button @click="releaseWakeLock">Release Wake Lock</button>
</template>
