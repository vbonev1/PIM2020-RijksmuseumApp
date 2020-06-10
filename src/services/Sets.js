import axiosInstance from '@/services/AxiosInstance';

export default {
    // gets the top 100 popular artworks from the Rjksmuseum API
    getSets(page) {
      return axiosInstance({
        method: 'get',
        url: "usersets?key=UhUHC3Co&page=" + page,
      });
    },
    getSetContents(id) {
        return axiosInstance({
            method: 'get',
            url: 'usersets/' + id + "?key=UhUHC3Co"
        })
    }
  };
  