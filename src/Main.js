import React from 'react';
import Header from './Header';
import MovieList from './MovieList';
import Api from './Api';
import './css/App.css';
import firebase from 'firebase';
import { connect } from 'react-redux';

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

var counter = 0;
var favItems = [];
var synced = [];
var datalist = [];
var IDnr = 0;

provider.setCustomParameters({
  'display': 'popup'
});

type State = {
  items: Array<Item>,
  searchbarInput: string,
};

function mapStateToProps(state) {

  return{
    favo: state.favo,
    initItems: state.initItems,
    pressedId: state.pressedId
  }
};

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      favoriteItems: [],
      syncedItems: [],
      searchbarInput: '',
      favorites: [],
      comment: 0,
      user: null,
      isLoggedin: false,
      isSynced: false,
    }

    this.renderChoices = this.renderChoices.bind(this);
  }

  async login() {

    const test =  await auth().signInWithPopup(provider)

    .then(({ user }) => {
      this.setState(prevState => ({ user: user, isLoggedin: true, counter: 1, favKey: 1 }),
       this.renderChoices)
    })
    counter++;
  }

  logout = () => {
    counter = 0;
    IDnr = 0;
    firebase.auth().signOut().then(() => {
      this.setState({ user: null, isLoggedin: false }) 
    })
    setTimeout(() => {
      this.props.dispatch({ type: "LOGOUT"});

    }, 1000)
  }


  // Last step of initialization (Component lifecycle)
  componentDidMount() {
    Api.getList().then((result: ApiResponse) => {
      this.setState((prevState: State) => ({
        items: result.results,
      }))

      for(var i=0 ;i<this.state.items.length ;i++){
        this.state.items[i].isFavorite = false;
      }

      this.props.dispatch({ type: "INIT", initItems: this.state.items});
    });

  }

  componentDidUpdate() {
    console.log(this.state.isLoggedin + " " + this.state.isSynced);
    if (this.state.isLoggedin == true && this.state.isSynced == false) {
      this.setState({isSynced: true});
      this.state.isSynced = true;
    }


  }

  // Changes state depending on searchbar input
  onSearchbarChange = (event: Object) => {
    this.setState({ searchbarInput: event.target.value });
  }

  async renderChoices () {

    var user = firebase.auth().currentUser.uid;
    var childData2 = this.state.syncedItems.slice();
    var query = firebase.database().ref("users/" + user + "/").orderByKey();
    query.once("value")
    .then(function(snapshot) {

      snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();

          // Add item to it
          datalist.push(childData);

        });

    }.bind(this));

    counter++;
    IDnr = 2;

    setTimeout(() => {
      this.props.dispatch({ type: "SYNC", favo: datalist});

    }, 1000)
    IDnr = 2;
    synced = this.props.favo;

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

    if(counter!=0){
      var key = firebase.database().ref('users/' + user.uid).push().key;
      firebase.database().ref('users/' + user.uid).update({[selectedMovieId]: selectedMovie});
    }

    this.props.dispatch({ type: "ADDFAV", pressedMovie: movie});

  }

  // Remove favorites
  removeFavorite = (movie) => {
    var items = this.state.items.slice();
    var selected = null;
    //items[items.indexOf(movie)].isFavorite = false;
    this.setState({
      item: items
    })

    this.props.dispatch({ type: "REMOVEFAV", pressedId: movie.id});

    var user = firebase.auth().currentUser;
    var userData = this.state.user.uid;

    firebase.database().ref('users/' + user.uid + '/' + movie.id).set(null);

  }



  render () {

    // Filter items depending on searchbar input
    const filteredItems = this.props.initItems.filter(item => {
      return item.title.toLowerCase().indexOf(this.state.searchbarInput) >= 0;
    });    

    return (

      <div className="container">

      <div className='app'>
      <div style={{display: 'flex', alignItems:'baseline', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', marginTop: '20px', marginBottom: '20px'}}>
      <Header onSearchbarChange={this.onSearchbarChange}/>

      <p style={{color: 'white',display: 'flex',  justifyContent:'center', alignItems:'center', marginRight: '10px'}}>
      {this.state.user ? `Signed in as ${this.state.user.displayName}!` : 'Please log in to add favorites.'}
      </p>

      <button style={{width: '180px'}} onClick={()=>{ if(this.state.user == null){ this.login()} else {this.logout()} }}>
      {this.state.user==null ? "Log In with Facebook" : "Log Out"}
      </button>

      </div>
      </div>

      <MovieList 
      items={filteredItems} 
      onStarClick={(movie)=>this.addFavorite(movie)}
      user={this.state.user}
      ID={IDnr}
      favmovs={this.props.favo}
      />

      </div>

      )
    }

  }



  export default connect(mapStateToProps)(Main);
