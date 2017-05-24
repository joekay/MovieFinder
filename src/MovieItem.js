import Modal from 'react-modal';
import React from 'react';
import ReactDOM from 'react-dom';


class MovieItem extends React.Component {

  state = {
    isOpen: false
  }

  handleOpenModal = toggle => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render(){


    return(

      <div
      className="movie-item"
      style={{ backgroundImage: `url(${this.props.image})`}}
      onClick={this.handleOpenModal}
      >
        <Modal isOpen={this.state.isOpen}>
          <p>{this.props.name}</p>
        <button onClick={this.handleOpenModal}>close</button>
        </Modal>

      </div>

      )
  }

}

export default MovieItem;
