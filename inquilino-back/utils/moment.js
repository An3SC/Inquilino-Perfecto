const moment = require('moment');

const dateToDb = (date) => {
    const dateSQL = moment(date).format('YYYY-MM-DD')
    return dateSQL
}

const sixMonths = (date) => {
    const dateSQL = moment(date).add(6, 'months').format('YYYY-MM-DD')

    return dateSQL
}

module.exports = {
    dateToDb,
    sixMonths
}