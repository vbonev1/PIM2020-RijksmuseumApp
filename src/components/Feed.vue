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
          <b-img style="width: 300px; height: 300px;" :src="artwork.webImage.url"></b-img>
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
      @close="showArtworkExplorer = false"
      :artwork="this.artworkToExplore"
    />

    <!-- Swiper holding sets from users -->
    <div
      class="mt-5 mb-2 ml-3"
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
            style="width: 500px; height: 400px; text-shadow: 1px 1px 2px #333;"
          >
            <b-carousel-slide
              class="p-2"
              v-for="artwork in content.items"
              :key="artwork.id + '- from set'"
            >
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

// services for API consumption
import Artworks from "@/services/Artworks.js";
import Sets from "@/services/Sets.js";

// custom components
import ArtworksExplorer from "@/components/ArtworksExplorer.vue";

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
      setsContents: [],
      showArtworkExplorer: false,
      artworkToExplore: {},
      exampleComments: [
        {
          author: "John Smith",
          avatarText: "JS",
          avatarVariant: "primary",
          commentText:
            "Classic masterpiece! I remember the first time I saw it. I was with...",
          commentId: "0",
          likes: 3,
          dislikes: 0
        },
        {
          author: "Adriana Lima",
          avatarText: "AL",
          avatarVariant: "info",
          commentText:
            "That's my favourite painting from Jan Asselijn! Actually, I've been interested in his works since...",
          commentId: "1",
          likes: 4,
          dislikes: 0
        },
        {
          author: "Jerry Kings",
          avatarText: "JK",
          avatarVariant: "success",
          commentText: "Beautiful!",
          commentId: "2",
          likes: 1,
          dislikes: 0
        }
      ]
    };
  },
  computed: {
    artworksSwiper() {
      return this.$refs.artworksSwiper.$swiper;
    }
  },
  methods: {
    artworkClicked() {
      this.showArtworkExplorer = true;
      this.artworkToExplore = this.artworks[this.artworksSwiper.activeIndex];
      this.artworkToExplore.comments = this.exampleComments;
    }
  },
  mounted() {
    this.artworksSwiper.autoplay.start();
    // deciding how many pages of artworks to request
    for (let i = 0; i < 1; i++) {
      Artworks.getArtworks(i).then(res => {
        for (let artObject of res.data.artObjects) {
          artObject["commentsIds"] = [];
          this.artworks.push(artObject);
        }
      });
    }
    // deciding how many pages of sets to request
    for (let i = 0; i < 10; i++) {
      Sets.getSets(i).then(res => {
        this.sets = this.sets.concat(res.data.userSets);
        for (let set of res.data.userSets) {
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