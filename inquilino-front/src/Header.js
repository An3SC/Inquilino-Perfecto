import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';
import Menu from './Utils/Menu';

function Header() {
    const login = useSelector(s => s.login)

    const avatarUrl = login && login.imagen && (`http://localhost:9999/images/${login.imagen}.jpg`)
    const avatarStyle = login && login.imagen && { backgroundImage: 'url(' + avatarUrl + ')' }

    return (
        <header className='headerContainer'>
            <div>
                <Link to='/'><div className='logo' /></Link>
            </div>
            <div className='linksContainer'>
                <div>
                    {!login &&
                        <Link to='/login'>Iniciar sesión</Link>
                    }
                </div>
                <div>
                    {login &&
                        <div className='userMenu'>
                            <div className='avatar' style={avatarStyle} />
                            <Menu>{login.username}</Menu>
                        </div>
                    }
                </div>
                <div>
                    {!login &&
                        <Link to='/register'>Registro</Link>
                    }
                </div>
            </div>

        </header>
    );
}

export default Header;

