<template>
  <div class="sub-page-wrap">
    <h3>Message 消息提示</h3>
    <p>常用于主动操作后的反馈提示。</p>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">基础用法</h4>
        <p>从顶部出现，3 秒后自动消失。</p>
      </div>
      <div class="panel-body">
        <button class="btn btn-default" @click="openBasic">打开消息提示</button>
        <button class="btn btn-default" @click="openVNode">VNode</button>
        <div class="panel panel-default">
          <div class="panel-body">
            Element 注册了一个$message方法用于调用，Message 可以接收一个字符串或一个 VNode 作为参数，它会被显示为正文内容。       
          </div>
        </div>
        <pre>
          openBasic() {
            this.$message('这是一条消息提示')
          },
          openVNode() {
            const h = this.$createElement
            this.$message({
              message: h('p', null, [
                h('span', null, '内容可以是 '),
                h('i', { style: 'color: teal' }, 'VNode')
              ])
            })
          }
        </pre>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">不同状态</h4>
        <p>用来显示「成功、警告、消息、错误」类的操作反馈。</p>
      </div>
      <div class="panel-body">
        <button class="btn btn-default" @click="openSuccess">成功</button>
        <button class="btn btn-default" @click="openWarning">警告</button>
        <button class="btn btn-default" @click="openInfo">消息</button>
        <button class="btn btn-default" @click="openError">错误</button>
        <div class="panel">
          <div class="panel-body">
            当需要自定义更多属性时，Message 也可以接收一个对象为参数。比如，设置type字段可以定义不同的状态，默认为info。此时正文内容以message的值传入。同时，我们也为 Message 的各种 type 注册了方法，可以在不传入type字段的情况下像openError那样直接调用。
          </div>
        </div>
        <pre>
          openSuccess() {
            this.$message({
              showClose: true, // 显示关闭按钮
              duration: 0, // 为0是不会自动关闭
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            })
          },
          openWarning() {
            this.$message({
              message: '警告哦，这是一条警告消息',
              type: 'warning'
            })
          },
          openInfo() {
            this.$message('这是一条消息提示')
          },
          openError() {
            this.$message.error('错了哦，这是一条错误消息')
          }
        </pre>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">使用 HTML 片段</h4>
        <p>message 属性支持传入 HTML 片段</p>
      </div>
      <div class="panel-body">
        <button class="btn btn-default" @click="openWithHtml">使用 HTML 片段</button>
        <div class="panel">
          <div class="panel-body">
            将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          </div>
        </div>
        <pre>
          openWithHtml() {
            this.$message({
              dangerouslyUseHTMLString: true,
              message: '&lt;strong&gt;这是 &lt;i&gt;HTML&lt;/i&gt; 片段&lt;/strong&gt;'
            })
          }
        </pre>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">全局方法</h4>
      </div>
      <div class="panel-body">
        Element 为 Vue.prototype 添加了全局方法 $message。因此在 vue instance 中可以采用本页面中的方式调用 Message。
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">单独引用</h4>
      </div>
      <div class="panel-body">
        <pre>import Message from '@/components/message'</pre>
        <p>此时调用方法为 Message(options)。我们也为每个 type 定义了各自的方法，如 Message.success(options)。 并且可以调用 Message.closeAll() 手动关闭所有实例。</p>
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    openBasic() {
      this.$message('这是一条消息提示')
    },
    openVNode() {
      const h = this.$createElement
      this.$message({
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      })
    },
    openSuccess() {
      this.$message({
        showClose: true, // 显示关闭按钮
        duration: 0, // 为0是不会自动关闭
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },
    openWarning() {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    },
    openInfo() {
      this.$message('这是一条消息提示')
    },
    openError() {
      this.$message.error('错了哦，这是一条错误消息')
    },
    openWithHtml() {
      this.$message({
        dangerouslyUseHTMLString: true,
        message: '<strong>这是 <i>HTML</i> 片段</strong>'
      })
    }
  }
}
</script>

<style>

</style>
