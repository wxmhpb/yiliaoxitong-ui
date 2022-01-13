<template>

  <div class="app-container">

     <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="90px">
     <el-form-item label="采购单据号" key="danId" prop="sysPurchase.danId">
             <el-input
               v-model="queryParams.danId"
               placeholder=""
               clearable
               size="small"
               @keyup.enter.native="handleQuery"

             />
           </el-form-item>
      <el-form-item label="药品名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder=""
          clearable
          size="small"
          @keyup.enter.native="handleQuery"

        />
      </el-form-item>

      <el-form-item label="生产厂家" key="changjiaName" prop="changjia.changjiaName">
        <el-input
          v-model="queryParams.changjiaName"
          placeholder=""
          clearable
          size="small"
          @keyup.enter.native="handleQuery"

        />
      </el-form-item>
      <el-form-item label="药品类型" prop="leixing">
        <el-input
          v-model="queryParams.leixing"
          placeholder=""
          clearable
          size="small"
          @keyup.enter.native="handleQuery"

        />
      </el-form-item>
      <el-form-item label="处方类型" prop="chufangleixing">
        <el-input
          v-model="queryParams.chufangleixing"
          placeholder=""
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


      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="kucunList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="药品ID" align="center" prop="id" />
      <el-table-column label="药品名称" align="center" prop="name" />
      <el-table-column label="采购量" align="center" key="caigouliang" prop="sysPurchase.caigouliang" />



<el-table-column label="批发价" align="center"  prop="sysPurchase.zonge,sysPurchase.caigouliang">
            <template slot-scope="scope">{{scope.row.sysPurchase.zonge/scope.row.sysPurchase.caigouliang}}</template>
      </el-table-column>

      <el-table-column label="批发额" align="center" key="zonge" prop="sysPurchase.zonge" />
       <el-table-column label="批次号" align="center" key="picihao" prop="sysPurchase.picihao" />
      <el-table-column label="生产厂家" align="center" key="changjiaName" prop="changjia.changjiaName" />
      <el-table-column label="药品类型" align="center" prop="leixing" />
      <el-table-column label="处方类型" align="center" prop="chufangleixing" />

      </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />


</div>
</template>

<script>
import { listKucun1 } from "@/api/yaoping/kucun";

export default {
  name: "Kucun",
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
      // 药品信息管理表格数据
      xinxiList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        code: null,
        changjiaId: null,
        leixing: null,
        chufangleixing: null,
        danwei: null,
        price: null,
        kucun: null,
        yujingzhi: null,
        huansuan: null,
        status: null
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
    /** 查询药品信息管理列表 */
    getList() {
      this.loading = true;
      listKucun1(this.queryParams).then(response => {
        this.kucunList = response.rows;
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
        code: null,
        changjiaId: null,
        leixing: null,
        chufangleixing: null,
        danwei: null,
        price: null,
        kucun: null,
        yujingzhi: null,
        huansuan: null,
        status: "0"
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
    }
    }
    }


</script>

<style scoped>
.el-input{
  width:50px
}
</style>
