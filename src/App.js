// @flow

import React from 'react';
import Header from './Header';
import MovieList from './MovieList';
import Api from './Api';
import './css/App.css';

type State = {
  items: Array<Item>,
  searchbarInput: string,
};

class App extends React.Component {

  // initial state
  state: State = {
    items: [],
    searchbarInput: '',
    favorites: []
  }

  componentDidMount() {
    Api.getList().then((result: ApiResponse) => {
      this.setState((prevState: State) => ({
        items: result.results,
      }))
    });
  }

  onSearchbarChange = (event: Object) => {
    this.setState({ searchbarInput: event.target.value });
  }

  addFavorite = (movie) => {
    if(movie.isFavorite){
      this.removeFavorite(movie)
      return
    }

    var items = this.state.items.slice()
    items[items.indexOf(movie)].isFavorite = true;
    this.setState({
      item: items
    })
  }

  removeFavorite = (movie) => {
    var items = this.state.items.slice()
    items[items.indexOf(movie)].isFavorite = false;
    this.setState({
      item: items
    })
  }

  render () {

  	const filteredItems = this.state.items.filter(item => {
      return item.title.toLowerCase().indexOf(this.state.searchbarInput) >= 0;
    });

    const favItems = this.state.items.filter(item => {
      if(item.isFavorite)
        return true
      else
        return false
    })

  	return (

      <div className="container">
      
      <Header onSearchbarChange={this.onSearchbarChange} />
      <MovieList items={filteredItems} onStarClick={(movie)=>this.addFavorite(movie)}/>
      <h1 style={{color: "white"}}>Favoriter</h1>
      <MovieList items={favItems} onStarClick={(movie)=>this.removeFavorite(movie)} />
      </div>

      )



    }

  }

  export default App;
