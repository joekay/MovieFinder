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
        name={item.title}
        image={generateImageName(item.poster_path)}
        overview={item.overview}
        keyy={item.id}
        addFavorite={this.props.onStarClick}
        isFavorite={item.isFavorite}
        user={this.props.user}
        />

        ))}
        </ReactCSSTransitionGroup>

        </div>
        );
      }

    }

    export default MovieList;
