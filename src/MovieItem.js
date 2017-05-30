import React from 'react';
import ReactDOM from 'react-dom';
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

type State = {
  trailers: Array<Item>
};


const hej = [];
var hej1 = [];


class MovieItem extends React.Component {

  state = {
    isOpen: false,
    trailers: []
  }

  componentDidMount() {

    GetYoutubeId.getTrailers(this.props.keyy).then((result: ApiResponse) => {
      this.setState((prevState: State) => ({
        trailers: result.results
      }))
    });

  }


  handleOpenModal = toggle => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render(){

      hej = this.state.trailers[0];
    
    //Undefined 20 gånger först
    console.log(hej);


    if(this.props.isFavorite){
      var starStyle = { backgroundImage : "url(./starFilled.svg)" }
    } else {
      var starStyle = { backgroundImage : "url(./star.svg)" }
    }
      


    return(

      <div 
      className="movie-item"
      style={{ backgroundImage: `url(${this.props.image})`}}
      onClick={(e)=>{ if(e.target.className != "favBtn") this.handleOpenModal() }}
      >
        <div 
          style={starStyle}         
          className="favBtn"
          onClick={(e)=>{this.props.addFavorite(this.props.item)}} />
        <Modal isOpen={this.state.isOpen}
          style={customStyles}
          contentLabel="Popup"
        >
          <h2>{this.props.name}</h2>
          <p>{this.props.overview}</p>

          <iframe title="YouTube video player" className="youtube-player" type="text/html" 
          width="640" height="390" src="http://www.youtube.com/embed/${trailerObject.key}"
          frameBorder="0" allowFullScreen></iframe>
          
          <p>{this.props.name}</p>
          <button onClick={this.handleOpenModal}>close</button>

        </Modal>

      </div>
      )
  }
}

export default MovieItem;
