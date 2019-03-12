const state = {
  filter:{           //分类筛选
    gender: 'male',     //性别
    type: 'hot',    //类型
    major: '奇幻',      //主分类
    minor: '',      //子分类
  },
  current_book:null,    //当前查看书籍对象
  shelf_book_list:[],   //书架列表
  search_history:[],      //搜索历史
  list_type:null,     //列表数据类型和标题
  read_history:[],    //阅读历史记录
	night_mode: false,	//是否夜间模式
	skin_color: 'skin-default',		//阅读页面背景色
	font_size: 14,		//设置页面字体大小
}

export default state;