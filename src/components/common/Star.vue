<template>
  <section class="star">
    <span class="star-item" :class="c" v-for="c in star"></span>
  </section>
</template>

<script>
export default {
  props:{
    num:Number,
    sub:Number
  },
  computed:{
    star(){
      const CLASS_ON = 'on'
      const CLASS_HALF = 'half'
      const CLASS_OFF = 'off'
      var star=this.num/this.sub
      var star_arr = []
      // 向star_arr添加CLASS_ON
      var star_integer = Math.floor(star)
      for (let i = 0; i < star_integer; i++) {
        star_arr.push(CLASS_ON)
      }
      // 向star_arr添加CLASS_HALF
      if(star-star_integer>=0.5) {
        star_arr.push(CLASS_HALF)
      }
      // 向star_arr添加CLASS_OFF
      while(star_arr.length<5) {
        star_arr.push(CLASS_OFF)
      }
      return star_arr
    }
  },
  created(){
    
  }
}
</script>

<style lang="scss" scoped>

.star-item{
  display: inline-block;
  width: .2rem;
  height: .2rem;
  background-size: 100% 100%;
}
// 星星评分
.on{
  background: url('../../assets/img/star24_on@2x.png') no-repeat;
   background-size: 100% 100%;
}
.half{
  background: url('../../assets/img/star24_half@2x.png') no-repeat;
   background-size: 100% 100%;
}
.off{
  background: url('../../assets/img/star24_off@2x.png') no-repeat;
   background-size: 100% 100%;
}

</style>
