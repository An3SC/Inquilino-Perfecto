import ErrorBoundary from '../ErrorBoundary';
import './Home.css'
import FirstSearch from "./FirstSearch";
import video1 from '../videos/autumnHouse.mp4'

function Home() {
    return (
        <div className='pageHome'>
            <video className='videoHome' src={video1} autoPlay loop muted />
            <div className='firstSearch'>
                <h1>Encuentra tu hogar ideal</h1>
                <ErrorBoundary>
                    <FirstSearch />
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default Home