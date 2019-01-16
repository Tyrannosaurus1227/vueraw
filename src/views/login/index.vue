<template>
  <div class="loginImg">
    <el-form  :model="ruleForm" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px"
              v-loading="loading" element-loading-text="加载中" class="demo-ruleForm login-container">
      <div class="pr">
        <div class=" login-title">登录系统</div>
      </div>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" autofocus @keyup.enter.native="login" auto-complete="off"
                  placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="login" auto-complete="off"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    export default {
        name:'Login',
        data () {
            return {
                loading: false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules2: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted: function () {
            let self = this
            self.$store.commit('logout')
        },
        methods: {
            login () {
                var self = this
                self.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        self.loading = true
                        var param = {
                            token: "aaa",
                            refreshToken: "aaa",
                            username: "张三"
                        }
                        self.$store.commit('login', param)
                        self.$router.replace({ path: '/' })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }
</script>
<style scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login-title {
    margin: 0px auto 40px auto;
    text-align: center;
    /*margin-right: 13px;*/
    font-size: 30px;
    width: 150px;
    color: #505458;
  }
  .loginImg .el-input__inner{
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    border-radius: 0;
    outline: none;
    /*height: 3rem;*/
    width: 100%;
    font-size: 1rem;
    /*margin: 0 0 20px 0;*/
    padding: 0;
    box-shadow: none;
    /*box-sizing: content-box;*/
    transition: all 0.3s;
  }

  .loginImg .el-input__inner:focus {
    outline:none;
    border-bottom: 2px solid #BD4B51;
  }
</style>
