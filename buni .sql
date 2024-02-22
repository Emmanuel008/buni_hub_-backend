-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2024 at 08:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buni`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2b$10$XBY5c6.XRilPRjyH4/Ilq.tLsVr9htFtGy5rUsD3TQbE4xrSTh64u', '2024-02-11 18:05:42', '2024-02-11 18:05:42');

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `attendance_id` int(11) NOT NULL,
  `attendance_status` tinyint(1) NOT NULL,
  `time` time DEFAULT NULL,
  `membership_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`attendance_id`, `attendance_status`, `time`, `membership_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, '17:44:57', '0201', '2024-02-11 17:44:57', '2024-02-11 17:44:57'),
(2, 0, '08:48:31', '0202', '2024-02-12 08:48:31', '2024-02-12 08:48:31'),
(3, 0, '10:01:49', '0201', '2024-02-12 10:01:49', '2024-02-12 10:01:49');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `membership_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`membership_id`, `first_name`, `last_name`, `password`, `email`, `createdAt`, `updatedAt`) VALUES
('0201', 'Emmanuel', 'Jeremiah', '$2b$10$Xf2EQq4YG11DCIUJLsHM1u2GurXPXF3MPzHzdDisGfmvKhVemVhX.', 'emmanueljeremiah008@gmail.com', '2024-02-11 17:43:50', '2024-02-11 17:43:50'),
('0202', 'john ', 'mira', '$2b$10$yDKb6VzFusp6RFlK07ITJ.RLkF7bLbY6meB4ub1w9UZ0m4hzllamO', 'johnmira@gmail.com', '2024-02-12 08:47:39', '2024-02-12 08:47:39');

-- --------------------------------------------------------

--
-- Table structure for table `signins`
--

CREATE TABLE `signins` (
  `signin_id` int(11) NOT NULL,
  `signInTime` time NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `signins`
--

INSERT INTO `signins` (`signin_id`, `signInTime`, `createdAt`, `updatedAt`) VALUES
(1, '20:30:00', '2024-02-11 17:44:53', '2024-02-11 17:44:53');

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `visitor_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`visitor_id`, `first_name`, `last_name`, `email`, `role`, `phone_number`, `createdAt`, `updatedAt`) VALUES
(1, 'promise', 'mwakale', 'promise@gmail.com', 'enterprenuer ', '0786449634', '2024-02-11 17:59:11', '2024-02-11 17:59:11'),
(2, 'juma ', 'said', 'emmanueljeremiah008@gmail.com', 'enterprenuer ', '255786449634', '2024-02-12 05:39:01', '2024-02-12 05:39:01'),
(3, 'promise', 'Jeremiah', 'levimagconsultancyltd@gmail.com', 'enterprenuer ', '0786449634', '2024-02-13 16:11:38', '2024-02-13 16:11:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `membership_id` (`membership_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`membership_id`),
  ADD UNIQUE KEY `membership_id` (`membership_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `signins`
--
ALTER TABLE `signins`
  ADD PRIMARY KEY (`signin_id`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`visitor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `signins`
--
ALTER TABLE `signins`
  MODIFY `signin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `visitor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_ibfk_1` FOREIGN KEY (`membership_id`) REFERENCES `members` (`membership_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
