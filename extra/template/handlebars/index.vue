<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" :inline="true" :model="searchData" size="small" label-width="68px">
        <el-form-item label="仪器名称" prop="yqmc">
          <el-input v-model="searchData.yqmc" placeholder="请输入仪器名称" clearable class="formItemStyle"
            @keyup.enter.native="search(1)" />
        </el-form-item>
        <el-form-item label="编号" prop="bh">
          <el-input v-model="searchData.bh" placeholder="请输入编号" clearable class="formItemStyle"
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
        <el-form-item label="序号" prop="xh">
          <el-input v-if="!isView" v-model="formData.xh" placeholder="请输入序号" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.xh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="仪器名称" prop="yqmc">
          <el-input v-if="!isView" v-model="formData.yqmc" placeholder="请输入仪器名称" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yqmc }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="型号规格" prop="xhgg">
          <el-input v-if="!isView" v-model="formData.xhgg" placeholder="请输入型号规格" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.xhgg }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="使用次数" prop="sycs">
          <el-input v-if="!isView" v-model="formData.sycs" placeholder="请输入使用次数" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sycs }}
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
        <el-form-item label="测量范围" prop="clfw">
          <el-input v-if="!isView" v-model="formData.clfw" placeholder="请输入测量范围" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.clfw }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="生产厂家" prop="sccj">
          <el-input v-if="!isView" v-model="formData.sccj" placeholder="请输入生产厂家" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sccj }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="编号" prop="bh">
          <el-input v-if="!isView" v-model="formData.bh" placeholder="请输入编号" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.bh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="出厂日期" prop="ccrq">
          <el-input v-if="!isView" v-model="formData.ccrq" placeholder="请输入出厂日期" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.ccrq }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="状态" prop="zt">
          <el-input v-if="!isView" v-model="formData.zt" placeholder="请输入状态" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.zt }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="溯源方式" prop="syfs">
          <el-input v-if="!isView" v-model="formData.syfs" placeholder="请输入溯源方式" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.syfs }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="溯源单位" prop="sydw">
          <el-input v-if="!isView" v-model="formData.sydw" placeholder="请输入溯源单位" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sydw }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="校准日期" prop="xzrq">
          <el-input v-if="!isView" v-model="formData.xzrq" placeholder="请输入校准日期" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.xzrq }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="有效日期" prop="yxrq">
          <el-input v-if="!isView" v-model="formData.yxrq" placeholder="请输入有效日期" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yxrq }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="确认结果" prop="qrjg">
          <el-input v-if="!isView" v-model="formData.qrjg" placeholder="请输入确认结果" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.qrjg }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="存放地点" prop="cfdd">
          <el-input v-if="!isView" v-model="formData.cfdd" placeholder="请输入存放地点" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.cfdd }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="备注" prop="bz">
          <el-input v-if="!isView" v-model="formData.bz" placeholder="请输入备注" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.bz }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="计量要求" prop="jlyq">
          <el-input v-if="!isView" v-model="formData.jlyq" placeholder="请输入计量要求" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.jlyq }}
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
              label: '序号',
              prop: 'xh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '仪器名称',
              prop: 'yqmc',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '型号规格',
              prop: 'xhgg',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '使用次数',
              prop: 'sycs',
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
              label: '测量范围',
              prop: 'clfw',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '生产厂家',
              prop: 'sccj',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '编号',
              prop: 'bh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '出厂日期',
              prop: 'ccrq',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '状态',
              prop: 'zt',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '溯源方式',
              prop: 'syfs',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '溯源单位',
              prop: 'sydw',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '校准日期',
              prop: 'xzrq',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '有效日期',
              prop: 'yxrq',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '确认结果',
              prop: 'qrjg',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '存放地点',
              prop: 'cfdd',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '备注',
              prop: 'bz',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '计量要求',
              prop: 'jlyq',
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
          xh: [
            { required: true, message: '请输入序号', trigger: 'blur' },
            {
              max: 64,
              message: '序号不能超过64个字符',
              trigger: 'blur'
            },
          ],
          yqmc: [
            { required: true, message: '请输入仪器名称', trigger: 'blur' },
            {
              max: 64,
              message: '仪器名称不能超过64个字符',
              trigger: 'blur'
            },
          ],
          xhgg: [
            { required: true, message: '请输入型号规格', trigger: 'blur' },
            {
              max: 64,
              message: '型号规格不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sycs: [
            { required: true, message: '请输入使用次数', trigger: 'blur' },
            {
              max: 64,
              message: '使用次数不能超过64个字符',
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
          clfw: [
            { required: true, message: '请输入测量范围', trigger: 'blur' },
            {
              max: 64,
              message: '测量范围不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sccj: [
            { required: true, message: '请输入生产厂家', trigger: 'blur' },
            {
              max: 64,
              message: '生产厂家不能超过64个字符',
              trigger: 'blur'
            },
          ],
          bh: [
            { required: true, message: '请输入编号', trigger: 'blur' },
            {
              max: 64,
              message: '编号不能超过64个字符',
              trigger: 'blur'
            },
          ],
          ccrq: [
            { required: true, message: '请输入出厂日期', trigger: 'blur' },
            {
              max: 64,
              message: '出厂日期不能超过64个字符',
              trigger: 'blur'
            },
          ],
          zt: [
            { required: true, message: '请输入状态', trigger: 'blur' },
            {
              max: 64,
              message: '状态不能超过64个字符',
              trigger: 'blur'
            },
          ],
          syfs: [
            { required: true, message: '请输入溯源方式', trigger: 'blur' },
            {
              max: 64,
              message: '溯源方式不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sydw: [
            { required: true, message: '请输入溯源单位', trigger: 'blur' },
            {
              max: 64,
              message: '溯源单位不能超过64个字符',
              trigger: 'blur'
            },
          ],
          xzrq: [
            { required: true, message: '请输入校准日期', trigger: 'blur' },
            {
              max: 64,
              message: '校准日期不能超过64个字符',
              trigger: 'blur'
            },
          ],
          yxrq: [
            { required: true, message: '请输入有效日期', trigger: 'blur' },
            {
              max: 64,
              message: '有效日期不能超过64个字符',
              trigger: 'blur'
            },
          ],
          qrjg: [
            { required: true, message: '请输入确认结果', trigger: 'blur' },
            {
              max: 64,
              message: '确认结果不能超过64个字符',
              trigger: 'blur'
            },
          ],
          cfdd: [
            { required: true, message: '请输入存放地点', trigger: 'blur' },
            {
              max: 64,
              message: '存放地点不能超过64个字符',
              trigger: 'blur'
            },
          ],
          bz: [
            { required: true, message: '请输入备注', trigger: 'blur' },
            {
              max: 64,
              message: '备注不能超过64个字符',
              trigger: 'blur'
            },
          ],
          jlyq: [
            { required: true, message: '请输入计量要求', trigger: 'blur' },
            {
              max: 64,
              message: '计量要求不能超过64个字符',
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
      ]
      // this.operationButton = this.$u.getButtons(['APPRAISE_ADD', 'APPRAISE_DEL'])
      this.operationButton = [
      ]
    },
    methods: {
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