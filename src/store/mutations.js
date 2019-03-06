// import http from 'http/index.js'

import {setStore,getStore,removeStore} from '../assets/js/storage_function';
const mutations = {
  // shareCoin(state){
  //   // const url = '/coin/addCoin';
  //   // http.sendAjax(url, {coin_name:'share_sns',way_name: '分享论坛'});
  // },
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
      state.shelf_book_list.push(book);
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
    state.shelf_book_list.clear();
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
  }
}

export default mutations;