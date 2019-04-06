// import http from 'http/index.js'

import {setStore,getStore,removeStore} from '../assets/js/storage_function';
const mutations = {
  // 从localsorage取出保存的数据初始
  getStorageInitData(state,book){
    let shelf_book_list=getStore('SHEFL_BOOK_LIST')
    if(shelf_book_list){
      state.shelf_book_list=JSON.parse(shelf_book_list)
    }
    let search_history=getStore('SEARCH_HISTORY')
    if(search_history){
      state.search_history=JSON.parse(search_history)
    }
    state.night_mode = getStore('NIGHT_MODE') === 'true' ? true : false;
    // Number.isInteger(value) 判断数是否整数
    state.font_size=Number.isInteger(getStore('FONT_SIZE'))?parseInt(getStore('FONT_SIZE')):14
		state.skin_color = getStore('SKIN_COLOR');
  },
  // 当前查看书籍信息
  setCurrentBookInfo(state,book){
    state.current_book=book
  },
  // 添加到书架
  addToShelft(state,book){
    // 判断是否存在
    let is_exist=false
    for(let shelf_book of state.shelf_book_list){
      if(shelf_book.id==book.id){
        is_exist=true
        break;
      }
    }
    if(!is_exist){
      state.shelf_book_list.unshift(book);
      // 保存到localstorage
      setStore('SHEFL_BOOK_LIST', state.shelf_book_list);
    }
  },
  // 删除特定书从书架
  deleteFromShelft(state,book_id){
    state.shelf_book_list = state.shelf_book_list.filter(value => {
			return !book_id.includes(value.id);
    });
    // 重现覆盖localstorage
		setStore('SHEFL_BOOK_LIST', state.shelf_book_list);
  },
  // 删除全部书从书架
  deleteAllShelft(state){
    state.shelf_book_list=[]
    // 或
    state.shelf_book_list.length=0
    removeStore('SHEFL_BOOK_LIST')
  },
  // 保存搜索记录
  setSearchHistory(state,key_word){
		if(state.search_history.indexOf(key_word) > -1) {
			state.search_history.splice(state.search_history.indexOf(key_word), 1);
		}
		state.search_history.unshift(key_word);
		setStore('SEARCH_HISTORY', state.search_history);
  },
  // 删除搜索记录
  deleteSearchHistory(state){
    state.search_history.splice(0, state.search_history.length);
    removeStore('SEARCH_HISTORY');
  },
  // 保存查看更多列表页类型和标题
  saveListType(state,type){
    state.list_type=type
  },
  // 保存阅读历史记录
  saveReadHistory(state,book){
    state.read_history.unshift(book)
    setStore('READ_HISTORY', state.read_history);
  },
  // 保存日间和夜间模式
  saveNightMode(state,night_mode){
    state.night_mode=night_mode
    setStore('NIGHT_MODE', state.night_mode);
  },
  // 保存皮肤颜色
  saveSkinColor(state,skin_color){
    state.skin_color=skin_color
    setStore('SKIN_COLOR', state.skin_color);
  },
  // 保存默认色号
  saveFontSize(state,font_size){
    state.font_size=font_size
    setStore('FONT_SIZE', state.font_size);
  },
  saveFilter(state,major){
    state.filter.major=major
  }
}

export default mutations;