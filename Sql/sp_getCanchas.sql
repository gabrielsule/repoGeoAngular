USE [geoFutbol]
GO

/****** Object:  StoredProcedure [dbo].[sp_getCanchas]    Script Date: 04/05/2016 08:01:46 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_getCanchas]
	@lat as real,
	@lng as real,
	@dist as int
AS
BEGIN

	SELECT * FROM
	(SELECT nombre, direccion, tel1, tel2, email, pisoCemento, pisoParquet, pisoBaldosa, pisoTierra, pisoCespedS, pisoCespedN, jugadores5, jugadores6, jugadores7, jugadores8, jugadores9, jugadores11, canchaAbierta, canchaAbiertaLuz, canchaTechada, lat as latitude, lon as longitude, ranking,  
				111.045* DEGREES(ACOS(COS(RADIANS(@lat))
                 * COS(RADIANS(lat))
                 * COS(RADIANS(@lng) - RADIANS(lon))
                 + SIN(RADIANS(@lat))
                 * SIN(RADIANS(lat)))) AS distancia
	FROM 
		canchas) canchas
	WHERE 
		distancia <= @dist
	ORDER BY 
		distancia ASC
END

GO

