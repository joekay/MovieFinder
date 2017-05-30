var api_key = 'a4feaf23d50b0dac861819b44aecf721';

const GetYoutubeId = {
  getTrailers(number: string): Promise<ApiResponse> {
    const query = `https://api.themoviedb.org/3/movie/${number}/videos?api_key=${api_key}`;

    return fetch(query)
      .then(response => response.json())
  }
}

export default GetYoutubeId;
