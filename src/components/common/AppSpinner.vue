<template>
  <div class="ball-container">
    <div class="ball-main">
      <div class="ball-button"></div>
      <div class="ball-fill">
        <div class="ball-fill-content"></div>
      </div>
      <div class="ball-blank">
        <div class="ball-blank-content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ball-container,
.ball-container * {
  box-sizing: border-box;
}
.ball-container {
  width: 32px;
  height: 32px;
  display: inline-block;
  border: solid 1px;
  position: relative;
}
.ball-container .ball-main {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  animation: ball-rotate 2s linear infinite;
}
.ball-container .ball-main .ball-button {
  position: absolute;
  left: calc(calc(100% / 2) - calc(26px / 2));
  top: calc(calc(100% / 2) - calc(26px / 2));
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: solid 3px #000;
  background: #fff;
  z-index: 10;
}
.ball-container .ball-main .ball-fill {
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 30px;
  overflow: hidden;
  border-radius: 60px 60px 0 0;
}
.ball-container .ball-main .ball-fill .ball-fill-content {
  width: 60px;
  height: 30px;
  background: #e24743;
  border-radius: 60px 60px 0 0;
}
.ball-container .ball-main .ball-blank {
  position: absolute;
  left: 0;
  top: 30px;
  width: 60px;
  height: 30px;
  overflow: hidden;
  border-radius: 0 0 60px 60px;
}
.ball-container .ball-main .ball-blank .ball-blank-content {
  width: 60px;
  height: 30px;
  background: #fff;
  border-radius: 0 0 60px 60px;
}
@keyframes ball-rotate {
  0% {
    transform: scale(0.5) translate(-30px, -30px) rotate(0deg);
  }
  100% {
    transform: scale(0.5) translate(-30px, -30px) rotate(360deg);
  }
}
</style>
