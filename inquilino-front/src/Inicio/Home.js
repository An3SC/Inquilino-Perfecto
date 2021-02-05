import ErrorBoundary from '../ErrorBoundary';
import './Home.css'
import FirstSearch from "./FirstSearch";

function Home() {
    return (
        <div className='page home'>
            <div className='box'>
                <h1>Inquilino perfecto</h1>
                <ErrorBoundary>
                    <FirstSearch />
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default Home