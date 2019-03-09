<template>
  <section class="categorylist">
    <v-header :title="title" :type="type"></v-header>
    <!-- 过滤栏 -->
    <div class="list" id="dataList">
      <v-category-bar class="category-bar" :gender="filter.gender" :major="filter.major"></v-category-bar>
      <!-- 列表栏 -->
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <v-book-list :book-list="category_list"></v-book-list>
      </mescroll-vue>
    </div>
  </section>
</template>

<script>
import http from '@/http/api'
import Header from 'components/common/Header'
import BookList from 'components/common/BookList'
import CategoryBar from 'components/common/CategoryBar'
import MescrollVue from 'mescroll.js/mescroll.vue'
import { mapState } from 'vuex'
export default {
  name:'categorylist',
  components:{
    'v-book-list':BookList,
    'v-category-bar':CategoryBar,
    'v-header':Header,
    MescrollVue // 注册mescroll组件
  },
  computed: {
    ...mapState([
      'filter',
    ]),
    // 由于watch 无法监听到对象中
    filter_type_change(){
      return this.filter.type
    },
    type_Change(){
      return this.filter.minor
    }
  },
  watch:{
    filter_type_change(val){
      // console.log('改变'+val)
      // 重新加载mescroll
      this.mescroll.resetUpScroll()
    },
    type_Change(val){
      // console.log('改变'+val)
      // 重新加载mescroll
      this.mescroll.resetUpScroll()
    },
  },
  data(){
    return{
      title:'分类详情',
      type:'type-three',
      category_list:[],
      gender:'',
      major:'',
      mescroll:null,
      mescrollDown:{
        use:false //禁止下拉刷新
      },
      mescrollUp:{
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
			        //以下是一些常用的配置,当然不写也可以的.
				page: {
					num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					size: 20 //每页数据条数,默认20    //注意不能追书神器 size必须20否则无法请求
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
    getCategoryList(){
      return  http.getCatBooks(this.filter.gender, this.filter.type, this.filter.major, this.filter.minor, this.mescrollUp.page.num * this.mescrollUp.page.size)
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page, mescroll) {
      // 联网请求
      this.getCategoryList().then(data=>{
        let arr = data
        // 如果是第一页需手动制空列表
        if(page.num === 1){
          this.category_list = []
        }
        // 把请求到的数据添加到列表
        this.category_list = this.category_list.concat(arr)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
        })
      }).catch((e) => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        mescroll.endErr()
      })
    }
  },
  created(){
    this.gender = this.$route.query.gender;
    this.major = this.$route.params.major;
    this.$store.state.filter.gender=this.gender
    this.$store.state.filter.major=this.major
    this.$store.state.filter.minor=''
  }
}
</script>

<style lang="scss" scoped>
.list{
  margin-top: .9rem;
}
.category-bar{
  position: fixed;
  top:.9rem;
  width: 100%;
  height: .9rem;
  z-index: 1;
}
 .mescroll {
    position: fixed;
    // top: 44px;
    top:2rem;
    bottom: 0;
    height: auto;
  }
</style>

