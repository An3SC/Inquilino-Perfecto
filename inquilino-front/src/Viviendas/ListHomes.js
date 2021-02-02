import useFetch from "../useFetch"

function ListHomes() {
    const listHomes = useFetch('http://localhost:9999/vivienda') || []

    return (
        <div className='listHomes'>
            <ul>
                {listHomes.map(list =>
                    <li key={list.id}>
                        <div>
                            {list.ciudad}
                        </div>
                        <div>
                            {list.precio}
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default ListHomes