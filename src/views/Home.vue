<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			
			<el-col :span="10" style="display: flex;">
				<div :class="{toolsClick:isActive,tools:true}" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
				<el-breadcrumb separator="/" class="breadcrumb-inner" style='line-height: 60px;'>
					<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
						{{ item.name }}
					</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
			
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner" style="color: #2C3E50;"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed"   background-color="#304156" text-color="#fff" active-text-color="#409EFF" style='width:180px;'>
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
		  <section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'VUEADMIN',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				isActive:false
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var self = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					  self.$store.commit('logout');
            self.$router.replace('/login');
					
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				  this.collapsed=!this.collapsed;
          this.isActive = !this.isActive;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			this.sysUserName = this.$store.state.username || '';
      this.sysUserAvatar =  '';
		}
		
	}

</script>

<style scoped lang="less">
	
	@side-color: rgb(48, 65, 86);
  .bordered {
    border-bottom: solid 1px #d8dce5;
  }
  .container{
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      .bordered();
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        background:@side-color;
        color:#fff;
        border-right:1px solid #d8dce5;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
         }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:180px;
      }
      .logo-collapse-width{
        width:60px;
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        transition:  .5s;
        -moz-transition:  .5s;	/* Firefox 4 */
        -webkit-transition:  .5s;	/* Safari 和 Chrome */
        -o-transition:  .5s;	/* Opera */
      }
      .toolsClick{
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); 	/* IE 9 */
        -moz-transform:rotate(90deg); 	/* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); 	/* Opera */
      }
      .el-breadcrumb span:first-child{
      	font-weight: 600;
      	cursor: pointer;
      }
      .el-breadcrumb span{
      	color: #97a8be;
      	cursor: pointer;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0;
      overflow: hidden;
      aside {
        flex:0 0 180px;
        width: 180px;
        .el-menu{
          height: 100%;
          background:@side-color;
          text-align: left;
          box-sizing: border-box;
        }
        .el-submenu .el-menu-item{
        	min-width: auto;
        	background-color: #1f2d3d !important;
        	color: #fff;
        }
        .el-submenu .el-menu-item:hover {
				  background-color: #001528 !important;
				}
				.el-submenu__title:hover{
					background-color: #001528 !important;
				}
				.el-menu-item.is-active {
				    color: #20a0ff;
				}
        .collapsed{
          width:60px;
        	.item{
          	position: relative;
        	}
        	.el-menu-item{
        		background: @side-color !important;
        	}
        	.item:hover {
				    background-color: #001528 !important;
				  }
        	.submenu{
          	position:absolute;
          	top:0px;
          	left:60px;
          	z-index:99999;
          	height:auto;
          	display:none;
        	}
      	}
    	}
      .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex:0 0 180px;
        width: 180px;
      }
      .content-container {
				// background: #f1f2f7;
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
    }
  }
</style>