<template>
  <div class="app-container">
    <el-card>
      <el-form
        ref="queryForm"
        :inline="true"
        :model="searchData"
        size="small"
        label-width="68px"
      >
        <el-form-item label="用户ID" prop="yhid">
          <el-input
            v-model="searchData.yhid"
            placeholder="请输入用户ID"
            clearable
            class="formItemStyle"
            @keyup.enter.native="search(1)"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="cyan" icon="el-icon-search" @click="search(1)"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" @click="resetSearch"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <div class="cart-distance"></div>
    <el-card>
      <Buttons :button-list="operationButton" @buttonEvent="buttonEvent" />
      <CommonTable
        ref="userTable"
        style="margin-top: 10px"
        :loading="loading"
        :config="tableHead"
        :common_content="tableData"
        @selectionChange="handleSelectionChange"
        @currentPageChange="currentPageChange"
        @currentSizeChange="currentSizeChange"
      >
        <template slot="details" slot-scope="{ row }">
          <span
            v-for="(item, index) in tableOperationButton"
            :key="index"
            class="handler"
            @click="clickButton(row, item)"
            >{{ item.name }}</span
          >
        </template>
      </CommonTable>
    </el-card>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :title="dialogTitle"
      @close="closeDialog"
    >
      <el-form
        ref="form"
        :inline="true"
        size="small"
        :model="formData"
        :label-position="labelPosition"
        :label-width="formLabelWidth"
        :rules="rules"
      >
        <el-form-item label="用户ID" prop="yhid">
          <el-input
            v-if="!isView"
            v-model="formData.yhid"
            placeholder="请输入用户ID"
            clearable
            class="formItemStyle"
            @keyup.enter.native="search(1)"
          />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yhid }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="用户权益" prop="yhqx">
          <el-input
            v-if="!isView"
            v-model="formData.yhqx"
            placeholder="请输入用户权益"
            clearable
            class="formItemStyle"
            @keyup.enter.native="search(1)"
          />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yhqx }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="权益次数" prop="yhcs">
          <el-input
            v-if="!isView"
            v-model.number="formData.yhcs"
            placeholder="请输入权益次数"
            clearable
            class="formItemStyle"
            @keyup.enter.native="search(1)"
          />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yhcs }}
            </div>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button
          v-if="!isView"
          type="primary"
          :loading="submitLoding"
          @click="onSubmit"
          >确 定</el-button
        >
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
            label: '用户ID',
            prop: 'yhid',
            attrs: {
              align: 'center',
              'show-overflow-tooltip': true
            }
          },
          {
            label: '用户权益',
            prop: 'yhqx',
            attrs: {
              align: 'center',
              'show-overflow-tooltip': true
            }
          },
          {
            label: '权益次数',
            prop: 'yhcs',
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
          }
        ]
      },
      getDict,
      formData: {
        usabled: 0
      },
      rules: {
        yhid: [
          { required: true, message: '请输入用户ID', trigger: 'blur' },
          {
            max: 64,
            message: '用户ID不能超过64个字符',
            trigger: 'blur'
          }
        ],
        yhqx: [
          { required: true, message: '请输入用户权益', trigger: 'blur' },
          {
            max: 64,
            message: '用户权益不能超过64个字符',
            trigger: 'blur'
          }
        ],
        yhcs: [{ required: true, message: '请输入权益次数', trigger: 'blur' }],
        remark: [
          {
            max: 512,
            message: 'remark不能超过512个字符',
            trigger: 'blur'
          }
        ]
      },
      operationButton: []
      // 字典数据
    }
  },
  async created() {
    this.search()
    this.getDictData()
  },
  mounted() {
    this.tableOperationButton = this.$u.getButtons([
      'CONSUMER_RIGHT_EDIT',
      'CONSUMER_RIGHT_VIEW'
    ])
    this.operationButton = this.$u.getButtons([
      'CONSUMER_RIGHT_ADD',
      'CONSUMER_RIGHT_DEL'
    ])
  },
  methods: {
    async getDictData() {},
    // 搜索
    search(current) {
      if (current) {
        this.pagination.current = current
      }
      this.loading = true
      const { url, requestType } = this.$u.getButtons(
        'CONSUMER_RIGHT_SEARCH'
      )[0]
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
