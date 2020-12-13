drop table student;
drop table room;
drop table userAdmin;
create Table UserAdmin(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


create Table Room(
    id SERIAL PRIMARY KEY,
    roomSize INTEGER NOT NULL,
    roomNumber VARCHAR(255) NOT NULL UNIQUE,
    storeRoom BOOLEAN DEFAULT false
);


create Table Student(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    patronymic VARCHAR(255) NOT NULL,
    birthDate DATE NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(255),
    gender VARCHAR(255) NOT NULL CHECK (gender IN ('Мужской','Женский')),
    arrivalDate DATE NOT NULL,
    leaveDate DATE NOT NULL,
    room_id INTEGER,
    FOREIGN KEY (room_id) REFERENCES Room(id)
);