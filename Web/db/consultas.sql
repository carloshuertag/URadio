use uradio;

/*
 * consulta 1: 
 * Devuelve la info de las canciones que fueron emitidas en una fecha especifica (incluyendo el id del show que las emitio)
 */
 
 /*
 * formato general: 
  select song.isrc, song.title, song.artist, song.album, song.spotifyId, radioshowcastsong.managerId, radioshowcastsong.castDate
  from song
  inner join radioshowcastsong
  on song.isrc = radioshowcastsong.isrc
  where radioshowcastsong.castDate = 'la fecha que se quiera consultar';
 */

-- example:
select song.isrc, song.title, song.artist, song.album, song.spotifyId, radioshowcastsong.managerId, radioshowcastsong.castDate
from song
inner join radioshowcastsong
on song.isrc = radioshowcastsong.isrc
where radioshowcastsong.castDate = '2022-04-23';