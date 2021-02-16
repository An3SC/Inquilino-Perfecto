require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const fileUpload = require("express-fileupload");
const cors = require('cors')

const { search } = require('./controllers/search')

const {
    register,
    validate,
    login
} = require('./controllers/authentication')

const {
    deleteUser,
    updateUser,
    getUserById,
    updateUserPassword,
    updateUserEmail,
    recoverPassword,
    resetPassword
} = require('./controllers/users')

const {
    createHome,
    getListOfHomes,
    getMyHomes,
    getHome,
    deleteHome,
    updateHome,
} = require('./controllers/homes')

const {
    booking,
    deleteBooking,
    getListOfBookings,
    getBooking,
    scoreBooking
} = require('./controllers/bookings')

const {
    saveImage,
    saveHomeImage,
    getImage
} = require('./controllers/images')

const {
    isAuthenticated,
    isAdmin,
    isSameUserOrAdmin,
    haveBooking
} = require('./middlewares/auth')

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use('/imagen', express.static(__dirname + '/imagen'))

const DEFAULT_PORT = 3333

const currentPort = process.env.PORT || DEFAULT_PORT

app.post('/usuario', register)
app.post('/usuario/login', login)

app.get('/usuario/validate/:code', validate)

app.get('/usuario/:id', getUserById)
app.delete('/usuario/:id', isAuthenticated, isSameUserOrAdmin, deleteUser)
app.put('/usuario/:id', /*isAuthenticated, isSameUserOrAdmin,*/ updateUser)

app.put('/usuario/:id/password', isAuthenticated, isSameUserOrAdmin, updateUserPassword)
app.put('/usuario/:id/email', isAuthenticated, isSameUserOrAdmin, updateUserEmail)

app.post('/usuario/recover-password', recoverPassword)
app.put('/usuario/password/reset/:code', resetPassword)

// app.post('/usuario/image', upload.single('image'), (req, res) => {
//     console.log(req.file)
//     res.send()
// })

app.post('/image', saveImage)
app.post('/vivienda/imagen/:id', saveHomeImage)
app.get('/vivienda/imagen/:uuid', getImage)

app.post('/vivienda/:id/reserva', /*isAuthenticated,*/ booking)
app.get('/reserva', isAuthenticated, isSameUserOrAdmin, getListOfBookings)
app.get('/reserva/:id', haveBooking, getBooking)
app.delete('/reserva/:id', isAuthenticated, isSameUserOrAdmin, deleteBooking)
app.put('/reserva/:id/score', haveBooking, scoreBooking)

app.get('/vivienda/busqueda', search)
app.get('/vivienda', getListOfHomes)
app.get('/vivienda/:id', getHome)
app.get('/usuario/vivienda/:id', getMyHomes)

app.post('/vivienda', isAuthenticated, createHome)
app.delete('/vivienda/:id', isAuthenticated, isSameUserOrAdmin, deleteHome)
app.put('/vivienda/:id', isAuthenticated, isSameUserOrAdmin, updateHome)

console.log(`Running on port ${currentPort}`)
app.listen(currentPort)