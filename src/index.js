import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import './css/index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
	favo: [],
	initItems: [],
};

function reducer(state = initialState, action){

	switch(action.type) {

		case "INIT":
			return{
				...state,
				initItems: state.initItems.concat(action.initItems)
			}

		case "SYNC":

		var copyOfInit = state.initItems;

		  for (var i = 0; i < action.favo.length; i++) {
		    console.log(action.favo.id);
		    for (var j = 0; j < state.initItems.length; j++) {
		        if (action.favo[i].id == state.initItems[j].id) {
		        	console.log(state.initItems[j].id);
		          console.log("MATCH");
		          copyOfInit[j].isFavorite = true;
		          console.log(copyOfInit);
		        }
		    }
		  }


			return {
				...state,
				favo: state.favo.concat(action.favo)
			}

		case "ADDFAV":

			var oldFavo = state.favo;
			oldFavo = oldFavo.concat(action.pressedMovie);

			return {
				...state,
				favo: oldFavo
			}

		case "REMOVEFAV":

		var oldFavo = state.favo;
		var oldInit = state.initItems;
		//sätt isFavorite = false på den index

		for (var i = 0; i < oldFavo.length; i++) {
			if(action.pressedId == oldFavo[i].id){
				oldFavo.splice(i, 1);
			}
		}

		for (var i = 0; i < oldInit.length; i++) {
			if(action.pressedId == oldInit[i].id){
				oldInit[i].isFavorite = false;
			}
		}

			return {
				...state,
				favo: oldFavo
			}

		case "LOGOUT":

		var clear = [];

		return {
			...state,
			favo: clear
		}

		default:
			return state;
	}

}

const store = createStore(reducer);

store.subscribe(() => {
console.log("STore", store.getState());	
})



const App = () => (
<Provider store={store}>
	<Main />
</Provider>

);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
