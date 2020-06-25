<template>
  <div>
    <b-container class="mt-5" fluid>
      <b-row align-h="center">
        <b-card
          header-bg-variant="dark"
          header-text-variant="light"
          body-bg-variant="dark"
          body-text-variant="dark"
        >
          <b-col cols="12">
            <b-avatar size="100px" :variant="userViewed.avatarVariant"></b-avatar>
            <h2 class="text-light">{{ userViewed.username }}</h2>
            <h3 class="mt-3 text-light">{{ userViewed.personalDescription }}</h3>
            <h4
              class="mt-3 text-light"
            >Personal assessment of art knowledge: {{ $store.getters.getPersonalAssessments[userViewed.personalAssessment] }}</h4>
          </b-col>
        </b-card>
      </b-row>
    </b-container>

    <!-- Swiper holding artworks from the museum -->
    <div
      class="mt-5 ml-3"
      style="font-family: 'Comic Sans MS', 'Comic Sans', cursive; float: left;"
    >
      <h2 class="text-white">Artworks liked by {{ userViewed.username }}</h2>
    </div>
    <div class="swiperWrapper">
      <swiper ref="likedArtworksSwiper" class="swiper" :options="artworksSwiperOptions">
        <swiper-slide v-for="artwork in likedArtworks" :key="artwork.id">
          <b-img style="width: 300px; height: 300px;" :src="artwork.webImage.url"></b-img>
        </swiper-slide>
      </swiper>
      <b-container class="mt-2">
        <b-row class="text-center">
          <b-col>
            <b-button variant="dark" @click="likedArtworkClicked()">Explore and share your thoughts</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <!-- Swiper holding artworks from the museum -->
    <div
      class="mt-5 ml-3"
      style="font-family: 'Comic Sans MS', 'Comic Sans', cursive; float: left;"
    >
      <h2 class="text-white">Commented artworks by {{ userViewed.username }}</h2>
    </div>
    <div class="swiperWrapper">
      <swiper ref="commentedArtworksSwiper" class="swiper" :options="artworksSwiperOptions">
        <swiper-slide v-for="artwork in commentedArtworks" :key="artwork.id">
          <b-img style="width: 300px; height: 300px;" :src="artwork.webImage.url"></b-img>
        </swiper-slide>
      </swiper>
      <b-container class="mt-2">
        <b-row class="text-center">
          <b-col>
            <b-button
              variant="dark"
              @click="commentedArtworkClicked()"
            >Explore and share your thoughts</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div style="height: 50px;"/>

    <artworksExplorer v-model="showArtworkExplorer" :artwork="this.artworkToExplore" />
  </div>
</template>

<script>
import ArtworksExplorer from "@/components/explorers/ArtworksExplorer.vue";

export default {
  components: {
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
      artworkToExplore: {}
    };
  },
  computed: {
    likedArtworksSwiper() {
      return this.$refs.likedArtworksSwiper.$swiper;
    },
    commentedArtworksSwiper() {
      return this.$refs.commentedArtworksSwiper.$swiper;
    },
    userViewed() {
      return this.$store.getters.getUserById(this.$route.params.userId);
    },
    artworks() {
      return this.$store.getters.getArtworks;
    },
    likedArtworks() {
      let likedArtworks = [];
      for (let artworkId of this.userViewed.likedArtworks) {
        for (let artwork of this.artworks) {
          if (artwork.id == artworkId) {
            likedArtworks.push(artwork);
            continue;
          }
        }
      }
      return likedArtworks;
    },
    commentedArtworks() {
      let commentedArtworks = [];
      for (let artworkId of this.userViewed.commentedArtworks) {
        for (let artwork of this.artworks) {
          if (artwork.id == artworkId) {
            commentedArtworks.push(artwork);
          }
        }
      }
      return commentedArtworks;
    }
  },
  methods: {
    likedArtworkClicked() {
      this.showArtworkExplorer = true;
      this.artworkToExplore = this.likedArtworks[
        this.likedArtworksSwiper.activeIndex
      ];
    },
    commentedArtworkClicked() {
      this.showArtworkExplorer = true;
      this.artworkToExplore = this.commentedArtworks[
        this.commentedArtworksSwiper.activeIndex
      ];
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