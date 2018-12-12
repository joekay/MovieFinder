import React from 'react';
import Header from './Header';
import MovieList from './MovieList';
import Api from './Api';
import './css/App.css';
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyA1d9vZltW10aoImVaEWBPV5H8pFho2wDg",
    authDomain: "awebb-efe92.firebaseapp.com",
    databaseURL: "https://awebb-efe92.firebaseio.com",
    projectId: "awebb-efe92",
    storageBucket: "awebb-efe92.appspot.com",
    messagingSenderId: "878717963187"
}

firebase.initializeApp(config)

const auth = firebase.auth


const provider = new firebase.auth.FacebookAuthProvider();

provider.setCustomParameters({
  'display': 'popup'
  });

type State = {
  items: Array<Item>,
  searchbarInput: string,
};

class App extends React.Component {

  // initial state
  state: State = {
    items: [],
    searchbarInput: '',
    favorites: [],
    user: null
  }

  login = () => {
    auth().signInWithPopup(provider)
      .then(({ user }) => {
        this.setState({ user })
      })

      console.log("USER LOGGED IN: " + this.state.user);
    console.log("INLOGGAGAGAD");

  }

  logout = () => {
  firebase.auth().signOut().then(() => {
      this.setState({ user: null }) 
    })
  console.log(this.state.user);
  }

  // Last step of initialization (Component lifecycle)
  componentDidMount() {
    Api.getList().then((result: ApiResponse) => {
      this.setState((prevState: State) => ({
        items: result.results,
      }))
    });

    auth.onAuthStateChanged().then(user => {
    if (user) {
      this.setState({ user })
    };
    provider.getInstance().signOut();
  })
  }

  // Changes state depending on searchbar input
  onSearchbarChange = (event: Object) => {
    this.setState({ searchbarInput: event.target.value });
    console.log(this.state.user);
  }

// Add favorites
  addFavorite = (movie) => {
  if(movie.isFavorite){
    this.removeFavorite(movie);
    return;
  }
  var user = firebase.auth().currentUser;
  var userData = this.state.user.uid;

  var items = this.state.items.slice();
  items[items.indexOf(movie)].isFavorite = true;
  this.setState({
    item: items
  })

  var selectedMovie = items[items.indexOf(movie)];
  var selectedMovieId = selectedMovie.id;

  var key = firebase.database().ref('users/' + user.uid).push().key;
  firebase.database().ref('users/' + user.uid).update({[selectedMovieId]: selectedMovie});


  console.log("movie id: " + items[items.indexOf(movie)].id);
  console.log("currentUser: " + user.uid);

  console.log("items in server: " )
  }

  // Remove favorites
  removeFavorite = (movie) => {
    var items = this.state.items.slice();
    items[items.indexOf(movie)].isFavorite = false;
    this.setState({
      item: items
    })

    var user = firebase.auth().currentUser;
    var userData = this.state.user.uid;
    var selectedMovie = items[items.indexOf(movie)];
    var selectedMovieId = selectedMovie.id;

    firebase.database().ref('users/' + user.uid + '/' + selectedMovieId).set(null);

  }



  render () {

    this.state.user && this.state.favorites==null ? (

console.log("yolo")

      ) : (null)

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

      <div className='app'>
        <div style={{display: 'flex', alignItems:'baseline', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', marginTop: '20px', marginBottom: '20px'}}>
        <Header onSearchbarChange={this.onSearchbarChange}/>

        <p style={{color: 'white',display: 'flex',  justifyContent:'center', alignItems:'center', marginRight: '10px'}}>
        {this.state.user ? `Signed in as ${this.state.user.displayName}!` : 'Please log in to add favorites.'}
        </p>

        {this.state.user==null ? console.log("HEJ") : console.log("HEJ2")}
         <button style={{width: '180px'}} onClick={()=>{ if(this.state.user == null){ this.login()} else {this.logout()} }}>
            {this.state.user==null ? "Log In with Facebook" : "Log Out"}
          </button>

          </div>
        </div>

        <MovieList 
        items={filteredItems} 
        onStarClick={(movie)=>this.addFavorite(movie)}
        user={this.state.user}
        />

        <div>
        <h1 style={{color: "white", display: 'flex',  justifyContent:'center', alignItems:'center'}}>{this.state.user ? `Favorites` : null}</h1>
        <div>
        {this.state.user ? 
        <MovieList 
        items={favItems} 
        onStarClick={(movie)=>this.removeFavorite(movie)} 
        user={this.state.user}
        />  : null
        }
        </div>
        </div>

      </div>

      )



    }

  }

  export default App;
