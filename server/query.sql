create table users (
    id varchar primary key,
    name varchar(50),
    email varchar(50),
    password varchar,
    is_verified boolean,
    token varchar,
    photo varchar,
    shortname varchar(20),
    bio varchar(255),
    phone varchar(15)
);

create table grup(
    id varchar primary key,
    name_grup varchar(50)
);