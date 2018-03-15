<template>
  <transition name="loading-pop">
    <div class="loading-mask" v-show="visible">
      <div class="loading">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
        <span class="loading-text" v-show="message">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  .loading-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    text-align: center;
    z-index: 9999;
    transition: opacity .3s linear;
    .loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .spinner {
        margin: auto;
        width: 50px;
        height: 50px;
        text-align: center;
        font-size: 10px;
        div {
          background-color: #00a53c;
          height: 100%;
          width: 5px;
          display: inline-block;
          -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
          animation: stretchdelay 1.2s infinite ease-in-out;
        }
        .rect2 {
          -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s;
        }
        .rect3 {
          -webkit-animation-delay: -1.0s;
          animation-delay: -1.0s;
        }
        .rect4 {
          -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s;
        }
        .rect5 {
          -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s;
        }
      }
      .loading-text {
        font-size: 14px;
        display: block;
        text-align: center;
        margin-top: 20px;
        color: #fafafa;
      }
    }
  }

  .loading-pop-enter,
  .loading-pop-leave-active {
    opacity: 0;
  }

  @keyframes stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }

</style>

<script>
  export default {
    props: {
      message: String,
      duration: {
        type: Number,
        'default': 0
      },
      className: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        visible: false
      }
    }
  }

</script>
