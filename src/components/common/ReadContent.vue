<template>
  <section :class="['read-content',skin_color,{'night-color':night_mode}]" v-if="readContent.length>0" >
    <div class="config">
      <div :class="['config-top','bg-black', { 'config-enter': show_config }]">顶部栏</div>
      <div :class="['config-right','bg-black', { 'config-enter': show_config }]">加入书架</div>
      <div :class="['config-bottom','bg-black', { 'config-enter': show_config }]">
        <div class="config-bootom-item">目录</div>
        <div class="config-bootom-item" @click="showNightMode()">夜间模式</div>
        <div class="config-bootom-item" @click="showConfigPop()">设置</div>
      </div>
      <!-- 设置字体颜色弹出层 -->
      <div class='config-bootom-pop' v-show="show_config_pop">
        <ul class="config-skin-color">
          <li class="color-item" v-for="(skin,index) in skin_list" :key="index">
            <span :class="['color-round-btn',skin,{'skin_color_active':skin==skin_color}]" @click="changeSkinColor(skin)"></span>
          </li>
        </ul>
        <div class="config-control-fontsize">
          <button @click="changeFontSize(false)">A-</button>
          <button @click="changeFontSize(true)">A+</button>
        </div>
      </div>
    </div>
    
    <div class="read-tag">民国谍影</div>
    <h4 class="read-title">{{readContent[0].content_title}}</h4>
    <div class="read-touch" @click="showConfig()"></div>
    <ul >
      <li :style="{ fontSize: font_size + 'px' }" v-for="(item,index) in readContent[0].content_list" :key="index">
        {{item}}
      </li>
    </ul>


  </section>
</template>

<script>
export default {
  name:'readcontent',
  props:{
    readContent:Array
  },
  data(){
    return{
      show_config:false,     //设置弹出层
      show_config_pop:false,  //设置皮肤字体弹出层
      skin_color:'',          //皮肤颜色
      night_mode:false,       //夜晚模式
      skin_list:['skin-default', 'skin-blue', 'skin-green', 'skin-pink', 'skin-dark', 'skin-light'],
      // skin_color_active:'',
      font_size:14

    }
  },
  methods:{
    // 显示设置弹出层
    showConfig(){
      if(!this.show_config){
        this.show_config=true
      }else{
        this.show_config=false
        this.show_config_pop=false
      }  
    },
    // 夜间模式
    showNightMode(){
      this.skin_color=false
      if(!this.night_mode){
        this.night_mode=true
      }else{
        this.night_mode=false
      }
    },
    // 显示弹出层皮肤和字体大小
    showConfigPop(){
      this.show_config_pop=true
    },
    changeSkinColor(skin){
      this.night_mode=false
      this.skin_color=skin
    },
    changeFontSize(isAdd){
      console.log(this.font_size)
      // if ((this.font_size >= 30 && isAdd) || (this.font_size <= 10 && !isAdd)) {
      //     return;
      // }
      let size = this.font_size;
      isAdd ? size++ : size--
      this.font_size=size
      // this.SET_FONT_SIZE(size);
    }
  }

}
</script>

<style lang="scss" scoped>
// 皮肤颜色和夜晚模式
.night-color{
  color: rgba(255, 255, 255, .5);
  background-color: #1a1a1a;
}
.skin-default {
  background-color: #c4b395;
}

.skin-blue {
  background-color: #c3d4e6;
}

.skin-green {
  background-color: #c8e8c8;
}

.skin-pink {
  background-color: #F8C9C9;
}

.skin-dark {
  background-color: #3E4349;
}

.skin-light {
  background-color: #f6f7f9;
}



.read-content{
  padding:0 .2rem;
  // 设置
  .bg-black{
    color: #fff;
    background-color: #13120F;
    transition: transform 0.15s ease 0s;
    text-align: center;
  }
  .config-top{
    position: fixed;
    width: 100%;
    height: .8rem;
    top:0;
    left:0;
    transform: translateY(-100%);
  }
  .config-right{
    position: fixed;
    right: 0;
    top:20%;
    width: 1.6rem;
    height: .6rem;
    line-height: .6rem;
    transform: translateX(100%);
    border-top-left-radius: .3rem;
    border-bottom-left-radius: .3rem;
  }
  .config-bottom{
    position: fixed;
    display: flex;
    width: 100%;
    height: 1rem;
    bottom: 0;
    left: 0;
    z-index: 2;
    justify-content: space-between;
    transform: translateY(100%);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    &>.config-bootom-item{
      flex:0 0 33.3%;
    }
  }
  .config-enter{
    transform: translate(0%, 0%);
  }
  .config-pop-enter{
    transform: translate(0%, 0%) !important;
  }
  .config-bootom-pop{
    position: fixed;
    bottom:1rem;
    left:0;
    width: 100%;
    height: 2.4rem;
    z-index: 1;
    color: #fff;
    background-color: #13120F;
    .config-skin-color{
      height: 1.04rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      .color-item{
        flex:0 0 16.667%;
        display: flex;
        justify-content: center;
        align-items: center;
        .color-round-btn{
          display: block;
          width: .68rem;
          height: .68rem;
          border-radius: 50%;
        }
        .skin_color_active{
          border:1px solid#ed424b;
        }
      }
    }
    .config-control-fontsize{
      height: 1.36rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      button{
        outline: none;
        -webkit-tap-highlight-color: transparent;
        display: block;
        background: transparent;
        width: 3.04rem;
        height: .76rem;
        line-height: .76rem;
        text-align: center;
        font-size: .4rem;
        border:1px solid #fff;
        border-radius: .38rem;
        color: #fff;
      }
    }
  }
  //

  .read-tag{
    width: 100%;
    height: .8rem;
  }
  .read-title{
    text-align: center;
    font-weight: bold;
  }
  .read-touch{
    position: fixed;
    width: 60%;
    height: 40%;
    top: 30%;
    left: 20%;
    z-index: 1000;
  }
}
</style>

