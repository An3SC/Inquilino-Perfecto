import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';
import Menu from './Utils/Menu';

function Header() {
    const login = useSelector(s => s.login)

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
                        <Menu>{login.username}</Menu>
                    }
                </div>
                <div>
                    {!login &&
                        <Link to='/register'>Registro</Link>
                    }
                </div>
                <div>
                    {login &&
                        <Link to='/createHome'>Publicar vivienda</Link>
                    }
                </div>
            </div>

        </header>
    );
}

export default Header;

