import React from 'react';
import Modal from 'react-modal';

import GetYoutubeId from './GetYoutubeId';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '800px'
  }
};

// Not yet functional
type State = {
  trailers: Array<Item>
};

//var test = [];

class MovieItem extends React.Component {

  state = {
    isOpen: false,
    trailers: []
  }

  componentDidMount() {

    // We are getting trailer info from another API call but cannot extract Youtube ID
    GetYoutubeId.getTrailers(this.props.keyy).then((result: ApiResponse) => {
      this.setState((prevState: State) => ({
        trailers: result.results
      }))
    });
    
  }

  // Toggle for Modal window
  handleOpenModal = toggle => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render(){

    //test = this.state.trailers[0];
    //console.log(test);

    // Styling for the little star in the corner of each movie
    var starStyle = [];
    if(this.props.isFavorite){
      starStyle = { backgroundImage : "url(./starFilled.svg)" }
    } else {
      starStyle = { backgroundImage : "url(./star.svg)" }
    }
      
    
    return(

      <div 
      className="movie-item"
      style={{ backgroundImage: `url(${this.props.image})`}}
      onClick={(e)=>{ if(e.target.className !== "favBtn") this.handleOpenModal() }}
      >
      {this.props.user ? 
        <div 
          style={starStyle}         
          className="favBtn"
          onClick={(e)=>{this.props.addFavorite(this.props.item)}} /> : null}
        <Modal isOpen={this.state.isOpen}
          style={customStyles}
          contentLabel="Popup"
        >
          <h2>{this.props.name}</h2>
          <p>{this.props.overview}</p>

          <iframe title="YouTube video player" className="youtube-player" type="text/html" 
          width="640" height="390" src="http://www.youtube.com/embed/${trailerObject.key}"
          frameBorder="0" allowFullScreen></iframe>
          
          <button onClick={this.handleOpenModal}>close</button>

        </Modal>

      </div>
      )
  }
}

export default MovieItem;
