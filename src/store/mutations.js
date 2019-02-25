// import http from 'http/index.js'

const mutations = {
  // 分享加金币
  shareCoin(state){
    // const url = '/coin/addCoin';
    // http.sendAjax(url, {coin_name:'share_sns',way_name: '分享论坛'});
  },
  setCurrentBookInfo(state,book){
    state.currentBook=book
  }
  
}

export default mutations;