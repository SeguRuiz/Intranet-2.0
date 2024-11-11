-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: intranet_db
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cursos`
--

DROP TABLE IF EXISTS `Cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cursos` (
  `id` char(32) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Cursos_id_nombre_1f6139bc_uniq` (`id`,`nombre`),
  KEY `id-cursos-indx` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cursos`
--

/*!40000 ALTER TABLE `Cursos` DISABLE KEYS */;
INSERT INTO `Cursos` VALUES ('29c963c476cb49c8922de7947dd691c0','Front-end','2024-11-06 18:24:23.156457','2024-11-06 18:24:23.156513',1),('31b8ab776fb241ecb54d7bc137024c20','DemoLab','2024-11-06 18:23:37.763082','2024-11-06 18:23:37.763118',1),('45044c33ca4f465f9313adcc869cd78a','Backend','2024-11-06 18:44:04.150104','2024-11-06 18:44:04.150144',1);
/*!40000 ALTER TABLE `Cursos` ENABLE KEYS */;

--
-- Table structure for table `Estudiantes`
--

DROP TABLE IF EXISTS `Estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Estudiantes` (
  `id` char(32) NOT NULL,
  `nota` double NOT NULL,
  `reportes` int NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `faltas` int NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `usuario_id_id` bigint DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Estudiantes_id_usuario_id_id_eebfce63_uniq` (`id`,`usuario_id_id`),
  KEY `usuario_id-indx` (`usuario_id_id`),
  KEY `usuario_id-activo-indx` (`usuario_id_id`,`activo`),
  KEY `id-indx` (`id`),
  CONSTRAINT `Estudiantes_usuario_id_id_82cd9074_fk_Usuarios_id` FOREIGN KEY (`usuario_id_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Estudiantes`
--

/*!40000 ALTER TABLE `Estudiantes` DISABLE KEYS */;
INSERT INTO `Estudiantes` VALUES ('0147792a0d9343b4a4be70a9698c678f',0,0,'2024-11-06 17:29:49.619538',0,'2024-11-06 17:29:49.619568',16,1),('0a44623780aa400ca964bbed67e3b3e2',0,0,'2024-11-06 17:29:55.481382',0,'2024-11-06 17:29:55.481415',18,1),('0c110f8140d44aa5b01f8359e6ac00fe',0,0,'2024-11-06 17:29:39.505893',0,'2024-11-06 17:29:39.505928',11,1),('1f696894d47845b4a89bf0bc2544e44f',0,0,'2024-11-06 17:29:53.009470',0,'2024-11-06 17:29:53.009512',17,1),('24c9be8fb3d54742a4cfc1af7fb764b3',0,0,'2024-11-06 17:29:22.175370',0,'2024-11-06 17:29:22.175404',4,1),('45ec4110181e4a5fbe16e0474ed0ea11',0,0,'2024-11-06 17:03:02.625252',0,'2024-11-07 16:55:29.939513',2,1),('46b945cce5034b18b06f217fb6062636',0,0,'2024-11-06 17:29:28.399117',0,'2024-11-06 17:29:28.399148',6,1),('57dbc8665b6546ac911c3f95a7bc863d',0,0,'2024-11-06 17:29:57.433898',0,'2024-11-06 17:29:57.433930',19,1),('596e4dea8aec45d5972a5da59255ab81',0,0,'2024-11-06 17:30:01.997700',0,'2024-11-06 17:30:01.997745',21,1),('63c04a326df64cc28a5d3f3f923f708d',0,0,'2024-11-06 17:29:46.376759',0,'2024-11-06 17:29:46.376804',14,1),('764f2d9db9ff4c079f22e709a2971082',0,0,'2024-11-06 17:29:24.079240',0,'2024-11-06 17:29:24.079271',3,1),('88e828f59a714901b2d227c3e4a41dd9',0,0,'2024-11-06 17:29:31.117894',0,'2024-11-06 17:29:31.117927',7,1),('8aa3bc5e6a0d4d11be12151d004f5702',0,0,'2024-11-06 18:42:11.536632',0,'2024-11-06 18:42:11.536696',25,1),('c38399a5b9214e35af04482484b75bdf',0,0,'2024-11-06 17:29:32.841820',0,'2024-11-06 17:29:32.841857',8,1),('d923908df5ad4473b6f8a8ef20e96de9',0,0,'2024-11-06 17:29:37.596196',0,'2024-11-06 17:29:37.596227',10,1),('ea44664f4d6b4ff095330cbfa7a173db',0,0,'2024-11-06 17:29:59.121962',0,'2024-11-06 17:29:59.121992',20,1),('eaf0d8dc2b164f6bb61ee8bb6f3a1c03',0,0,'2024-11-06 17:29:35.822974',0,'2024-11-06 17:29:35.823025',9,1),('efc2e0d34e984f60ba591de25244708c',0,0,'2024-11-06 17:29:41.188612',0,'2024-11-06 17:29:41.188642',12,1),('f50773bb026641b7956f4d46496c1803',0,0,'2024-11-06 17:29:26.606541',0,'2024-11-06 17:29:26.606594',5,1),('f9fb8b89f0a54d819acb32b709dd92c6',0,0,'2024-11-06 17:29:48.142951',0,'2024-11-06 17:29:48.142994',15,1),('ffae284876394bf985ac99cd313f63a4',0,0,'2024-11-06 17:29:44.256614',0,'2024-11-06 17:29:44.256646',13,1);
/*!40000 ALTER TABLE `Estudiantes` ENABLE KEYS */;

--
-- Table structure for table `Info_tareas`
--

DROP TABLE IF EXISTS `Info_tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Info_tareas` (
  `id` char(32) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `fecha_entrega` datetime(6) NOT NULL,
  `fecha_revision` datetime(6) NOT NULL,
  `cursos_id` char(32) NOT NULL,
  `profesor_id_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Info_tareas_cursos_id_a3945546_fk_Cursos_id` (`cursos_id`),
  KEY `Info_tareas_profesor_id_id_11b961a5_fk_Usuarios_id` (`profesor_id_id`),
  CONSTRAINT `Info_tareas_cursos_id_a3945546_fk_Cursos_id` FOREIGN KEY (`cursos_id`) REFERENCES `Cursos` (`id`),
  CONSTRAINT `Info_tareas_profesor_id_id_11b961a5_fk_Usuarios_id` FOREIGN KEY (`profesor_id_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Info_tareas`
--

/*!40000 ALTER TABLE `Info_tareas` DISABLE KEYS */;
INSERT INTO `Info_tareas` VALUES ('1f70caedc44847ffbe7c05c909885a4d','Practica sql','Haciendo uso de tus conocimientos en sql completa las siquientes queryes tomando en cuenta las especificaciones dadas.','2024-11-07 15:58:50.668612','2024-11-29 00:00:00.000000','45044c33ca4f465f9313adcc869cd78a',1),('311ac3e4a8b34e4ba45cc5a961c70bb8','Practica python','Sigues las instrucciones del archivo adjunto','2024-11-07 15:49:59.783089','2024-11-29 00:00:00.000000','45044c33ca4f465f9313adcc869cd78a',1),('37b5fa7a177649eab8eb3945457604de','Practica 2 hmtl','Seguir las instrucciones del siguiente archivo','2024-11-06 19:33:50.528644','2024-11-14 00:00:00.000000','29c963c476cb49c8922de7947dd691c0',1),('76add9092f2940f585baef4e3f8cc626','Practica-flex-box','Sigan las instrucciones del archivo adjunto','2024-11-06 19:39:05.436338','2024-11-29 00:00:00.000000','29c963c476cb49c8922de7947dd691c0',1),('da2875ed4b074111a506712ed3a56f26','Practica manejo de archivos','Con los conocimientos adquiridos intenta crear un archivo json aparte utilizando solo python.','2024-11-07 15:55:04.362661','2024-11-30 00:00:00.000000','45044c33ca4f465f9313adcc869cd78a',1),('e6e75553efd64510a52c79b2276b6437','Practica 1 html','Deben entrar al link del archivo adjunto para que sigan las intruccione del code sandBox','2024-11-06 19:24:58.738566','2024-11-12 00:00:00.000000','29c963c476cb49c8922de7947dd691c0',1),('fdc7a0e488f246dcafd540fbbae3a2a4','Practica 1 css','Sigan las instrucciones del archivo adjunto','2024-11-06 19:36:50.955245','2024-11-23 00:00:00.000000','29c963c476cb49c8922de7947dd691c0',1);
/*!40000 ALTER TABLE `Info_tareas` ENABLE KEYS */;

--
-- Table structure for table `Intermedia_archivos_entregables`
--

DROP TABLE IF EXISTS `Intermedia_archivos_entregables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Intermedia_archivos_entregables` (
  `id` char(32) NOT NULL,
  `archivo_id_id` char(32) NOT NULL,
  `asignacion_id_id` char(32) NOT NULL,
  `info_tarea_id_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Intermedia_archivos__archivo_id_id_be81819b_fk_archivos_` (`archivo_id_id`),
  KEY `Intermedia_archivos__asignacion_id_id_e793b24b_fk_Tareas_as` (`asignacion_id_id`),
  KEY `Intermedia_archivos__info_tarea_id_id_e96182d0_fk_Info_tare` (`info_tarea_id_id`),
  CONSTRAINT `Intermedia_archivos__archivo_id_id_be81819b_fk_archivos_` FOREIGN KEY (`archivo_id_id`) REFERENCES `archivos` (`id`),
  CONSTRAINT `Intermedia_archivos__asignacion_id_id_e793b24b_fk_Tareas_as` FOREIGN KEY (`asignacion_id_id`) REFERENCES `Tareas_asignadas` (`id`),
  CONSTRAINT `Intermedia_archivos__info_tarea_id_id_e96182d0_fk_Info_tare` FOREIGN KEY (`info_tarea_id_id`) REFERENCES `Info_tareas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Intermedia_archivos_entregables`
--

/*!40000 ALTER TABLE `Intermedia_archivos_entregables` DISABLE KEYS */;
/*!40000 ALTER TABLE `Intermedia_archivos_entregables` ENABLE KEYS */;

--
-- Table structure for table `Intermedia_tareas_archivos`
--

DROP TABLE IF EXISTS `Intermedia_tareas_archivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Intermedia_tareas_archivos` (
  `id` char(32) NOT NULL,
  `archivo_id_id` char(32) NOT NULL,
  `info_tarea_id_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Intermedia_tareas_archivos_archivo_id_id_b1a15761_fk_archivos_id` (`archivo_id_id`),
  KEY `Intermedia_tareas_ar_info_tarea_id_id_1adf7da9_fk_Info_tare` (`info_tarea_id_id`),
  CONSTRAINT `Intermedia_tareas_ar_info_tarea_id_id_1adf7da9_fk_Info_tare` FOREIGN KEY (`info_tarea_id_id`) REFERENCES `Info_tareas` (`id`),
  CONSTRAINT `Intermedia_tareas_archivos_archivo_id_id_b1a15761_fk_archivos_id` FOREIGN KEY (`archivo_id_id`) REFERENCES `archivos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Intermedia_tareas_archivos`
--

/*!40000 ALTER TABLE `Intermedia_tareas_archivos` DISABLE KEYS */;
INSERT INTO `Intermedia_tareas_archivos` VALUES ('0f817605d6aa4c768c32802add2c703b','368780e1d8f84b3c94d8f4a40fc345ee','1f70caedc44847ffbe7c05c909885a4d'),('81b792b5e945438494c26d0e3e9516db','3f83a7fbb1b44890b4705f22cca585c4','76add9092f2940f585baef4e3f8cc626'),('a835fd954ba5411c9177928761e87fe1','cc0c75be026343628d6a124da6e62ddb','fdc7a0e488f246dcafd540fbbae3a2a4'),('b28f2162738243ae9c38497fee69b177','9da7e0661aa04258ab23101da8013f2d','e6e75553efd64510a52c79b2276b6437'),('bc871ec6dbe44ae081980365b50d3cd8','736549e7b78f45419a86f695bc031e9e','37b5fa7a177649eab8eb3945457604de'),('e9d042d8fd7e4369b16acdec44015056','34e4b28936164a829e3c26b4d4440df1','da2875ed4b074111a506712ed3a56f26'),('eecbc8163cb5415480f4f208eb3898eb','1e0983d3d90d4e98ac863dcd10175045','311ac3e4a8b34e4ba45cc5a961c70bb8');
/*!40000 ALTER TABLE `Intermedia_tareas_archivos` ENABLE KEYS */;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `id` char(32) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Roles_tipo_2f7d5bb0_uniq` (`tipo`),
  KEY `tipo-id-indx` (`tipo`,`id`),
  KEY `tipo-indx` (`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES ('775dd9e4cc684b25a1a4b945a67b0d3a','admin'),('1297ce8862d444cfbe11eee8ed46d24a','estudiante'),('ef902386ac4b429c9acaa35698ff39e0','profesor');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;

--
-- Table structure for table `Tareas_asignadas`
--

DROP TABLE IF EXISTS `Tareas_asignadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tareas_asignadas` (
  `id` char(32) NOT NULL,
  `entregada` tinyint(1) NOT NULL,
  `revisada` tinyint(1) NOT NULL,
  `calificacion` double NOT NULL,
  `curso_id_id` char(32) NOT NULL,
  `estudiante_id_id` char(32) NOT NULL,
  `profesor_id_id` bigint DEFAULT NULL,
  `info_tarea_id_id` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Tareas_asignadas_curso_id_id_062dbf2d_fk_Cursos_id` (`curso_id_id`),
  KEY `Tareas_asignadas_estudiante_id_id_acff1e5d_fk_Estudiantes_id` (`estudiante_id_id`),
  KEY `Tareas_asignadas_profesor_id_id_09d92187_fk_Usuarios_id` (`profesor_id_id`),
  KEY `Tareas_asignadas_info_tarea_id_id_69a53ee5_fk_Info_tareas_id` (`info_tarea_id_id`),
  CONSTRAINT `Tareas_asignadas_curso_id_id_062dbf2d_fk_Cursos_id` FOREIGN KEY (`curso_id_id`) REFERENCES `Cursos` (`id`),
  CONSTRAINT `Tareas_asignadas_estudiante_id_id_acff1e5d_fk_Estudiantes_id` FOREIGN KEY (`estudiante_id_id`) REFERENCES `Estudiantes` (`id`),
  CONSTRAINT `Tareas_asignadas_info_tarea_id_id_69a53ee5_fk_Info_tareas_id` FOREIGN KEY (`info_tarea_id_id`) REFERENCES `Info_tareas` (`id`),
  CONSTRAINT `Tareas_asignadas_profesor_id_id_09d92187_fk_Usuarios_id` FOREIGN KEY (`profesor_id_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tareas_asignadas`
--

/*!40000 ALTER TABLE `Tareas_asignadas` DISABLE KEYS */;
INSERT INTO `Tareas_asignadas` VALUES ('0487606ea5d04ab484135bb91be88be4',0,0,0,'29c963c476cb49c8922de7947dd691c0','24c9be8fb3d54742a4cfc1af7fb764b3',1,NULL),('0534b0a959aa4a369f456eca926df767',0,0,0,'29c963c476cb49c8922de7947dd691c0','c38399a5b9214e35af04482484b75bdf',1,'e6e75553efd64510a52c79b2276b6437'),('0772b67709e7405b913d555d1694e3d7',0,0,0,'29c963c476cb49c8922de7947dd691c0','0147792a0d9343b4a4be70a9698c678f',1,'37b5fa7a177649eab8eb3945457604de'),('0c40def85b1f40c89abd76eec4085eeb',0,0,0,'29c963c476cb49c8922de7947dd691c0','eaf0d8dc2b164f6bb61ee8bb6f3a1c03',1,NULL),('0f9d867e76784d30b55e0ec7959d2c8d',0,0,0,'29c963c476cb49c8922de7947dd691c0','45ec4110181e4a5fbe16e0474ed0ea11',1,NULL),('0fbfb39a5a34433c802d9395d9951507',0,0,0,'29c963c476cb49c8922de7947dd691c0','764f2d9db9ff4c079f22e709a2971082',1,NULL),('16116b89c48549f6b564f11e1e8e96f0',0,0,0,'29c963c476cb49c8922de7947dd691c0','764f2d9db9ff4c079f22e709a2971082',1,'e6e75553efd64510a52c79b2276b6437'),('16fb026d073d43bbac74896e47473679',0,0,0,'29c963c476cb49c8922de7947dd691c0','1f696894d47845b4a89bf0bc2544e44f',1,'76add9092f2940f585baef4e3f8cc626'),('1a2ce9471aa549de861fb39fc3c2a51d',0,0,0,'29c963c476cb49c8922de7947dd691c0','88e828f59a714901b2d227c3e4a41dd9',1,NULL),('1a52a1b9dd3f4849aa8051496d6302f5',0,0,0,'29c963c476cb49c8922de7947dd691c0','ffae284876394bf985ac99cd313f63a4',1,NULL),('1fd8e1e8a6ef4461a411feca4be84688',0,0,0,'29c963c476cb49c8922de7947dd691c0','0a44623780aa400ca964bbed67e3b3e2',1,'e6e75553efd64510a52c79b2276b6437'),('212669f4d1694c89bc1f5e31875ef39a',0,0,0,'29c963c476cb49c8922de7947dd691c0','8aa3bc5e6a0d4d11be12151d004f5702',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('22feb297681c487695bf4da26b8c180d',0,0,0,'29c963c476cb49c8922de7947dd691c0','c38399a5b9214e35af04482484b75bdf',1,'37b5fa7a177649eab8eb3945457604de'),('23eb8ef259214374a274298cf75d00e7',0,0,0,'29c963c476cb49c8922de7947dd691c0','45ec4110181e4a5fbe16e0474ed0ea11',1,NULL),('24a11e7e618a4c469dd03615fd273af0',0,0,0,'29c963c476cb49c8922de7947dd691c0','63c04a326df64cc28a5d3f3f923f708d',1,'37b5fa7a177649eab8eb3945457604de'),('26a097bee20f468a86f6d772de2a2389',0,0,0,'29c963c476cb49c8922de7947dd691c0','596e4dea8aec45d5972a5da59255ab81',1,'76add9092f2940f585baef4e3f8cc626'),('28ade9089d0e47ceb721c2c790d1e888',0,0,0,'29c963c476cb49c8922de7947dd691c0','ffae284876394bf985ac99cd313f63a4',1,'76add9092f2940f585baef4e3f8cc626'),('2fd261690f4c444bbb95f03a86157867',0,0,0,'29c963c476cb49c8922de7947dd691c0','63c04a326df64cc28a5d3f3f923f708d',1,'76add9092f2940f585baef4e3f8cc626'),('30cb80f1ee5c43d3b1e1427b6acfd6d0',0,0,0,'29c963c476cb49c8922de7947dd691c0','8aa3bc5e6a0d4d11be12151d004f5702',1,'e6e75553efd64510a52c79b2276b6437'),('35af4bb68efa4303a089bc8ca34df713',0,0,0,'29c963c476cb49c8922de7947dd691c0','764f2d9db9ff4c079f22e709a2971082',1,NULL),('35b7276d31544660bb9d934bd69ec72c',0,0,0,'45044c33ca4f465f9313adcc869cd78a','57dbc8665b6546ac911c3f95a7bc863d',1,NULL),('4469c23ab6d74ef3977d16236fd7035d',0,0,0,'29c963c476cb49c8922de7947dd691c0','efc2e0d34e984f60ba591de25244708c',1,'37b5fa7a177649eab8eb3945457604de'),('448213372f5d4ed6b8fef088372003d7',0,0,0,'29c963c476cb49c8922de7947dd691c0','eaf0d8dc2b164f6bb61ee8bb6f3a1c03',1,'e6e75553efd64510a52c79b2276b6437'),('44def9c5b92c403a868f86ebbe17ac9f',0,0,0,'29c963c476cb49c8922de7947dd691c0','0a44623780aa400ca964bbed67e3b3e2',1,'76add9092f2940f585baef4e3f8cc626'),('45a5e017fec54f8ca33467d154a3afd1',0,0,0,'29c963c476cb49c8922de7947dd691c0','c38399a5b9214e35af04482484b75bdf',1,NULL),('45dba603f8594b65b2cfc62551fe28fa',0,0,0,'29c963c476cb49c8922de7947dd691c0','596e4dea8aec45d5972a5da59255ab81',1,'37b5fa7a177649eab8eb3945457604de'),('46bd70245e3f48d0b2f079a3c880f59a',0,0,0,'29c963c476cb49c8922de7947dd691c0','d923908df5ad4473b6f8a8ef20e96de9',1,'37b5fa7a177649eab8eb3945457604de'),('48a2a73ba0694323b5790b3c1047bf96',0,0,0,'29c963c476cb49c8922de7947dd691c0','764f2d9db9ff4c079f22e709a2971082',1,'76add9092f2940f585baef4e3f8cc626'),('4906f0ca80334999a03917370ceb7b92',0,0,0,'29c963c476cb49c8922de7947dd691c0','efc2e0d34e984f60ba591de25244708c',1,NULL),('4a700ecec2204e66a683ed0788e300bf',0,0,0,'29c963c476cb49c8922de7947dd691c0','88e828f59a714901b2d227c3e4a41dd9',1,'37b5fa7a177649eab8eb3945457604de'),('4c46201915954006a6babc82a85332c1',0,0,0,'29c963c476cb49c8922de7947dd691c0','24c9be8fb3d54742a4cfc1af7fb764b3',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('4ce98eb870ff46779f485a977db39041',0,0,0,'29c963c476cb49c8922de7947dd691c0','ffae284876394bf985ac99cd313f63a4',1,NULL),('4d7292dbf4e5413498c269704774e291',0,0,0,'29c963c476cb49c8922de7947dd691c0','764f2d9db9ff4c079f22e709a2971082',1,'37b5fa7a177649eab8eb3945457604de'),('4e2db25a01b94d269f4843a561f05e05',0,0,0,'29c963c476cb49c8922de7947dd691c0','ffae284876394bf985ac99cd313f63a4',1,'37b5fa7a177649eab8eb3945457604de'),('50bca3e9ce4a47ba9aea4bd69be3393e',0,0,0,'29c963c476cb49c8922de7947dd691c0','efc2e0d34e984f60ba591de25244708c',1,'76add9092f2940f585baef4e3f8cc626'),('5787c16618474b39a3efe82f0a2c0e09',0,0,0,'29c963c476cb49c8922de7947dd691c0','0147792a0d9343b4a4be70a9698c678f',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('5a69c9891f934dc59fafbca6d03942dd',0,0,0,'29c963c476cb49c8922de7947dd691c0','f50773bb026641b7956f4d46496c1803',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('5d8d8e3ac30f405a952221ffa738e801',0,0,0,'29c963c476cb49c8922de7947dd691c0','f50773bb026641b7956f4d46496c1803',1,'e6e75553efd64510a52c79b2276b6437'),('5d94f8625bee45bb8dcfa6a2747fad76',0,0,0,'29c963c476cb49c8922de7947dd691c0','ea44664f4d6b4ff095330cbfa7a173db',1,NULL),('5f0c3ccb999746a3ab0c9a444fceea74',0,0,0,'29c963c476cb49c8922de7947dd691c0','1f696894d47845b4a89bf0bc2544e44f',1,'37b5fa7a177649eab8eb3945457604de'),('5f3f75587b15444d8309a3bad31b18d6',0,0,0,'29c963c476cb49c8922de7947dd691c0','1f696894d47845b4a89bf0bc2544e44f',1,NULL),('5fd8bc622f1e4d7f93d5f8a5fba93624',0,0,0,'29c963c476cb49c8922de7947dd691c0','596e4dea8aec45d5972a5da59255ab81',1,NULL),('604c0f8258b2439cb4255b25a4e4f1c3',0,0,0,'29c963c476cb49c8922de7947dd691c0','8aa3bc5e6a0d4d11be12151d004f5702',1,NULL),('65921d8d9ac4470e90d677812ef45e6b',0,0,0,'29c963c476cb49c8922de7947dd691c0','eaf0d8dc2b164f6bb61ee8bb6f3a1c03',1,NULL),('6814d85d0f974ef4a7ec60c0a4662757',0,0,0,'29c963c476cb49c8922de7947dd691c0','45ec4110181e4a5fbe16e0474ed0ea11',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('684f4e9df5df40669fec5fbe2f364671',0,0,0,'29c963c476cb49c8922de7947dd691c0','0a44623780aa400ca964bbed67e3b3e2',1,NULL),('688b12d7a9ab49efbe13eee11553101a',0,0,0,'29c963c476cb49c8922de7947dd691c0','c38399a5b9214e35af04482484b75bdf',1,NULL),('6c463fa009dc486d8a3071301cdf0336',0,0,0,'29c963c476cb49c8922de7947dd691c0','0a44623780aa400ca964bbed67e3b3e2',1,NULL),('6c6722c2224a43278294255552c5af12',0,0,0,'29c963c476cb49c8922de7947dd691c0','0a44623780aa400ca964bbed67e3b3e2',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('74697713ca63435b86a02fc843e8396f',0,0,0,'29c963c476cb49c8922de7947dd691c0','63c04a326df64cc28a5d3f3f923f708d',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('7676d03192c048e2a84c9d1476f55ae2',0,0,0,'29c963c476cb49c8922de7947dd691c0','8aa3bc5e6a0d4d11be12151d004f5702',1,'76add9092f2940f585baef4e3f8cc626'),('77d6ac31651d46f59657e01e16c79366',0,0,0,'29c963c476cb49c8922de7947dd691c0','0147792a0d9343b4a4be70a9698c678f',1,NULL),('7809f15489d2497bb74a1c62722b4933',0,0,0,'45044c33ca4f465f9313adcc869cd78a','57dbc8665b6546ac911c3f95a7bc863d',1,'da2875ed4b074111a506712ed3a56f26'),('78a68811d69f4536b368eb09c9273929',0,0,0,'29c963c476cb49c8922de7947dd691c0','d923908df5ad4473b6f8a8ef20e96de9',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('794952b3f9b04597a11b7e442f06bc15',0,0,0,'29c963c476cb49c8922de7947dd691c0','1f696894d47845b4a89bf0bc2544e44f',1,'e6e75553efd64510a52c79b2276b6437'),('7a4e1a75f33a4ffa8015b1e7b47a5e0a',0,0,0,'29c963c476cb49c8922de7947dd691c0','1f696894d47845b4a89bf0bc2544e44f',1,NULL),('7b6401a2ba364a5c883c891c63eaf778',0,0,0,'29c963c476cb49c8922de7947dd691c0','f50773bb026641b7956f4d46496c1803',1,NULL),('80949392e1b84e3aacb2b964ebd89805',0,0,0,'29c963c476cb49c8922de7947dd691c0','ea44664f4d6b4ff095330cbfa7a173db',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('813f8c983713431fa05563ab7fd8873b',0,0,0,'29c963c476cb49c8922de7947dd691c0','ffae284876394bf985ac99cd313f63a4',1,NULL),('8422d03cd3ec493bbae414f25372cbc2',0,0,0,'29c963c476cb49c8922de7947dd691c0','45ec4110181e4a5fbe16e0474ed0ea11',1,'76add9092f2940f585baef4e3f8cc626'),('84a1a3f402bc4d949ca0199563ea7009',0,0,0,'29c963c476cb49c8922de7947dd691c0','63c04a326df64cc28a5d3f3f923f708d',1,'e6e75553efd64510a52c79b2276b6437'),('87413d8c603042e7a6dbe9da4cdc175d',0,0,0,'29c963c476cb49c8922de7947dd691c0','24c9be8fb3d54742a4cfc1af7fb764b3',1,'e6e75553efd64510a52c79b2276b6437'),('8959888bf4b0469ca4f80ae17f4500c9',0,0,0,'29c963c476cb49c8922de7947dd691c0','ea44664f4d6b4ff095330cbfa7a173db',1,NULL),('8faee64bed11434ab6b48dbc7d13f742',0,0,0,'29c963c476cb49c8922de7947dd691c0','63c04a326df64cc28a5d3f3f923f708d',1,NULL),('90807651e1f347feb7a8d0ef84fa5640',0,0,0,'29c963c476cb49c8922de7947dd691c0','efc2e0d34e984f60ba591de25244708c',1,NULL),('91ac35142618413ca4586b2eefb38dbb',0,0,0,'29c963c476cb49c8922de7947dd691c0','88e828f59a714901b2d227c3e4a41dd9',1,'e6e75553efd64510a52c79b2276b6437'),('94689927c6e247919f4d20cad0a6f544',0,0,0,'29c963c476cb49c8922de7947dd691c0','596e4dea8aec45d5972a5da59255ab81',1,NULL),('9470df57e0bc44cf92be7ba6e52c10f5',0,0,0,'29c963c476cb49c8922de7947dd691c0','d923908df5ad4473b6f8a8ef20e96de9',1,NULL),('977d479609a24d218f86ad6b6120d775',0,0,0,'29c963c476cb49c8922de7947dd691c0','0a44623780aa400ca964bbed67e3b3e2',1,NULL),('9808808382814285b7e5d5b2da0eee2e',0,0,0,'29c963c476cb49c8922de7947dd691c0','d923908df5ad4473b6f8a8ef20e96de9',1,'76add9092f2940f585baef4e3f8cc626'),('9b29394854244c4a968708ef10ffd366',0,0,0,'29c963c476cb49c8922de7947dd691c0','0147792a0d9343b4a4be70a9698c678f',1,'e6e75553efd64510a52c79b2276b6437'),('9d932d95acb2429ba4003b9caa5757ee',0,0,0,'29c963c476cb49c8922de7947dd691c0','596e4dea8aec45d5972a5da59255ab81',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('a6bceef57b1e4e57aa87f5372b3ccd5a',0,0,0,'29c963c476cb49c8922de7947dd691c0','8aa3bc5e6a0d4d11be12151d004f5702',1,NULL),('a7239246c08842e5b1430f84c726125e',0,0,0,'29c963c476cb49c8922de7947dd691c0','63c04a326df64cc28a5d3f3f923f708d',1,NULL),('a9bf45418f6b4c2693edad12f807bad0',0,0,0,'29c963c476cb49c8922de7947dd691c0','ea44664f4d6b4ff095330cbfa7a173db',1,NULL),('ab3d5288c9f14441921a45b38e873e20',0,0,0,'29c963c476cb49c8922de7947dd691c0','24c9be8fb3d54742a4cfc1af7fb764b3',1,'37b5fa7a177649eab8eb3945457604de'),('ac41c0624e714f4abd809ed6763da614',0,0,0,'45044c33ca4f465f9313adcc869cd78a','57dbc8665b6546ac911c3f95a7bc863d',1,'1f70caedc44847ffbe7c05c909885a4d'),('ad1e4abd4a5b418891f6d06dd4070ff9',0,0,0,'29c963c476cb49c8922de7947dd691c0','1f696894d47845b4a89bf0bc2544e44f',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('addd4ffee2cf493c94c1794f49f1fdf7',0,0,0,'29c963c476cb49c8922de7947dd691c0','eaf0d8dc2b164f6bb61ee8bb6f3a1c03',1,'37b5fa7a177649eab8eb3945457604de'),('af32976ca8b147c4a5d93f944829dfcb',0,0,0,'29c963c476cb49c8922de7947dd691c0','c38399a5b9214e35af04482484b75bdf',1,'76add9092f2940f585baef4e3f8cc626'),('b0e85b3c036b456ea1bd25e76056b1aa',0,0,0,'29c963c476cb49c8922de7947dd691c0','24c9be8fb3d54742a4cfc1af7fb764b3',1,'76add9092f2940f585baef4e3f8cc626'),('b24243542b1e4e99b88f335f9ad75215',0,0,0,'29c963c476cb49c8922de7947dd691c0','0a44623780aa400ca964bbed67e3b3e2',1,'37b5fa7a177649eab8eb3945457604de'),('b2b0937f94c94a4fb0830261297be67c',0,0,0,'29c963c476cb49c8922de7947dd691c0','d923908df5ad4473b6f8a8ef20e96de9',1,NULL),('b3197a5e4dcc4801b16a414868c07813',0,0,0,'29c963c476cb49c8922de7947dd691c0','ffae284876394bf985ac99cd313f63a4',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('b43af269394a4dc3a87bc9350724af7e',0,0,0,'29c963c476cb49c8922de7947dd691c0','596e4dea8aec45d5972a5da59255ab81',1,NULL),('b458f7f53acc4e338a5e87dbe1652db7',0,0,0,'29c963c476cb49c8922de7947dd691c0','63c04a326df64cc28a5d3f3f923f708d',1,NULL),('b8005ec4a647490b9cdb664352c59974',0,0,0,'29c963c476cb49c8922de7947dd691c0','d923908df5ad4473b6f8a8ef20e96de9',1,'e6e75553efd64510a52c79b2276b6437'),('b827ff87f0f54385bfbf92a836f6da8e',0,0,0,'29c963c476cb49c8922de7947dd691c0','efc2e0d34e984f60ba591de25244708c',1,'e6e75553efd64510a52c79b2276b6437'),('b8a811c6dcdf4c92a53c508375851329',0,0,0,'29c963c476cb49c8922de7947dd691c0','45ec4110181e4a5fbe16e0474ed0ea11',1,NULL),('baba63cadf4947b7aae61f59e35c8c8e',0,0,0,'29c963c476cb49c8922de7947dd691c0','8aa3bc5e6a0d4d11be12151d004f5702',1,NULL),('c5e35d2f9e094224b00fabed606023bd',0,0,0,'29c963c476cb49c8922de7947dd691c0','88e828f59a714901b2d227c3e4a41dd9',1,NULL),('c8400841736e4514baefe72311911d68',0,0,0,'29c963c476cb49c8922de7947dd691c0','c38399a5b9214e35af04482484b75bdf',1,NULL),('c958e0b7cf67453da9ff95f4744d0eb7',0,0,0,'29c963c476cb49c8922de7947dd691c0','f50773bb026641b7956f4d46496c1803',1,NULL),('caa557f51a074531b9e159bce6b0f937',0,0,0,'29c963c476cb49c8922de7947dd691c0','ea44664f4d6b4ff095330cbfa7a173db',1,'76add9092f2940f585baef4e3f8cc626'),('cb2529276a5442ca8ae11957c20faf18',0,0,0,'45044c33ca4f465f9313adcc869cd78a','57dbc8665b6546ac911c3f95a7bc863d',1,'311ac3e4a8b34e4ba45cc5a961c70bb8'),('cbd06af57b794c779318896f7565c4a7',0,0,0,'29c963c476cb49c8922de7947dd691c0','f50773bb026641b7956f4d46496c1803',1,'37b5fa7a177649eab8eb3945457604de'),('ccb1f54d1e8044cfb5860158458799b5',0,0,0,'29c963c476cb49c8922de7947dd691c0','45ec4110181e4a5fbe16e0474ed0ea11',1,'37b5fa7a177649eab8eb3945457604de'),('d1088d1964f544ac9e9b67ff6d982532',0,0,0,'29c963c476cb49c8922de7947dd691c0','45ec4110181e4a5fbe16e0474ed0ea11',1,'e6e75553efd64510a52c79b2276b6437'),('da37b070137747b9aac63d95409a2501',0,0,0,'29c963c476cb49c8922de7947dd691c0','0147792a0d9343b4a4be70a9698c678f',1,NULL),('da809a91624b46e0af611751fba69c46',0,0,0,'29c963c476cb49c8922de7947dd691c0','596e4dea8aec45d5972a5da59255ab81',1,'e6e75553efd64510a52c79b2276b6437'),('dd395e0c4e1e4ec4bd57bb147f061224',0,0,0,'29c963c476cb49c8922de7947dd691c0','88e828f59a714901b2d227c3e4a41dd9',1,'76add9092f2940f585baef4e3f8cc626'),('e08687e98efd415dba978a00416a5862',0,0,0,'29c963c476cb49c8922de7947dd691c0','d923908df5ad4473b6f8a8ef20e96de9',1,NULL),('e0bd87547acb40b28b24029f9ebe18cf',0,0,0,'29c963c476cb49c8922de7947dd691c0','eaf0d8dc2b164f6bb61ee8bb6f3a1c03',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('e862db9993aa40eea756abdab246d992',0,0,0,'29c963c476cb49c8922de7947dd691c0','efc2e0d34e984f60ba591de25244708c',1,NULL),('e8c9758c961a43a38fd1410580342d54',0,0,0,'29c963c476cb49c8922de7947dd691c0','764f2d9db9ff4c079f22e709a2971082',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('ea239b3241da474492b81109ab004359',0,0,0,'29c963c476cb49c8922de7947dd691c0','8aa3bc5e6a0d4d11be12151d004f5702',1,'37b5fa7a177649eab8eb3945457604de'),('ea60826ff3d141c895dd9a723818f94b',0,0,0,'29c963c476cb49c8922de7947dd691c0','efc2e0d34e984f60ba591de25244708c',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('ea92976350af4ab78ff72cddf3840e89',0,0,0,'29c963c476cb49c8922de7947dd691c0','ea44664f4d6b4ff095330cbfa7a173db',1,'37b5fa7a177649eab8eb3945457604de'),('eac4b2a5deef453b9786a5ab8e335da0',0,0,0,'29c963c476cb49c8922de7947dd691c0','24c9be8fb3d54742a4cfc1af7fb764b3',1,NULL),('eb86a90062744e56a04fff4b64be79c4',0,0,0,'29c963c476cb49c8922de7947dd691c0','24c9be8fb3d54742a4cfc1af7fb764b3',1,NULL),('ebb59952c0884a618711bd563d574fd7',0,0,0,'29c963c476cb49c8922de7947dd691c0','f50773bb026641b7956f4d46496c1803',1,'76add9092f2940f585baef4e3f8cc626'),('ebb7dee5ba0b42058c4d7b460d5b34bc',0,0,0,'29c963c476cb49c8922de7947dd691c0','1f696894d47845b4a89bf0bc2544e44f',1,NULL),('f05aaff9f31b46fd9916e63e315f3d0a',0,0,0,'29c963c476cb49c8922de7947dd691c0','f50773bb026641b7956f4d46496c1803',1,NULL),('f3fa16c7a6584a018b58cd169a23fa76',0,0,0,'29c963c476cb49c8922de7947dd691c0','0147792a0d9343b4a4be70a9698c678f',1,'76add9092f2940f585baef4e3f8cc626'),('f43e24e29d27433f899a39f5380df16a',0,0,0,'29c963c476cb49c8922de7947dd691c0','0147792a0d9343b4a4be70a9698c678f',1,NULL),('f92c49606fcd40f8af4a149c295eb508',0,0,0,'29c963c476cb49c8922de7947dd691c0','764f2d9db9ff4c079f22e709a2971082',1,NULL),('fa48fdf25ec0456d9add4c0e3b336d5a',0,0,0,'29c963c476cb49c8922de7947dd691c0','ea44664f4d6b4ff095330cbfa7a173db',1,'e6e75553efd64510a52c79b2276b6437'),('fb6cf04bcafd40db880e105c44a46490',0,0,0,'29c963c476cb49c8922de7947dd691c0','eaf0d8dc2b164f6bb61ee8bb6f3a1c03',1,'76add9092f2940f585baef4e3f8cc626'),('fbe3aae0b19e4260bc3e38cceac93d44',0,0,0,'29c963c476cb49c8922de7947dd691c0','88e828f59a714901b2d227c3e4a41dd9',1,NULL),('fbe686abf678441a8f2ebcfdfb566e43',0,0,0,'29c963c476cb49c8922de7947dd691c0','88e828f59a714901b2d227c3e4a41dd9',1,'fdc7a0e488f246dcafd540fbbae3a2a4'),('fca4c626130b4f9fa010b2255a2992d1',0,0,0,'29c963c476cb49c8922de7947dd691c0','ffae284876394bf985ac99cd313f63a4',1,'e6e75553efd64510a52c79b2276b6437'),('fcdf304f2e79496798e6aaadb447c100',0,0,0,'29c963c476cb49c8922de7947dd691c0','eaf0d8dc2b164f6bb61ee8bb6f3a1c03',1,NULL),('fd2099a5f8ff43a2a503c498190b428a',0,0,0,'29c963c476cb49c8922de7947dd691c0','c38399a5b9214e35af04482484b75bdf',1,'fdc7a0e488f246dcafd540fbbae3a2a4');
/*!40000 ALTER TABLE `Tareas_asignadas` ENABLE KEYS */;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `cedula` int DEFAULT NULL,
  `rol_id_id` char(32) DEFAULT NULL,
  `fecha_editado` datetime(6) NOT NULL,
  `is_socioemocional` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `Usuarios_cedula_88e8104e_uniq` (`cedula`),
  KEY `Usuarios_rol_id_id_1c0c15d7_fk_Roles_id` (`rol_id_id`),
  KEY `cedula-nombre-apellidos-indx` (`cedula`,`first_name`,`last_name`),
  KEY `email-indx` (`email`),
  KEY `email-id-indx` (`id`,`email`),
  KEY `nombre-id-indx` (`id`,`first_name`),
  CONSTRAINT `Usuarios_rol_id_id_1c0c15d7_fk_Roles_id` FOREIGN KEY (`rol_id_id`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,'pbkdf2_sha256$870000$rynjZYESABu7cmceSBKqAG$lUXznIN74ZWUdR9DXgpnpcPHdSv4w77b4DOzlsXX9I0=','2024-11-06 16:53:48.000000',1,'Luis','Luis','Segura','ruiz96199@gmail.com',1,1,'2024-11-06 16:53:35.000000',703180513,'775dd9e4cc684b25a1a4b945a67b0d3a','2024-11-06 16:54:40.777843',0),(2,'pbkdf2_sha256$870000$RGY66VRF9A8ETUmEJ0zqDR$SWdym8NX0JTkU7JmCvigQfmsGyLL+cv57d/leKEFfys=',NULL,0,'Kev34','Kevin','Alpizar Diaz','Kevin67@gmail.com',0,1,'2024-11-06 17:02:53.590491',807880934,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-07 16:55:29.925441',0),(3,'pbkdf2_sha256$870000$Lw25KIbwfjGpDjHcaqqMRU$5yYB5H4UB7QYfY/N39CGBpsHvacVVjxkNZuP2z20uVk=',NULL,0,'dereck89','Derek','Gonzales Noguera','dereck45@gmail.com',0,1,'2024-11-06 17:04:23.752970',30940645,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:24.065649',0),(4,'pbkdf2_sha256$870000$VL70AIt3Cg5GjZgvijcSYU$m7lYAMBFH0Coljvi3rTYItOVZY2V8PRvLNNR53EQjs4=',NULL,0,'ema23','Emanuel','Abarca Zuñiga','emanuel90@gmail.com',0,1,'2024-11-06 17:05:58.043216',609341276,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:22.162843',0),(5,'pbkdf2_sha256$870000$ib1JEv9xeLLynAGQSsQsnA$a4vjhGLQxZZCWpP7H1TkGc/FETISdLCQMZGEttgnOfE=',NULL,0,'Gary20','Gary','Alvarado Chavez','gary49@gmail.com',0,1,'2024-11-06 17:07:57.828326',404380723,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:26.594665',0),(6,'pbkdf2_sha256$870000$1K0SojXKpm7f1NpZWkscD8$n4k2AZQtyXPw27qiaWv/Ee8eZVUbu7axT8+EE4Qerx4=',NULL,0,'santi56','Santiago','Ariza Salas','santi21@gmail.com',0,1,'2024-11-06 17:09:17.659292',745206734,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:28.386349',0),(7,'pbkdf2_sha256$870000$lfw1ox08SEWN4q8vcvspTJ$xZH1h5Y8Rcn8IlJ1gdbjtclzCQCu1f+V4pgBistO7Ks=',NULL,0,'moni02','Monica','Barrios','monica02@gmail.com',0,1,'2024-11-06 17:10:23.466291',602193875,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:31.108091',0),(8,'pbkdf2_sha256$870000$XRbSm3p5BVR5sWGemtOkLu$b4FLWeGxqZSCzrpseZX9daWjN4r6wAk113qUVqSgmng=',NULL,0,'alexi30','Alexia Nicolle','Cahill Navarro','alexia89@gmail.com',0,1,'2024-11-06 17:11:40.887024',645304403,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:32.829923',0),(9,'pbkdf2_sha256$870000$ZGxsAOGOu0G6W7w8gjeHMO$S7n0wcaScISlrgZi2KdBe2rsEpcMVunr8+J7atKWDdI=',NULL,0,'jocksan45','Jocksan','Cardenas García','jocksan34@gmail.com',0,1,'2024-11-06 17:13:02.033812',234097865,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:35.812169',0),(10,'pbkdf2_sha256$870000$xI6za7EYn7721fX3GYvFiu$w2U+SiFnLo2pflDfkYFGBKjzFLpE3YzumLi3lzMhUbU=',NULL,0,'mari56','María Francisca','Chevez Saborío','maria90@gmail.com',0,1,'2024-11-06 17:15:43.631630',456230947,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:37.585530',0),(11,'pbkdf2_sha256$870000$Oh6E2rPKXJtSvm2TlS3UKN$oPD+/EakxRTjDgdmImDXndy2oHYOPdzKnfmJnQ7mdEk=',NULL,0,'alejadra7','Alejadra','Conde Mendez','alejadra46@gmail.com',0,1,'2024-11-06 17:17:06.220323',145723105,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:39.492135',0),(12,'pbkdf2_sha256$870000$iiIxXUzXA2fjfoV72wMa1G$SXEcVr2RbcoL8ombf/q5L/9esuRt56/c7O0nAtiijkc=',NULL,0,'yacith19','Yacith','Delgado Martinez','yacith19@gmail.com',0,1,'2024-11-06 17:18:01.348176',341230527,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:41.177450',0),(13,'pbkdf2_sha256$870000$HsmDEpay71qCLEBrCoVx6B$5bG5PG5ANKZRXdIec1gyMRgXhJGQbE9JXzMtOobE6w4=',NULL,0,'Dani33','Daniel','Delgado Quintana','dani56@gmail.com',0,1,'2024-11-06 17:19:09.535236',589301267,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:44.240124',0),(14,'pbkdf2_sha256$870000$1b2pOONDkhNaM2QfyJt8jV$+o+2A7REhavY4n//coU6znaW4+1PMTDMVZiEBJew1OU=',NULL,0,'raul09','Raul','Espinoza Vindas','raul09@gmail.com',0,1,'2024-11-06 17:20:04.745606',670340112,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:46.366842',0),(15,'pbkdf2_sha256$870000$cOnZ9uksUZ8gUnd5xVsS5w$VilWQC1ga2DhV4uyj8gYB5dtBIcAL+JDGpcO70PzTsY=',NULL,0,'isaac0','Isaac David','Ferreto Hidalgo','isaac0@gmail.com',0,1,'2024-11-06 17:21:04.804554',345612905,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:48.131864',0),(16,'pbkdf2_sha256$870000$RkMRqQ3LRTlstNJ5yxEx4H$v25/bhojatLDTYeyTpflOI5OkXoxrjAWjw1EzYmZpYQ=',NULL,0,'joshua3','Joshua','Ferreto Hidalgo','joshua3@gmail.com',0,1,'2024-11-06 17:22:05.817290',256780923,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:49.608197',0),(17,'pbkdf2_sha256$870000$kwGcOu2hH2FICtvoVjYj61$PBau7BmWfN6TsYe+Py8sUMeMYNiHKtlkua5wJlDwls8=',NULL,0,'marilin80','Marylin','Garcia Meza','GarciaMeza30@gmail.com',0,1,'2024-11-06 17:23:19.903783',457830912,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:52.998597',0),(18,'pbkdf2_sha256$870000$weacRhxkZEaR5wz4w9SNTL$oMAgN2JaaITVPp2N1b1Uv9Uz7o6I9pDPwWIso/wOQAA=',NULL,0,'andres26','Andrés Elian','Guevara Jiron','GuevaraJiron90@gmail.com',0,1,'2024-11-06 17:24:44.147513',109386522,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:55.470567',0),(19,'pbkdf2_sha256$870000$gpAYhHimxsa2mQE1HLL8bx$aaNpwYdA/HNXFQwwODDBBW6K9ioLM9gV7fXxrs5bt+M=',NULL,0,'Erick11@gmail.com','Erick','Herrera Jimenez','HerreraJimenez88@gmail.com',0,1,'2024-11-06 17:26:06.199099',567839922,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:57.422949',0),(20,'pbkdf2_sha256$870000$LjalRMgoxa9p8NJolEmgbP$2M+RvnxzjG4UiHqyBotywguX5JX6GbGcs/Yg16ej+OU=',NULL,0,'franco34','Franco','Moreno López','MorenoLopez09@gmail.com',0,1,'2024-11-06 17:27:42.324489',234091179,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:29:59.110108',0),(21,'pbkdf2_sha256$870000$gx7Yi7g6sNoZqjeUkKqgsh$hvswzKsRyWF6w4WDkFa8hISoXGOPkEVs58Wp/JmRwlo=',NULL,0,'Yocy88','Yocelyn','Rivera Guitierez','RiveraGuitierez12@gmail.com',0,1,'2024-11-06 17:29:00.735801',290340055,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 17:30:01.985966',0),(22,'pbkdf2_sha256$870000$AZnvuMDUokiE1rS2Q7DxH8$BM1Rt6Jm4d8bj2SFeUgsXv9VVoRPXfjl+wqq0Q3gByA=',NULL,0,'steven77','Steven','Salas Ledezma','SalasLedezma12@gmail.com',0,1,'2024-11-06 17:30:56.181252',678091234,'ef902386ac4b429c9acaa35698ff39e0','2024-11-06 17:33:17.455783',0),(24,'pbkdf2_sha256$870000$ywjl8ZAgXaSRIpeCJynA5c$Rp0SMexiHJolDg9lzOlOS0zBEI5jJWaTt5pbLuP0bs8=',NULL,0,'jean23','Jean Carlos','Barberen','Barberen22@gmail.com',0,1,'2024-11-06 17:33:01.090960',234670956,'ef902386ac4b429c9acaa35698ff39e0','2024-11-06 17:33:21.153548',0),(25,'pbkdf2_sha256$870000$dvacUYjXaHRaaEqkWYqyQ3$lN3axsiV51HcO+FNZDFM+0sM7H/YxtfdixN47/Snrvc=',NULL,0,'bry7','Bryan','Rivera','ruiz296199@gmail.com',0,1,'2024-11-06 18:42:00.101890',704579022,'1297ce8862d444cfbe11eee8ed46d24a','2024-11-06 18:42:11.518003',0),(26,'pbkdf2_sha256$870000$7Wjrpla5pZ0Ti7ZJQB3971$PiqCKkXD6/39Lysmj2m5POzJOJS0+MIkke+6zRgSuaw=',NULL,0,'Elen45','Elena','Sobrado','lui96199@gmail.com',0,1,'2024-11-07 14:26:38.000000',603221289,'ef902386ac4b429c9acaa35698ff39e0','2024-11-07 14:29:36.117674',1);
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;

--
-- Table structure for table `Usuarios_groups`
--

DROP TABLE IF EXISTS `Usuarios_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuarios_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_usuarios_groups_usuarios_id_group_id_a516b677_uniq` (`usuarios_id`,`group_id`),
  KEY `api_usuarios_groups_group_id_75fb32b7_fk_auth_group_id` (`group_id`),
  CONSTRAINT `api_usuarios_groups_group_id_75fb32b7_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `api_usuarios_groups_usuarios_id_07d95c13_fk_api_usuarios_id` FOREIGN KEY (`usuarios_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios_groups`
--

/*!40000 ALTER TABLE `Usuarios_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `Usuarios_groups` ENABLE KEYS */;

--
-- Table structure for table `Usuarios_user_permissions`
--

DROP TABLE IF EXISTS `Usuarios_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuarios_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `api_usuarios_user_permis_usuarios_id_permission_i_ba30beb3_uniq` (`usuarios_id`,`permission_id`),
  KEY `api_usuarios_user_pe_permission_id_cc33ceef_fk_auth_perm` (`permission_id`),
  CONSTRAINT `api_usuarios_user_pe_permission_id_cc33ceef_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `api_usuarios_user_pe_usuarios_id_5d617e31_fk_api_usuar` FOREIGN KEY (`usuarios_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios_user_permissions`
--

/*!40000 ALTER TABLE `Usuarios_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Usuarios_user_permissions` ENABLE KEYS */;

--
-- Table structure for table `archivos`
--

DROP TABLE IF EXISTS `archivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archivos` (
  `id` char(32) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `key` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `archivos_nombre_key_6cb35b3f_uniq` (`nombre`,`key`),
  KEY `info-archivo-indx` (`key`,`nombre`),
  KEY `key-archivo-indx` (`key`),
  KEY `id-archivo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivos`
--

/*!40000 ALTER TABLE `archivos` DISABLE KEYS */;
INSERT INTO `archivos` VALUES ('65866b79c7094563a4c83b5e6dfe8039','1113 - Software.pdf','6ea577001d5ee306c733ac10e547e4c9'),('9d4cdbbf0829498a91a3a2c4448813c5','1115 - Lógica Booleana.pdf','5373686061e3589e3af6c6810957ab34'),('72805128958a4efe986c051324020166','1116 - Lenguajes.pdf','db09e795fbde8517e7149316d77cd04a'),('35119464258a4bd0ac81f8a348294dc0','1123 - Sitios Web.pdf','1f2f388a6764d18bf292119c8fe0c5d4'),('376d3c50a1c945ea98b24a0633789932','1125 - HTML.pdf','88052adce524afd4d64e4ff2ebdfa70e'),('9da7e0661aa04258ab23101da8013f2d','1127 - Práctica HTML.pdf','546c1bfaa5a3b257aee39e8f88d6cef7'),('01af402bd19e439aa36ec77795911b9b','1127 - Práctica HTML.pdf','70d4902f2411b940abf97a1d6fdff7af'),('736549e7b78f45419a86f695bc031e9e','113 - Práctica 2 HTML.pdf','8b14124366c489de101d351ba2255b28'),('3fc36680fa8744758a5158f01a380394','1141 - CSS.pptx','10b8f2f999ea7052c3ebe9d2d2ea6b53'),('cc0c75be026343628d6a124da6e62ddb','1142-1147 Práctica CSS (1).pdf','767b819d575b87bb537d1ed9d7a77664'),('91a034c90b22430d93154184ba18a669','1142-1147 Práctica CSS.pdf','7e14cb875aeb1d7d99289215c00036a8'),('af44558a94664f80a8057ed0db20f81d','1151 - Flexbox & Grid.pdf','2402c090c9baa11a337d946f2fe54ba6'),('3f83a7fbb1b44890b4705f22cca585c4','1152 - Práctica Flexbox & Grid.pdf','9887998fee94ebd51727a7830744a619'),('b304397e926046afa642832c798d04b7','2123-2124 - Funciones.pdf','c3b16a60577450ef8a59be7de8be0f4f'),('23298529d5fb4a319f7804e64f76684f','4111-4112 - Introducción a React.pdf','8d6b3f96924558bf087b4837787f464f'),('e9427baf4e324c86a88448a1cb06f4f6','4113-4114 - Rendering.pdf','61b65ade7ca724af68b4ddd32c4b5826'),('b188612605424db7b475e555aa8df211','4115-4117 - Manejo de estados.pdf','732d9e88e9066f067349d4f45ae63b20'),('d8bd3e0490954cd586bf1201d0edd7c0','5111 Introducción a Python.pdf','1976f55734c8e92a77a1d3e7365efb25'),('6a304b65652846d2a16495100f7b76f1','5112-5113 Familiarización con Python.pdf','e774ff78e376a9744b9b32bf7121741d'),('a74ec4fb7844424e8351129aa7d2a932','5121 Estructuras de Datos en Python .pdf','11ac195cf309fbafbe941c8b7f768808'),('39ece6e354d14edeb7ccfb9c986662d2','5124 Test en Python.pdf','d47e3c9efaf028959f887297c71b6c43'),('424ddde4481c4c298ec934fb1690050b','5136 Otros tipos de datos - Resultados.pdf','72c50422b40711dcfd10e51c07d8697c'),('4ca7924f622643408cdf27ed8312b7a7','5211 Programacion Orientada a Objetos Parte 2.pdf','1ef53aa999e01b3872d77b3fabe3a553'),('1e0983d3d90d4e98ac863dcd10175045','5224 Python Refactoring (1).pdf','5021e776217ef1db407c396a875349c0'),('34e4b28936164a829e3c26b4d4440df1','5322 Manejo de Archivos.pdf','9a26cf07a50a52eb3b0b3f306e09d0dc'),('0f936f48826548b3a30e8cd2b2313b11','6113-6114 Bases de Datos Relacionales.pdf','9997bd4da5654ce5eb719d1868d7abb4'),('a22e275e72294ccb847ef1c5f886e7ea','6115 Introducción a SQL.pdf','eb5d56d5279c287910211b9fba6b7aaa'),('368780e1d8f84b3c94d8f4a40fc345ee','6116-6117 Práctica SQL (1).pdf','084ed38550ff7320cd79b776ad6349d1'),('ff23ffea725f4b9d88cecf65960035fc','6121-6122 Comandos SQL Avanzados.pdf','ee079ffb82a6f7cf7e8897e6f4d06e83'),('cc7a416f75254a8b848763302f1f7e6a','6321 Introducción a Docker (1).pdf','b1791fe58e95d4c8b28929c08ce60bec'),('75fd166a86e7470f92a27b0afe29014e','6323 Mi primer interacción con Docker.pdf','9c0938dbf7e80000000904b78f5afeac'),('54a7a60617df4e4eb3ab368ee1339609','6324-6327 Docker Images y Dockerfile (1).pdf','d0eeb5a8fc3c86f224296ea21db7d7e5'),('5bc521d512d649a495ff0851ea7701f0','comprobante1.pdf','3568240f095ecd8f08af8994fe26cc1e'),('06402a5f3ef844598e462c8599081e16','comprobante1.pdf','7200eb870f068c34040e7016f631263b'),('9e7fc0becbbc4cf58ab738d9b63f1d79','comprobante1.pdf','902c8ad6359c6ce0a5a6e05cf3abda18'),('9bf6781562f54d248b647a654bac3cec','comprobante2.pdf','27ccaf0d4642e8eb69692aed2180e66c'),('2f4c166a056741a4a43cb147345c8f32','comprobante2.pdf','545e2f270b8f4f13f4079b18cb8b5890');
/*!40000 ALTER TABLE `archivos` ENABLE KEYS */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add Token',6,'add_token'),(22,'Can change Token',6,'change_token'),(23,'Can delete Token',6,'delete_token'),(24,'Can view Token',6,'view_token'),(25,'Can add Token',7,'add_tokenproxy'),(26,'Can change Token',7,'change_tokenproxy'),(27,'Can delete Token',7,'delete_tokenproxy'),(28,'Can view Token',7,'view_tokenproxy'),(29,'Can add usuarios',8,'add_usuarios'),(30,'Can change usuarios',8,'change_usuarios'),(31,'Can delete usuarios',8,'delete_usuarios'),(32,'Can view usuarios',8,'view_usuarios'),(33,'Can add roles',9,'add_roles'),(34,'Can change roles',9,'change_roles'),(35,'Can delete roles',9,'delete_roles'),(36,'Can view roles',9,'view_roles'),(37,'Can add estudiantes',10,'add_estudiantes'),(38,'Can change estudiantes',10,'change_estudiantes'),(39,'Can delete estudiantes',10,'delete_estudiantes'),(40,'Can view estudiantes',10,'view_estudiantes'),(41,'Can add sedes',11,'add_sedes'),(42,'Can change sedes',11,'change_sedes'),(43,'Can delete sedes',11,'delete_sedes'),(44,'Can view sedes',11,'view_sedes'),(45,'Can add grupos',12,'add_grupos'),(46,'Can change grupos',12,'change_grupos'),(47,'Can delete grupos',12,'delete_grupos'),(48,'Can view grupos',12,'view_grupos'),(49,'Can add intengrantes_de_grupo',13,'add_intengrantes_de_grupo'),(50,'Can change intengrantes_de_grupo',13,'change_intengrantes_de_grupo'),(51,'Can delete intengrantes_de_grupo',13,'delete_intengrantes_de_grupo'),(52,'Can view intengrantes_de_grupo',13,'view_intengrantes_de_grupo'),(53,'Can add cursos',14,'add_cursos'),(54,'Can change cursos',14,'change_cursos'),(55,'Can delete cursos',14,'delete_cursos'),(56,'Can view cursos',14,'view_cursos'),(57,'Can add grupos_cursos_intermedia',15,'add_grupos_cursos_intermedia'),(58,'Can change grupos_cursos_intermedia',15,'change_grupos_cursos_intermedia'),(59,'Can delete grupos_cursos_intermedia',15,'delete_grupos_cursos_intermedia'),(60,'Can view grupos_cursos_intermedia',15,'view_grupos_cursos_intermedia'),(61,'Can add archivos_referencia',16,'add_archivos_referencia'),(62,'Can change archivos_referencia',16,'change_archivos_referencia'),(63,'Can delete archivos_referencia',16,'delete_archivos_referencia'),(64,'Can view archivos_referencia',16,'view_archivos_referencia'),(65,'Can add contenidos',17,'add_contenidos'),(66,'Can change contenidos',17,'change_contenidos'),(67,'Can delete contenidos',17,'delete_contenidos'),(68,'Can view contenidos',17,'view_contenidos'),(69,'Can add sub contenidos',18,'add_subcontenidos'),(70,'Can change sub contenidos',18,'change_subcontenidos'),(71,'Can delete sub contenidos',18,'delete_subcontenidos'),(72,'Can view sub contenidos',18,'view_subcontenidos'),(73,'Can add comunicados',19,'add_comunicados'),(74,'Can change comunicados',19,'change_comunicados'),(75,'Can delete comunicados',19,'delete_comunicados'),(76,'Can view comunicados',19,'view_comunicados'),(77,'Can add info_tareas',20,'add_info_tareas'),(78,'Can change info_tareas',20,'change_info_tareas'),(79,'Can delete info_tareas',20,'delete_info_tareas'),(80,'Can view info_tareas',20,'view_info_tareas'),(81,'Can add tareas_asignadas',21,'add_tareas_asignadas'),(82,'Can change tareas_asignadas',21,'change_tareas_asignadas'),(83,'Can delete tareas_asignadas',21,'delete_tareas_asignadas'),(84,'Can view tareas_asignadas',21,'view_tareas_asignadas'),(85,'Can add intermedia_archivos_entregables',22,'add_intermedia_archivos_entregables'),(86,'Can change intermedia_archivos_entregables',22,'change_intermedia_archivos_entregables'),(87,'Can delete intermedia_archivos_entregables',22,'delete_intermedia_archivos_entregables'),(88,'Can view intermedia_archivos_entregables',22,'view_intermedia_archivos_entregables'),(89,'Can add intermedia_tareas_archivos',23,'add_intermedia_tareas_archivos'),(90,'Can change intermedia_tareas_archivos',23,'change_intermedia_tareas_archivos'),(91,'Can delete intermedia_tareas_archivos',23,'delete_intermedia_tareas_archivos'),(92,'Can view intermedia_tareas_archivos',23,'view_intermedia_tareas_archivos'),(93,'Can add reportes_info',24,'add_reportes_info'),(94,'Can change reportes_info',24,'change_reportes_info'),(95,'Can delete reportes_info',24,'delete_reportes_info'),(96,'Can view reportes_info',24,'view_reportes_info');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_Usuarios_id` FOREIGN KEY (`user_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;

--
-- Table structure for table `comunicados`
--

DROP TABLE IF EXISTS `comunicados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comunicados` (
  `id` char(32) NOT NULL,
  `asunto` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `curso_id_id` char(32) NOT NULL,
  `grupo_id_id` char(32) NOT NULL,
  `usuario_id_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user-comunicado` (`usuario_id_id`),
  KEY `grupo-comunicado` (`grupo_id_id`),
  KEY `curso-comunicado` (`curso_id_id`),
  KEY `grupo-e-id-com` (`id`,`grupo_id_id`),
  CONSTRAINT `comunicados_usuario_id_id_39908c35_fk_Usuarios_id` FOREIGN KEY (`usuario_id_id`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `cursos_contenidos_comunicados_curso_id_id_3aa75bf3_fk_Cursos_id` FOREIGN KEY (`curso_id_id`) REFERENCES `Cursos` (`id`),
  CONSTRAINT `cursos_contenidos_comunicados_grupo_id_id_1f9119ff_fk_grupos_id` FOREIGN KEY (`grupo_id_id`) REFERENCES `grupos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comunicados`
--

/*!40000 ALTER TABLE `comunicados` DISABLE KEYS */;
INSERT INTO `comunicados` VALUES ('2c4b6708ed6842b2a08d68131578e24b','Cambios en los contenidos principal','Debido a algunas complicaciones y retrasos los contenidos para el modulo de html seran pasados a otro dia.','2024-11-06 19:42:37.822570','2024-11-06 19:42:37.822611','29c963c476cb49c8922de7947dd691c0','225df9122ce646c383c83c607c66c0c9',1),('78701f7303fd415781b642b78fc595db','Aviso actividad','Se les comunica que en unos dias seestara realizando una actividad dirijida a la presentacion del proyecto final de react.','2024-11-06 19:45:05.793454','2024-11-06 19:45:05.793488','29c963c476cb49c8922de7947dd691c0','225df9122ce646c383c83c607c66c0c9',1),('a8a1caf2c9554664a82c557f48bbd41b','Aviso','El profesor Steven no se podra presentar hoy debido a dificultades personales.','2024-11-06 19:46:57.481343','2024-11-06 19:46:57.481404','29c963c476cb49c8922de7947dd691c0','225df9122ce646c383c83c607c66c0c9',1),('ffc6f81ed57d4192a4fab423892aca2f','Cambio de fechas','Debido a unos retrasos imprevistos la entrega del proyecto uno se retrasara 2 dias.','2024-11-07 14:44:40.961849','2024-11-07 14:44:40.961904','29c963c476cb49c8922de7947dd691c0','cf798a5930a347f3aa195396349c12eb',26);
/*!40000 ALTER TABLE `comunicados` ENABLE KEYS */;

--
-- Table structure for table `contenidos`
--

DROP TABLE IF EXISTS `contenidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenidos` (
  `id` char(32) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `curso_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contenidos_curso_id_1f3b9315_fk_Cursos_id` (`curso_id`),
  KEY `contenidos-indx` (`id`,`nombre`),
  KEY `id-contenidos-indx` (`id`),
  CONSTRAINT `contenidos_curso_id_1f3b9315_fk_Cursos_id` FOREIGN KEY (`curso_id`) REFERENCES `Cursos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenidos`
--

/*!40000 ALTER TABLE `contenidos` DISABLE KEYS */;
INSERT INTO `contenidos` VALUES ('0d37d41e814a46999d32aa4b41b5868f','Python','45044c33ca4f465f9313adcc869cd78a'),('23101b776d78403ca5dd9dbb85df1ace','HTML','29c963c476cb49c8922de7947dd691c0'),('495b9f366ea74281b71faae959b4e961','Introduccion','29c963c476cb49c8922de7947dd691c0'),('5a565c178dc4468a9e95e6eaa190eeb4','SQL','45044c33ca4f465f9313adcc869cd78a'),('65fab553b1a146bcb354f75ce8bbe72e','Docker','45044c33ca4f465f9313adcc869cd78a'),('73f75c0eae9343ec85530051a5e2c919','CSS','29c963c476cb49c8922de7947dd691c0'),('84ae1a8243774fb9baca798ebbdaec12','JAVASCRIPT','29c963c476cb49c8922de7947dd691c0'),('8d94016daa6e4ff5bad4d7cca0f856e8','React','29c963c476cb49c8922de7947dd691c0'),('9374579925fa4a62b04760713467b4e8','Test en python','45044c33ca4f465f9313adcc869cd78a'),('c858f9d2fe1a49c792a8620c7c31d8f1','POO','45044c33ca4f465f9313adcc869cd78a');
/*!40000 ALTER TABLE `contenidos` ENABLE KEYS */;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_api_usuarios_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_api_usuarios_id` FOREIGN KEY (`user_id`) REFERENCES `Usuarios` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-11-06 16:53:54.946413','775dd9e4-cc68-4b25-a1a4-b945a67b0d3a','Roles object (775dd9e4-cc68-4b25-a1a4-b945a67b0d3a)',1,'[{\"added\": {}}]',9,1),(2,'2024-11-06 16:54:00.616761','775dd9e4-cc68-4b25-a1a4-b945a67b0d3a','Roles object (775dd9e4-cc68-4b25-a1a4-b945a67b0d3a)',2,'[{\"changed\": {\"fields\": [\"Tipo\"]}}]',9,1),(3,'2024-11-06 16:54:40.782017','1','Luis',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Cedula\", \"Rol id\"]}}]',8,1),(4,'2024-11-06 16:54:55.993291','ef902386-ac4b-429c-9aca-a35698ff39e0','Roles object (ef902386-ac4b-429c-9aca-a35698ff39e0)',1,'[{\"added\": {}}]',9,1),(5,'2024-11-06 16:55:11.384931','ef902386-ac4b-429c-9aca-a35698ff39e0','Roles object (ef902386-ac4b-429c-9aca-a35698ff39e0)',2,'[{\"changed\": {\"fields\": [\"Tipo\"]}}]',9,1),(6,'2024-11-06 16:55:21.630756','1297ce88-62d4-44cf-be11-eee8ed46d24a','Roles object (1297ce88-62d4-44cf-be11-eee8ed46d24a)',1,'[{\"added\": {}}]',9,1),(7,'2024-11-07 14:29:36.124195','26','Elen45',2,'[{\"changed\": {\"fields\": [\"Is socioemocional\"]}}]',8,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(10,'api','estudiantes'),(9,'api','roles'),(8,'api','usuarios'),(3,'auth','group'),(2,'auth','permission'),(6,'authtoken','token'),(7,'authtoken','tokenproxy'),(4,'contenttypes','contenttype'),(14,'cursos','cursos'),(12,'cursos','grupos'),(15,'cursos','grupos_cursos_intermedia'),(13,'cursos','intengrantes_de_grupo'),(11,'cursos','sedes'),(19,'cursos_contenidos','comunicados'),(17,'cursos_contenidos','contenidos'),(18,'cursos_contenidos','subcontenidos'),(16,'files','archivos_referencia'),(24,'reportes','reportes_info'),(5,'sessions','session'),(20,'tareas','info_tareas'),(22,'tareas','intermedia_archivos_entregables'),(23,'tareas','intermedia_tareas_archivos'),(21,'tareas','tareas_asignadas');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-11-06 16:52:34.996425'),(2,'contenttypes','0002_remove_content_type_name','2024-11-06 16:52:35.111851'),(3,'auth','0001_initial','2024-11-06 16:52:35.654544'),(4,'auth','0002_alter_permission_name_max_length','2024-11-06 16:52:35.800205'),(5,'auth','0003_alter_user_email_max_length','2024-11-06 16:52:35.817629'),(6,'auth','0004_alter_user_username_opts','2024-11-06 16:52:35.831391'),(7,'auth','0005_alter_user_last_login_null','2024-11-06 16:52:35.847685'),(8,'auth','0006_require_contenttypes_0002','2024-11-06 16:52:35.853516'),(9,'auth','0007_alter_validators_add_error_messages','2024-11-06 16:52:35.867967'),(10,'auth','0008_alter_user_username_max_length','2024-11-06 16:52:35.884543'),(11,'auth','0009_alter_user_last_name_max_length','2024-11-06 16:52:35.900378'),(12,'auth','0010_alter_group_name_max_length','2024-11-06 16:52:35.933985'),(13,'auth','0011_update_proxy_permissions','2024-11-06 16:52:35.948582'),(14,'auth','0012_alter_user_first_name_max_length','2024-11-06 16:52:35.963152'),(15,'api','0001_initial','2024-11-06 16:52:36.639100'),(16,'admin','0001_initial','2024-11-06 16:52:36.942385'),(17,'admin','0002_logentry_remove_auto_add','2024-11-06 16:52:36.963598'),(18,'admin','0003_logentry_add_action_flag_choices','2024-11-06 16:52:36.982271'),(19,'api','0002_roles_usuarios_cedula_usuarios_rol_id','2024-11-06 16:52:37.211069'),(20,'api','0003_alter_usuarios_options_alter_roles_table_and_more','2024-11-06 16:52:37.386074'),(21,'api','0004_remove_usuarios_rol_id_usuarios_rol','2024-11-06 16:52:37.679769'),(22,'api','0005_rename_rol_usuarios_rol_id','2024-11-06 16:52:37.890242'),(23,'api','0006_alter_usuarios_cedula_estudiantes','2024-11-06 16:52:38.118247'),(24,'api','0007_alter_estudiantes_table','2024-11-06 16:52:38.181182'),(25,'api','0008_alter_usuarios_cedula','2024-11-06 16:52:38.209424'),(26,'api','0009_alter_roles_tipo','2024-11-06 16:52:38.220697'),(27,'api','0010_alter_roles_tipo','2024-11-06 16:52:38.263123'),(28,'api','0011_usuarios_apellidos_usuarios_fecha_editado_and_more','2024-11-06 16:52:38.481532'),(29,'api','0012_alter_usuarios_apellidos_alter_usuarios_nombre','2024-11-06 16:52:38.512685'),(30,'api','0013_remove_usuarios_activo','2024-11-06 16:52:38.571454'),(31,'api','0014_estudiantes_activo','2024-11-06 16:52:38.633547'),(32,'api','0015_usuarios_correo','2024-11-06 16:52:38.803714'),(33,'api','0016_alter_usuarios_correo','2024-11-06 16:52:38.824087'),(34,'api','0017_alter_usuarios_apellidos','2024-11-06 16:52:38.971818'),(35,'api','0018_remove_usuarios_apellidos_remove_usuarios_correo_and_more','2024-11-06 16:52:39.320753'),(36,'api','0019_usuarios_cedula_nombre_apellidos_indx','2024-11-06 16:52:39.393064'),(37,'api','0020_usuarios_email_indx_usuarios_email_id_indx_and_more','2024-11-06 16:52:39.604330'),(38,'api','0021_alter_estudiantes_unique_together_and_more','2024-11-06 16:52:39.848955'),(39,'api','0018_alter_estudiantes_usuario_id','2024-11-06 16:52:40.166273'),(40,'api','0022_merge_20241009_1617','2024-11-06 16:52:40.172382'),(41,'api','0023_alter_estudiantes_activo','2024-11-06 16:52:40.197595'),(42,'api','0024_usuarios_is_socioemocional','2024-11-06 16:52:40.316930'),(43,'authtoken','0001_initial','2024-11-06 16:52:40.507424'),(44,'authtoken','0002_auto_20160226_1747','2024-11-06 16:52:40.565096'),(45,'authtoken','0003_tokenproxy','2024-11-06 16:52:40.577643'),(46,'authtoken','0004_alter_tokenproxy_options','2024-11-06 16:52:40.595288'),(47,'cursos','0001_initial','2024-11-06 16:52:40.791580'),(48,'cursos','0002_intengrantes_de_grupo','2024-11-06 16:52:41.099982'),(49,'cursos','0003_sedes_activa','2024-11-06 16:52:41.165433'),(50,'cursos','0004_grupos_nombre_grupo','2024-11-06 16:52:41.231011'),(51,'cursos','0005_alter_grupos_nombre_grupo','2024-11-06 16:52:41.242887'),(52,'cursos','0006_cursos','2024-11-06 16:52:41.303435'),(53,'cursos','0007_alter_cursos_table_grupos_cursos_intermedia','2024-11-06 16:52:41.721746'),(54,'cursos','0008_delete_grupos_cursos_intermedia','2024-11-06 16:52:41.764061'),(55,'cursos','0009_grupos_cursos_intermedia','2024-11-06 16:52:42.058224'),(56,'cursos','0010_alter_sedes_nombre','2024-11-06 16:52:42.067754'),(57,'cursos','0011_alter_sedes_ubicacion_alter_sedes_unique_together_and_more','2024-11-06 16:52:42.270019'),(58,'cursos','0012_alter_grupos_unique_together_and_more','2024-11-06 16:52:42.406483'),(59,'cursos','0013_alter_intengrantes_de_grupo_unique_together_and_more','2024-11-06 16:52:42.647929'),(60,'cursos','0014_alter_cursos_unique_together_cursos_id_cursos_indx','2024-11-06 16:52:42.727898'),(61,'cursos','0015_alter_grupos_cursos_intermedia_unique_together_and_more','2024-11-06 16:52:42.918704'),(62,'cursos','0016_alter_intengrantes_de_grupo_usuario_id','2024-11-06 16:52:43.203133'),(63,'cursos','0017_alter_intengrantes_de_grupo_usuario_id','2024-11-06 16:52:43.409685'),(64,'files','0001_initial','2024-11-06 16:52:43.713052'),(65,'files','0002_alter_archivos_referencia_table_and_more','2024-11-06 16:52:43.807038'),(66,'files','0003_remove_archivos_referencia_tipo_id_and_more','2024-11-06 16:52:44.051664'),(67,'cursos_contenidos','0001_initial','2024-11-06 16:52:44.205263'),(68,'cursos_contenidos','0002_alter_contenidos_table','2024-11-06 16:52:44.252484'),(69,'cursos_contenidos','0003_subcontenidos','2024-11-06 16:52:44.399860'),(70,'cursos_contenidos','0004_alter_subcontenidos_archivo_id','2024-11-06 16:52:44.660337'),(71,'cursos_contenidos','0005_alter_subcontenidos_table','2024-11-06 16:52:44.703463'),(72,'cursos_contenidos','0006_subcontenidos_contenido_id','2024-11-06 16:52:44.854618'),(73,'cursos_contenidos','0007_rename_contenido_id_subcontenidos_contenido','2024-11-06 16:52:45.040603'),(74,'cursos_contenidos','0008_rename_contenido_subcontenidos_contenido_id','2024-11-06 16:52:45.234074'),(75,'cursos_contenidos','0009_rename_curso_id_contenidos_curso_and_more','2024-11-06 16:52:45.714125'),(76,'cursos_contenidos','0010_alter_subcontenidos_archivo','2024-11-06 16:52:45.737886'),(77,'cursos_contenidos','0011_contenidos_contenidos_indx_and_more','2024-11-06 16:52:45.821458'),(78,'cursos_contenidos','0012_subcontenidos_subcont_contenido_indx_and_more','2024-11-06 16:52:45.918380'),(79,'cursos_contenidos','0013_comunicados','2024-11-06 16:52:46.180857'),(80,'cursos_contenidos','0014_comunicados_usuario_id_alter_comunicados_table','2024-11-06 16:52:46.405097'),(81,'cursos_contenidos','0015_alter_comunicados_usuario_id','2024-11-06 16:52:46.639408'),(82,'cursos_contenidos','0016_comunicados_user_comunicado_and_more','2024-11-06 16:52:46.827880'),(83,'files','0004_alter_archivos_referencia_key_and_more','2024-11-06 16:52:47.054547'),(84,'files','0005_archivos_referencia_id_archivo','2024-11-06 16:52:47.101960'),(85,'files','0006_delete_tipos_archivos','2024-11-06 16:52:47.135547'),(86,'reportes','0001_initial','2024-11-06 16:52:47.544112'),(87,'reportes','0002_alter_reportes_info_estado_and_more','2024-11-06 16:52:47.585206'),(88,'reportes','0003_reportes_info_usuario_reporte_and_more','2024-11-06 16:52:47.784722'),(89,'reportes','0004_rename_usuario_reporte_usuario_reporte_and_more','2024-11-06 16:52:47.904552'),(90,'reportes','0005_alter_reportes_info_tipo_incidente','2024-11-06 16:52:47.948519'),(91,'reportes','0006_alter_reportes_info_dia_incidente','2024-11-06 16:52:48.106449'),(92,'reportes','0007_reportes_info_archivo_id','2024-11-06 16:52:48.278874'),(93,'reportes','0008_reportes_info_archivo_report_indx','2024-11-06 16:52:48.346881'),(94,'reportes','0009_alter_reportes_info_estado_and_more','2024-11-06 16:52:48.402341'),(95,'sessions','0001_initial','2024-11-06 16:52:48.516938'),(96,'tareas','0001_initial','2024-11-06 16:52:48.812374'),(97,'tareas','0002_tareas_asignadas','2024-11-06 16:52:49.222412'),(98,'tareas','0003_intermedia_archivos_entregables_and_more','2024-11-06 16:52:49.988408'),(99,'tareas','0004_alter_info_tareas_fecha_entrega','2024-11-06 16:52:50.019850'),(100,'tareas','0005_tareas_asignadas_info_tarea_id','2024-11-06 16:52:50.189341'),(101,'tareas','0006_alter_tareas_asignadas_info_tarea_id','2024-11-06 16:52:50.540882'),(102,'tareas','0007_alter_tareas_asignadas_info_tarea_id','2024-11-06 16:52:50.865437');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('3mr1g41fbktncfo2hra9xt0ito8c23te','.eJxVjEEOwiAQRe_C2hCBmVJduvcMZGAGqRpISrsy3l2bdKHb_977LxVoXUpYu8xhYnVWRh1-t0jpIXUDfKd6azq1usxT1Juid9r1tbE8L7v7d1Col28NOSNaZOshOTe6k8PRJrDENjovA0QAe_SSnTGIID4JGYxEMLCHKOr9Ab9wN2k:1t8jHw:eOp42quKJqrIkpaZCw9B95vnVv20BDlgcrZ0FYZAebk','2024-11-20 16:53:48.932094');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos` (
  `id` char(32) NOT NULL,
  `sede_id_id` char(32) NOT NULL,
  `nombre_grupo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `grupos_sede_id_id_nombre_grupo_364c96ea_uniq` (`sede_id_id`,`nombre_grupo`),
  KEY `sede_id-nombre_grupo-indx` (`sede_id_id`,`nombre_grupo`),
  KEY `id-grupos-indx` (`id`),
  CONSTRAINT `grupos_sede_id_id_236c4fc1_fk_sedes_id` FOREIGN KEY (`sede_id_id`) REFERENCES `sedes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES ('225df9122ce646c383c83c607c66c0c9','268edb4ce4be4b40ab231e2bf9faa85c','Grupo-1-el-huerto'),('cf798a5930a347f3aa195396349c12eb','a7d8e960bcfc4fb580b3acc10b181ef2','grupo-1-nosara');
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;

--
-- Table structure for table `grupos_cursos_intermedia`
--

DROP TABLE IF EXISTS `grupos_cursos_intermedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos_cursos_intermedia` (
  `id` char(32) NOT NULL,
  `curso_id_id` char(32) NOT NULL,
  `grupo_id_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `grupos_cursos_intermedia_curso_id_id_grupo_id_id_0a18ced7_uniq` (`curso_id_id`,`grupo_id_id`),
  KEY `GruposCursos-indx` (`curso_id_id`,`grupo_id_id`),
  KEY `GC-curso_id-indx` (`curso_id_id`),
  KEY `GC-grupo_id-indx` (`grupo_id_id`),
  KEY `id-GC-indx` (`id`),
  CONSTRAINT `grupos_cursos_intermedia_curso_id_id_3dbfe948_fk_Cursos_id` FOREIGN KEY (`curso_id_id`) REFERENCES `Cursos` (`id`),
  CONSTRAINT `grupos_cursos_intermedia_grupo_id_id_1d1f31bb_fk_grupos_id` FOREIGN KEY (`grupo_id_id`) REFERENCES `grupos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos_cursos_intermedia`
--

/*!40000 ALTER TABLE `grupos_cursos_intermedia` DISABLE KEYS */;
INSERT INTO `grupos_cursos_intermedia` VALUES ('6b75f68e7ead4f3f84df1de773d59c4d','29c963c476cb49c8922de7947dd691c0','225df9122ce646c383c83c607c66c0c9');
/*!40000 ALTER TABLE `grupos_cursos_intermedia` ENABLE KEYS */;

--
-- Table structure for table `integrates_de_grupo`
--

DROP TABLE IF EXISTS `integrates_de_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `integrates_de_grupo` (
  `id` char(32) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `grupo_id_id` char(32) NOT NULL,
  `usuario_id_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `integrates_de_grupo_grupo_id_id_usuario_id_id_801ce44b_uniq` (`grupo_id_id`,`usuario_id_id`),
  UNIQUE KEY `integrates_de_grupo_usuario_id_id_4a4da75c_uniq` (`usuario_id_id`),
  KEY `IntegranteGrupo-IG-indx` (`usuario_id_id`,`grupo_id_id`),
  KEY `usuario_id-IG-indx` (`usuario_id_id`),
  KEY `grupo_id-IG-indx` (`grupo_id_id`),
  KEY `id-IG-indx` (`id`),
  CONSTRAINT `integrates_de_grupo_grupo_id_id_8c57b57c_fk_grupos_id` FOREIGN KEY (`grupo_id_id`) REFERENCES `grupos` (`id`),
  CONSTRAINT `integrates_de_grupo_usuario_id_id_4a4da75c_fk_Usuarios_id` FOREIGN KEY (`usuario_id_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `integrates_de_grupo`
--

/*!40000 ALTER TABLE `integrates_de_grupo` DISABLE KEYS */;
INSERT INTO `integrates_de_grupo` VALUES ('09824655ee664f9a9ad7dbb15723d7e9','2024-11-06 18:37:00.993351','2024-11-06 18:37:00.993415','225df9122ce646c383c83c607c66c0c9',7),('11254b0f070d4a4aa1e108eb69b0e975','2024-11-06 18:37:00.859004','2024-11-06 18:37:00.859068','225df9122ce646c383c83c607c66c0c9',12),('1ab3d7f66ddc4b94a52cda8ac0df06d7','2024-11-06 18:37:00.932204','2024-11-06 18:37:00.932269','225df9122ce646c383c83c607c66c0c9',4),('1b81f4874266444f9e9383b348ee2f03','2024-11-06 18:37:00.742782','2024-11-06 18:37:00.742881','225df9122ce646c383c83c607c66c0c9',18),('4e35008cb3e745ec8e11747898be9ed7','2024-11-06 18:37:01.017620','2024-11-06 18:37:01.017679','225df9122ce646c383c83c607c66c0c9',8),('5ac2142e41d14308a0df7651df889742','2024-11-06 18:37:00.966165','2024-11-06 18:37:00.966232','225df9122ce646c383c83c607c66c0c9',5),('638e25a0b8a048fd8deaf9b550d1ea39','2024-11-06 18:37:00.884048','2024-11-06 18:37:00.884088','225df9122ce646c383c83c607c66c0c9',2),('686b180962294ff6a697e51e4751b007','2024-11-06 18:42:27.256809','2024-11-06 18:42:27.256880','225df9122ce646c383c83c607c66c0c9',25),('81906cc07a644a4ba75ebbb7078eee71','2024-11-06 18:37:00.908983','2024-11-06 18:37:00.909044','225df9122ce646c383c83c607c66c0c9',3),('9a10e28dba92493f9cd3e9326adac8a7','2024-11-06 18:37:00.776279','2024-11-06 18:37:00.776334','225df9122ce646c383c83c607c66c0c9',13),('9ad737aa6b1749ebbd723cb925c8c0d7','2024-11-06 18:37:00.832725','2024-11-06 18:37:00.832786','225df9122ce646c383c83c607c66c0c9',10),('ab68c3a6054447bc8b4d7a9ad69f1984','2024-11-06 18:37:00.724851','2024-11-06 18:37:00.724890','225df9122ce646c383c83c607c66c0c9',17),('b88fccaff96540cfbd94c74d155c110e','2024-11-06 18:37:00.702943','2024-11-06 18:37:00.702995','225df9122ce646c383c83c607c66c0c9',20),('ce6ffb5553bf46cfb8618a0c545e0abe','2024-11-07 14:32:12.872888','2024-11-07 14:32:12.872927','cf798a5930a347f3aa195396349c12eb',26),('d32737234f1d41b38b8ec7e791956f3c','2024-11-06 18:37:00.759958','2024-11-06 18:37:00.760020','225df9122ce646c383c83c607c66c0c9',14),('f132459d2e0046419336c56c65f5fa2f','2024-11-07 15:15:43.118977','2024-11-07 15:15:43.119071','cf798a5930a347f3aa195396349c12eb',19),('f48c7a2fab414acf9f46762db587637f','2024-11-06 18:37:00.794917','2024-11-06 18:37:00.794963','225df9122ce646c383c83c607c66c0c9',16),('f936d1711fc649539215240465f889c5','2024-11-06 18:37:00.666191','2024-11-06 18:37:00.666246','225df9122ce646c383c83c607c66c0c9',22),('fa4afcc224fa41a6a4eecbcf75e29c33','2024-11-06 18:37:00.685292','2024-11-06 18:37:00.685350','225df9122ce646c383c83c607c66c0c9',21);
/*!40000 ALTER TABLE `integrates_de_grupo` ENABLE KEYS */;

--
-- Table structure for table `reportes_info`
--

DROP TABLE IF EXISTS `reportes_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes_info` (
  `id` char(32) NOT NULL,
  `dia_incidente` date DEFAULT NULL,
  `tipo_incidente` varchar(17) NOT NULL,
  `presento_comprobante` tinyint(1) NOT NULL,
  `fecha_creado` datetime(6) NOT NULL,
  `detalles` varchar(300) NOT NULL,
  `estado` varchar(9) NOT NULL,
  `estudiante_id_id` char(32) NOT NULL,
  `sede_id_id` char(32) NOT NULL,
  `usuario_id_id` bigint NOT NULL,
  `archivo_id_id` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reportes_reportes_in_estudiante_id_id_f5c3869d_fk_Estudiant` (`estudiante_id_id`),
  KEY `usuario_reporte` (`usuario_id_id`),
  KEY `dia_incidente` (`dia_incidente`),
  KEY `user_sede_report` (`sede_id_id`,`usuario_id_id`),
  KEY `archivo_report_indx` (`archivo_id_id`),
  CONSTRAINT `reportes_info_archivo_id_id_008d9651_fk_archivos_id` FOREIGN KEY (`archivo_id_id`) REFERENCES `archivos` (`id`),
  CONSTRAINT `reportes_reportes_in_estudiante_id_id_f5c3869d_fk_Estudiant` FOREIGN KEY (`estudiante_id_id`) REFERENCES `Estudiantes` (`id`),
  CONSTRAINT `reportes_reportes_info_sede_id_id_850617a1_fk_sedes_id` FOREIGN KEY (`sede_id_id`) REFERENCES `sedes` (`id`),
  CONSTRAINT `reportes_reportes_info_usuario_id_id_d3b3efb6_fk_Usuarios_id` FOREIGN KEY (`usuario_id_id`) REFERENCES `Usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes_info`
--

/*!40000 ALTER TABLE `reportes_info` DISABLE KEYS */;
INSERT INTO `reportes_info` VALUES ('2e6226383a51437d96d31dd2bd4dd795','2024-11-29','permiso especial',1,'2024-11-06 20:04:48.482636','Tardia por cita medica se presento al hospital pero el medico cancelo.','denegado','764f2d9db9ff4c079f22e709a2971082','268edb4ce4be4b40ab231e2bf9faa85c',1,'9bf6781562f54d248b647a654bac3cec'),('3a8dc31ddd874342b49870e7370b5b19','2024-12-19','ausencia',1,'2024-11-06 22:49:46.565778','Tardia por ausencia.','denegado','8aa3bc5e6a0d4d11be12151d004f5702','268edb4ce4be4b40ab231e2bf9faa85c',1,'06402a5f3ef844598e462c8599081e16'),('4c38ea15686146bda3c28ec924d841f5','2024-11-19','ausencia',1,'2024-11-06 22:49:34.653384','Tardia por ausencia.','en espera','8aa3bc5e6a0d4d11be12151d004f5702','268edb4ce4be4b40ab231e2bf9faa85c',1,'2f4c166a056741a4a43cb147345c8f32'),('8c0d26b5b1e740768d94451f2db52cbf','2024-10-02','tardia',1,'2024-11-06 19:56:47.970058','Fue a cita médica. El medico lo atendió pero no pudo obtener el comprobante hasta despues.','aprobado','0a44623780aa400ca964bbed67e3b3e2','268edb4ce4be4b40ab231e2bf9faa85c',1,'5bc521d512d649a495ff0851ea7701f0'),('b45cd9eb03d64904a8b7f3a3ec23785f','2024-11-28','ausencia',0,'2024-11-06 22:52:56.463468','Cambio a ser una cita por el medico.','en espera','8aa3bc5e6a0d4d11be12151d004f5702','268edb4ce4be4b40ab231e2bf9faa85c',1,NULL),('f2a5a287782e4a0ca38f4ddd412971f4','2024-11-21','ausencia',1,'2024-11-06 22:47:45.229956','Tardia debido a situcion medica','en espera','24c9be8fb3d54742a4cfc1af7fb764b3','268edb4ce4be4b40ab231e2bf9faa85c',1,'9e7fc0becbbc4cf58ab738d9b63f1d79');
/*!40000 ALTER TABLE `reportes_info` ENABLE KEYS */;

--
-- Table structure for table `sedes`
--

DROP TABLE IF EXISTS `sedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sedes` (
  `id` char(32) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `ubicacion` varchar(250) NOT NULL,
  `activa` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sedes_nombre_ubicacion_2bb90db4_uniq` (`nombre`,`ubicacion`),
  KEY `nombre-ubicacion-indx` (`nombre`,`ubicacion`),
  KEY `id-sedes-indx` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes`
--

/*!40000 ALTER TABLE `sedes` DISABLE KEYS */;
INSERT INTO `sedes` VALUES ('268edb4ce4be4b40ab231e2bf9faa85c','FWD-EL-HUERTO','puntarenas, el huerto',1),('86cc2402b4874e23b4d0a3d31e33f5bd','FWD-NOSARA','guanacaste, nosara',1),('a7d8e960bcfc4fb580b3acc10b181ef2','FWD-SANTA-ANA','san jose, santa ana',1);
/*!40000 ALTER TABLE `sedes` ENABLE KEYS */;

--
-- Table structure for table `subcontenidos`
--

DROP TABLE IF EXISTS `subcontenidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcontenidos` (
  `id` char(32) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `archivo_id` char(32) DEFAULT NULL,
  `contenido_id` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subcont-contenido-indx` (`contenido_id`),
  KEY `subcont-archivo-indx` (`archivo_id`),
  KEY `id-subcont-indx` (`id`),
  CONSTRAINT `subcontenidos_archivo_id_3a0d3d1b_fk_archivos_id` FOREIGN KEY (`archivo_id`) REFERENCES `archivos` (`id`),
  CONSTRAINT `subcontenidos_contenido_id_209cdad0_fk_contenidos_id` FOREIGN KEY (`contenido_id`) REFERENCES `contenidos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcontenidos`
--

/*!40000 ALTER TABLE `subcontenidos` DISABLE KEYS */;
INSERT INTO `subcontenidos` VALUES ('06115dacee8c42d58e817ccb91912caf','Comandos avanzados','ff23ffea725f4b9d88cecf65960035fc','5a565c178dc4468a9e95e6eaa190eeb4'),('1ae3d4ece0ae4c9f89c5903c13374ae4','Introduccion','a22e275e72294ccb847ef1c5f886e7ea','5a565c178dc4468a9e95e6eaa190eeb4'),('1d7d5ffcc8984da0ac3cba1df2bc7488','Introduccion','d8bd3e0490954cd586bf1201d0edd7c0','0d37d41e814a46999d32aa4b41b5868f'),('3671bb71d8b54e38a797661c263be599','Lenguajes','72805128958a4efe986c051324020166','495b9f366ea74281b71faae959b4e961'),('4c5e26094ce3424ca143c701f69327c8','Introduccion','23298529d5fb4a319f7804e64f76684f','8d94016daa6e4ff5bad4d7cca0f856e8'),('6046a62511bf4914bfb6859bc0a802d3','Familiarizacion','6a304b65652846d2a16495100f7b76f1','0d37d41e814a46999d32aa4b41b5868f'),('69a4d4dac6014bc6bd6032d2651faff8','Primera interaccion','75fd166a86e7470f92a27b0afe29014e','65fab553b1a146bcb354f75ce8bbe72e'),('6aac74c7370d4335bb518088fa35a0f4','Introduccion','cc7a416f75254a8b848763302f1f7e6a','65fab553b1a146bcb354f75ce8bbe72e'),('7b188533ee23492a92396a51125f0833','Introduccion','4ca7924f622643408cdf27ed8312b7a7','c858f9d2fe1a49c792a8620c7c31d8f1'),('7d68bc0df7974e86b83e51ceddddaa50','Definicion','376d3c50a1c945ea98b24a0633789932','23101b776d78403ca5dd9dbb85df1ace'),('7edaf2718d3342d7bf451bf7ce97b4ac','Funciones','b304397e926046afa642832c798d04b7','84ae1a8243774fb9baca798ebbdaec12'),('87062f7aa7c34e529765e6df26255095','Docker imagenes','54a7a60617df4e4eb3ab368ee1339609','65fab553b1a146bcb354f75ce8bbe72e'),('89585ed89bc84a509bda00579438a6b4','Flex-box y grid','af44558a94664f80a8057ed0db20f81d','73f75c0eae9343ec85530051a5e2c919'),('8e6b3ebddf184a528842e6dff335a3f8','Otros tipos de datos','424ddde4481c4c298ec934fb1690050b','c858f9d2fe1a49c792a8620c7c31d8f1'),('9132ba27b23b460ea032d5ad0584fd7f','Eventos','b188612605424db7b475e555aa8df211','8d94016daa6e4ff5bad4d7cca0f856e8'),('95f9791fe30a4a7a862a9ce699d8e723','Sitio web','35119464258a4bd0ac81f8a348294dc0','23101b776d78403ca5dd9dbb85df1ace'),('9aebcfdf745c4617846503bc1b3f5fd4','Booleanos','9d4cdbbf0829498a91a3a2c4448813c5','495b9f366ea74281b71faae959b4e961'),('9c58169e5dea42af97963f7b12a267cc','Tests','39ece6e354d14edeb7ccfb9c986662d2','9374579925fa4a62b04760713467b4e8'),('b72700a6e57046d686498a9ae3821b04','Rendering','e9427baf4e324c86a88448a1cb06f4f6','8d94016daa6e4ff5bad4d7cca0f856e8'),('bcf5f71fea574524a5bc6a6683c7ac11','Introduccion','91a034c90b22430d93154184ba18a669','73f75c0eae9343ec85530051a5e2c919'),('c62e2cc748454bcfb55cac629868b765','Base de datos relacionales','0f936f48826548b3a30e8cd2b2313b11','5a565c178dc4468a9e95e6eaa190eeb4'),('c73dfb9cb54e4c87b5d865e289e55c18','Software','65866b79c7094563a4c83b5e6dfe8039','495b9f366ea74281b71faae959b4e961'),('d0f4cc262fa345e5bdff2685c78cd7f3','Practica','01af402bd19e439aa36ec77795911b9b','23101b776d78403ca5dd9dbb85df1ace'),('dfeb1cd9c25b4bc89c7c9b07a4a5630f','Estructura de datos','a74ec4fb7844424e8351129aa7d2a932','0d37d41e814a46999d32aa4b41b5868f');
/*!40000 ALTER TABLE `subcontenidos` ENABLE KEYS */;

--
-- Dumping routines for database 'intranet_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-07 11:52:19
