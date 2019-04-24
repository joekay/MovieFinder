// @flow

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import Modal from 'react-modal';
//var Button = ReactBootstrap.Button
import MovieItem from './MovieItem';

import './css/MovieList.css';
import './css/MovieItem.css';

// Get URL for poster image
const generateImageName = (url: string) =>
`https://image.tmdb.org/t/p/w300${url}`

class MovieList extends React.Component {

  render() {

    return (

      <div className="movie-list">
      <ReactCSSTransitionGroup
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      transitionName="movie-item">
      {this.props.items.map(item => (
        <MovieItem
        key={item.id}
        item={item}
        image={generateImageName(item.poster_path)}
        keyy={item.id}
        addFavorite={this.props.onStarClick}
        isFavorite={item.isFavorite}
        user={this.props.user}
        />

        ))}
        </ReactCSSTransitionGroup>

      <h1 style={{color: "white", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      {this.props.ID == 2 ? `Favorites` : 'Login to view favorites below'}</h1>

      {this.props.favmovs ?

              <ReactCSSTransitionGroup
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      transitionName="movie-item">
      {this.props.favmovs.map(item => (
        <MovieItem
        key={item.id}
        item={item}
        image={generateImageName(item.poster_path)}
        keyy={item.id}
        addFavorite={this.props.onStarClick}
        isFavorite={item.isFavorite}
        user={this.props.user}
        />

        ))}
        </ReactCSSTransitionGroup> : null}

        </div>




        );
      }

    }

    export default MovieList;
