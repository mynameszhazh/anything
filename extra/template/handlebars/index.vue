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
        <el-form-item label="商家名称" prop="">
          <el-input
            v-model="searchData.sjmc"
            placeholder="请输入商家名称"
            clearable
            class="formItemStyle"
            @keyup.enter.native="search(1)"
          />
        </el-form-item>
        <el-form-item label="是否优报" prop="sfyb">
          <el-select
            v-if="!isView"
            v-model="searchData.sfyb"
            class="formItemStyle"
            clearable
            placeholder="是否优报"
          >
            <el-option
              v-for="(item, index) of []"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否优报3" prop="sfyb3">
          <el-select
            v-if="!isView"
            v-model="searchData.sfyb3"
            class="formItemStyle"
            clearable
            placeholder="是否优报"
          >
            <el-option
              v-for="(item, index) of []"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否优报2" prop="sfyb2">
          <el-select
            v-if="!isView"
            v-model="searchData.sfyb2"
            class="formItemStyle"
            clearable
            placeholder="是否优报"
          >
            <el-option
              v-for="(item, index) of []"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
      <div class="button-list">
        <Buttons :button-list="operationButton" @buttonEvent="buttonEvent" />
      </div>
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
        <template slot="xzqh" slot-scope="{ row }">
          <span>{{ getDict(XZQH, row.xzqh) }}</span>
        </template>
        <template slot="sfrz" slot-scope="{ row }">
          <span>{{ getDict(SFRZ, row.sfrz) }}</span>
        </template>
        <template slot="sfyb" slot-scope="{ row }">
          <span>{{ getDict(SFYB, row.sfyb) }}</span>
        </template>
        <template slot="sjfl" slot-scope="{ row }">
          <span>{{ getDict(SJFL, row.sjfl) }}</span>
        </template>
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

    <!-- 弹出层内容 -->
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
        <el-form-item label="商家名称" prop="sjmc">
          <el-input
            v-if="!isView"
            v-model="formData.sjmc"
            placeholder="请输入商家名称"
            class="formItemStyle"
          />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sjmc }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="商家电话" prop="sjdh">
          <el-input
            v-if="!isView"
            v-model="formData.sjdh"
            placeholder="请输入商家电话"
            class="formItemStyle"
          />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sjdh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="是否优报" prop="sfyb">
          <el-select
            v-if="!isView"
            v-model="formData.sfyb"
            class="formItemStyle"
            placeholder="是否优报"
          >
            <el-option
              v-for="(item, index) of SFYB"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sfyb }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="是否认证" prop="sfrz">
          <el-select
            v-if="!isView"
            v-model="formData.sfrz"
            class="formItemStyle"
            placeholder="是否认证"
          >
            <el-option
              v-for="(item, index) of SFRZ"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sfrz }}
            </div>
          </template>
        </el-form-item>
        <template v-if="formData.sfyb == 1">
          <el-form-item label="优报时间" prop="ybsj">
            <el-date-picker
              v-if="!isView"
              v-model="formData.ybsj"
              class="formItemStyle"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择优报时间"
            />
            <template v-else>
              <div class="formItemStyle">
                {{ formData.ybsj }}
              </div>
            </template>
          </el-form-item>
          <el-form-item label="优报周期" prop="ybzq">
            <el-input
              v-if="!isView"
              v-model="formData.ybzq"
              :max="999"
              :min="0"
              type="number"
              class="formItemStyle"
            >
              <template slot="append">天</template>
            </el-input>
            <template v-else>
              <div class="formItemStyle">
                {{ formData.test }}
              </div>
            </template>
          </el-form-item>
        </template>
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
import { calcTableHeightMixin } from '@/mixins'
import buttonMixin from '@/mixins/buttonMixin'
import { getDict, handleButtonStyle } from '@/utils/index.js'
import { insertShop, updateShop, getShopList } from '@/api/114'

export default {
  name: '',
  components: {},
  mixins: [buttonMixin, calcTableHeightMixin],
  props: {},
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
          height: 'calc(100vh - 20px)',
          'header-cell-style': { background: '#fafafa', color: '#101010' },
          border: true,
          'row-key': this.getRowKeys
        },
        props: [
          {
            label: '商家名称',
            prop: 'sjmc',
            attrs: {
              align: 'center',
              'show-overflow-tooltip': true
            }
          },
          {
            label: '区域',
            prop: 'xzqh',
            attrs: {
              align: 'center',
              'show-overflow-tooltip': true
            }
          },
          {
            label: '商家电话',
            prop: 'sjdh',
            attrs: {
              width: '120',
              align: 'center'
            }
          },
          {
            label: '分类',
            prop: 'sjfl',
            attrs: {
              align: 'center'
            }
          },
          {
            label: '是否认证',
            prop: 'sfrz',
            attrs: {
              align: 'center'
            }
          },
          {
            label: '是否优报',
            prop: 'sfyb',
            attrs: {
              width: '120',
              align: 'center'
            }
          },

          {
            label: '地址',
            prop: 'sjdz',
            attrs: {
              width: '200',
              align: 'center'
            }
          },
          {
            label: '备注',
            prop: 'remark',
            attrs: {
              width: '200',
              align: 'center'
            }
          },
          {
            prop: 'details',
            label: '操作',
            attrs: {
              fixed: 'right',
              width: '180',
              align: 'center'
            }
          }
        ]
      },
      getDict,
      operationButton: [],
      operationButton2: [],
      rules: {
        sfrz: [{ required: true, message: '选择是否认证', trigger: 'change' }],
        sfyb: [{ required: true, message: '选择是否优报', trigger: 'change' }],
        sjdh: [
          { required: true, message: '请输入商家电话', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        sjdz: [
          { required: true, message: '请输入商家地址', trigger: 'blur' },
          {
            max: 64,
            message: '表名前缀不能超过64个字符',
            trigger: 'blur'
          }
        ],
        sjfl: [
          { required: true, message: '请输入商家分类', trigger: 'change' }
        ],
        sjmc: [
          { required: true, message: '请输入商家名称', trigger: 'blur' },
          {
            max: 64,
            message: '表名前缀不能超过64个字符',
            trigger: 'blur'
          }
        ],
        xzqh: [
          { required: true, message: '请输入行政区域', trigger: 'change' }
        ],
        remark: [
          {
            max: 512,
            message: '备注不能超过512个字符',
            trigger: 'blur'
          }
        ]
      },
      isCreated: [],
      // 区域数据
      regeionTreeData: [],
      // 分类数据
      categorizeTreeData: [],
      // 字典数据
      SJFL: [],
      SFYB: [],
      SFRZ: [],
      XZQH: []
    }
  },
  computed: {},
  created() {
    this.initData()
    this.getDictData()
  },
  mounted() {
    this.tableOperationButton = this.$u.getButtons(['SHOP_EDIT'])
    this.operationButton = this.$u.getButtons(['SHOP_ADD', 'SHOP_DELETE'])
    this.operationButton2 = this.$u.getButtons([
      'SHOP_DOWNLOAD',
      'SHOP_IMPORT',
      'SHOP_EXPORT'
    ])
    handleButtonStyle(this.operationButton2, ['#F26161', '#3A9D08'])
  },
  methods: {
    async getDictData() {
      this.SJFL =
        JSON.parse(localStorage.getItem('NAVBASIC_ASSORT')) ||
        (await this.$u.getTree('NAVBASIC_ASSORT'))
      this.SFYB =
        JSON.parse(localStorage.getItem('NAVBASIC_SFYB')) ||
        (await this.$u.getTree('NAVBASIC_SFYB'))
      this.SFRZ =
        JSON.parse(localStorage.getItem('NAVBASIC_SFRZ')) ||
        (await this.$u.getTree('NAVBASIC_SFRZ'))
      this.XZQH =
        JSON.parse(localStorage.getItem('NAVBASIC_REGION')) ||
        (await this.$u.getTree('NAVBASIC_REGION'))
    },
    initData() {
      this.search()
    },
    emitFormData() {},
    search(current) {
      if (current) {
        this.pagination.current = current
      }
      this.loading = true
      getShopList({
        ...this.searchData,
        current: this.pagination.current,
        size: this.pagination.size,
        shzt: '1'
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
        .catch((err) => {
          this.loading = false
          throw new Error(err)
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
    handleCommand(data, command) {
      this[command.method](data, command)
    },
    // 表单提交
    onSubmit() {
      // 验证提交
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoding = true
          const { id } = this.formData
          let handleRequest = null
          if (!id) {
            // 添加接口
            handleRequest = insertShop
          } else {
            // 修改接口
            handleRequest = updateShop
          }
          handleRequest({ ...this.formData })
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
    }
  }
}
</script>

<style scoped>
.button-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
</style>
