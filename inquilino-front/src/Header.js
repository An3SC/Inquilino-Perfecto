import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';

function Header() {
    const login = useSelector(s => s.login)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch({ type: 'logout' })
    }

    return (
        <header className='headerContainer'>
            <div>
                <Link to='/'><div className='logo' /></Link>
            </div>
            <div className='linksContainer'>
                <div>
                    {!login &&
                        <Link to="/login">Iniciar sesión</Link>
                    }
                </div>
                <div>
                    {login &&
                        <div>
                            <label>{login.username} </label>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
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

