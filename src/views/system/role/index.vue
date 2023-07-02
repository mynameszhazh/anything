<template>
  <div class="role">
    <!-- search -->
    <div class="search">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="searchForm.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="searchForm.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- table -->
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="pagination.total"
        @current-change="currentPageChange"
      >
      </el-pagination>
    </div>

    <!-- 弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="审批人">
              <el-input v-model="formData.user" placeholder="审批人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动区域">
              <el-select v-model="formData.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      pagination: {
        total: 50,
        size: 10,
        page: 1
      },
      searchForm: {
        user: '',
        region: ''
      },
      formData: {},
      tableData: []
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      this.$http({
        url: '/api/depts',
        method: 'get'
      }).then((res) => {
        console.log(res)
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    onSubmit() {
      this.dialogVisible = false
      console.log('submit!')
    },
    currentPageChange(page) {
      pagination.page = page
      this.search()
    }
  }
}
</script>

<style lang="less" scoped>
.role {
  width: 100%;
  padding: 15px;
}
</style>
