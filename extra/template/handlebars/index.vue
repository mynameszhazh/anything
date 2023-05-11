<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" :inline="true" :model="searchData" size="small" label-width="68px">
        <el-form-item label="用户姓名" prop="yhxm">
          <el-input v-model="searchData.yhxm" placeholder="请输入用户姓名" clearable class="formItemStyle"
            @keyup.enter.native="search(1)" />
        </el-form-item>
        <el-form-item label="用户电话" prop="yhdh">
          <el-input v-model="searchData.yhdh" placeholder="请输入用户电话" clearable class="formItemStyle"
            @keyup.enter.native="search(1)" />
        </el-form-item>
        <el-form-item label="用户级别" prop="yhjb">
          <el-select v-if="!isView" v-model="searchData.yhjb" class="formItemStyle" clearable
            placeholder="用户级别">
            <el-option v-for="(item, index) of YHJB" :key="index" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="cyan" icon="el-icon-search" @click="search(1)">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="cart-distance"></div>
    <el-card>
      <Buttons :button-list="operationButton" @buttonEvent="buttonEvent" />
      <CommonTable ref="userTable" style="margin-top: 10px" :loading="loading" :config="tableHead"
        :common_content="tableData" @selectionChange="handleSelectionChange" @currentPageChange="currentPageChange"
        @currentSizeChange="currentSizeChange">
        <span slot="yhjb" slot-scope="{ row }">
          {{rgetDict(YHJB, row.yhjb) }}
        </span>
        <span slot="xzqh" slot-scope="{ row }">
          {{rgetDict(XZQH, row.xzqh) }}
        </span>
        <span slot="splx" slot-scope="{ row }">
          {{rgetDict(SPLX, row.splx) }}
        </span>
        <template slot="details" slot-scope="{ row }">
          <span v-for="(item, index) in tableOperationButton" :key="index" class="handler"
            @click="clickButton(row, item)">{{ item.name }}</span>
        </template>
      </CommonTable>
    </el-card>
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" :title="dialogTitle"
      @close="closeDialog">
      <el-form ref="form" :inline="true" size="small" :model="formData" :label-position="labelPosition"
        :label-width="formLabelWidth" :rules="rules">
        <el-form-item label="用户姓名" prop="yhxm">
          <el-input v-if="!isView" v-model="formData.yhxm" placeholder="请输入用户姓名" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yhxm }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="用户电话" prop="yhdh">
          <el-input v-if="!isView" v-model="formData.yhdh" placeholder="请输入用户电话" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yhdh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="用户设备" prop="yhsb">
          <el-input v-if="!isView" v-model="formData.yhsb" placeholder="请输入用户设备" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yhsb }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="用户级别" prop="yhjb">
          <el-select v-if="!isView" v-model="formData.yhjb" class="formItemStyle" clearable
            placeholder="用户级别">
            <el-option v-for="(item, index) of YHJB" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yhjb }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="用户地址" prop="yhdz">
          <el-input v-if="!isView" v-model="formData.yhdz" placeholder="请输入用户地址" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yhdz }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="行政区划" prop="xzqh">
          <el-select
            v-if="!isView"
            ref="selectTree"
            :value="getDict(XZQH, formData.xzqh)"
            class="formItemStyle"
            placeholder="请选择行政区划"
            clearable
          >
            <el-option
              v-for="item in XZQH"
              :key="item.code"
              :label="item.name"
              :value="item.id"
              style="display: none"
            />
            <el-tree
              ref="selecteltree"
              :data="XZQH"
              node-key="id"
              highlight-current
              :props="defaultProps"
              :current-node-key="formData.pid"
              :expand-on-click-node="true"
              default-expand-all
              @node-click="handleNodeClick"
            />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.xzqh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="使用权益" prop="syqy">
          <el-input v-if="!isView" v-model="formData.syqy" placeholder="请输入使用权益" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.syqy }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="服务内容/卡券内容/商品描述" prop="spnr">
          <el-input v-if="!isView" v-model="formData.spnr" placeholder="请输入服务内容/卡券内容/商品描述" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.spnr }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="商品类型" prop="splx">
          <el-select v-if="!isView" v-model="formData.splx" class="formItemStyle" clearable
            placeholder="商品类型">
            <el-option v-for="(item, index) of SPLX" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.splx }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="服务范围" prop="spfw">
          <el-input v-if="!isView" v-model="formData.spfw" placeholder="请输入服务范围" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.spfw }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="商品单价" prop="spdj">
          <el-input v-if="!isView" v-model.number="formData.spdj" placeholder="请输入商品单价" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.spdj }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="商家名称" prop="sjmc">
          <el-input v-if="!isView" v-model="formData.sjmc" placeholder="请输入商家名称" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sjmc }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="商家分类" prop="sjfl">
          <el-input v-if="!isView" v-model="formData.sjfl" placeholder="请输入商家分类" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sjfl }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="商家地址" prop="sjdz">
          <el-input v-if="!isView" v-model="formData.sjdz" placeholder="请输入商家地址" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sjdz }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="商家电话" prop="sjdh">
          <el-input v-if="!isView" v-model="formData.sjdh" placeholder="请输入商家电话" clearable
            class="formItemStyle" @keyup.enter.native="search(1)" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sjdh }}
            </div>
          </template>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button v-if="!isView" type="primary" :loading="submitLoding" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { buttonMixin, calcTableHeightMixin } from '@/mixins/index'
  import { getDict } from '@/utils/index.js'

  export default {
    mixins: [buttonMixin, calcTableHeightMixin],
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name',
          disabled: 'disabled'
        },
        tableHead: {
          hide_order: true,
          attrs: {
            height: 'calc(100vh - 240px)',
            'header-cell-style': { background: '#fafafa', color: '#101010' },
            border: true,
            'row-key': this.getRowKeys
          },
          props: [
            {
              label: '用户姓名',
              prop: 'yhxm',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '用户电话',
              prop: 'yhdh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '用户设备',
              prop: 'yhsb',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '用户级别',
              prop: 'yhjb',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '用户地址',
              prop: 'yhdz',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '行政区划',
              prop: 'xzqh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '使用权益',
              prop: 'syqy',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '服务内容/卡券内容/商品描述',
              prop: 'spnr',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '商品类型',
              prop: 'splx',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '服务范围',
              prop: 'spfw',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '商品单价',
              prop: 'spdj',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '商家名称',
              prop: 'sjmc',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '商家分类',
              prop: 'sjfl',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '商家地址',
              prop: 'sjdz',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '商家电话',
              prop: 'sjdh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '备注',
              prop: 'remark',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '操作',
              prop: 'details',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
          ]
        },
        getDict,
        formData: {
          usabled: 0
        },
        rules: {
          yhxm: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' },
            {
              max: 64,
              message: '用户姓名不能超过64个字符',
              trigger: 'blur'
            },
          ],
          yhdh: [
            { required: true, message: '请输入用户电话', trigger: 'blur' },
            {
              max: 64,
              message: '用户电话不能超过64个字符',
              trigger: 'blur'
            },
          ],
          yhsb: [
            { required: true, message: '请输入用户设备', trigger: 'blur' },
            {
              max: 64,
              message: '用户设备不能超过64个字符',
              trigger: 'blur'
            },
          ],
          yhjb: [
            { required: true, message: '请选择用户级别', trigger: 'change' },
          ],
          yhdz: [
            { required: true, message: '请输入用户地址', trigger: 'blur' },
            {
              max: 64,
              message: '用户地址不能超过64个字符',
              trigger: 'blur'
            },
          ],
          syqy: [
            { required: true, message: '请输入使用权益', trigger: 'blur' },
            {
              max: 64,
              message: '使用权益不能超过64个字符',
              trigger: 'blur'
            },
          ],
          spnr: [
            { required: true, message: '请输入服务内容/卡券内容/商品描述', trigger: 'blur' },
            {
              max: 64,
              message: '服务内容/卡券内容/商品描述不能超过64个字符',
              trigger: 'blur'
            },
          ],
          splx: [
            { required: true, message: '请选择商品类型', trigger: 'change' },
          ],
          spfw: [
            { required: true, message: '请输入服务范围', trigger: 'blur' },
            {
              max: 64,
              message: '服务范围不能超过64个字符',
              trigger: 'blur'
            },
          ],
          spdj: [
            { required: true, message: '请输入商品单价', trigger: 'blur' }
          ],
          sjmc: [
            { required: true, message: '请输入商家名称', trigger: 'blur' },
            {
              max: 64,
              message: '商家名称不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sjfl: [
            { required: true, message: '请输入商家分类', trigger: 'blur' },
            {
              max: 64,
              message: '商家分类不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sjdz: [
            { required: true, message: '请输入商家地址', trigger: 'blur' },
            {
              max: 64,
              message: '商家地址不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sjdh: [
            { required: true, message: '请输入商家电话', trigger: 'blur' },
            {
              max: 64,
              message: '商家电话不能超过64个字符',
              trigger: 'blur'
            },
          ],
          remark: [
            {
              max: 512,
              message: 'remark不能超过512个字符',
              trigger: 'blur'
            }
          ],
        },
        operationButton: [],
        // 字典数据
        YHJB: [],
        XZQH: [],
        SPLX: [],
      }
    },
    async created() {
      this.search()
      this.getDictData() 
    },
    mounted() {
      this.tableOperationButton = this.$u.getButtons(['114_ORDER_EDIT', '114_ORDER_VIEW'])
      this.operationButton = this.$u.getButtons(['114_ORDER_ADD', '114_ORDER_DEL'])
    },
    methods: {
      handleNodeClick(node) {
        // this.$set(this.formData, 'xzqh', node.id.trim())
        this.$refs.selectTree.blur()
      },
      async getDictData() {
        this.YHJB = await this.$u.getTree("114_USER_LEVEL")
        this.XZQH = await this.$u.getTree("NAVBASIC_REGION")
        this.SPLX = await this.$u.getTree("NAVBASIC_SPLX")
      },
      // 搜索
      search(current) {
        if (current) {
          this.pagination.current = current
        }
        this.loading = true
        const { url, requestType } = this.$u.getButtons("114_ORDER_SEARCH")[0]
        this.$service({
          url,
          method: requestType,
          data: {
            ...this.searchData,
            current: this.pagination.current,
            size: this.pagination.size
          }
        })
          .then(({ success, data, message }) => {
            if (success) {
              if (this.pagination.current !== 1 && data.records.length === 0) {
                this.pagination.current--
                this.$refs.userTable.setPageCurrent(this.pagination.current)
                this.search()
              } else {
                this.tableData = data.records
                this.$refs.userTable.page.size = data.size
                this.$refs.userTable.setPageTotal(data.total)
                this.loading = false
              }
            }
          })
          .catch(() => {
            this.loading = false
          })
      },
      currentPageChange(page) {
        if (this.pagination.current === page) return
        this.pagination.current = page
        this.search()
      },
      currentSizeChange(size) {
        this.pagination.size = size
        this.search(1)
      },
      // 表单提交
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.submitLoding = true
            this.$service({
              url: this.dialogUrl,
              method: this.requestType,
              data: {
                ...this.formData
              }
            })
              .then(({ success, data, message }) => {
                if (success) {
                  this.$message({
                    message: message,
                    type: 'success'
                  })
                  this.search()
                  this.submitLoding = false
                  this.dialogFormVisible = false
                }
              })
              .catch(() => {
                this.submitLoding = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 关闭弹框
      closeDialog() {
        this.resetForm()
      },
      resetForm() {
        this.$refs.form && this.$refs.form.resetFields()
        this.formData = {
          usabled: 0
        }
      }
    }
  }
</script>
<style lang="scss" scoped></style>