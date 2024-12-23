import React from 'react';
import { Link, NavLink } from 'react-router';

const Header = () => {
  return (
    <header className={ 'app-header' }>
      <div className={ 'header-title' }>
        <Link to={ '/' } className={ 'title-link' }>
          <h1 className={ 'logo-text font-effect-3d' }>Bloc Jams</h1>
        </Link>
      </div>
      <nav className={ 'nav' }>
        <NavLink to={ '/' } className={ 'nav-link' }>Landing</NavLink>
        <NavLink to={ '/library' } className={ 'nav-link' }>Library</NavLink>
      </nav>
    </header>
  );
};

export default Header;
