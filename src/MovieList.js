// @flow

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var ReactBootstrap = require('react-bootstrap');
//import Modal from 'react-modal';
//var Button = ReactBootstrap.Button
import MovieItem from './MovieItem';

import './css/MovieList.css';
import './css/MovieItem.css';


const generateImageName = (url: string) =>
`https://image.tmdb.org/t/p/w370${url}`

const movies = [];

class MovieList extends React.Component {

  componentWillReceiveProps(props){
    movies = props.items;
  }

  constructor(props)
  {
    super(props);
    this.state={open:false};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick()
  {
    this.setState({open:true});
  }

  render() {

    return (

      <div className="movie-list">
      <ReactCSSTransitionGroup
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      transitionName="movie-item">
      {movies.map(item => (
        <MovieItem
        key={item.id}
        name={item.title}
        image={generateImageName(item.poster_path)}
        />

        ))}
        </ReactCSSTransitionGroup>

        </div>
        );
      }

    }

    export default MovieList;
