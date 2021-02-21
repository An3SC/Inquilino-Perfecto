import ErrorBoundary from '../ErrorBoundary';
import './Home.css'
import FirstSearch from "./FirstSearch";
import video1 from '../videos/autumnHouse.mp4'
import './Home.css'

function Home() {
    return (
        <div className='pageHome'>
            <video className='videoHome' src={video1} autoPlay loop muted />
            <div className='firstSearch'>
                <h1 id='titulo'>Encuentra tu hogar ideal</h1>
                <ErrorBoundary>
                    <FirstSearch />
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default Home