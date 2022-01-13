<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="供应商" key="gongName" prop="sysGongyingshang.gongName">
        <el-input
          v-model="queryParams.gongName"
          placeholder="请输入供应商"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="申请人" prop="person">
        <el-input
          v-model="queryParams.person"
          placeholder="请输入申请人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     <el-form-item label="单据状态" prop="status">
             <el-input
               v-model="queryParams.person"
               placeholder="请输入单据状态"
               clearable
               size="small"
               @keyup.enter.native="handleQuery"
             />
           </el-form-item>


      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['yaoping:purchase:add']"
        >新增采购</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['yaoping:purchase:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['yaoping:purchase:remove']"
        >作废</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yaoping:purchase:export']"
        >提交入库</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table  v-loading="loading" :data="purchaseList" @selection-change="handleSelectionChange" >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id"  />
      <el-table-column label="单据ID" align="center" prop="danId"  />
      <el-table-column label="供应商" align="center" key="gongName" prop="sysGongyingshang.gongName" />
      <el-table-column label="采购批发总额" align="center" prop="zonge" />
      <el-table-column label="单据状态" align="center" prop="status" />
      <el-table-column label="申请人" align="center" prop="person" />
      <el-table-column label="入库操作人" align="center" prop="operator" />
      <el-table-column label="入库时间" align="center" prop="rukuTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.rukuTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yaoping:purchase:edit']"
          >修改</el-button>
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

    <!-- 添加或修改采购信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="供应商" key="gongName" prop="sysGongyingshang.gongName">
          <el-input v-model="form.gongId" placeholder="请输入供应商" />
        </el-form-item>
        <el-form-item label="采购批发总额" prop="zonge">
          <el-input v-model="form.zonge" placeholder="请输入采购批发总额" />
        </el-form-item>
        <el-form-item label="申请人" prop="person">
          <el-input v-model="form.person" placeholder="请输入申请人" />
        </el-form-item>
        <el-form-item label="入库操作人" prop="operator">
          <el-input v-model="form.operator" placeholder="请输入入库操作人" />
        </el-form-item>
        <el-form-item label="入库时间" prop="rukuTime">
          <el-date-picker clearable size="small"
            v-model="form.rukuTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择入库时间">
          </el-date-picker>
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
import { listPurchase, getPurchase, delPurchase, addPurchase, updatePurchase } from "@/api/yaoping/purchase";
import {getGongyingshang} from "@/api/yaoping/gongyingshang";

export default {
  name: "Purchase",
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
      // 采购信息表格数据
      purchaseList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        gongId: null,
        zonge: null,
        status: null,
        person: null,
        operator: null,
        rukuTime: null,
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
    /** 查询采购信息列表 */
    getList() {
      this.loading = true;
      listPurchase(this.queryParams).then(response => {
        this.purchaseList = response.rows;
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
        gongId: null,
        zonge: null,
        status: "0",
        person: null,
        operator: null,
        rukuTime: null,
        createTime: null
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
      this.title = "添加采购信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      console.log(typeof(id));

      getPurchase(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改采购信息";
      });
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePurchase(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPurchase(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除采购信息编号为"' + ids + '"的数据项？').then(function() {
        return delPurchase(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yaoping/purchase/export', {
        ...this.queryParams
      }, `purchase_${new Date().getTime()}.xlsx`)
    },

  }
};
</script>
<style scoped>
.el-input{
  width:150px
}
</style>
