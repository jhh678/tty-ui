<template>
  <div
    class="b-tree"
    :class="{ 'b-tree--highlight-current': highlightCurrent }"
    role="tree"
  >
    <b-tree-node
      v-for="child in root.childNodes"
      :node="child"
      :props="props"
      :key="getNodeKey(child)"
      :render-content="renderContent"
      @node-expand="handleNodeExpand">
    </b-tree-node>
    <div class="b-tree__empty-block" v-if="!root.childNodes || root.childNodes.length === 0">
      <span class="b-tree__empty-text">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script>
import TreeStore from './utils/tree-store'
import BTreeNode from './tree-node.vue'
import Emitter from '@/utils/mixins/emitter'
export default {
  name: 'BTree',
  componentName: 'BTree',
  mixins: [Emitter],
  components: {
    BTreeNode
  },
  data() {
    return {
      store: null,
      root: null,
      currentNode: null,
      treeItems: null,
      checkboxItems: []
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    emptyText: {
      type: String,
      default() {
        return '暂无数据'
      }
    },
    nodeKey: { type: String, default: 'value' },
    checkStrictly: Boolean,
    defaultExpandAll: Boolean,
    leafMode: {
      type: Boolean,
      default: true
    },
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    checkDescendants: {
      type: Boolean,
      default: false
    },
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false
    },
    props: {
      default() {
        return {
          children: 'children',
          label: 'label',
          icon: 'icon',
          disabled: 'disabled'
        }
      }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    highlightCurrent: { type: Boolean, default: true },
    load: Function,
    filterNodeMethod: Function,
    accordion: Boolean,
    indent: {
      type: Number,
      default: 14
    }
  },
  computed: {
    children: {
      set(value) {
        this.data = value
      },
      get() {
        return this.data
      }
    },
    treeItemArray() {
      return Array.prototype.slice.call(this.treeItems)
    }
  },
  watch: {
    defaultCheckedKeys(newVal) {
      this.store.defaultCheckedKeys = newVal
      this.store.setDefaultCheckedKey(newVal)
    },
    defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal
      this.store.setDefaultExpandedKeys(newVal)
    },
    data(newVal) {
      this.store.setData(newVal)
    },
    checkboxItems(val) {
      Array.prototype.forEach.call(val, (checkbox) => {
        checkbox.setAttribute('tabindex', -1)
      })
    }
  },
  methods: {
    filter(value) {
      if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter')
      this.store.filter(value)
    },
    getNodeKey(node, index) {
      const nodeKey = this.nodeKey
      if (nodeKey && node) {
        return node.data[nodeKey]
      }
      return index
    },
    getCheckedNodes(leafOnly) {
      return this.store.getCheckedNodes(leafOnly)
    },
    getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly)
    },
    getCurrentNode() {
      const currentNode = this.store.getCurrentNode()
      return currentNode ? currentNode.data : null
    },
    getCurrentKey() {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey')
      const currentNode = this.getCurrentNode()
      return currentNode ? currentNode[this.nodeKey] : null
    },
    setCheckedNodes(nodes, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes')
      this.store.setCheckedNodes(nodes, leafOnly)
    },
    setCheckedKeys(keys, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys')
      this.store.setCheckedKeys(keys, leafOnly)
    },
    setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep)
    },
    setCurrentNode(node) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode')
      this.store.setUserCurrentNode(node)
    },
    setCurrentKey(key) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey')
      this.store.setCurrentNodeKey(key)
    },
    handleNodeExpand(nodeData, node, instance) {
      this.broadcast('BTreeNode', 'tree-node-expand', node)
      this.$emit('node-expand', nodeData, node, instance)
    },
    updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild')
      this.store.updateChildren(key, data)
    },
    initTabindex() {
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]')
      this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]')
      const checkedItem = this.$el.querySelectorAll('.is-checked[role=treeitem]')
      if (checkedItem.length) {
        checkedItem[0].setAttribute('tabindex', 0)
        return
      }
      this.treeItems[0].setAttribute('tabindex', 0)
    },
    handelKeydown(ev) {
      const currentItem = ev.target
      const keyCode = ev.keyCode
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]')
      const currentIndex = this.treeItemArray.indexOf(currentItem)
      let nextIndex
      if ([38, 40].indexOf(keyCode) > -1) { // up、down
        if (keyCode === 38) { // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
        } else {
          nextIndex = (currentIndex < this.treeItemArray.length - 1) ? currentIndex + 1 : 0
        }
        this.treeItemArray[nextIndex].focus() // 选中
      }
      const hasInput = currentItem.querySelector('[type="checkbox"]')
      if ([37, 39].indexOf(keyCode) > -1) { // left、right 展开
        currentItem.click() // 选中
      }
      if ([13, 32].indexOf(keyCode) > -1) { // space enter选中checkbox
        if (hasInput) {
          hasInput.click()
        }
        ev.stopPropagation()
        ev.preventDefault()
      }
    }
  },
  created() {
    this.isTree = true
    this.store = new TreeStore({
      key: this.nodeKey,
      data: this.data,
      lazy: this.lazy,
      props: this.props,
      load: this.load,
      currentNodeKey: this.currentNodeKey,
      checkStrictly: this.checkStrictly,
      checkDescendants: this.checkDescendants,
      defaultCheckedKeys: this.defaultCheckedKeys,
      defaultExpandedKeys: this.defaultExpandedKeys,
      autoExpandParent: this.autoExpandParent,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod,
      leafMode: this.leafMode
    })
    this.root = this.store.root
  },
  mounted() {
    if (this.data.length) {
      this.initTabindex()
    }
    this.$el.addEventListener('keydown', this.handelKeydown)
  },
  updated() {
    this.treeItems = this.$el.querySelectorAll('[role=treeitem]')
    this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]')
  }
}
</script>

<style lang="scss">
.b-tree {
  cursor: default;
}
.b-tree__empty-block {
  position: relative;
  min-height: 60px;
  text-align: center;
  width: 100%;
  height: 100%;
}
.b-tree__empty-text {
  position: absolute;
  left: 50%;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #5e7382;
}
.b-tree-node {
  white-space: nowrap;
  outline: none;
}
.b-tree-node > .b-tree-node__children {
  overflow: hidden;
  background-color: transparent;
}
.b-tree-node.is-expanded > .b-tree-node__children {
  display: block;
}
.b-tree-node__expand-icon,
.b-tree-node__label,
.b-tree-node__loading-icon {
  display: inline-block;
  vertical-align: middle;
}
.b-tree-node__content {
  line-height: 36px;
  height: 36px;
  padding-right: 10px;
  cursor: pointer;
  font-size: 0;
}
// .b-tree-node__content > .b-checkbox,
// .b-tree-node__content > .b-tree-node__expand-icon {
//   margin-right: 5px;
// }
.b-tree-node__content > .b-checkbox {
  vertical-align: middle;
}
.b-tree-node__content:hover {
  background-color: #ffd;
}
.b-tree-node__expand-icon {
  position: relative;
  cursor: pointer;
  width: 13px;
  height: 13px;
  border: 1px solid #666;
}
.b-tree-node__expand-icon:before,
.b-tree-node__expand-icon:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 2px;
  z-index: 10;
  display: block;
  width: 7px;
  height: 1px;
  background-color: #666;
  font-size: 7px;
  line-height: 7px;
}
.b-tree-node__expand-icon:after {
  transform: rotate(90deg);
  transition: transform 0.3s ease-in-out;
}
.b-tree-node__expand-icon.expanded:after {
  transform: rotate(0deg);
}
.b-tree-node__expand-icon.is-leaf {
  display: none;
  opacity: 0;
}
.b-tree-node__expand-icon.is-leaf:before,
.b-tree-node__expand-icon.is-leaf:after {
  display: none;
}
.b-tree-node__label {
  margin-left: 6px;
  font-size: 14px;
  color: #333;
}
.b-tree-node__loading-icon {
  margin-right: 4px;
  font-size: 14px;
  color: rgb(151, 190, 171);
}
.b-tree--highlight-current .b-tree-node.is-current > .b-tree-node__content {
  background-color: #ffb;
}

.b-tree-node:focus > .b-tree-node__content {
  background-color: #ffd;
}

.b-tree--highlight-current
  .b-tree-node.is-current
  > .b-tree-node__content:hover {
  background-color: #ff9;
}
.collapse-transition {
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out,
    0.3s padding-bottom ease-in-out;
}

.b-tree .b-checkbox {
  margin: 0 0 auto 6px !important;
}
</style>
