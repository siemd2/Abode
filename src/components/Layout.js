import React from 'react';
import {Link} from 'react-router-dom';

const Layout = ({children}) => {
    return (
        <div>
            <header>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/sign-in"}>Sign In</Link>
                    </li>
                </ul>
            </header>
            <main>
                {children}
            </main>

        </div>
    );
};

export default Layout;