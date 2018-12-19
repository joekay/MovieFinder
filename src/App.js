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

const counter = 0;
const favItems = [];
const synced = [];
var datalist = [];

provider.setCustomParameters({
  'display': 'popup'
});

type State = {
  items: Array<Item>,
  searchbarInput: string,
};

class App extends React.Component {

  // initial state
  /*state: State = {
    items: [],
    favoriteItems: [],
    syncedItems: [],
    searchbarInput: '',
    favorites: [],
    user: null,
    isLoggedin: false
  }*/

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

  login = () => {

    auth().signInWithPopup(provider)
    .then(({ user }) => {
      this.setState({ user, isLoggedin: true, counter:1 })
    })

    counter++;

  }

  logout = () => {
    counter = 0;
    firebase.auth().signOut().then(() => {
      this.setState({ user: null, isLoggedin: false }) 
    })
  }

  // Last step of initialization (Component lifecycle)
  componentDidMount() {
    Api.getList().then((result: ApiResponse) => {
      this.setState((prevState: State) => ({
        items: result.results,
      }))
    });

    console.log(this.state.items);



    //Hämta favoriter här? Tvinga login i början

    {/*auth.onAuthStateChanged().then(user => {
    if (user) {
      this.setState({ user })
    };
    provider.getInstance().signOut();
  })*/}
  }

  componentWillUpdate() {

    //favItems = favItems.concat(datalist);
    /*const sliced = datalist.slice
    this.setState({
      items: [...this.state.items, datalist]
    })*/
    console.log(this.state.isLoggedin + " " + this.state.isSynced);
  if (this.state.isLoggedin == true && this.state.isSynced == false) {
    this.setState({isSynced: true});
    this.state.isSynced = true;
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
          console.log(childData);

          /*this.setState({
            items: [...this.state.items, childData]
          })*/

          // Add item to it
          //datalist = [...datalist, childData];
          datalist.concat(childData);
          console.log(datalist);



        });

    });

    /*this.setState({
            items: [...this.state.items, datalist]
          })*/

    console.log(this.state.items);
    let a = this.state.items.slice(); //creates the clone of the state
    let b = datalist.slice();
    this.setState({items: a.concat(b)});
    console.log(this.state.items);
    favItems.concat(datalist);
  }


  }

  // Changes state depending on searchbar input
  onSearchbarChange = (event: Object) => {
    this.setState({ searchbarInput: event.target.value });
    console.log(this.state.user);
  }

  renderChoices = () => {
    
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
          console.log(childData);

          /*this.setState({
            items: [...this.state.items, childData]
          })*/

          // Add item to it
          datalist.push(childData);

        });

    }.bind(this));

    counter++;

    console.log("tjena");
    console.log(datalist);

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

  console.log("movie id: " + items[items.indexOf(movie)].id);
  console.log("currentUser: " + user.uid);
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

    /*if(this.state.isLoggedin && counter == 1){
      this.renderChoices();

    }*/

    // Filter items depending on searchbar input
    const filteredItems = this.state.items.filter(item => {
      return item.title.toLowerCase().indexOf(this.state.searchbarInput) >= 0;
    });

    if(this.state.isLoggedin && counter == 1){

    // Items that are favorites
    favItems = this.state.items.filter(item => {
      if(item.isFavorite)
        return true;
      else
        return false;
    })

    this.renderChoices();
    //favItems = favItems.concat(datalist);

    console.log(favItems);
    console.log(this.state.comment);

    } else{

    favItems = this.state.items.filter(item => {
      if(item.isFavorite)
        return true;
      else
        return false;
    })

    }
    /*for(var i=0;i<datalist.length;i++){
      for(var j=0;j<favItems.length;j++){
        if(datalist[i].item.id == favItems[j].item.id){
          console.log("Dublett");
        }
      }

    }*/

    

    return (

      <div className="container">

      <div className='app'>
      <div style={{display: 'flex', alignItems:'baseline', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', marginTop: '20px', marginBottom: '20px'}}>
      <Header onSearchbarChange={this.onSearchbarChange}/>

      <p style={{color: 'white',display: 'flex',  justifyContent:'center', alignItems:'center', marginRight: '10px'}}>
      {this.state.user ? `Signed in as ${this.state.user.displayName}!` : 'Please log in to add favorites.'}
      </p>

      {this.state.isLoggedin===true && counter == 1 ? this.renderChoices(): console.log("HEJ2")}
      {console.log(favItems)}

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
      {this.state.isLoggedin && datalist != null ? 
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
