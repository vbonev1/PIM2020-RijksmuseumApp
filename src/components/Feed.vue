<template>
  <div class="example-3d">
    <swiper ref="swiper" class="swiper" :options="swiperOptions" @click-slide="slideClicked()">
      <swiper-slide v-for="popularArtwork in popularArtworks" :key="popularArtwork.id">
        <b-img style="width: 300px; height: 300px;" :src="popularArtwork.webImage.url"></b-img>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import MuseumArtworks from "@/services/MuseumArtworks.js";

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      popularArtworks: []
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper;
    }
  },
  methods: {
    slideClicked() {
      console.log("Click slide!", this.swiper);
    }
  },
  mounted() {
    MuseumArtworks.getPopularArtworks().then(
      res => (this.popularArtworks = res.data.artObjects)
    );
    console.log(this.popularArtworks);
    console.log("SWIPER: ", this.swiper);
  }
};
</script>

<style lang="scss" scoped>
.example-3d {
  width: 100%;
  height: 400px;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper {
  height: 100%;
  width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    background-color: #2c8dfb;
    background-position: center;
    background-size: cover;
    color: #ffffff;
  }

  .swiper-pagination {
    /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background-color: #ffffff;
    }
  }
}
</style>