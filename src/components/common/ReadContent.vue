<template>
  <section :class="['read-content',skin_color,{'night-color':night_mode}]" v-if="readContent.length>0" >
    <div class="config">
      <div :class="['config-top','bg-black', { 'config-enter': show_config }]"><span @click="$router.go(-1);" ><i class="iconfont icon-fanhui"></i></span><span>{{current_book.title}}</span><span></span></div>
      <div :class="['config-right','bg-black', { 'config-enter': show_config }]" @click="addShelft()"><span v-if="!is_add">加入书架</span><span v-else>已加入书架</span></div>
      <div :class="['config-bottom','bg-black', { 'config-enter': show_config }]">
        <div class="config-bootom-item" @click="showChapter()"><i class="iconfont icon-sort"></i><span>目录</span></div>
        <div class="config-bootom-item" @click="showNightMode()">  
          <template v-if="!night_mode">
            <i class="iconfont icon-moonbyueliang"></i>
            <span>夜间模式</span>
          </template>
          <template v-else>
            <i class="iconfont icon-rijianmoshi"></i>
            <span>日间模式</span>
          </template>
        </div>
        <div class="config-bootom-item" @click="showConfigPop()"><i class="iconfont icon-Aa"></i><span>设置</span></div>
      </div>
      <!-- 设置字体颜色弹出层 -->
      <div class='config-bootom-pop' v-show="show_config_pop">
        <ul class="config-skin-color">
          <li class="color-item" v-for="(skin,index) in skin_list" :key="index">
            <span :class="['color-round-btn',skin,{'skin_color_active':skin==skin_color}]" @click="changeSkinColor(skin)"><i v-if="skin==skin_color" class="iconfont icon-gou"></i></span>
          </li>
        </ul>
        <div class="config-control-fontsize">
          <button @click="changeFontSize(false)">A-</button>
          <button @click="changeFontSize(true)">A+</button>
        </div>
      </div>
    </div>

    <div class="read-touch" @click="showConfig()"></div>
    <div class="content" v-for="(content,index) in readContent" :key="index">
      <h4 class="read-title">{{content.content_title}}</h4>
      <ul >
        <li :style="{ fontSize: font_size + 'px' }" v-for="(item,index) in content.content_list" :key="index">
          {{item}}
        </li>
      </ul>
    </div>
    <button class="next-chapter" @click="$emit('next-chapter')">加载下一章</button>
  </section>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
  name:'readcontent',
  props:{
    readContent:Array
  },
  data(){
    return{
      show_config:false,     //设置弹出层
      show_config_pop:false,  //设置皮肤字体弹出层
      skin_list:['skin-default', 'skin-blue', 'skin-green', 'skin-pink', 'skin-dark', 'skin-light'],
      is_add:false

    }
  },
  computed:{
    // 注意computed里的数据不能直接在method created 等改变
    // 会报错 Computed property "skin_color" was assigned to but it has no setter.
    ...mapState([
      'current_book',
      'night_mode',
      'skin_color',
      'font_size'
    ])
  },
  methods:{
    ...mapMutations([
      'addToShelft',
      'setCurrentBookInfo',
      'saveNightMode',
      'saveSkinColor',
      'saveFontSize'
    ]),
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
      this.saveNightMode(!this.night_mode)
    },
    // 显示弹出层皮肤和字体大小
    showConfigPop(){
      this.show_config_pop=true
    },
    changeSkinColor(skin){
      this.saveNightMode(false)
      this.saveSkinColor(skin)
    },
    changeFontSize(isAdd){
      console.log(this.font_size)
      if ((this.font_size >= 30 && isAdd) || (this.font_size <= 10 && !isAdd)) {
          return;
      }
      let size = this.font_size;
      isAdd ? size++ : size--
      this.saveFontSize(size);
    },
    // 显示章节 $emit触发父组件
    showChapter(){
      // this.show_config=false
      this.$emit('show-chapter');
    },
    addShelft(){
      if(this.is_add){
        return
      }
      let book = this.current_book;
      book.isInShelf = true;
			this.setCurrentBookInfo(book);
      this.addToShelft(this.current_book)
      this.is_add = true;
    }
  },
  created(){
      this.is_add = this.current_book.isInShelf;
      // 当没有设置皮肤颜色时，默认显示skin-default
      if (!this.skin_list.includes(this.skin_color)) {
          this.saveSkinColor('skin-default');
      }
  }

}
</script>

<style lang="scss" scoped>
// 皮肤颜色和夜晚模式
.night-color{
  color: rgba(255, 255, 255, .5) !important;
  background-color: #1a1a1a !important;
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

.iconfont{
  font-size: .3rem;
}

.read-content{
  font-size: .28rem;
  padding:.2rem .2rem;
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
    display: flex;
    justify-content:space-between;
  }
  .config-top>span:nth-child(1){
    position: absolute;
    left: .25rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .config-top>span:nth-child(2){
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      line-height: .4rem;
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
          display: flex;
          justify-content: center;
          align-items: center;
          .icon-gou{
            color:#ed424b;
            font-size: .4rem;
          }
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
  .next-chapter{
    display: block;
    margin:0 auto;
    width: 6rem;
    height: .72rem;
    border-radius: .36rem;
    background-color: #ed424b;
    font-size: .32rem;
    line-height: .72rem;
    color: #fff;
    text-align: center;
    border:none;
    outline: none;
    letter-spacing: .1rem;
    text-indent: .1rem;

  }
}

</style>

