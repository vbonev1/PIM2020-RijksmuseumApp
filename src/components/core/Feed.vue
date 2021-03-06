<template>
  <div>
    <!-- Swiper holding artworks from the museum -->
    <div
      class="mt-5 ml-3"
      style="font-family: 'Comic Sans MS', 'Comic Sans', cursive; float: left;"
    >
      <h2 class="text-white">Popular artworks</h2>
    </div>
    <div class="swiperWrapper">
      <swiper ref="artworksSwiper" class="swiper" :options="artworksSwiperOptions">
        <swiper-slide v-for="artwork in artworks" :key="artwork.id">
          <b-img
            style="width: 300px; height: 300px;"
            :src="artwork.webImage ? artwork.webImage.url : require('@/assets/loading.jpg')"
          ></b-img>
        </swiper-slide>
      </swiper>
      <b-container class="mt-2">
        <b-row class="text-center">
          <b-col>
            <b-button variant="dark" @click="artworkClicked()">Explore and share your thoughts</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <artworksExplorer
      v-model="showArtworkExplorer"
      :artwork="artworkToExplore"
      @modalStateChanged="modalStateChanged"
    />

    <!-- Swiper holding sets from users -->
    <div
      class="mt-4 ml-3"
      style="font-family: 'Comic Sans MS', 'Comic Sans', cursive; float: left;"
    >
      <h2 class="text-white">Popular sets</h2>
    </div>
    <div class="swiperWrapper">
      <swiper ref="popularSetsSwiper" class="swiper" :options="setsSwiperOptions">
        <swiper-slide v-for="content in setsContents" :key="content.id">
          <b-carousel
            controls
            indicators
            background="#ababab"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <b-carousel-slide class="p-2" v-for="artwork in content.items" :key="artwork.id">
              <template v-slot:img>
                <img
                  class="d-block img-fluid w-100"
                  style="width: 200px; height: 400px;"
                  :src="artwork.image.cdnUrl"
                />
              </template>
            </b-carousel-slide>
          </b-carousel>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// 3rd party swiper component
import { Swiper, SwiperSlide } from "vue-awesome-swiper";


// custom components
import ArtworksExplorer from "@/components/explorers/ArtworksExplorer.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    ArtworksExplorer
  },
  data() {
    return {
      artworksSwiperOptions: {
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
      setsSwiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          }
        }
      },
      showArtworkExplorer: false,
      artworkToExplore: {}
    };
  },
  computed: {
    artworksSwiper() {
      return this.$refs.artworksSwiper.$swiper;
    },
    artworks() {
      return this.$store.getters.getArtworks;
    },
    sets() {
      return this.$store.getters.getSets;
    },
    setsContents() {
      return this.$store.getters.getSetsContents;
    }
  },
  methods: {
    artworkClicked() {
      this.showArtworkExplorer = true;
      this.artworkToExplore = this.artworks[this.artworksSwiper.activeIndex];
    },
    setInSets(passedSet) {
      for (let set of this.sets) {
        if (set.id == passedSet.id) {
          return true;
        }
      }
      return false;
    },
    modalStateChanged(val) {
      this.showArtworkExplorer = val;
    }
  },
  mounted() {
    this.artworksSwiper.autoplay.start();
  },
  watch: {}
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