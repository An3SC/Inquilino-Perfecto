import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
    const login = useSelector(s => s.login)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch({ type: 'logout' })
    }

    return (
        <header>
            <div>
                <Link to='/'>Inicio</Link>
            </div>
            <div>
                {!login &&
                    <Link to="/login">Iniciar sesión</Link>
                }
                {login &&
                    <div>
                        {login.username}
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                }
            </div>
            <div>
                <Link to='/register'>Registro</Link>
            </div>
        </header>
    );
}

export default Header;

