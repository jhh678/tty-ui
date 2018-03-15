<template>
  <section class="login">
    <div class="headerBox">
      <div class="header">
        <a href="#"></a>
        XXX后台管理系统
      </div>
    </div>
    <div class="loginBox">
      <h3>XXX管理后台登录</h3>
      <div class="form-item">
        <i class="iconfont">&#xe78d;</i>
        <input @focus="foucs('phoneErr')" v-model="phone" type="text" placeholder="请填写手机号码">
      </div>
      <div class="form-item">
        <i class="iconfont">&#xe78c;</i>
        <input @focus="foucs('passwordErr')" v-model="password" type="password" placeholder="请填写密码">
      </div>
      <button @click="toSubmit" class="btn btn-default">提交</button>
    </div>
    <div class="footer">©2016 XXX有限公司 版权所有</div>
  </section>
</template>

<script>
import {
  sessionStore
} from '@/utils'

export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    foucs(opt) {
      this[opt] = false
    },
    toSubmit() {
      let phoneReg = /^1[3578]\d{9}$/g
      if (!phoneReg.test(this.phone)) {
        this.$message({
          message: '手机号码不正确',
          type: 'warning'
        })

        return
      }

      if (!this.password) {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })

        return
      }

      this.$api('login').post({
        userName: this.phone,
        password: this.password
      }).then((res) => {
        if (res.data.code === 200) {
          sessionStore.set('token', res.data.data.token)
          if (this.$route.query.router) {
            this.$router.push(this.$route.query.router)
          } else {
            this.$router.push('/home')
          }
        } else {
          this.$message({
            message: '用户名或者密码错误',
            type: 'error'
          })
        }
      })
    }
  }
}

</script>

<style scoped lang="scss">
.login {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background: url("../assets/images/login-bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .headerBox {
    width: 100%;
    height: 40px;
    background: #00a53c;
    position: absolute;
    top: 0;
    left: 0;
    .header {
      display: flex;
      a {
        color: #fff;
      }
      i {
        font-size: 100px;
        font-weight: normal;
      }
      width: 960px;
      margin: 0 auto;
      line-height: 40px;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
    }
  }
  .loginBox {
    width: 480px;
    box-sizing: border-box;
    padding: 40px 60px;

    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    h3 {
      color: #fff;
      font-size: 15px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
    }
    .form-item {
      background: #fff;
      height: 40px;
      width: 360px;
      display: flex;
      margin-bottom: 20px;
      border-radius: 4px;
      border: 1px solid #fff;
      i {
        width: 48px;
        text-align: center;
        font-size: 18px;
        line-height: 40px;
      }
      input {
        font-size: 14px;
        height: 38px;
        border: none;
        display: inline-block;
        outline: none;
        flex: 1;
        border-radius: 4px;
        color: #333333;
      }
    }
    .error {
      border-color: red;
    }
    .form-item:hover {
      border-color: #00a53c;
    }
    .btn {
      width: 100%;
      height: 40px;
      background: #00a53c;
      border: none;
      color: #fff;
      font-size: 15px;
      outline: none;
    }
  }
  .footer {
    width: 100%;
    position: absolute;
    bottom: 15px;
    left: 0;
    color: #fff;
    text-align: center;
    font-size: 12px;
  }
}
</style>
