import axiosInstance from '@/services/AxiosInstance';

export default {
    // gets the top 100 popular artworks from the Rjksmuseum API
    getArtworks(page) {
      return axiosInstance({
        method: 'get',
        url: 'collection?key=UhUHC3Co&p=' + page,
      });
    },
  };
  