-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2018 at 12:34 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iog_search`
--

-- --------------------------------------------------------

--
-- Table structure for table `list`
--

CREATE TABLE `list` (
  `script` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `wordgrams` varchar(2000) DEFAULT NULL,
  `visitPageCount` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `list`
--

INSERT INTO `list` (`script`, `tag`, `wordgrams`, `visitPageCount`) VALUES
('abc.py', 'sort', NULL, 0),
('scrap.py', 'scrap', NULL, 0),
('web_scrap.py', 'scrap', NULL, 0),
('gfg_scrap.py', 'scrap', NULL, 0),
('natural_join.py', 'join', NULL, 0),
('text.py', 'sort,search', NULL, 0),
('check.txt', 'check,script,search', NULL, 0),
('tag.txt', 'tags', NULL, 2),
('loki.txt', 'text', NULL, 0),
('opera.txt', 'opera', NULL, 0),
('test.py', 'python script', NULL, 0),
('ListingFilesInDirectory.sh', 'files directory Listing', NULL, 0),
('ListFilesInDirectory.sh', 'files directory Listing', 'files directory Listing filesdirectory directoryfiles directoryListing Listingdirectory filesdirectoryListing filesListingdirectory directoryfilesListing directoryListingfiles Listingdirectoryfiles Listingfilesdirectory', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
