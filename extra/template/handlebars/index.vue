<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" :inline="true" :model="searchData" size="small" label-width="68px">
        <el-form-item label="设备名称" prop="sbmc">
          <el-input v-model="searchData.sbmc" placeholder="请输入设备名称" clearable class="formItemStyle"
            @keyup.enter.native="search(1)" />
        </el-form-item>
        <el-form-item label="设备编号" prop="sbbh">
          <el-input v-model="searchData.sbbh" placeholder="请输入设备编号" clearable class="formItemStyle"
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
        <el-form-item label="设备名称" prop="sbmc">
          <el-input v-if="!isView" v-model="formData.sbmc" placeholder="请输入设备名称" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sbmc }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="设备编号" prop="sbbh">
          <el-input v-if="!isView" v-model="formData.sbbh" placeholder="请输入设备编号" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sbbh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="生成商" prop="scs">
          <el-input v-if="!isView" v-model="formData.scs" placeholder="请输入生成商" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.scs }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="检测项目" prop="jcxm">
          <el-input v-if="!isView" v-model="formData.jcxm" placeholder="请输入检测项目" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.jcxm }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="使用日期" prop="syrq">
          <el-input v-if="!isView" v-model="formData.syrq" placeholder="请输入使用日期" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.syrq }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="使用频率" prop="syps">
          <el-input v-if="!isView" v-model="formData.syps" placeholder="请输入使用频率" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.syps }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="所属科室" prop="ssks">
          <el-input v-if="!isView" v-model="formData.ssks" placeholder="请输入所属科室" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.ssks }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="科室负责人" prop="ksfzr">
          <el-input v-if="!isView" v-model="formData.ksfzr" placeholder="请输入科室负责人" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.ksfzr }}
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
              label: '设备名称',
              prop: 'sbmc',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '设备编号',
              prop: 'sbbh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '生成商',
              prop: 'scs',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '检测项目',
              prop: 'jcxm',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '使用日期',
              prop: 'syrq',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '使用频率',
              prop: 'syps',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '所属科室',
              prop: 'ssks',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '科室负责人',
              prop: 'ksfzr',
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
          sbmc: [
            { required: true, message: '请输入设备名称', trigger: 'blur' },
            {
              max: 64,
              message: '设备名称不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sbbh: [
            { required: true, message: '请输入设备编号', trigger: 'blur' },
            {
              max: 64,
              message: '设备编号不能超过64个字符',
              trigger: 'blur'
            },
          ],
          scs: [
            { required: true, message: '请输入生成商', trigger: 'blur' },
            {
              max: 64,
              message: '生成商不能超过64个字符',
              trigger: 'blur'
            },
          ],
          jcxm: [
            { required: true, message: '请输入检测项目', trigger: 'blur' },
            {
              max: 64,
              message: '检测项目不能超过64个字符',
              trigger: 'blur'
            },
          ],
          syrq: [
            { required: true, message: '请输入使用日期', trigger: 'blur' },
            {
              max: 64,
              message: '使用日期不能超过64个字符',
              trigger: 'blur'
            },
          ],
          syps: [
            { required: true, message: '请输入使用频率', trigger: 'blur' },
            {
              max: 64,
              message: '使用频率不能超过64个字符',
              trigger: 'blur'
            },
          ],
          ssks: [
            { required: true, message: '请输入所属科室', trigger: 'blur' },
            {
              max: 64,
              message: '所属科室不能超过64个字符',
              trigger: 'blur'
            },
          ],
          ksfzr: [
            { required: true, message: '请输入科室负责人', trigger: 'blur' },
            {
              max: 64,
              message: '科室负责人不能超过64个字符',
              trigger: 'blur'
            },
          ],
        },
        operationButton: [],
        // 字典数据
      }
    },
    async created() {
      // this.search()
      this.getDictData() 
    },
    mounted() {
      // this.tableOperationButton = this.$u.getButtons(['APPRAISE_EDIT', 'APPRAISE_VIEW'])
      this.tableOperationButton = [
         {
          code: 'USER_EDIT',
          // icon: 'iconfont icon-edit',
          method: 'view',
          name: '详情',
          requestType: 'post',
          type: '3',
          upload: false,
          url: '/platform/user/update'
        },
      ]
      // this.operationButton = this.$u.getButtons(['APPRAISE_ADD', 'APPRAISE_DEL'])
      this.operationButton = [
      ]
    },
    methods: {
      view() {
          console.log('view')
      },
      async getDictData() {
      },
      // 搜索
      search(current) {
        const flag = true
      if (flag) return
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
<style lang="scss" scoped></style>