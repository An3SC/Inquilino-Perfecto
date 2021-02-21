import { useState } from "react";

function Rating({ value }) {
    const [rating, setRating] = useState()

    // const score = useFetch(`http://localhost:9999/reserva/${}`)

    return (
        // <div>
        //     <span onClick={e => setRating(1)}>{rating >= 1 ? <img src={'../icons/estrella.png'} /> : <img src='../icons/estrella2.png' />}</span>
        //     <span onClick={e => setRating(2)}>{rating >= 2 ? <img src='../icons/estrella.png' /> : <img src='../icons/estrella2.png' />}</span>
        //     <span onClick={e => setRating(3)}>{rating >= 3 ? <img src='../icons/estrella.png' /> : <img src='../icons/estrella2.png' />}</span>
        //     <span onClick={e => setRating(4)}>{rating >= 4 ? <img src='../icons/estrella.png' /> : <img src='../icons/estrella2.png' />}</span>
        //     <span onClick={e => setRating(5)}>{rating >= 5 ? <img src='../icons/estrella.png' /> : <img src='../icons/estrella2.png' />}</span>
        // </div>
        <div>
            {!value && <div>
                <span onClick={e => setRating(1)}>{rating >= 1 ? '⭐' : '✰'}</span>
                <span onClick={e => setRating(2)}>{rating >= 2 ? '⭐' : '✰'}</span>
                <span onClick={e => setRating(3)}>{rating >= 3 ? '⭐' : '✰'}</span>
                <span onClick={e => setRating(4)}>{rating >= 4 ? '⭐' : '✰'}</span>
                <span onClick={e => setRating(5)}>{rating >= 5 ? '⭐' : '✰'}</span>
            </div>}
            {value && <div>
                <span>{value >= 1 ? '⭐' : '✰'}</span>
                <span>{value >= 2 ? '⭐' : '✰'}</span>
                <span>{value >= 3 ? '⭐' : '✰'}</span>
                <span>{value >= 4 ? '⭐' : '✰'}</span>
                <span>{value >= 5 ? '⭐' : '✰'}</span>
            </div>}
        </div>
    )
}

export default Rating