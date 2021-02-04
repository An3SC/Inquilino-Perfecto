import ListHomes from "../Viviendas/ListHomes";
import ErrorBoundary from '../ErrorBoundary';
import './Home.css'

function Home() {
    return (
        <div className='page home'>
            <div className='box'>
                <h1>Inquilino perfecto</h1>
                <ErrorBoundary>
                    <ListHomes />
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default Home