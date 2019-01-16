<template>
	<el-table
            :data="tableData"
            :border="options.border"
            :stripe="options.stripe"
            :highlight-current-row="options.highlightCurrentRow"
            v-loading.iTable="options.loading" 
            style="width: 100%;"
            :header-cell-style="headerStyle"
            @selection-change="handleSelectionChange">
            
            <!--table 选择框 start-->
		    <el-table-column v-if="options.mutiSelect" type="selection"  width="55">
		    </el-table-column>
		    <!--table 选择框 end-->
		    
            <!--table序号 start-->
            <el-table-column v-if="options.serialNumber" type="index" width="60">
			</el-table-column>
		    <!--table序号 end-->
		    
		    <!--table 数据列 start-->
            <el-table-column
                v-for="(column, index) in columns"
                :prop="column.prop"
                :key="index"
                :label="column.label"
                :width="column.width">
		        <template slot-scope="scope">
		            <template v-if="!column.render">
		              	<template v-if="column.formatter">
		                	<span v-html="column.formatter(scope.row, column)"></span>
		              	</template>
		              	<template v-else>
		                	<span>{{scope.row[column.prop]}}</span>
		              	</template>
		            </template>
		            <template v-else>
		              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index"></expand-dom>
		            </template>
		        </template>
            </el-table-column>
            <!--table 数据列 end-->
            
            <!--table 按钮操作组 start-->
            <el-table-column label="操作" align="center" :width="operates.width" :fixed="operates.fixed"
            	v-if="operates.list.length > 0">
            	<template slot-scope="scope">
            		<div class="operate-group">
            		 	<template v-for="(btn, key) in operates.list">
            		 		<div style="display: inline-block;" v-if="btn.show">
            		 			  <el-button :type="btn.type" size="mini" 
            		 			  	:icon="btn.icon" 
            		 			  	:disabled="btn.disabled"
                                	:plain="btn.plain" 
                                	@click.native.prevent="btn.method(key,scope.row)">
                                	{{ btn.label }}
								   </el-button>
            		 		</div>
            		 	</template>
            		</div>
            	</template>
            </el-table-column>
            <!--table 按钮操作组 end-->
        </el-table>
   

</template>

<script>
	export default {
		data(){
			return{
				multipleSelection:[]// 多行选中
			}
		},
		props:{
			tableData: Array, //表格数据
            columns: Array,  //表头数据
            options: {
		        type: Object,
		        default: {// table 表格的控制参数
		            border:true,
		            stripe: false, // 是否为斑马纹 table
		            loading: false, // 是否添加表格loading加载动画
		            highlightCurrentRow: false, // 是否支持当前行高亮显示
		            mutiSelect: false, // 是否支持列表项选中功能
		            serialNumber:false,   //列表是否显示序号
		        }
		    },
		    operates: {//table按钮组
		        type: Object,
		        default: {} 
		        // width:按钮列宽
		        // fixed：是否固定（left,right）
		        // 按钮集合 --
				// 		label: 文本，
				//		type :类型（primary / success / warning / danger / info / text），
				//		show：是否显示，
				//		icon：按钮图标，
				//		plain：是否朴素按钮，
				//		disabled：是否禁用，
				//		method：回调方法
		    },

		},
        methods:{
        	//设置表头样式
      	    headerStyle() {
	            return { "text-align": "left" ,"background":"#dfe6ec"};
	        },
	        // 多行选中
		    handleSelectionChange (val) {
		        this.multipleSelection = val
		        this.$emit('handleSelectionChange', val)
		    },

        },
        watch:{
        	tableData:function(){
			    console.log(this.tableData);
			}
        },
        components:{
        	expandDom: {
        	  	functional: true,
        	  	props: {
			          row: Object,
			          render: Function,
			          index: Number,
			          column: {
			            type: Object,
			            default: null
			          }
		        },
		        render: (h, ctx) => {
			          const params = {
			            row: ctx.props.row,
			            index: ctx.props.index
			          }
			          if (ctx.props.column) 
			          params.column = ctx.props.column
			          return ctx.props.render(h, params)
		        }

        	}
        },
        mounted(){
        }
    }
</script>

<style>
</style>