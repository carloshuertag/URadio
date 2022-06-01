DROP USER 'chuertag'@'localhost';
FLUSH PRIVILEGES;
CREATE USER 'chuertag'@'localhost' IDENTIFIED BY 'URadio2022';
GRANT ALL PRIVILEGES ON *.* TO 'chuertag'@'localhost' WITH GRANT OPTION;
CREATE USER 'chuertag'@'%' IDENTIFIED BY 'URadio2022';
GRANT ALL PRIVILEGES ON *.* TO 'chuertag'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

drop database if exists uradio;
create database uradio;
use uradio;
drop table if exists radioShowManager;
create table radioShowManager (
    managerId int primary key auto_increment,
    mail varchar(100) not null,
    pswd varchar(64) not null unique
);
drop table if exists radioShow;
create table radioShow (
    managerId int primary key,
    nme varchar(100) not null,
    schedule varchar(80) not null,
    host varchar(40) not null,
    availableAt varchar(255) not null,
    foreign key (managerId) references radioShowManager(managerId)
);
drop table if exists song;
create table song (
    isrc varchar(20) primary key,
    title varchar(80) not null,
    album varchar(40) not null,
    artist varchar(255) not null,
    spotifyId varchar(255) unique not null
);
drop table if exists radioShowCastSong;
create table radioShowCastSong(
    isrc varchar(20) not null,
    managerId int not null,
    castDate date not null,
    valid boolean not null,
    primary key (isrc, managerId),
    foreign key (managerId) references radioShowManager(managerId),
    foreign key (isrc) references song(isrc)
);