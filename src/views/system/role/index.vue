<template>
  <div class="role">
    <!-- search -->
    <div class="search">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="部门">
          <el-input v-model="searchForm.name" placeholder="部门"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- table -->
    <div class="content">
      <div class="handle">
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="danger" @click="allDel">批量删除</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
        <el-table-column prop="detial" label="操作">
          <template slot-scope="{ row }">
            <el-button @click="edit(row)">修改</el-button>
            <el-button type="danger" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
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
      width="700px"
      :before-close="handleClose"
    >
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门">
              <el-input v-model="formData.name" placeholder="部门"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="活动区域">
              <el-select v-model="formData.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
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
      tableData: [],
      multipleSelection: []
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
        this.tableData = res.data
      })
    },
    add() {
      console.log('add')
      this.dialogVisible = true
    },
    edit(row) {
      console.log('edit')
      this.dialogVisible = true
      this.formData = row
    },
    allDel() {
      console.log('adddel')
    },
    del(row) {
      console.log('del')
      this.$confirm('是否删除这个', '删除')
        .then(() => {
          this.$http({
            url: '/api/depts/' + row.id,
            method: 'delete'
          }).then((res) => {
            this.search()
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          this.$message.warning('取消了删除')
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClose() {
      this.dialogVisible = false
      this.formData = {}
    },
    onSubmit() {
      console.log('submit!', this.formData)
      this.$http({
        url: '/api/depts/' + (this.formData.id ? 'update' : 'add'),
        method: 'post',
        data: this.formData
      }).then((res) => {
        this.$message.success('操作成功')
        this.search()
        this.dialogVisible = false
      })
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
