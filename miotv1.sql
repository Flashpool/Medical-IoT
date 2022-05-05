-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: miot
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bed_data`
--

DROP TABLE IF EXISTS `bed_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bed_data` (
  `id` smallint(11) NOT NULL AUTO_INCREMENT,
  `bed_no` smallint(4) NOT NULL,
  `floor` varchar(10) NOT NULL,
  `ward` varchar(10) NOT NULL,
  `status` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bed_data`
--

LOCK TABLES `bed_data` WRITE;
/*!40000 ALTER TABLE `bed_data` DISABLE KEYS */;
INSERT INTO `bed_data` VALUES (1,1001,'1st floor','General','Available'),(2,1002,'1st floor','General','Available'),(3,1003,'1st floor','General','Available'),(4,1004,'1st floor','General','Unavailable'),(5,1005,'2nd floor','ICU','Available'),(6,1006,'2nd floor','ICU','Available'),(7,1007,'2nd floor','ICU','Unavailable'),(8,1008,'3rd floor','special','Available'),(9,1009,'3rd floor','special','Available'),(10,1010,'3rd floor','special','Available');
/*!40000 ALTER TABLE `bed_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disease_data`
--

DROP TABLE IF EXISTS `disease_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `disease_data` (
  `id` smallint(11) NOT NULL AUTO_INCREMENT,
  `disease_name` varchar(30) NOT NULL,
  `disease_severity` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease_data`
--

LOCK TABLES `disease_data` WRITE;
/*!40000 ALTER TABLE `disease_data` DISABLE KEYS */;
INSERT INTO `disease_data` VALUES (1,'Cold','20%'),(2,'Asthama','45%'),(3,'Corona','80%'),(4,'Omicron','70%'),(5,'Dengue','60%'),(6,'Corona Delta','95%'),(7,'Arthritis','50%'),(8,'Malaria','80%'),(9,'Jaundice','60%'),(10,'TB','20%'),(11,'Food poison','50%');
/*!40000 ALTER TABLE `disease_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_data`
--

DROP TABLE IF EXISTS `doctor_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctor_data` (
  `id` smallint(11) NOT NULL AUTO_INCREMENT,
  `doctor_name` varchar(40) NOT NULL,
  `doctor_contact` varchar(13) NOT NULL,
  `specialization` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_data`
--

LOCK TABLES `doctor_data` WRITE;
/*!40000 ALTER TABLE `doctor_data` DISABLE KEYS */;
INSERT INTO `doctor_data` VALUES (1,'Tony Stark','4545465465','Surgeon'),(2,'Omkar Chorge','4529537518','Lungs'),(3,'Rugved Alav','4356058712','Physician');
/*!40000 ALTER TABLE `doctor_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_analysis_data`
--

DROP TABLE IF EXISTS `patient_analysis_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_analysis_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` smallint(6) NOT NULL,
  `sleep_min` text NOT NULL,
  `pulse_rate` text NOT NULL,
  `temp` text NOT NULL,
  `oxygen` text NOT NULL,
  `footsteps` text NOT NULL,
  `movementicon` text NOT NULL,
  `current_timestamp` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `analysis_patient_id_constraint` (`patient_id`),
  CONSTRAINT `analysis_patient_id_constraint` FOREIGN KEY (`patient_id`) REFERENCES `patient_data` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_analysis_data`
--

LOCK TABLES `patient_analysis_data` WRITE;
/*!40000 ALTER TABLE `patient_analysis_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient_analysis_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_data`
--

DROP TABLE IF EXISTS `patient_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_data` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(40) NOT NULL,
  `patient_age` tinyint(4) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `blood_group` varchar(5) NOT NULL,
  `weight` double NOT NULL,
  `height` double NOT NULL,
  `dob` varchar(10) NOT NULL,
  `reg_date` varchar(10) NOT NULL DEFAULT current_timestamp(),
  `profile_img` text NOT NULL,
  `address` text NOT NULL,
  `contact_no` varchar(13) NOT NULL,
  `doctor_id` smallint(6) NOT NULL,
  `bed_id` smallint(6) NOT NULL,
  `disease_id` smallint(6) NOT NULL,
  `prescription` text NOT NULL,
  `reports` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id_constraint` (`doctor_id`),
  KEY `bed_id_constraint` (`bed_id`),
  KEY `disease_id_constraint` (`disease_id`),
  KEY `document_id_constraint` (`prescription`(768)),
  CONSTRAINT `bed_id_constraint` FOREIGN KEY (`bed_id`) REFERENCES `bed_data` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `disease_id_constraint` FOREIGN KEY (`disease_id`) REFERENCES `disease_data` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `doctor_id_constraint` FOREIGN KEY (`doctor_id`) REFERENCES `doctor_data` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8081 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_data`
--

LOCK TABLES `patient_data` WRITE;
/*!40000 ALTER TABLE `patient_data` DISABLE KEYS */;
INSERT INTO `patient_data` VALUES (1,'Aayushya Gupta',22,'male','AB+ve',69,145,'2015-05-22','2022-03-22','https://media.istockphoto.com/photos/whole-cross-section-and-quarter-of-fresh-organic-navel-orange-with-picture-id1227301369?b=1&k=20&m=1227301369&s=170667a&w=0&h=7WdK1RQTLuCn5tuNe25Z999THYzj8yijmk0MaRE-SD0=','Bhandup','3779914013',2,4,5,'./assets/docs/prescription/2_pre.pdf','./assets/docs/reports/2_rep.pdf');
/*!40000 ALTER TABLE `patient_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_doc`
--

DROP TABLE IF EXISTS `patient_doc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patient_doc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prescription` text NOT NULL,
  `reports` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_doc`
--

LOCK TABLES `patient_doc` WRITE;
/*!40000 ALTER TABLE `patient_doc` DISABLE KEYS */;
INSERT INTO `patient_doc` VALUES (1,'./assets/docs/prescription/1_pre.pdf','./assets/docs/reports/1_rep.pdf'),(2,'./assets/docs/prescription/2_pre.pdf','./assets/docs/reports/2_rep.pdf');
/*!40000 ALTER TABLE `patient_doc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_data` (
  `id` smallint(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(50) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_data`
--

LOCK TABLES `user_data` WRITE;
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
INSERT INTO `user_data` VALUES (1,'doctor','1','admin@123'),(2,'guardian','12','admin#123');
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-21 14:11:54
