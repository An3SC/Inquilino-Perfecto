require('dotenv').config()

const bcrypt = require('bcrypt');
const faker = require('faker/locale/es')
const fsPromises = require('fs').promises
const { random } = require("lodash");
const moment = require('moment')

const { getConnection } = require("./db");

async function main() {
    let connection;

    try {
        connection = await getConnection();

        await connection.query("DROP TABLE IF EXISTS reserva CASCADE");
        await connection.query("DROP TABLE IF EXISTS imagenesPiso CASCADE");
        await connection.query("DROP TABLE IF EXISTS piso CASCADE");
        await connection.query("DROP TABLE IF EXISTS usuario CASCADE");

        console.log('*TABLAS BORRADAS SATISFACTORIAMENTE')

        await connection.query(`
            create table if not exists usuario(
                id int unsigned auto_increment primary key,
                nombre varchar(100) not null,
                apellidos varchar(100),
                provincia varchar(100) not null,
                ciudad varchar(100),
                email varchar(200) not null,
                password varchar(100) not null,
                validationCode varchar(100),
                fechaActualizacion timestamp default current_timestamp on update current_timestamp,
                estado enum('activo', 'inactivo') default 'inactivo' not null,
                descripcion text,
                score float,
                fechaNacimiento date,
                imagen varchar(500),
                telefono varchar(20),
                role enum('admin', 'user') default 'user' not null
            )
        `)

        console.log('**CREADA TABLA DE USUARIOS')

        await connection.query(`
            create table if not exists piso (
                id int unsigned auto_increment primary key,
                provincia varchar(100) not null,
                ciudad varchar(100) not null,
                direccion varchar(200) not null,
                nBanos smallint unsigned not null,
                nHabitaciones smallint unsigned not null,
                m2 float not null,
                precio bigint unsigned not null,
                ascensor enum('si','no') not null default 'no',
                garaje enum('si', 'no') not null default 'no',
                balcon enum('si', 'no') not null default 'no',
                jardin enum('si', 'no') not null default 'no' ,
                estado enum('activo', 'inactivo') default 'activo' not null,
                score float,
                descripcion varchar(500),
                fechaPublicacion timestamp default current_timestamp,
                fechaActualizacion timestamp default current_timestamp on update current_timestamp,
                id_usuario int unsigned not null,
                constraint piso_id_usuario_fk1
                    foreign key (id_usuario) references usuario(id)
            )
        `)

        console.log('***CREADA TABLA DE PISOS')

        await connection.query(`
        create table if not exists imagenesPiso(
            id int unsigned auto_increment primary key,
            imagen varchar(500),
            id_piso int unsigned not null,
            constraint imagenes_piso_id_piso_fk1
                foreign key (id_piso) references piso(id)
        )
        `)

        console.log('****CREADA TABLA DE IMÁGENES')

        await connection.query(`
        create table if not exists reserva(
            id_reserva int unsigned auto_increment primary key,
            precio bigint unsigned not null,
            fecha_entrada timestamp unique,
            fecha_salida timestamp unique,
            score_piso float,
            score_usuario float,
            estado enum('aceptado', 'pendiente', 'declinado') default 'pendiente' not null,
            id_piso int unsigned not null,
            id_usuario int unsigned not null,
            constraint reserva_id_piso_fk1
                foreign key (id_piso) references piso(id),
            constraint reserva_id_usuario_fk2
                foreign key (id_usuario) references usuario(id)
        )
        `)

        console.log('*****CREADA TABLA DE RESERVA')

        const passwordBcrypt = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);
        await connection.query(
            /**
             * Habrá que meter luego los campos nombre, etc.
             */
            `insert into usuario (nombre, provincia, email, password, estado, role) values (?, ?, ?, ?, ?, 'admin')`,
            ['Andrés', 'Pontevedra', 'admin@inquilino.com', passwordBcrypt, 'activo']
        )

        let usuarios = 100;

        for (let i = 1; i <= usuarios; i++) {
            const nombre = faker.name.firstName();
            const apellidos = faker.name.lastName();
            const provincia = faker.address.state();
            const ciudad = faker.address.cityPrefix();
            const email = faker.internet.email();
            await connection.query(`
                insert into usuario(
                    nombre,
                    apellidos,
                    provincia,
                    ciudad,
                    email,
                    password,
                    estado) values (
                        '${nombre}',
                        '${apellidos}',
                        '${provincia}',
                        '${ciudad}',
                        '${email}',
                        '${passwordBcrypt}',
                        'activo'
                    )
                `)
        }

        console.log('******USUARIOS CREADOS')

        let pisos = 500;
        for (let i = 1; i <= pisos; i++) {
            const provincia = faker.address.state();
            const ciudad = faker.address.cityPrefix();
            const direccion = faker.address.streetAddress();
            const nBanos = random(1, 5);
            const nHabitaciones = random(2, 10);
            const m2 = random(40, 300);
            const precio = random(200, 2000);
            const ascensor = faker.random.arrayElement(['si', 'no'])
            const garaje = faker.random.arrayElement(['si', 'no'])
            const balcon = faker.random.arrayElement(['si', 'no'])
            const jardin = faker.random.arrayElement(['si', 'no'])
            const id_usuario = random(1, 100);
            await connection.query(`
                insert into piso(
                    provincia,
                    ciudad,
                    direccion,
                    nBanos,
                    nHabitaciones,
                    m2,
                    precio,
                    ascensor,
                    garaje,
                    balcon,
                    jardin,
                    id_usuario) values (
                        "${provincia}",
                        "${ciudad}",
                        "${direccion}",
                        "${nBanos}",
                        "${nHabitaciones}",
                        "${m2}",
                        "${precio}",
                        "${ascensor}",
                        "${garaje}",
                        '${balcon}',
                        "${jardin}",
                        "${id_usuario}"
                    )
            `);
        }

        console.log('*******PISOS CREADOS')

    } catch (e) {
        console.log('Some error ocurred: ', e)
    } finally {
        if (connection) {
            connection.release();
        }
        process.exit();
    }
}

(async () => {
    await main()
})()