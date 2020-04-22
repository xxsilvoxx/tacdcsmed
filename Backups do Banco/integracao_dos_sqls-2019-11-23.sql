CREATE DATABASE  IF NOT EXISTS `testeintegracaosql` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `testeintegracaosql`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: testeintegracaosql
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agente_de_saude`
--

DROP TABLE IF EXISTS `agente_de_saude`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agente_de_saude` (
  `id_agente` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_microarea` bigint(20) NOT NULL,
  `nome` varchar(250) DEFAULT NULL,
  `login` varchar(50) DEFAULT NULL,
  `senha` varchar(250) DEFAULT NULL,
  `codigo_equipe` int(11) NOT NULL,
  PRIMARY KEY (`id_agente`),
  CONSTRAINT `fk_agente_microarea` FOREIGN KEY (`id_microarea`) REFERENCES `micro_area` (`id_microarea`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agente_de_saude`
--

LOCK TABLES `agente_de_saude` WRITE;
/*!40000 ALTER TABLE `agente_de_saude` DISABLE KEYS */;
INSERT INTO `agente_de_saude` VALUES (1,1,'area amarela','agente 1','admin',2),(2,2,'area verde','agente 10','semsenha',12),(3,3,'area escura','agente 59','testando',256),(4,4,'area preta','agente 65','redentorcristo',1020),(5,5,'area marom','agente 23','azuldacordomar',50);
/*!40000 ALTER TABLE `agente_de_saude` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bairro`
--

DROP TABLE IF EXISTS `bairro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bairro` (
  `id_bairro` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_cidade` bigint(20) NOT NULL,
  `nome` varchar(250) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_bairro`),
  KEY `fk_bairro_cidade` (`id_cidade`),
  CONSTRAINT `fk_bairro_cidade` FOREIGN KEY (`id_cidade`) REFERENCES `cidade` (`id_cidade`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bairro`
--

LOCK TABLES `bairro` WRITE;
/*!40000 ALTER TABLE `bairro` DISABLE KEYS */;
INSERT INTO `bairro` VALUES (1,1,'Madaloso','85.550-000'),(2,2,'Freguesia','84.520-000'),(3,3,'Benedita','90.639-026'),(4,4,'Moro do Cristo','12.265-111'),(5,5,'San Francisco','60.550-859');
/*!40000 ALTER TABLE `bairro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `causa`
--

DROP TABLE IF EXISTS `causa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `causa` (
  `id_causa` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) NOT NULL,
  PRIMARY KEY (`id_causa`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `causa`
--

LOCK TABLES `causa` WRITE;
/*!40000 ALTER TABLE `causa` DISABLE KEYS */;
INSERT INTO `causa` VALUES (1,'Depressão'),(2,'Insônia'),(3,'Comportamento Hiperativo'),(4,'Isolamento'),(5,'Alcoolismo');
/*!40000 ALTER TABLE `causa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `causa_pessoa`
--

DROP TABLE IF EXISTS `causa_pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `causa_pessoa` (
  `id_causa_pessoa` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_causa` bigint(20) NOT NULL,
  `id_pessoa` bigint(20) NOT NULL,
  PRIMARY KEY (`id_causa_pessoa`),
  KEY `fk_causa` (`id_causa`),
  KEY `fk_pessoa` (`id_pessoa`),
  CONSTRAINT `fk_causa` FOREIGN KEY (`id_causa`) REFERENCES `causa` (`id_causa`),
  CONSTRAINT `fk_pessoa` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoa` (`id_pessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `causa_pessoa`
--

LOCK TABLES `causa_pessoa` WRITE;
/*!40000 ALTER TABLE `causa_pessoa` DISABLE KEYS */;
INSERT INTO `causa_pessoa` VALUES (1,1,5),(2,1,2),(3,1,3),(4,2,3),(5,3,1),(6,3,5),(7,3,4),(8,5,2),(9,4,1),(10,4,2);
/*!40000 ALTER TABLE `causa_pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cidade`
--

DROP TABLE IF EXISTS `cidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cidade` (
  `id_cidade` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_estado` bigint(20) NOT NULL,
  `nome` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_cidade`),
  KEY `fk_cidade_estado` (`id_estado`),
  CONSTRAINT `fk_cidade_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cidade`
--

LOCK TABLES `cidade` WRITE;
/*!40000 ALTER TABLE `cidade` DISABLE KEYS */;
INSERT INTO `cidade` VALUES (1,1,'Coronel Vivida'),(2,2,'Florianópolis'),(3,3,'Franca'),(4,4,'Niterói'),(5,5,'Cuiabá');
/*!40000 ALTER TABLE `cidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id_estado` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Paraná'),(2,'Santa Catarina'),(3,'São Paulo'),(4,'Rio de Janeiro'),(5,'Mato Grosso');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familia`
--

DROP TABLE IF EXISTS `familia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familia` (
  `id_familia` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) NOT NULL,
  PRIMARY KEY (`id_familia`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familia`
--

LOCK TABLES `familia` WRITE;
/*!40000 ALTER TABLE `familia` DISABLE KEYS */;
INSERT INTO `familia` VALUES (1,'Santos'),(2,'Pereira'),(3,'Sampaio'),(4,'Rodriguez'),(5,'Bueno');
/*!40000 ALTER TABLE `familia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `micro_area`
--

DROP TABLE IF EXISTS `micro_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `micro_area` (
  `id_microarea` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_bairro` bigint(20) NOT NULL,
  `ubs` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_microarea`),
  KEY `fk_bairro_microarea` (`id_bairro`),
  CONSTRAINT `fk_bairro_microarea` FOREIGN KEY (`id_bairro`) REFERENCES `bairro` (`id_bairro`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `micro_area`
--

LOCK TABLES `micro_area` WRITE;
/*!40000 ALTER TABLE `micro_area` DISABLE KEYS */;
INSERT INTO `micro_area` VALUES (1,1,'2563'),(2,2,'5689'),(3,3,'96595'),(4,4,'12588'),(5,5,'3699');
/*!40000 ALTER TABLE `micro_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoa` (
  `id_pessoa` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_familia` bigint(20) NOT NULL,
  `nome` varchar(250) NOT NULL,
  `responsavel_familiar` tinyint(1) DEFAULT NULL,
  `cpf_cnpj` varchar(15) NOT NULL,
  `data_nascimento` date NOT NULL,
  `sexo` char(1) NOT NULL,
  `nacionalidade` varchar(250) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_pessoa`),
  KEY `fk_familia` (`id_familia`),
  CONSTRAINT `fk_familia` FOREIGN KEY (`id_familia`) REFERENCES `familia` (`id_familia`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` VALUES (1,1,'Rodrigo Santos',1,'999.999.999-09','1981-11-23','M','Brasil','(46)3535-2020','(46)99901-0011','rodrigo@gmail.com'),(2,1,'Maria Fernanda Santos',0,'659.199.089-09','1984-04-16','F','Brasil','(46)3535-2020','(46)99923-2033','maria@gmail.com'),(3,1,'Enzo Santos',0,'011.459.089-03','2001-04-16','M','Brasil','(46)3535-2020','(46)98122-0109','enzo@outlook.com'),(4,4,'Hernán Rodriguez',1,'144.364.809-03','1973-10-05','M','Argentina','(46)3531-2209',NULL,NULL),(5,4,'Marcia Rodriguez',0,'094.417.914-28','1993-10-05','F','Brasil','(46)3531-2209',NULL,'marcia@yahoo.com');
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `residencia`
--

DROP TABLE IF EXISTS `residencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `residencia` (
  `id_residencia` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_familia` bigint(20) NOT NULL,
  `id_microarea` bigint(20) NOT NULL,
  `logradouro` varchar(250) NOT NULL,
  `nr_logradouro` bigint(20) NOT NULL,
  `bairro` varchar(250) DEFAULT NULL,
  `cep` varchar(9) DEFAULT NULL,
  `local_referencia` text,
  `cor` varchar(250) DEFAULT NULL,
  `complemento` text,
  PRIMARY KEY (`id_residencia`),
  KEY `fk_familias` (`id_familia`),
  KEY `fk_microareas` (`id_microarea`),
  CONSTRAINT `fk_familias` FOREIGN KEY (`id_familia`) REFERENCES `familia` (`id_familia`),
  CONSTRAINT `fk_microareas` FOREIGN KEY (`id_microarea`) REFERENCES `micro_area` (`id_microarea`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `residencia`
--

LOCK TABLES `residencia` WRITE;
/*!40000 ALTER TABLE `residencia` DISABLE KEYS */;
INSERT INTO `residencia` VALUES (1,4,2,'Travesa irineu da silva',34,NULL,NULL,'Depois do CTG','#fffff',NULL),(2,1,3,'Rua Renato Gaúcho',20,NULL,NULL,'Depois do CTG','#fffff',NULL);
/*!40000 ALTER TABLE `residencia` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-23 23:00:28
