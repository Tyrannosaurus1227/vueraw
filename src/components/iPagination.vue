<template>
	<el-pagination 
		@size-change="handleSizeChange"
        @current-change="handleIndexChange"
        :page-size="CurrentPagination.pageSize"
        :page-sizes="CurrentPagination.pageArray" 
        :current-page="CurrentPagination.pageIndex"
        layout="total,sizes, prev, pager, next,jumper"
        :total="total">
	</el-pagination>

</template>

<script>
	const _pageArray = [20, 50, 100] // 每页展示条数的控制集合
	export default {
		props:{
			pagination:{
				type: Object, 
        		default: null 
        		//分页参数
        		//pageSize:每页展示的条数
        		//pageIndex:当前页
        		//pageArray: 每页展示条数的控制集合
			},
			total:{
				type: Number,
        		default: 0
			}
		},
		data() {
			return{
				CurrentPagination:{}
			}
		},
		methods:{
			//pageSize 改变时会触发,回调：每页条数  --切换每页显示的数量
			handleSizeChange(size){
				if (this.pagination) {
		          	this.CurrentPagination = {
		            	pageIndex: 1,
		            	pageSize: size,
		            	pageArray:this.pagination.pageArray
		          	}
		          	this.$emit('handleSizeChange', this.CurrentPagination)
		       }
			},
			//currentPage 改变时会触发，回调：当前页   --切换页码
		    handleIndexChange (currnet) {
		        if (this.pagination) {
		          	this.CurrentPagination.pageIndex = currnet
		          	this.$emit('handleIndexChange', this.CurrentPagination)
		        }

		    },

			
		},
		mounted(){
			if (this.pagination && !this.pagination.pageSizes) {
		        this.pagination.pageArray = _pageArray // 每页展示条数控制
		    }
			this.CurrentPagination = this.pagination || {
		        pageSize: this.total,
		        pageIndex: 1,
		    } // 判断是否需要分页
		}
		
	}
</script>

<style>
</style>