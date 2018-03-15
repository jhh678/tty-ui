<template>
  <div class="body-404">
    <div class="error-header"></div>
    <div class="container">
      <section class="error-container">
        <h1>404</h1>
        <div class="error-divider">
          <h2>/(ㄒoㄒ)/~~页面丢了</h2>
          <p class="description">它可能被外星人带走了</p>
        </div>
        <router-link to="/mall/index" class="return-btn">
          <i class="iconfont">&#xe778;</i>主页</router-link>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Error404',
    created() {

    }
  }

</script>

<style scoped lang="scss">
  .body-404 {
    background-color: #00a53c;
    color: #fff;
    min-height: 100vh;
  }

  .error-header {
    background: #fff;
    height: 1.5rem;
  }

  .container {
    width: 70%;
    padding-right: .1rem;
    padding-left: .1rem;
    margin-right: auto;
    margin-left: auto;
  }

  .error-container {
    background: rgba(0, 0, 0, .05);
    text-align: center;
    h1 {
      font-size: .55rem;
      font-weight: 300;
      margin: -.7rem 0 0 0;
      text-align: center;
      color: #00a53c;
    }
    .error-divider {
      margin-top: -.15rem;
      padding: .15rem 0;
      h2 {
        line-height: 1;
        font-size: .25rem;
        font-weight: 300;
        margin: 0;
        text-transform: uppercase;
        color: #fff;
      }
      .description {
        color: #e5e5e5;
        font-size: .2rem;
        margin: 0;
      }
    }
  }

  .return-btn,
  .return-btn:hover {
    border: 1px solid rgba(255, 255, 255, .3);
    padding: .05rem .12rem;
    margin-top: .2rem;
    margin-bottom: .15rem;
    display: inline-block;
    border-radius: .02rem;
    background-clip: padding-box;
    color: #fff;
    font-size: .08rem;
    font-weight: 300;
    &:hover {
      background: #fff;
      color: #00a53c;
      text-decoration: none;
    }
    i {
      margin-right: .05rem;
    }
  }

</style>
