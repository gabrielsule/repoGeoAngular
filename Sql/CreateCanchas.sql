USE [geoFutbol]
GO

/****** Object:  Table [dbo].[canchas]    Script Date: 04/05/2016 08:01:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[canchas](
	[nombre] [nvarchar](50) NULL,
	[provincia] [nvarchar](50) NULL,
	[partido] [nvarchar](50) NULL,
	[direccion] [nvarchar](50) NULL,
	[tel1] [nvarchar](15) NULL,
	[tel2] [nvarchar](15) NULL,
	[email] [nvarchar](15) NULL,
	[pisoCemento] [bit] NULL,
	[pisoParquet] [bit] NULL,
	[pisoBaldosa] [bit] NULL,
	[pisoTierra] [bit] NULL,
	[pisoCespedS] [bit] NULL,
	[pisoCespedN] [bit] NULL,
	[jugadores5] [bit] NULL,
	[jugadores6] [bit] NULL,
	[jugadores7] [bit] NULL,
	[jugadores8] [bit] NULL,
	[jugadores9] [bit] NULL,
	[jugadores11] [bit] NULL,
	[canchaAbierta] [bit] NULL,
	[canchaAbiertaLuz] [bit] NULL,
	[canchaTechada] [bit] NULL,
	[lat] [real] NULL,
	[lon] [real] NULL,
	[ranking] [int] NULL
) ON [PRIMARY]

GO

