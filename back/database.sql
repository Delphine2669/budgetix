-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (x86_64)
--
-- Host: localhost    Database: budgetix
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `description` varchar(145) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_expense_user_idx` (`user_id`),
  CONSTRAINT `fk_expense_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (1,4,'bakery','2025-07-03 00:00:00',2),(2,70,'night out','2025-07-08 00:00:00',2),(3,12,'book store','2025-07-02 00:00:00',2),(4,600,'rent','2025-07-04 00:00:00',1),(5,15,'errands','2025-07-22 00:00:00',1),(6,1000,'car repair','2025-07-19 00:00:00',1);
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `income`
--

DROP TABLE IF EXISTS `income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `income` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `description` varchar(145) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_income_user1_idx` (`user_id`),
  CONSTRAINT `fk_income_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `income`
--

LOCK TABLES `income` WRITE;
/*!40000 ALTER TABLE `income` DISABLE KEYS */;
INSERT INTO `income` VALUES (1,1350,'salary','2025-07-05 00:00:00',2),(2,150,'grant','2025-07-07 00:00:00',2),(3,200,'loan','2025-06-28 00:00:00',2),(4,25000,'lottery','2025-06-10 00:00:00',1),(5,1500,'salary','2025-07-06 00:00:00',1),(6,190,'wire','2025-07-16 00:00:00',1);
/*!40000 ALTER TABLE `income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(145) NOT NULL,
  `email` varchar(145) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin@admin.fr','$argon2id$v=19$m=65536,t=5,p=1$AqCaEGa6qPwUrrVW24jenQ$yNHohmlYVRSKjMynbKoP49kM0CDP2Xx/9tOxDEMytAQ'),(2,'Carrie','dd26om@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$9enAJc2iNE/IdXeYd1Cn9w$t/1wKPXzpt2apxPeI4m0EiHxCxLl3/w7DOhu6vgvBDw'),(4,'Charlotte','charlotte@youpi.fr','$argon2id$v=19$m=65536,t=5,p=1$rEsX38X4ZWBp/eAqrW++iQ$tuC0C/9eBM6jV2fWA23xNzLWuszLL1WcQRbq70uaAaY');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-27 21:21:47
