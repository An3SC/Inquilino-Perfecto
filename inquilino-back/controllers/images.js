const db = require('../db/mysql')

const fsPromises = require('fs').promises
const uuid = require('uuid')

const saveImage = async (req, res) => {

    await fsPromises.mkdir(process.env.TARGET_FOLDER, { recursive: true })

    try {
        const fileID = uuid.v4()
        const outputFileName = `${process.env.TARGET_FOLDER}/${fileID}.jpg`

        await fsPromises.writeFile(outputFileName, req.files.imagen.data)

        res.send()
    } catch (e) {
        console.log('Error: ', e)
        res.status(500).send()
    }
}

const saveHomeImage = async (req, res) => {
    const { id } = req.params

    await fsPromises.mkdir(process.env.TARGET_FOLDER, { recursive: true })

    try {
        const fileID = uuid.v4()
        const outputFileName = `${process.env.TARGET_FOLDER}/${fileID}.jpg`

        await fsPromises.writeFile(outputFileName, req.files.imagen.data)

        await db.saveHomeImage(fileID, id)

        res.send()
    } catch (e) {
        console.log('Error: ', e)
        res.status(500).send()
    }
}

const getImage = async (req, res) => {

    const { uuid } = req.params

    const imagePath = '/home/andres/Escritorio/proyectoFinal/Inquilino-Perfecto/images'

    const path = `${imagePath}/${uuid}.jpg`
    console.log(path)

    try {
        await fsPromises.stat(path)
        res.sendFile(path)

    } catch (e) {
        console.log('El fichero no existe')
        res.status(404).send()
    }
}


module.exports = {
    saveImage,
    saveHomeImage,
    getImage
}