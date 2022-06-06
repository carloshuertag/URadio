use uradio;
-- ejemplos de registros y la forma en la que deben ingresar a la db

insert into radioshowmanager(mail,pswd) values ('totsoca@gmail.com', sha2('asies',256));
insert into radioshowmanager(mail,pswd) values ('email@gmail.com', sha2('hola',256));
insert into radioshowmanager(mail,pswd) values ('si@gmail.com', sha2('123',256));
insert into radioshowmanager(mail,pswd) values ('no@gmail.com', sha2('password',256));
insert into radioshowmanager(mail,pswd) values ('asies@gmail.com', sha2('naruto',256));

insert into song(isrc,title,album,artist,spotifyId) 
		values('GBCEL0700074','505','Favourite Worst Nightmare','Arctic Monkeys','123');
insert into song(isrc,title,album,artist,spotifyId) 
		values('GBAHT1500068','Psycho','Drones','Muse','1234'),
			  ('USRC10100769','Someday','Is this it','The Strokes','1235'),
              ('MXUM71800134','Azul','Azul','Zoe','1236'),
              ('GBCEL0300177','Take Me Out','Franz Ferdinand','Franz Ferdinand','1237');

insert into radioshowcastsong(isrc,managerId,castDate,valid)
		values('GBCEL0700074','1','2022-04-23','2');
insert into radioshowcastsong(isrc,managerId,castDate,valid)
		values('GBAHT1500068','2','2022-04-23','1'),
			  ('GBCEL0300177','1','2022-04-23','1');
insert into radioshowcastsong(isrc,managerId,castDate,valid)
		values('GBAHT1500068','2','2022-04-24','1'),
			  ('USRC10100769','3','2022-04-25','1'),
              ('MXUM71800134','4','2022-04-26','1'),
              ('GBCEL0300177','5','2022-04-27','1');
        

insert into radioshow(managerId,nme,schedule,host,availableAt)
		values('1','IndeChulo','Friday 22:00', 'Omar Perez', 'FM 92.1');
insert into radioshow(managerId,nme,schedule,host,availableAt)
		values('2','MuchoRock','Monday 12:00', 'Marco O', 'https://www.rock.com.mx'),
			  ('3','PuroStrokes','Wednesday 15:00', 'Carlos Huerta', 'https://www.strokes.com.mx'),
              ('4','Amor y pena','Tuesday 18:00', 'Damaris Cervin', 'FM 93.5'),
              ('5','Coachella','Sunday 15:00', 'Marco Dorantes', 'FM 105.3');

