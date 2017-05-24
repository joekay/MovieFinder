// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

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
  }

  componentDidMount() {
    Api.getList(1).then((result: ApiResponse) => {
      this.setState((prevState: State) => ({
        items: result.results,
      }))
    });
  }

  onSearchbarChange = (event: Object) => {
    this.setState({ searchbarInput: event.target.value });
  }

  render () {

  	const filteredItems = this.state.items.filter(item => {
      return item.title.toLowerCase().indexOf(this.state.searchbarInput) >= 0;
    });

  	return (

      <div className="container">
      
      <Header onSearchbarChange={this.onSearchbarChange} />
      <MovieList items={filteredItems} />
      </div>


      )



    }

  }

  export default App;
