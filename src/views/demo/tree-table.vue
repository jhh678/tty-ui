<template>
  <div class="sub-page-wrap">
    <tree-grid
      :items='data'
      :columns='columns'>
      <template slot="operations" slot-scope="scope">
        <span @click="edit(scope.item)">编辑</span>
        <span @click="remove(scope.item)">删除</span>
        <span @click="toForbid(scope.item)">禁用</span>
        <span @click="band(scope.item)">银行</span><br/>
        <span @click="addOrganization(scope.item)">新增组织</span>
        <span @click="addDepatment(scope.item)">新增部门</span>
      </template>
    </tree-grid>
  </div>
</template>

<script>
import TreeGrid from '@/components/table/tree-table-node'
export default {
  data() {
    return {
      columns: [
        {
          title: '组织/部门名称',
          key: 'department',
          width: '264'
        }, {
          title: '编码',
          key: 'code',
          width: '110'
        }, {
          title: '简称',
          key: 'easyName',
          width: '208'
        }, {
          title: '类型',
          key: 'type',
          width: '110'
        }, {
          title: '法人/负责人',
          key: 'head',
          width: '124'
        }, {
          title: '状态',
          key: 'status',
          width: '82'
        }
      ],
      data: [
        {
          department: '河南邦元保值公司',
          code: '0001',
          type: '组织',
          status: '启用',
          head: '张三',
          easyName: '河南邦公司',
          children: [
            {
              department: '总经办',
              code: '00012',
              type: '组织',
              status: '启用',
              head: '张三',
              easyName: '河南邦公司'
            },
            {
              department: '深圳子公司',
              code: '123',
              type: '组织',
              status: '启用',
              head: '张三',
              easyName: '深圳子公司',
              children: [{
                department: '水贝直营店',
                code: '0012301',
                type: '组织',
                status: '启用',
                head: '张三',
                easyName: '水贝直营店',
                children: [
                  {
                    department: '白石洲专营店给',
                    code: '123132',
                    type: '部门',
                    status: '启用',
                    head: '张三',
                    easyName: '白石洲专营店给',
                    disabled: true
                  },
                  {
                    department: '西乡加盟店',
                    code: '3321',
                    type: '部门',
                    status: '启用',
                    head: '张三',
                    easyName: '西乡加盟店'
                  }
                ]
              }, {
                department: '河南邦元保值公司',
                code: '0001',
                type: '部门',
                status: '启用',
                head: '张三',
                easyName: '河南邦公司'
              }]
            }, {
              department: '河南邦元保值公司',
              code: '0001',
              type: '部门',
              status: '启用',
              head: '张三',
              easyName: '河南邦公司'
            }, {
              department: '河南邦元保值公司',
              code: '0001',
              type: '部门',
              status: '启用',
              head: '张三',
              easyName: '河南邦公司'
            }
          ]
        }
      ]
    }
  },
  components: {
    TreeGrid
  },
  methods: {
    edit(data) {
      if (data.disabled) {
        return
      }
      console.log(data)
    },
    remove(data) {
      if (data.disabled) {
        return
      }
      console.log(data)
    },
    toForbid(data) {
      if (data.disabled) {
        return
      }
      console.log(data)
    },
    band(data) {
      if (data.disabled) {
        return
      }
      console.log(data)
    },
    addOrganization(data) {
      if (data.disabled) {
        return
      }
      console.log(data)
    },
    addDepatment(data) {
      if (data.disabled) {
        return
      }
      console.log(data)
    }
  }
}
</script>
