-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-03-2023 a las 04:05:42
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_sistema_academico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `idAlumno` char(15) NOT NULL,
  `codigo` char(10) NOT NULL,
  `nombre` char(80) NOT NULL,
  `direccion` char(80) NOT NULL,
  `telefono` char(20) NOT NULL,
  `dui` char(12) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`idAlumno`, `codigo`, `nombre`, `direccion`, `telefono`, `dui`) VALUES
('186f0a1d358', 'USIS047521', 'Miguel Ruiz', 'Usulutan', '7229-9736', '99999999-9'),
('186f060139f', 'USIS013421', 'Eduardo Sifredo Flores', 'Isla de Mendez', '6677-0022', '88888888-0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentes`
--

CREATE TABLE `docentes` (
  `idDocente` char(15) NOT NULL,
  `codigo` smallint(4) NOT NULL,
  `nombre` char(80) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docentes`
--

INSERT INTO `docentes` (`idDocente`, `codigo`, `nombre`) VALUES
('186ebefa13d', 666, 'Luis Hernandez'),
('186f02ad31e', 333, 'Eduardo Flores'),
('186f04c3abf', 682, 'Juan');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `idInscripcion` char(15) NOT NULL,
  `materiaUno` char(70) NOT NULL,
  `materiaDos` char(70) NOT NULL,
  `materiaTres` char(70) NOT NULL,
  `materiaCuatro` char(70) NOT NULL,
  `materiaCinco` char(70) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `idMateria` char(15) NOT NULL,
  `codigo` char(15) NOT NULL,
  `nombre` char(75) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`idMateria`, `codigo`, `nombre`) VALUES
('186f075b699', '611', 'Progra IV'),
('186f0736ded', '888', 'Base de Datos II'),
('186f25e1345', '444', 'Metodos de Investigacion'),
('186f25d78a5', '222', 'Ingenieria de Software'),
('186f25e984d', '889', 'Ingles Apl a la Computacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matriculas`
--

CREATE TABLE `matriculas` (
  `idMatricula` char(15) NOT NULL,
  `nombreAlumno` char(80) NOT NULL,
  `fecha` date NOT NULL,
  `pago` char(15) NOT NULL,
  `imagen` longblob NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumno`);

--
-- Indices de la tabla `docentes`
--
ALTER TABLE `docentes`
  ADD PRIMARY KEY (`idDocente`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`idInscripcion`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`idMateria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
