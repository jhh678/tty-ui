<template>
  <div class="sub-page-wrap">
    <h3>MessageBox 弹框</h3>
    <p>模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容</p>
    <div class="panel panel-default">
      <div class="panel-body">从场景上说，MessageBox 的作用是美化系统自带的 alert、confirm 和 prompt，因此适合展示较为简单的内容。如果需要弹出较为复杂的内容，请使用 Modal。</div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">消息提示</h4>
        <p>当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。</p>
      </div>
      <div class="panel-body">
        <button class="btn btn-link" @click="openAlert">点击打开Message Box(alert)</button>
        <div class="panel panel-default">
          <div class="panel-body">
            调用$alert方法即可打开消息提示，它模拟了系统的 alert，无法通过按下 ESC 或点击框外关闭。此例中接收了两个参数，message和title。值得一提的是，窗口被关闭后，它默认会返回一个Promise对象便于进行后续操作的处理。若不确定浏览器是否支持Promise，可自行引入第三方 polyfill 或像本例一样使用回调进行后续处理。            
          </div>
        </div>
        <pre>
          this.$alert('这是一段内容', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              console.log('alert closed')
            }
          })
        </pre>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">确认消息</h4>
        <p>提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。</p>
      </div>
      <div class="panel-body">
        <button class="btn btn-link" @click="openConfirm">点击打开Message Box(confirm)</button>
        <div class="panel">
          <div class="panel-body">
            调用$confirm方法即可打开消息提示，它模拟了系统的 confirm。Message Box 组件也拥有极高的定制性，我们可以传入options作为第三个参数，它是一个字面量对象。注意，第一个参数可以是一个String类型，也可以是一个String数组；第二个参数title必须定义为String类型(默认值为"操作确认提示")，如果是Object，会被理解为options。在这里我们用了 Promise 来处理后续响应。
          </div>
        </div>
        <pre>
          this.$confirm(['删除后数据不可恢复', '确定要删除吗？'], '删除提示').then(() => {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            console.log('删除成功!')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
            console.log('已取消删除')
          })
        </pre>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">提交内容</h4>
        <p>当用户进行操作时会被触发，中断用户操作，提示用户进行输入的对话框。</p>
      </div>
      <div class="panel-body">
        <button class="btn btn-link" @click="openPrompt">点击打开Message Box(prompt)</button>
        <div class="panel">
          <div class="panel-body">
            调用$prompt方法即可打开消息提示，它模拟了系统的 prompt。可以用inputPattern字段自己规定匹配模式，或者用inputValidator规定校验函数，可以返回Boolean或String，返回false或字符串时均表示校验未通过，同时返回的字符串相当于定义了inputErrorMessage字段。此外，可以用inputPlaceholder字段来定义输入框的占位符。
          </div>
        </div>
        <pre>
          this.$prompt('请输入邮箱', '提示', {
            messageAlign: 'left',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputPlaceholder: '请输入邮箱',
            inputErrorMessage: '邮箱格式不正确'
          }).then(({ value }) => {
            this.$message({
              type: 'success',
              message: '你的邮箱是: ' + value
            })
            console.log(value)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
            console.log('取消输入')
          })
        </pre>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">自定义</h4>
        <p>可自定义配置不同内容。</p>
      </div>
      <div class="panel-body">
        <button class="btn btn-link" @click="openMsgbox">点击打开Message Box(msgbox)</button>
        <div class="panel">
          <div class="panel-body">
            以上三个方法都是对$msgbox方法的再包装。本例直接调用$msgbox方法，使用了showCancelButton字段，用于显示取消按钮。另外可使用cancelButtonClass为其添加自定义样式，使用cancelButtonText来自定义按钮文本（Confirm 按钮也具有相同的字段，在文末的字段说明中有完整的字段列表）。此例还使用了beforeClose属性，它的值是一个方法，会在 MessageBox 的实例关闭前被调用，同时暂停实例的关闭。它有三个参数：action、实例本身和done方法。使用它能够在关闭前对实例进行一些操作，比如为确定按钮添加loading状态等；此时若需要关闭实例，可以调用done方法（若在beforeClose中没有调用done，则实例不会关闭）。
          </div>
        </div>
        <pre>
          const h = this.$createElement
          this.$msgbox({
            title: '消息',
            message: h('p', null, [
              h('span', null, '内容可以是 '),
              h('i', { style: 'color: teal' }, 'VNode')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonText = '执行中...'
                setTimeout(() => {
                  done()
                }, 3000)
              } else {
                done()
              }
            }
          }).then(action => {
            this.$message({
              type: 'info',
              message: 'action: ' + action
            })
            console.log('action: ' + action)
          })
        </pre>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">使用 HTML 片段</h4>
        <p>message 属性支持传入 HTML 片段</p>
      </div>
      <div class="panel-body">
        <button class="btn btn-link" @click="openAlertWithHtml">点击打开Message Box(html)</button>
        <div class="panel">
          <div class="panel-body">
            将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          </div>
        </div>
        <pre>
          this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
            dangerouslyUseHTMLString: true
          })
        </pre>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">全局方法</h4>
        <p>现已经全局引入，Vue.prototype 添加如下全局方法：$msgbox, $alert, $confirm 和 $prompt。因此在 Vue instance 中可以采用本页面中的方式调用 MessageBox。调用参数为：</p>
      </div>
      <div class="panel-body">
        <ul>
          <li>$msgbox(options)</li>
          <li>$alert(message, title, options) 或 $alert(message, options)</li>
          <li>$confirm(message, title, options) 或 $confirm(message, options)</li>
          <li>$prompt(message, title, options) 或 $prompt(message, options)</li>
        </ul>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">单独引用</h4>
        <p>如果单独引入 MessageBox</p>
      </div>
      <div class="panel-body">
        <pre>import MessageBox from '@/components/message-box'</pre>
        <p>那么对应于上述四个全局方法的调用方法依次为：MessageBox, MessageBox.alert, MessageBox.confirm 和 MessageBox.prompt，调用参数与全局方法相同。</p>
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
    openAlert() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          console.log('alert closed')
        }
      })
    },
    openConfirm() {
      this.$confirm(['删除后数据不可恢复', '确定要删除吗？'], '删除提示').then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        console.log('删除成功!')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        console.log('已取消删除')
      })
    },
    openPrompt() {
      this.$prompt('请输入邮箱', '提示', {
        messageAlign: 'left',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputPlaceholder: '请输入邮箱',
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        })
        console.log(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
        console.log('取消输入')
      })
    },
    openMsgbox() {
      const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        })
        console.log('action: ' + action)
      })
    },
    openAlertWithHtml() {
      this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      })
    }
  }
}
</script>

<style>

</style>
