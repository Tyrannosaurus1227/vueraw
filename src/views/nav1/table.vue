<template>
	<div>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" style="text-align: left;">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<i-table 
	  		:tableData="users" 
	  		:columns="columns"
	  		:options="options"
	  		@handleSelectionChange="handleSelectionChange" 
	  		:operates="operates" 
	  	></i-table>
	  	<!--工具条-->
		<el-col :span="24" class="toolbar" style="overflow: hidden;">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" style="float: left;">批量删除</el-button>
			<i-pagination
	  		@handleSizeChange="handleSizeChange"
    		@handleIndexChange="handleIndexChange" 
    		:pagination="pagination"
    		:total="total"
    		style="margin-top: 10px;float: right;"
	  	></i-pagination>
		</el-col>
		
		<!--新增 编辑 dialog-->
		<el-dialog :title="formTitle" :visible="formVisible" @close='closeDialog'  
			:close-on-click-modal="true"
			style="text-align: left;" >
			<el-form :model="form" label-width="80px" :rules="formRules" ref="form">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="form.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input-number v-model.number="form.age"  :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="form.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="formVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submit" :loading="formLoading">提交</el-button>
			</div>
		</el-dialog>
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
				formLoading:false,
				formVisible: false,//新增编辑弹出层是否显示
				formTitle:"", //弹出层标题
				form: {//弹出层表单数据
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				formRules: {//弹出层表单校验
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					age:[
					    {type:'number', message: '年龄不符合规范', trigger: 'change'}
					]
					
				},
				
				filters: {
					name: ''
				},
				users: [], //列表数据
				total: 0,
				sels:[], //勾选的数据
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
//		        console.log('val:', val)
		        this.sels = val;
		    },
		    // 编辑
		    handleEdit (index, row) {
		    	this.formTitle = "编辑信息";
		    	this.formVisible = true;
		        console.log(' index:', index);
		        console.log(' row:', row);
		        this.form = Object.assign({}, row);
		    },
		    // 删除
		    handleDel (index, row) {
//		        console.log(' index:', index)
//		        console.log(' row:', row)
		        this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
		   },
		    //批量删除
		    batchRemove(){
		    	var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
		   },
		    //新增弹出框
		    handleAdd(){
		   	    this.formVisible = true;
		   	    this.formTitle = "新增信息"
				this.form = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
		    },
		    //点击弹出框中的关闭按钮
		    closeDialog(){
		    	this.formVisible = false;
		    },
		    //编辑及新增点击提交
		    submit(){
		    	this.$refs.form.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.formLoading = true;
							let para = Object.assign({}, this.form);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							if(this.formTitle == "编辑信息"){//编辑
								editUser(para).then((res) => {
									this.formLoading = false;
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.formVisible = false;
									this.$refs['form'].resetFields();
									this.getUsers();
								});
							}else{//新增
								addUser(para).then((res) => {
									this.formLoading = false;
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.$refs['form'].resetFields();
									this.formVisible = false;
									this.getUsers();
								});
							}
							
						});
					}
				});
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