<template>
  <div>
    <div class="swiperWrapper">
      <swiper ref="swiper" class="swiper" :options="swiperOptions" @click-slide="slideClicked()">
        <swiper-slide v-for="popularArtwork in popularArtworks" :key="popularArtwork.id">
          <b-img style="width: 300px; height: 300px;" :src="popularArtwork.webImage.url"></b-img>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
   <!--
    <b-container class="mb-5">
      <b-row align-h="center" style="height: 400px;">
        <b-col sm="10">
          <b-row align-h="center">
            <b-col>
              <b-carousel
                controls
                indicators
                background="#ababab"
                style="height: 400px; text-shadow: 1px 1px 2px #333;"
              >
                <b-carousel-slide
                  class="p-2"
                  v-for="popularArtwork in popularArtworks"
                  :key="popularArtwork.id"
                >
                <template v-slot:img>
                  <img class="d-block img-fluid w-100" style="width: 300px; height: 300px;" :src="popularArtwork.webImage.url"/>
                </template>
                </b-carousel-slide>
              </b-carousel>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    -->
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
.swiperWrapper {
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