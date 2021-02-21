function Rating({ value }) {

    return (
        <div className='ratingsContainer'>
            <span>{value >= 1 ? <div className='fullStar' /> : <div className='emptyStar' />}</span>
            <span>{value >= 2 ? <div className='fullStar' /> : <div className='emptyStar' />}</span>
            <span>{value >= 3 ? <div className='fullStar' /> : <div className='emptyStar' />}</span>
            <span>{value >= 4 ? <div className='fullStar' /> : <div className='emptyStar' />}</span>
            <span>{value >= 5 ? <div className='fullStar' /> : <div className='emptyStar' />}</span>
        </div>
        //     <div>
        //         <span onClick={e => setRating(1)}>{rating >= 1 ? '⭐' : '✰'}</span>
        //         <span onClick={e => setRating(2)}>{rating >= 2 ? '⭐' : '✰'}</span>
        //         <span onClick={e => setRating(3)}>{rating >= 3 ? '⭐' : '✰'}</span>
        //         <span onClick={e => setRating(4)}>{rating >= 4 ? '⭐' : '✰'}</span>
        //         <span onClick={e => setRating(5)}>{rating >= 5 ? '⭐' : '✰'}</span>
        //     </div>
    )
}

export default Rating