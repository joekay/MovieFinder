var api_key = 'a4feaf23d50b0dac861819b44aecf721';
var language = 'en-US';
var region = '';
//var region = '&region=SE';

// Api call to TMDB to get movies now playing in theatres
const Api = {
  getList(): Promise<ApiResponse> {
    const query = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=${language}${region}&apend_to_response=videos`;


    return fetch(query)
      .then(response => response.json())
  }
}

export default Api;
