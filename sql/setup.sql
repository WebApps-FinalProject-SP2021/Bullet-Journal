-- These are the commands I used to setup the database and tables -Matthew Barton

create database bullet_journal;

-- \c bullet_journal;
-- connects current user to the database;

create table users (
    id serial primary key not null, 
    username varchar(20) not null, 
    password varchar(200) not null, 
    fullname varchar(30) not null, 
    email varchar(40) not null);

create table friends (
    id serial primary key not null, 
    friend_id int4 references users(id) on delete cascade not null);

 create table habits (
     id serial primary key not null, 
     description varchar(2000) not null, 
     user_id int4 references users(id) on delete cascade not null);

create table days (
    id serial primary key not null, 
    date DATE not null, 
    mood int, 
    user_id int4 references users(id) on delete cascade not null);

create table tasks (
    id serial primary key not null, 
    title varchar(200) not null, 
    completed boolean not null, 
    description varchar(2000) not null,
    due_date date, 
    reminder date, 
    user_id int4 references users(id) on delete cascade not null, 
    day_id int4 references days(id) on delete cascade not null);

set timezone = 'America/Chicago';

create user charg;
grant all privileges on database bullet_journal to charg;
alter user charg with superuser;