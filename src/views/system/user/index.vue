<template>
  <div class="user">
    <!-- search -->
    <div class="search">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="用户">
          <el-input v-model="searchForm.name" placeholder="用户"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input
            v-model.number="searchForm.gender"
            placeholder="性别"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="">
          <el-input v-model="searchForm.name" placeholder="用户"></el-input>
        </el-form-item> -->
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
        @size-change="handleSizeChange"
        @current-change="currentPageChange"
        :current-page="pagination.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
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
            <el-form-item label="用户名">
              <el-input
                v-model="formData.username"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="formData.name" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="头像">
          <!-- <el-input v-model="formData.name" placeholder="姓名"></el-input> -->
          <!-- :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove" -->
          <el-upload
            action="/api/upload"
            list-type="picture-card"
            name="image"
            :headers="token"
            :on-success="imgUploadSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="formData.gender" placeholder="性别">
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门">
              <el-select v-model="formData.deptId" placeholder="工作">
                <el-option
                  v-for="item of deptList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="job">
          <el-input v-model="formData.job" placeholder="job"></el-input>
        </el-form-item>
        <el-form-item label="entrydate">
          <!--             value-format="yyyy-" -->
          <el-date-picker
            v-model="formData.entrydate"
            type="date"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
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
      token: { token: '' },
      dialogVisible: false,
      pagination: {
        total: 50,
        size: 10,
        page: 1
      },
      searchForm: {
        name: '',
        gender: ''
      },
      formData: {},
      tableData: [],
      multipleSelection: [],
      deptList: []
    }
  },
  created() {
    this.getDeptData()
    this.search()
  },
  methods: {
    imgUploadSuccess(file, data) {
      console.log(file, data, 'imgUploadSuccess')
    },
    getDeptData() {
      this.$http({
        url: '/api/depts',
        method: 'get'
      }).then(res => {
        this.deptList = res.data
      })
    },
    search() {
      this.$http({
        url: '/api/user',
        method: 'get',
        params: {
          size: this.pagination.size,
          page: this.pagination.page,
          ...this.searchForm
        }
      }).then(res => {
        this.pagination.total = res.data.total
        this.tableData = res.data.rows
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
      const ids = this.multipleSelection.map(item => item.id).join(',')
      this.$confirm('是否删除这个', '删除')
        .then(() => {
          this.$http({
            url: '/api/user/delete/' + ids,
            method: 'delete'
          }).then(res => {
            this.search()
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          this.$message.warning('取消了删除')
        })
    },
    del(row) {
      this.$confirm('是否删除这个', '删除')
        .then(() => {
          this.$http({
            url: '/api/user/delete/' + row.id,
            method: 'delete'
          }).then(res => {
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
        url: '/api/user/' + (this.formData.id ? 'update' : 'add'),
        method: 'post',
        data: this.formData
      }).then(res => {
        this.$message.success('操作成功')
        this.search()
        this.dialogVisible = false
      })
    },
    handleSizeChange(size) {
      this.pagination.size = size
      this.search()
    },
    currentPageChange(page) {
      this.pagination.page = page
      this.search()
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  padding: 15px;
}
</style>
