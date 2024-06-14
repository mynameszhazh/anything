<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" :inline="true" :model="searchData" size="small" label-width="68px">
        <el-form-item label="报警内容" prop="alarmPriority">
          <el-input v-model="searchData.alarmPriority" placeholder="请输入报警内容" clearable class="formItemStyle"
            @keyup.enter.native="search(1)" />
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
        :common_content="tableData" @selectionChange="handleSelectionChange" @currentPageChange="handleCurrentChange"
        @currentSizeChange="handleSizeChange">
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
        <el-form-item label="报警时间" prop="startTime">
          <el-input v-if="!isView" v-model="formData.startTime" placeholder="请输入报警时间" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.startTime }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="报警设备" prop="deviceId">
          <el-input v-if="!isView" v-model="formData.deviceId" placeholder="请输入报警设备" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.deviceId }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="报警类型" prop="alarmType">
          <el-input v-if="!isView" v-model="formData.alarmType" placeholder="请输入报警类型" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.alarmType }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="报警内容" prop="alarmPriority">
          <el-input v-if="!isView" v-model="formData.alarmPriority" placeholder="请输入报警内容" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.alarmPriority }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="操作" prop="details">
          <el-input v-if="!isView" v-model="formData.details" placeholder="请输入操作" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.details }}
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
              label: '报警时间',
              prop: 'startTime',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '报警设备',
              prop: 'deviceId',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '报警类型',
              prop: 'alarmType',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '报警内容',
              prop: 'alarmPriority',
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
          startTime: [
            { required: true, message: '请输入报警时间', trigger: 'blur' },
            {
              max: 64,
              message: '报警时间不能超过64个字符',
              trigger: 'blur'
            },
          ],
          deviceId: [
            { required: true, message: '请输入报警设备', trigger: 'blur' },
            {
              max: 64,
              message: '报警设备不能超过64个字符',
              trigger: 'blur'
            },
          ],
          alarmType: [
            { required: true, message: '请输入报警类型', trigger: 'blur' },
            {
              max: 64,
              message: '报警类型不能超过64个字符',
              trigger: 'blur'
            },
          ],
          alarmPriority: [
            { required: true, message: '请输入报警内容', trigger: 'blur' },
            {
              max: 64,
              message: '报警内容不能超过64个字符',
              trigger: 'blur'
            },
          ],
          details: [
            { required: true, message: '请输入操作', trigger: 'blur' },
            {
              max: 64,
              message: '操作不能超过64个字符',
              trigger: 'blur'
            },
          ],
        },
        operationButton: [],
        // 字典数据
      }
    },
    async created() {
      this.search()
      this.getDictData() 
    },
    mounted() {
      this.tableOperationButton = this.$u.getButtons(['APPRAISE_EDIT', 'APPRAISE_VIEW'])
      this.operationButton = this.$u.getButtons(['APPRAISE_ADD', 'APPRAISE_DEL'])
    },
    methods: {
      async getDictData() {
      },
      // 搜索
      search(current) {
        if (current) {
          this.pagination.current = current
        }
        this.loading = true
        const { url, requestType } = this.$u.getButtons("APPRAISE_SEARCH")[0]
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
<style lang="less" scoped></style>