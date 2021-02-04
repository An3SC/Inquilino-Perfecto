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
            <h1>Mi App</h1>
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
                <Link to='/'>Inicio</Link>
            </div>
        </header>
    );
}

export default Header;

