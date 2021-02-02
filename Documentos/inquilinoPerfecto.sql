create database if not exists inquilinoPerfecto character set="utf8mb4" collate="utf8mb4_spanish2_ci";

use inquilinoPerfecto;

create table if not exists usuario
(
  id int unsigned auto_increment primary key,
  nombre varchar(20) not null,
  apellidos varchar(100) not null,
  provincia varchar(50) not null,
  ciudad varchar(50) not null,
  email varchar(200) not null,
  estado enum('activo', 'inactivo') not null,
  administrador boolean not null default false,
  descripcion text,
  fechaNacimiento date,
  imagen varchar(500),
  teléfono varchar(20)
);

create table if not exists piso
(
  id int unsigned auto_increment primary key,
  provincia varchar(100) not null,
  ciudad varchar(100) not null,
  dirección varchar(200) not null,
  nBaños smallint unsigned not null,
  nHabitaciones smallint unsigned not null,
  m2 float not null,
  precio bigint unsigned not null,
  ascensor enum('si','no') not null default 'no',
  garaje enum('si', 'no') not null default 'no',
  balcon smallint default 0,
  jardin enum('si', 'no') not null default 'no' ,
  estado enum('activo', 'inactivo') not null,
  fechaPublicación timestamp default current_timestamp,
  fechaActualización timestamp default current_timestamp on update current_timestamp,
  id_usuario int unsigned not null,
  constraint piso_id_usuario_fk1
  foreign key (id_usuario) references usuario(id)
);

create table if not exists imagenesPiso
(
  id int unsigned auto_increment primary key,
  imagen varchar(500),
  id_piso int unsigned not null,
  constraint imagenes_piso_id_piso_fk1
  foreign key (id_piso) references piso(id)
);

create table if not exists reserva
(
  id_reserva int unsigned auto_increment primary key,
  precio bigint unsigned not null,
  fecha_entrada timestamp unique,
  fecha_salida timestamp unique,
  score_piso float not null default 0,
  score_usuario float not null default 0,
  estado enum('aceptado', 'declinado') not null,
  id_piso int unsigned not null,
  id_usuario int unsigned not null,
  constraint reserva_id_piso_fk1
  foreign key (id_piso) references piso(id),
  constraint reserva_id_usuario_fk2
  foreign key (id_usuario) references usuario(id)
);

alter table usuario
	add column password varchar(100) not null after email,
    add column validationCode varchar(100) after password;
    
alter table usuario
	modify nombre varchar(100),
	modify apellidos varchar(100),
    modify provincia varchar(100),
    rename column teléfono to telefono,
    modify ciudad varchar(100),
    modify role enum('admin', 'user') not null default 'user',
    modify estado enum('activo', 'inactivo');
    
alter table usuario
	modify email varchar(200) unique not null;

alter table piso
	modify estado enum('activo','inactivo') not null default 'activo';
    
alter table piso
    rename column fechaPublicación to fechaPublicacion,
    rename column fechaActualización to fechaActualizacion;
    
alter table piso
	rename column dirección to direccion;
    
alter table piso
	rename column nBaños to nBanos;
alter table piso
	add column descripcion varchar(500);
    
alter table usuario
		modify estado enum('activo', 'inactivo') default 'inactivo';