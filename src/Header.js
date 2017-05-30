import React from 'react';
import Searchbar from './Searchbar';
import './css/Header.css';


class Header extends React.Component {

  render() {

    return (
    <div className="header">
    <Searchbar onChange={this.props.onSearchbarChange} />
  	</div>
  )
 }

}


export default Header;
