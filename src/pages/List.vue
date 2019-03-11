<template>
  <section class="list">
    <v-header :title="title" :type="type"></v-header>
    <div class="list-box" id="dataList">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <v-book-list :book-list="list"></v-book-list>
      </mescroll-vue>
    </div>
  </section>
</template>

<script>
import http from '@/http/api'
import Header from 'components/common/Header'
import BookList from 'components/common/BookList'
import MescrollVue from 'mescroll.js/mescroll.vue'
import {mapState,mapMutations} from 'vuex';
export default {
  name:'list',
  components:{
    'v-book-list':BookList,
    'v-header':Header,
    MescrollVue // 注册mescroll组件
  },
  data(){
    return{
      title:'书籍详情',
      type:'type-three',
      id:this.$route.params.id,   
      list:[],
      mescroll:null,
      mescrollDown:{
        // use:false //禁止下拉刷新
      },
      mescrollUp:{
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
			        //以下是一些常用的配置,当然不写也可以的.
				page: {
					num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					size: 10 //每页数据条数,默认10    
				},
				htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
				noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看这就是为什么无更多数据有时候不显示的原因
				toTop: {
					//回到顶部按钮
					src: require("assets/img/mescroll-totop.png"), //图片路径,默认null,支持网络图
					offset: 1000 //列表滚动1000px才显示回到顶部按钮
				},
				empty: {
					//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "dataList", //父布局的id (1.3.5版本支持传入dom元素)
					icon: require("assets/img/mescroll-empty.png"), //图标,默认null,支持网络图
					tip: "暂无相关数据~" //提示
				}
      }
    }
  },
  computed:{
    ...mapState([
      'list_type'
    ])
  },
  beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
        // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  },
  methods:{
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page, mescroll) {
      if(this.list_type=='home'){
        if(page.num === 1){
          this.list = []
        }
        http.getBookList(this.id, page.num)
					.then(data => {
            var arr = data.map(value => {
							return value.book;
						});
            this.list = this.list.concat(arr)
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length)
            })
          }).catch((e) => {
              // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
              mescroll.endErr()
            })
      }else if(this.list_type=='book'){
        http.getRecommend(this.id)
					.then(data => {
            var res=this.sliceArr(data, 10)
            var arr=res[page.num-1]
            this.list = this.list.concat(arr)
            var totalSize=data.length
            var cur_data_len=arr.length
            mescroll.endBySize(cur_data_len, totalSize);
					})
      }
    },
    sliceArr(array, size) {
        var result = [];
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
            var start = x * size;
            var end = start + size;
            result.push(array.slice(start, end));
        }
        return result;
    }
  },
  created(){


  }
}
</script>

<style lang="scss" scoped>
.list{

  .list-box{
     .mescroll {
      position: fixed;
      top:.9rem;
      bottom: 0;
      height: auto;
    }
  }
}
</style>

