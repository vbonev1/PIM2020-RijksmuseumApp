<template>
  <div>
    <!-- Swiper holding popular artworks from the museum -->
    <div class="swiperWrapper">
      <swiper ref="popularArtworksSwiper" class="swiper" :options="artworksSwiperOptions">
        <swiper-slide v-for="artwork in artworks" :key="artwork.id">
          <b-img style="width: 300px; height: 300px;" :src="artwork.webImage.url"></b-img>
        </swiper-slide>
      </swiper>
    </div>

    <div class="swiperWrapper">
      <swiper ref="popularSetsSwiper" class="swiper" :options="setsSwiperOptions">
        <swiper-slide v-for="content in setsContents" :key="content.id">
          <b-carousel
            controls
            indicators
            background="#ababab"
            style="width: 500px; height: 400px; text-shadow: 1px 1px 2px #333;"
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
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import Artworks from "@/services/Artworks.js";
import Sets from "@/services/Sets.js";

export default {
  components: {
    Swiper,
    SwiperSlide
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
        slidesPerView: 4,
        spaceBetween: 40,
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
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },
      artworks: [],
      sets: [],
      setsDetails: [],
      setsContents: []
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
    // deciding how many pages of artworks to request
    for (let i = 0; i < 1; i++) {
      Artworks.getArtworks(i).then(res => {
        for (let artObject of res.data.artObjects) {
          this.artworks.push(artObject);
        }
      });
    }
    // deciding how many pages of sets to request
    for (let i = 0; i < 10; i++) {
      Sets.getSets(i).then(res => {
        for (let set of res.data.userSets) {
          this.sets.push(set);
        }
        for (let set of this.sets) {
          Sets.getSetContents(set.id).then(res => {
            if (res.data.userSet.count != 0) {
              this.setsDetails.push(res.data.userSet);
              this.setsContents.push({
                id: res.data.userSet.id,
                items: res.data.userSet.setItems
              });
            }
          });
        }
      });
    }
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