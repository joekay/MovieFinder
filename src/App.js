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

  // Last step of initialization (Component lifecycle)
  componentDidMount() {
    Api.getList().then((result: ApiResponse) => {
      this.setState((prevState: State) => ({
        items: result.results,
      }))
    });
  }

  // Changes state depending on searchbar input
  onSearchbarChange = (event: Object) => {
    this.setState({ searchbarInput: event.target.value });
  }

  // Add favorites
  addFavorite = (movie) => {
    if(movie.isFavorite){
      this.removeFavorite(movie);
      return;
    }

    var items = this.state.items.slice();
    items[items.indexOf(movie)].isFavorite = true;
    this.setState({
      item: items
    })
  }

  // Remove favorites
  removeFavorite = (movie) => {
    var items = this.state.items.slice();
    items[items.indexOf(movie)].isFavorite = false;
    this.setState({
      item: items
    })
  }

  render () {

    // Filter items depending on searchbar input
  	const filteredItems = this.state.items.filter(item => {
      return item.title.toLowerCase().indexOf(this.state.searchbarInput) >= 0;
    });

    // Items that are favorites
    const favItems = this.state.items.filter(item => {
      if(item.isFavorite)
        return true;
      else
        return false;
    })

  	return (

      <div className="container">
      
      <Header onSearchbarChange={this.onSearchbarChange} />
      <MovieList 
      items={filteredItems} 
      onStarClick={(movie)=>this.addFavorite(movie)}
      />
      <h1 style={{color: "white"}}>Favoriter</h1>
      <MovieList 
      items={favItems} 
      onStarClick={(movie)=>this.removeFavorite(movie)} 
      />
      </div>

      )



    }

  }

  export default App;
