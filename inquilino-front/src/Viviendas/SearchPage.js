function SearchPage() {

    const currentUrl = window.location.href
    const currentCity = currentUrl && currentUrl.split('&').find(t => t.startsWith('ciudad='))
    const currentPrice = currentUrl && currentUrl.split('&').find(t => t.startsWith('price='))
    const city = currentCity ? currentCity.substr(7) : 1
    const price = currentPrice ? currentPrice.substr(5) : 1
    console.log(city, price)

    return (
        <div>Hola</div>
    )
}

export default SearchPage 