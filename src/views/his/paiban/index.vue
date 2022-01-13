<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="医生名字" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入医生名字"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属科室" key="deptName" prop="sysDept.deptName">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入科室名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="last">上一周</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="this">当前周</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="next">下一周</el-button>

      </el-form-item>

    </el-form>


    <el-table
      v-loading="loading"
      :data="paibanList"
      @selection-change="handleSelectionChange"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
      title="2022-01-01 - 2022-01-07值班安排">

      <el-table-column label="医生" align="center" prop="name" />
      <el-table-column label="科室" align="center" key="deptName" prop="sysDept.deptName" />
      <el-table-column label="日期" align="center" prop="datetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.datetime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班次" align="center" prop="banci" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['his:paiban:edit']"
          >编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改排班表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="日期" prop="datetime">
          <el-date-picker clearable size="small"
            v-model="form.datetime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班次">
          <el-select v-model="form.banci">
            <el-option
              v-for="dict in dict.type.sys_banci"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPaiban, getPaiban, delPaiban, addPaiban, updatePaiban,listBanci } from "@/api/his/paiban";

export default {
  name: "Paiban",
  dicts: ['sys_banci'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 排班表表格数据
      paibanList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        deptId: null,
        datetime: null,
        banci: null
      },

      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询排班表列表 */
    getList() {
      this.loading = true;
      listPaiban(this.queryParams).then(response => {
        this.paibanList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        deptId: null,
        datetime: null,
        banci: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加排班表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPaiban(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改"+"["+this.form.name+"]"+"排班信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePaiban(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPaiban(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除排班表编号为"' + ids + '"的数据项？').then(function() {
        return delPaiban(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('his/paiban/export', {
        ...this.queryParams
      }, `paiban_${new Date().getTime()}.xlsx`)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
// 只合并区域位置
      //columnIndex 横的第一列
      //rowIndex 竖的数组的length % 3 ==0 合并单元格
      if (columnIndex === 0) { //如果是第一行
        if (rowIndex % 3 === 0) {//如果是 数组长度 % 3 ==0
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      else if (columnIndex === 1) { //如果是第一行
        if (rowIndex % 3 === 0) {//如果是 数组长度 % 3 ==0
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      else if (columnIndex === 2) { //如果是第一行
        if (rowIndex % 3 === 0) {//如果是 数组长度 % 3 ==0
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

  }
};
</script>
<style scoped>
.el-input{
  width:80px
}
.el-date-picker{
  width: 80px;
}
</style>


