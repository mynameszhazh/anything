<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" :inline="true" :model="searchData" size="small" label-width="68px">
        <el-form-item label="登记日期" prop="djrq">
          <el-input v-model="searchData.djrq" placeholder="请输入登记日期" clearable class="formItemStyle"
            @keyup.enter.native="search(1)" />
        </el-form-item>
        <el-form-item label="委托单位" prop="wtdw">
          <el-input v-model="searchData.wtdw" placeholder="请输入委托单位" clearable class="formItemStyle"
            @keyup.enter.native="search(1)" />
        </el-form-item>
        <el-form-item label="受检单位" prop="sjdw">
          <el-input v-model="searchData.sjdw" placeholder="请输入受检单位" clearable class="formItemStyle"
            @keyup.enter.native="search(1)" />
        </el-form-item>
        <el-form-item label="样品名称" prop="ypmc">
          <el-input v-model="searchData.ypmc" placeholder="请输入样品名称" clearable class="formItemStyle"
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
        <span slot="jylb" slot-scope="{ row }">
          {{ getDict(JYLB, row.jylb) }}
        </span>
        <span slot="jyxz" slot-scope="{ row }">
          {{ getDict(JYXZ, row.jyxz) }}
        </span>
        <span slot="bcgg" slot-scope="{ row }">
          {{ getDict(BCGG, row.bcgg) }}
        </span>
        <span slot="jyzq" slot-scope="{ row }">
          {{ getDict(JYZQ, row.jyzq) }}
        </span>
        <span slot="ypdj" slot-scope="{ row }">
          {{ getDict(YPDJ, row.ypdj) }}
        </span>
        <span slot="lyfs" slot-scope="{ row }">
          {{ getDict(LYFS, row.lyfs) }}
        </span>
        <span slot="yycl" slot-scope="{ row }">
          {{ getDict(YYCL, row.yycl) }}
        </span>
        <span slot="aqdj" slot-scope="{ row }">
          {{ getDict(AQDJ, row.aqdj) }}
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
        <el-form-item label="登记人" prop="djr">
          <el-input v-if="!isView" v-model="formData.djr" placeholder="请输入登记人" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.djr }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="登记日期" prop="djrq">
          <el-input v-if="!isView" v-model="formData.djrq" placeholder="请输入登记日期" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.djrq }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="检验类别" prop="jylb">
          <el-select v-if="!isView" v-model="formData.jylb" class="formItemStyle" clearable
            placeholder="检验类别">
            <el-option v-for="(item, index) of JYLB" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.jylb }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="检验性质" prop="jyxz">
          <el-select v-if="!isView" v-model="formData.jyxz" class="formItemStyle" clearable
            placeholder="检验性质">
            <el-option v-for="(item, index) of JYXZ" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.jyxz }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="补充更改" prop="bcgg">
          <el-select v-if="!isView" v-model="formData.bcgg" class="formItemStyle" clearable
            placeholder="补充更改">
            <el-option v-for="(item, index) of BCGG" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.bcgg }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="登记单号" prop="djdh">
          <el-input v-if="!isView" v-model="formData.djdh" placeholder="请输入登记单号" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.djdh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="委托单位" prop="wtdw">
          <el-input v-if="!isView" v-model="formData.wtdw" placeholder="请输入委托单位" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.wtdw }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="受检单位" prop="sjdw">
          <el-input v-if="!isView" v-model="formData.sjdw" placeholder="请输入受检单位" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sjdw }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="委托单位联系人" prop="wtdwlxr">
          <el-input v-if="!isView" v-model="formData.wtdwlxr" placeholder="请输入委托单位联系人" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.wtdwlxr }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="委托单位地址" prop="wtdwdz">
          <el-input v-if="!isView" v-model="formData.wtdwdz" placeholder="请输入委托单位地址" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.wtdwdz }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="委托单位电话" prop="wtdwdh">
          <el-input v-if="!isView" v-model="formData.wtdwdh" placeholder="请输入委托单位电话" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.wtdwdh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="受检单位联系人" prop="sjdwlxr">
          <el-input v-if="!isView" v-model="formData.sjdwlxr" placeholder="请输入受检单位联系人" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sjdwlxr }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="受检单位地址" prop="sjdwdz">
          <el-input v-if="!isView" v-model="formData.sjdwdz" placeholder="请输入受检单位地址" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sjdwdz }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="受检单位电话" prop="sjdwdh">
          <el-input v-if="!isView" v-model="formData.sjdwdh" placeholder="请输入受检单位电话" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sjdwdh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="缴费单位" prop="jfdw">
          <el-input v-if="!isView" v-model="formData.jfdw" placeholder="请输入缴费单位" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.jfdw }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="缴费单位联系人" prop="jfdwlxr">
          <el-input v-if="!isView" v-model="formData.jfdwlxr" placeholder="请输入缴费单位联系人" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.jfdwlxr }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="应收金额" prop="ysje">
          <el-input v-if="!isView" v-model="formData.ysje" placeholder="请输入应收金额" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.ysje }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="取报告方式" prop="qbgfs">
          <el-input v-if="!isView" v-model="formData.qbgfs" placeholder="请输入取报告方式" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.qbgfs }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="检测依据" prop="jcyj">
          <el-input v-if="!isView" v-model="formData.jcyj" placeholder="请输入检测依据" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.jcyj }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="其他说明" prop="qtsm">
          <el-input v-if="!isView" v-model="formData.qtsm" placeholder="请输入其他说明" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.qtsm }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="报告结论" prop="bgjl">
          <el-input v-if="!isView" v-model="formData.bgjl" placeholder="请输入报告结论" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.bgjl }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="报告签发人" prop="bgqfr">
          <el-input v-if="!isView" v-model="formData.bgqfr" placeholder="请输入报告签发人" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.bgqfr }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="报告签发日期" prop="bgqfrq">
          <el-input v-if="!isView" v-model="formData.bgqfrq" placeholder="请输入报告签发日期" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.bgqfrq }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="检验周期" prop="jyzq">
          <el-select v-if="!isView" v-model="formData.jyzq" class="formItemStyle" clearable
            placeholder="检验周期">
            <el-option v-for="(item, index) of JYZQ" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.jyzq }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="要求出报告日期" prop="yqcbgrq">
          <el-input v-if="!isView" v-model="formData.yqcbgrq" placeholder="请输入要求出报告日期" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yqcbgrq }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="检验备注" prop="jybz">
          <el-input v-if="!isView" v-model="formData.jybz" placeholder="请输入检验备注" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.jybz }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="原检编号" prop="yjbh">
          <el-input v-if="!isView" v-model="formData.yjbh" placeholder="请输入原检编号" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yjbh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="流程状态" prop="lczt">
          <el-input v-if="!isView" v-model="formData.lczt" placeholder="请输入流程状态" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.lczt }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="样品名称" prop="ypmc">
          <el-input v-if="!isView" v-model="formData.ypmc" placeholder="请输入样品名称" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.ypmc }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="样品数量" prop="ypsl">
          <el-input v-if="!isView" v-model="formData.ypsl" placeholder="请输入样品数量" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.ypsl }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="样品描述" prop="ypms">
          <el-input v-if="!isView" v-model="formData.ypms" placeholder="请输入样品描述" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.ypms }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="样品等级" prop="ypdj">
          <el-select v-if="!isView" v-model="formData.ypdj" class="formItemStyle" clearable
            placeholder="样品等级">
            <el-option v-for="(item, index) of YPDJ" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.ypdj }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="抽验基数" prop="cyjs">
          <el-input v-if="!isView" v-model="formData.cyjs" placeholder="请输入抽验基数" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.cyjs }}
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
        <el-form-item label="商标" prop="sb">
          <el-input v-if="!isView" v-model="formData.sb" placeholder="请输入商标" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.sb }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="来样方式" prop="lyfs">
          <el-select v-if="!isView" v-model="formData.lyfs" class="formItemStyle" clearable
            placeholder="来样方式">
            <el-option v-for="(item, index) of LYFS" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.lyfs }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="余样处理" prop="yycl">
          <el-select v-if="!isView" v-model="formData.yycl" class="formItemStyle" clearable
            placeholder="余样处理">
            <el-option v-for="(item, index) of YYCL" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.yycl }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="生产单位" prop="scdw">
          <el-input v-if="!isView" v-model="formData.scdw" placeholder="请输入生产单位" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.scdw }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="生产日期" prop="scrq">
          <el-input v-if="!isView" v-model="formData.scrq" placeholder="请输入生产日期" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.scrq }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="抽样人" prop="cyr">
          <el-input v-if="!isView" v-model="formData.cyr" placeholder="请输入抽样人" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.cyr }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="安全等级" prop="aqdj">
          <el-select v-if="!isView" v-model="formData.aqdj" class="formItemStyle" clearable
            placeholder="安全等级">
            <el-option v-for="(item, index) of AQDJ" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <template v-else>
            <div class="formItemStyle">
              {{ formData.aqdj }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="生产单位电话" prop="scdwdh">
          <el-input v-if="!isView" v-model="formData.scdwdh" placeholder="请输入生产单位电话" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.scdwdh }}
            </div>
          </template>
        </el-form-item>
        <el-form-item label="协议备注" prop="xybz">
          <el-input v-if="!isView" v-model="formData.xybz" placeholder="请输入协议备注" clearable
            class="formItemStyle" />
          <template v-else>
            <div class="formItemStyle">
              {{ formData.xybz }}
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
              label: '登记人',
              prop: 'djr',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '登记日期',
              prop: 'djrq',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '检验类别',
              prop: 'jylb',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '检验性质',
              prop: 'jyxz',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '补充更改',
              prop: 'bcgg',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '登记单号',
              prop: 'djdh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '委托单位',
              prop: 'wtdw',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '受检单位',
              prop: 'sjdw',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '委托单位联系人',
              prop: 'wtdwlxr',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '委托单位地址',
              prop: 'wtdwdz',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '委托单位电话',
              prop: 'wtdwdh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '受检单位联系人',
              prop: 'sjdwlxr',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '受检单位地址',
              prop: 'sjdwdz',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '受检单位电话',
              prop: 'sjdwdh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '缴费单位',
              prop: 'jfdw',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '缴费单位联系人',
              prop: 'jfdwlxr',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '应收金额',
              prop: 'ysje',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '取报告方式',
              prop: 'qbgfs',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '检测依据',
              prop: 'jcyj',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '其他说明',
              prop: 'qtsm',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '报告结论',
              prop: 'bgjl',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '报告签发人',
              prop: 'bgqfr',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '报告签发日期',
              prop: 'bgqfrq',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '检验周期',
              prop: 'jyzq',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '要求出报告日期',
              prop: 'yqcbgrq',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '检验备注',
              prop: 'jybz',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '原检编号',
              prop: 'yjbh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '流程状态',
              prop: 'lczt',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '样品名称',
              prop: 'ypmc',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '样品数量',
              prop: 'ypsl',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '样品描述',
              prop: 'ypms',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '样品等级',
              prop: 'ypdj',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '抽验基数',
              prop: 'cyjs',
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
              label: '商标',
              prop: 'sb',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '来样方式',
              prop: 'lyfs',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '余样处理',
              prop: 'yycl',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '生产单位',
              prop: 'scdw',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '生产日期',
              prop: 'scrq',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '抽样人',
              prop: 'cyr',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '安全等级',
              prop: 'aqdj',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '生产单位电话',
              prop: 'scdwdh',
              attrs: {
                align: 'center',
                'show-overflow-tooltip': true
              }
            },
            {
              label: '协议备注',
              prop: 'xybz',
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
          djr: [
            { required: true, message: '请输入登记人', trigger: 'blur' },
            {
              max: 64,
              message: '登记人不能超过64个字符',
              trigger: 'blur'
            },
          ],
          djrq: [
            { required: true, message: '请输入登记日期', trigger: 'blur' },
            {
              max: 64,
              message: '登记日期不能超过64个字符',
              trigger: 'blur'
            },
          ],
          jylb: [
            { required: true, message: '请选择检验类别', trigger: 'change' },
          ],
          jyxz: [
            { required: true, message: '请选择检验性质', trigger: 'change' },
          ],
          bcgg: [
            { required: true, message: '请选择补充更改', trigger: 'change' },
          ],
          djdh: [
            { required: true, message: '请输入登记单号', trigger: 'blur' },
            {
              max: 64,
              message: '登记单号不能超过64个字符',
              trigger: 'blur'
            },
          ],
          wtdw: [
            { required: true, message: '请输入委托单位', trigger: 'blur' },
            {
              max: 64,
              message: '委托单位不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sjdw: [
            { required: true, message: '请输入受检单位', trigger: 'blur' },
            {
              max: 64,
              message: '受检单位不能超过64个字符',
              trigger: 'blur'
            },
          ],
          wtdwlxr: [
            { required: true, message: '请输入委托单位联系人', trigger: 'blur' },
            {
              max: 64,
              message: '委托单位联系人不能超过64个字符',
              trigger: 'blur'
            },
          ],
          wtdwdz: [
            { required: true, message: '请输入委托单位地址', trigger: 'blur' },
            {
              max: 64,
              message: '委托单位地址不能超过64个字符',
              trigger: 'blur'
            },
          ],
          wtdwdh: [
            { required: true, message: '请输入委托单位电话', trigger: 'blur' },
            {
              max: 64,
              message: '委托单位电话不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sjdwlxr: [
            { required: true, message: '请输入受检单位联系人', trigger: 'blur' },
            {
              max: 64,
              message: '受检单位联系人不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sjdwdz: [
            { required: true, message: '请输入受检单位地址', trigger: 'blur' },
            {
              max: 64,
              message: '受检单位地址不能超过64个字符',
              trigger: 'blur'
            },
          ],
          sjdwdh: [
            { required: true, message: '请输入受检单位电话', trigger: 'blur' },
            {
              max: 64,
              message: '受检单位电话不能超过64个字符',
              trigger: 'blur'
            },
          ],
          jfdw: [
            { required: true, message: '请输入缴费单位', trigger: 'blur' },
            {
              max: 64,
              message: '缴费单位不能超过64个字符',
              trigger: 'blur'
            },
          ],
          jfdwlxr: [
            { required: true, message: '请输入缴费单位联系人', trigger: 'blur' },
            {
              max: 64,
              message: '缴费单位联系人不能超过64个字符',
              trigger: 'blur'
            },
          ],
          ysje: [
            { required: true, message: '请输入应收金额', trigger: 'blur' },
            {
              max: 64,
              message: '应收金额不能超过64个字符',
              trigger: 'blur'
            },
          ],
          qbgfs: [
            { required: true, message: '请输入取报告方式', trigger: 'blur' },
            {
              max: 64,
              message: '取报告方式不能超过64个字符',
              trigger: 'blur'
            },
          ],
          jcyj: [
            { required: true, message: '请输入检测依据', trigger: 'blur' },
            {
              max: 64,
              message: '检测依据不能超过64个字符',
              trigger: 'blur'
            },
          ],
          qtsm: [
            { required: true, message: '请输入其他说明', trigger: 'blur' },
            {
              max: 64,
              message: '其他说明不能超过64个字符',
              trigger: 'blur'
            },
          ],
          bgjl: [
            { required: true, message: '请输入报告结论', trigger: 'blur' },
            {
              max: 64,
              message: '报告结论不能超过64个字符',
              trigger: 'blur'
            },
          ],
          bgqfr: [
            { required: true, message: '请输入报告签发人', trigger: 'blur' },
            {
              max: 64,
              message: '报告签发人不能超过64个字符',
              trigger: 'blur'
            },
          ],
          bgqfrq: [
            { required: true, message: '请输入报告签发日期', trigger: 'blur' },
            {
              max: 64,
              message: '报告签发日期不能超过64个字符',
              trigger: 'blur'
            },
          ],
          jyzq: [
            { required: true, message: '请选择检验周期', trigger: 'change' },
          ],
          yqcbgrq: [
            { required: true, message: '请输入要求出报告日期', trigger: 'blur' },
            {
              max: 64,
              message: '要求出报告日期不能超过64个字符',
              trigger: 'blur'
            },
          ],
          jybz: [
            { required: true, message: '请输入检验备注', trigger: 'blur' },
            {
              max: 64,
              message: '检验备注不能超过64个字符',
              trigger: 'blur'
            },
          ],
          yjbh: [
            { required: true, message: '请输入原检编号', trigger: 'blur' },
            {
              max: 64,
              message: '原检编号不能超过64个字符',
              trigger: 'blur'
            },
          ],
          lczt: [
            { required: true, message: '请输入流程状态', trigger: 'blur' },
            {
              max: 64,
              message: '流程状态不能超过64个字符',
              trigger: 'blur'
            },
          ],
          ypmc: [
            { required: true, message: '请输入样品名称', trigger: 'blur' },
            {
              max: 64,
              message: '样品名称不能超过64个字符',
              trigger: 'blur'
            },
          ],
          ypsl: [
            { required: true, message: '请输入样品数量', trigger: 'blur' },
            {
              max: 64,
              message: '样品数量不能超过64个字符',
              trigger: 'blur'
            },
          ],
          ypms: [
            { required: true, message: '请输入样品描述', trigger: 'blur' },
            {
              max: 64,
              message: '样品描述不能超过64个字符',
              trigger: 'blur'
            },
          ],
          ypdj: [
            { required: true, message: '请选择样品等级', trigger: 'change' },
          ],
          cyjs: [
            { required: true, message: '请输入抽验基数', trigger: 'blur' },
            {
              max: 64,
              message: '抽验基数不能超过64个字符',
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
          sb: [
            { required: true, message: '请输入商标', trigger: 'blur' },
            {
              max: 64,
              message: '商标不能超过64个字符',
              trigger: 'blur'
            },
          ],
          lyfs: [
            { required: true, message: '请选择来样方式', trigger: 'change' },
          ],
          yycl: [
            { required: true, message: '请选择余样处理', trigger: 'change' },
          ],
          scdw: [
            { required: true, message: '请输入生产单位', trigger: 'blur' },
            {
              max: 64,
              message: '生产单位不能超过64个字符',
              trigger: 'blur'
            },
          ],
          scrq: [
            { required: true, message: '请输入生产日期', trigger: 'blur' },
            {
              max: 64,
              message: '生产日期不能超过64个字符',
              trigger: 'blur'
            },
          ],
          cyr: [
            { required: true, message: '请输入抽样人', trigger: 'blur' },
            {
              max: 64,
              message: '抽样人不能超过64个字符',
              trigger: 'blur'
            },
          ],
          aqdj: [
            { required: true, message: '请选择安全等级', trigger: 'change' },
          ],
          scdwdh: [
            { required: true, message: '请输入生产单位电话', trigger: 'blur' },
            {
              max: 64,
              message: '生产单位电话不能超过64个字符',
              trigger: 'blur'
            },
          ],
          xybz: [
            { required: true, message: '请输入协议备注', trigger: 'blur' },
            {
              max: 64,
              message: '协议备注不能超过64个字符',
              trigger: 'blur'
            },
          ],
        },
        operationButton: [],
        // 字典数据
        JYLB: [],
        JYXZ: [],
        BCGG: [],
        JYZQ: [],
        YPDJ: [],
        AQDJ: [],
        LYFS: [],
        YYCL: [],
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
         {
          code: 'USER_EDIT',
          // icon: 'iconfont icon-edit',
          method: 'addLevel',
          name: '新增等级',
          requestType: 'post',
          type: '3',
          upload: false,
          url: '/platform/user/update'
        },
         {
          code: 'USER_EDIT',
          // icon: 'iconfont icon-edit',
          method: 'registerForm',
          name: '登记单',
          requestType: 'post',
          type: '3',
          upload: false,
          url: '/platform/user/update'
        },
         {
          code: 'USER_EDIT',
          // icon: 'iconfont icon-edit',
          method: 'reportInfo',
          name: '报告信息',
          requestType: 'post',
          type: '3',
          upload: false,
          url: '/platform/user/update'
        },
         {
          code: 'USER_EDIT',
          // icon: 'iconfont icon-edit',
          method: 'processCard',
          name: '流程卡',
          requestType: 'post',
          type: '3',
          upload: false,
          url: '/platform/user/update'
        },
      ]
    },
    methods: {
      addLevel() {
          console.log('addLevel')
      },
      registerForm() {
          console.log('registerForm')
      },
      reportInfo() {
          console.log('reportInfo')
      },
      processCard() {
          console.log('processCard')
      },
      async getDictData() {
        this.JYLB = await this.$u.getConstDict("JYLB")
        this.JYXZ = await this.$u.getConstDict("JYXZ")
        this.BCGG = await this.$u.getConstDict("BCGG")
        this.JYZQ = await this.$u.getConstDict("JYZQ")
        this.YPDJ = await this.$u.getConstDict("YPDJ")
        this.AQDJ = await this.$u.getConstDict("AQDJ")
        this.LYFS = await this.$u.getConstDict("LYFS")
        this.YYCL = await this.$u.getConstDict("YYCL")
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