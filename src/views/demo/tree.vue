/*
 * @File: 树形控件
 * @Author: jhh678
 * @Date: 2018-03-28 16:47:05
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-28 16:47:37
 */

<template>
  <div class="sub-page-wrap">
    <div class="form-demo-header">
      <h3>Tree 树形控件</h3>
      <div class="text-muted">用清晰的层级结构展示信息，可展开或折叠。</div>
    </div>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>基础用法</h4>
        <div class="text-muted">基础的树形结构展示。</div>
      </div>
      <div class="panel-body">
        <b-tree :data="baseData" :props="baseProps" node-key="id" @node-click="handleNodeClick"></b-tree>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>可选择</h4>
        <div class="text-muted">适用于需要选择层级时使用。</div>
      </div>
      <div class="panel-body">
        <b-tree :props="selectProps" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange"></b-tree>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>懒加载自定义叶子节点</h4>
        <div class="text-muted">由于在点击节点时才进行该层数据的获取，默认情况下 Tree 无法预知某个节点是否为叶子节点，所以会为每个节点添加一个下拉按钮，如果节点没有下层数据，则点击后下拉按钮会消失。同时，你也可以提前告知 Tree 某个节点是否为叶子节点，从而避免在叶子节点前渲染下拉按钮。</div>
      </div>
      <div class="panel-body">
        <b-tree :props="lazyProps" :load="lazyLoadNode" lazy show-checkbox></b-tree>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>默认展开和默认选中</h4>
        <div class="text-muted">可将 Tree 的某些节点设置为默认展开或默认选中;分别通过default-expanded-keys和default-checked-keys设置默认展开和默认选中的节点。需要注意的是，此时必须设置node-key，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。</div>
      </div>
      <div class="panel-body">
        <b-tree :data="initDefaultData" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps"></b-tree>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>禁用状态</h4>
        <div class="text-muted">可将 Tree 的某些节点设置为禁用状态</div>
      </div>
      <div class="panel-body">
        <b-tree :data="disabledData" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps"></b-tree>
      </div>
    </section>

    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>树节点的选择</h4>
        <div class="text-muted">本例展示如何获取和设置选中节点。获取和设置各有两种方式：通过 node 或通过 key。如果需要通过 key 来获取或设置，则必须设置node-key。</div>
      </div>
      <div class="panel-body">
        <b-tree :data="initDefaultData" show-checkbox node-key="id" default-expand-all highlight-current :props="defaultProps" ref="tree"></b-tree>
        <div class="buttons">
          <button class="btn btn-default" @click="getCheckedNodes">通过 node 获取</button>
          <button class="btn btn-default" @click="getCheckedKeys">通过 key 获取</button>
          <button class="btn btn-default" @click="setCheckedNodes">通过 node 设置</button>
          <button class="btn btn-default" @click="setCheckedKeys">通过 key 设置</button>
          <button class="btn btn-default" @click="resetChecked">清空</button>
        </div>
      </div>
    </section>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>自定义节点内容</h4>
        <div class="text-muted">节点的内容支持自定义，可以在节点区添加按钮或图标等内容</div>
        <div class="text-muted">使用<code>render-content</code>指定渲染函数，该函数返回需要的节点区内容即可。渲染函数的用法请参考 Vue 文档。注意：由于 jsfiddle 不支持 JSX 语法，所以本例在 jsfiddle 中无法运行。但是在实际的项目中，只要正确地配置了相关依赖，就可以正常运行。</div>
      </div>
      <div class="panel-body">
        <b-tree :data="userDefinedData" :props="defaultProps" node-key="id" default-expand-all highlight-current :expand-on-click-node="false" :render-content="renderContent" ref="tree"></b-tree>
      </div>
    </section>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>节点过滤</h4>
        <div class="text-muted">通过关键字过滤树节点</div>
        <div class="text-muted">在需要对节点进行过滤时，调用 Tree 实例的filter方法，参数为关键字。需要注意的是，此时需要设置filter-node-method，值为过滤函数。</div>
      </div>
      <div class="panel-body">
        <b-input placeholder="输入关键字进行过滤" v-model="filterText"></b-input>
        <b-tree :data="userDefinedData" :props="defaultProps" :filter-node-method="filterNode" default-expand-all highlight-current ref="treeFilter"></b-tree>
      </div>
    </section>
    <section class="panel panel-default">
      <div class="panel-heading">
        <h4>手风琴模式</h4>
        <div class="text-muted">对于同一级的节点，每次只能展开一个</div>
      </div>
      <div class="panel-body">
        <b-tree :data="accordionData" :props="defaultProps" accordion @node-click="handleNodeClick" ref="treeFilter"></b-tree>
      </div>
    </section>
  </div>
</template>

<script>
import BInput from '@/components/input'
import BTree from '@/components/tree'

let id = 1000

export default {
  name: 'FormDemo',
  components: {
    BInput,
    BTree
  },
  data() {
    return {
      baseData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      baseProps: {
        children: 'children',
        label: 'label'
      },
      selectProps: {
        label: 'name',
        children: 'zones'
      },
      lazyProps: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      count: 1,
      initDefaultData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      disabledData: [{
        id: 1,
        label: '一级 2',
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2',
            disabled: true
          }]
        }, {
          id: 2,
          label: '二级 2-2',
          disabled: true,
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2',
            disabled: true
          }]
        }]
      }],
      userDefinedData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      accordionData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.treeFilter.filter(val)
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }])
      }
      if (node.level > 3) return resolve([])

      var hasChild
      if (node.data.name === 'region1') {
        hasChild = true
      } else if (node.data.name === 'region2') {
        hasChild = false
      } else {
        hasChild = Math.random() > 0.5
      }

      setTimeout(() => {
        var data
        if (hasChild) {
          data = [{
            name: 'zone' + this.count++
          }, {
            name: 'zone' + this.count++
          }]
        } else {
          data = []
        }

        resolve(data)
      }, 500)
    },
    lazyLoadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region' }])
      }
      if (node.level > 2) return resolve([])

      setTimeout(() => {
        const data = [{
          name: 'leaf',
          leaf: true
        }, {
          name: 'zone',
          zones: [{
            name: 'zonechild1',
            leaf: true
          },
          {
            name: 'zonechild2',
            leaf: true
          }]
        }]

        resolve(data)
      }, 500)
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }])
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3])
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    append(data) {
      const newChild = { id: id++, label: '添加测试', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span class="b-tree-node__label">{node.label}</span>
          <span style="float: right;">
            <button class="btn btn-link" style="padding: 4px; font-size: 12px;" type="text" on-click={() => this.append(data)}>添加</button>
            <button class="btn btn-link" style="padding: 4px; font-size: 12px;" type="text" on-click={() => this.remove(node, data)}>删除</button>
          </span>
        </span>)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
