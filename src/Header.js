// @flow

import React from 'react';

import './css/Header.css';

const Searchbar: () => React.Element<*> = ({ onChange }) => (
  <input
    className="searchbar" 
    placeholder="Filter movies"
    onChange={onChange} />
);

type Props = {
  onSearchbarChange: (event: Object) => {},
};

const Header: (Props) => React.Element<*> = ({ onSearchbarChange }: Props) => (
  <div className="header">
    <Searchbar onChange={onSearchbarChange} />
  </div>
)

export default Header;
