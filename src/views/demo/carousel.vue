/*
 * @File: 走马灯示例
 * @Author: jhh678
 * @Date: 2018-04-02 14:10:14
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-04-02 16:15:33
 */

<template>
  <div class="sub-page-wrap">
    <section class="panel panel-default">
      <div class="panel-heading"><h3>Carousel 走马灯</h3><div class="text-muted">在有限空间内，循环播放同一类型的图片、文字等内容</div></div>
      <div class="panel-body">
        <div class="panel-item">
          <h4>基础用法</h4>
          <div class="text-muted">适用广泛的基础用法</div>
          <div class="row">
            <b-carousel v-model="csindex" :indicators="true" :controls="true" :interval="2000">
              <b-slide v-for="(slide, index) in slides" :key="index">
                <div style="width: 100%;height: 600px;" :style="{background:index%2===0?'#99a9bf':'#d3dce6'}"></div>
                <div class="carousel-caption">
                  <h3>This is {{slide.title}}</h3>
                </div>
              </b-slide>
            </b-carousel>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { BCarousel, BSlide } from '@/components/carousel'

export default {
  components: {
    BCarousel,
    BSlide
  },
  data() {
    return {
      csindex: 0,
      slides: [{
        title: 'Slide 1'
      },
      {
        title: 'Slide 2'
      },
      {
        title: 'Slide 3'
      },
      {
        title: 'Slide 4'
      }]
    }
  }
}
</script>
