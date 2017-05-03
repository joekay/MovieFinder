// @flow

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//import MovieItem from './MovieItem';

//import generateImageName from './generateImageName';

import './css/MovieList.css';
import './css/MovieItem.css';

type Props = {
  image: string,
  name: string,
};

const generateImageName = (url: string) =>
  `https://image.tmdb.org/t/p/w370${url}`

const MovieItem: (Props) => React.Element<*> = ({ image, name }: Props) => (
  <div
    className="movie-item"
    style={{ backgroundImage: `url(${image})` }} />
)

const MovieList: () => React.Element<*> = ({ items }) => (
  <div className="movie-list">
    <ReactCSSTransitionGroup
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      transitionName="movie-item">
      {items.map(item => (
      <MovieItem
        key={item.id}
        name={item.title}
        image={generateImageName(item.poster_path)} />
      ))}
     </ReactCSSTransitionGroup>
  </div>
)

export default MovieList;
