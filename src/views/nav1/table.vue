<template>
	<div>
		<i-table 
	  		:tableData="users" 
	  		:columns="columns"
	  		:options="options"
	  		@handleSelectionChange="handleSelectionChange" 
	  		:operates="operates" 
	  	></i-table>
	  	<i-pagination
	  		@handleSizeChange="handleSizeChange"
    		@handleIndexChange="handleIndexChange" 
    		:pagination="pagination"
    		:total="total"
    		style="margin-top: 10px;text-align: right;"
	  	></i-pagination>
	</div>
  
</template>

<script>
	import util from '../../assets/util'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	import iTable from "../../components/iTable";
	import iPagination from "../../components/iPagination";
	export default {
		data() {
			return{
				filters: {
					name: ''
				},
				users: [], //列表数据
				total: 0,
				columns:[], //表头数据
				options: {  // table 的参数
					border:true,  //是否是边框
		            stripe: true, // 是否为斑马纹 table
		            loading: true, // 是否添加表格loading加载动画
		            highlightCurrentRow: true, // 点击行是否支持当前行高亮显示
		            mutiSelect: true, // 是否支持列表项选中功能
		            serialNumber:true,  //列表是否显示序号
		        },
		        pagination: { //分页操作
		          	pageIndex: 1,
		          	pageSize: 20,
		          	pageArray:[20,50,100]
		        },
		        operates:{ //需要展示的操作列
		        	width: 200,
          			fixed: 'right',
          			list: [
          			   {
			              label: '编辑',
			              type: 'warning',
			              show: true,
			              icon: 'el-icon-edit',
			              plain: true,
			              disabled: false,
			              method: (index, row) => {
			                this.handleEdit(index, row)
			              }
			            },
			            {
			              label: '删除',
			              type: 'danger',
			              icon: 'el-icon-delete',
			              show: true,
			              plain: false,
			              disabled:false,
			              method: (index, row) => {
			                this.handleDel(index, row)
			              }
			            }
          			]
		        }
		        
			}
		},
		methods: {
			//获取table数据
			getUsers() {
				let para = {
					page: this.pagination.pageIndex,
					size: this.pagination.pageSize,
					name: this.filters.name
				};
				this.options.loading = true;
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.options.loading = false;
				});
			},
			//获取table表头
			getColumn(){
				this.columns = [
					{
						 prop: "name", label: "姓名" ,width:120
					},
					{
						 prop: "sex", label: "性别" ,width:100,
						 formatter: function (row, column) {
								return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
						 },
					},
					{
						 prop: "age", label: "年龄" ,width:100
					},
					{
						 prop: "role", label: "角色" ,width:120,
						 render: (h, params) => {
			              	return h('el-tag', {
			                	props: {type: params.row.role === 0 ? 'success' : params.row.role === 1 ? 'info' : 'danger'} // 组件的props
			              	}, 
			              	params.row.role === 0 ? '总管理员' : params.row.role === 1 ? '行政人员' : '部门经理')
			            }

					},
					{
						 prop: "birth", label: "生日" ,width:120
					},
					{
						 prop: "addr", label: "地址" ,width:300
					}
				];
			},
			// 切换每页显示的数量-分页组件
			handleSizeChange(pagination){
				this.pagination = pagination;
				this.getUsers();
			},
			// 切换页码-分页组件
			handleIndexChange(pagination){
				this.pagination = pagination;
				this.getUsers();
			},
			// 选中行
		    handleSelectionChange (val) {
		        console.log('val:', val)
		    },
		    // 编辑
		    handleEdit (index, row) {
		        console.log(' index:', index)
		        console.log(' row:', row)
		    },
		    // 删除
		    handleDel (index, row) {
		        console.log(' index:', index)
		        console.log(' row:', row)
		    }

		},
		mounted() {
			this.getUsers();
			this.getColumn();
		},
		components: {
		    iTable,iPagination
		}
	}
</script>

<style>
</style>