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
  list_type:null
}

export default state;