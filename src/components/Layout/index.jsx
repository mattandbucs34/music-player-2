import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';

const Layout = () => {
    return (
        <div className={ 'app' }>
            <header className={ 'app-header' }>
                <div className={ 'header-title' }>
                    <Link to={ '/' } className={ 'title-link' }>
                        <h1 className={ 'font-effect-3d' }>Bloc Jams</h1>
                    </Link>
                </div>
                <nav className={ 'nav' }>
                    <NavLink to={ '/' } className={ 'nav-link' }>Landing</NavLink>
                    <NavLink to={ '/library' } className={ 'nav-link' }>Library</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>&copy; { ( new Date().getFullYear() ) } Music Player</p>
            </footer>
        </div>
    );
};

export default Layout;
