drop database if exists dm;
create database dm;

use dm;
drop table if exists utilisateur cascade;
drop table if exists employe cascade;

create table utilisateur (
	uid serial primary key, 
	pseudo text not null,
	mdp text
);

create table employe (
	eid serial primary key, 
	pseudo text not null,
	mdp text
);

INSERT INTO utilisateur VALUES
(1,'Habermehl','motdepasse1'),
(2,'Degorre','motdepasse2'),
(3,'Padovani','motdepasse3');

INSERT INTO employe VALUES
(1,'Travailleur','motdepasse4'),
(2,'Paresseux','motdepasse5'),
(3,'Reveur','motdepasse6');
