import Login from "../Login/Login";
import ListHomes from "../Viviendas/ListHomes";
import './Home.css'

function Home() {
    return (
        <div className='page home'>
            <div className='box'>
                <h1>Inquilino perfecto</h1>
                <ListHomes />
                <Login />
            </div>
        </div>
    )
}

export default Home