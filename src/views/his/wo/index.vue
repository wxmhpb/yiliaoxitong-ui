<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">

      <el-form-item>

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

<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['his:paiban:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
import { listPaiban} from "@/api/his/wo";

export default {
  name: "Paiban",
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
      } else if (columnIndex === 4) { //如果是第一行
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
