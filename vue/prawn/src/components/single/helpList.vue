<template>
<div>
    <app-header :title = "'帮助中心'"></app-header>
    <div class="main-content">
        <div class="content">
            <ul>
                <li class="content_miao">
                    常见问题
                </li>
                <li class="content_miao_li" @click="go_task('xinren')">
                    <div class="content_miao_li_fone">
                        <div class="content_miao_li_fone_zuo">新人怎么赚钱</div>
                        <div class="content_miao_li_fone_you"></div>
                        <div class="clear"></div>
                    </div>
                </li>                
                <li class="content_miao_li" @click="go_task('tixian')">
                    <div class="content_miao_li_fone">
                        <div class="content_miao_li_fone_zuo">在哪里提现</div>
                        <div class="content_miao_li_fone_you"></div>
                        <div class="clear"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content">
            <ul>
                <li class="content_miao">
                    打款规则
                </li>
                <li class="content_miao_li" @click="go_task('daozhang')">
                    <div class="content_miao_li_fone">
                        <div class="content_miao_li_fone_zuo">大虾试玩打款规则</div>
                        <div class="content_miao_li_fone_you"></div>
                        <div class="clear"></div>
                    </div>
                </li>      
            </ul>
        </div>
        <div class="content">
            <ul>
                <li class="content_miao">
                    任务问题
                </li>
                <li class="content_miao_li" @click="go_task('renwu')">
                    <div class="content_miao_li_fone">
                        <div class="content_miao_li_fone_zuo">做任务怎么没有钱</div>
                        <div class="content_miao_li_fone_you"></div>
                        <div class="clear"></div>
                    </div>
                </li>      
            </ul>
        </div>
        <div class="content">
            <ul>
                <li class="content_miao">
                    联系方式
                </li>
                <li class="content_miao_li">
                    <div class="content_miao_li_fone">
                        <div class="content_miao_li_fone_zuo">QQ号：2290747606</div>
                        <div class="content_miao_li_fone_you"></div>
                        <div class="clear"></div>
                    </div>
                </li>      
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default{
      data(){
        return {          
          }
      },
    mounted(){

    },
    methods: {
        go_task: function(p){
            this.$router.push({path:'./help_detail',query:{q:p}})
        }
    },
    beforeRouteLeave(to,from,next){
        //MessageBox.alert(1);
        console.log(to);
        to.meta.keepAlive = false;
        next();
    }

}
</script>
<style scoped>
    .main-content{background-color: #f5f5f5;min-height: 50rem;height: 100%;}
    .content{padding-top: 16px;}
    .content ul{margin-top: 16px;}
    .content_miao{ margin-left: 10px; padding-bottom: 15px;}
    .content_miao_li{ height: 40px; line-height: 40px; width: 100%;background-color: #FFFFFF; border-bottom:1px solid  #f5f5f5;position: relative;}
    .content_miao_li_fone{margin-left: 25px;  }
    .clear{clear: both;}
    .content_miao_li_fone_zuo{ float: left; }
    .content_miao_li_fone_you {
        float: right;
    content: '';
    width: .4rem;
    height: .4rem;
    position: absolute;
    top: 50%;
    right: 1rem;
    margin-top: -.2rem;
    background: 0 0;
    border: 1px solid #ddd;
    border-top: none;
    border-right: none;
    z-index: 2;
    -webkit-border-radius: 0;
    border-radius: 0;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);}
</style>