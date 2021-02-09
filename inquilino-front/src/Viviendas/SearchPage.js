import useFetch from '../useFetch'

function SearchPage() {

    const currentUrl = window.location.href
    const currentCity = currentUrl && currentUrl.split('&').find(t => t.startsWith('ciudad='))
    // const currentPrice = currentUrl && currentUrl.split('&').find(t => t.startsWith('price='))
    const city = currentCity ? currentCity.substr(7) : 1
    // const price = currentPrice ? currentPrice.substr(5) : 1

    const results = useFetch(`http://localhost:9999/vivienda/busqueda?` + `ciudad=${city}`)
    console.log(results.data)

    return (
        <div>
            <ul>
            </ul>
        </div>
    )
}

export default SearchPage 