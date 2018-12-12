import React from 'react';

class Searchbar extends React.Component {

  render() {

    return (
      <input
    className="searchbar"
    placeholder="Filter movies..."
    onChange={this.props.onChange} />
    )

   }

}

export default Searchbar;
