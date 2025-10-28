-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 28 oct. 2025 à 17:39
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `efmadech_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `messages_contact`
--

CREATE TABLE `messages_contact` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `other_subject` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `privacy_accepted` tinyint(1) DEFAULT 1,
  `date_message` datetime DEFAULT current_timestamp(),
  `statut` enum('nouveau','lu','en_cours','traite','archive') COLLATE utf8mb4_unicode_ci DEFAULT 'nouveau',
  `notes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_modification` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `messages_contact`
--

INSERT INTO `messages_contact` (`id`, `name`, `company`, `email`, `phone`, `subject`, `other_subject`, `message`, `privacy_accepted`, `date_message`, `statut`, `notes`, `date_modification`) VALUES
(26, 'Stage', 'Stage', 'test11@gmail.com', '0645789073', 'information', '', 'BB', 1, '2025-10-28 17:19:25', 'nouveau', NULL, '2025-10-28 16:19:25'),
(27, 'Z', 'Z', 'anass@gmail.com', '0645789073', 'information', '', 'Z', 1, '2025-10-28 17:20:58', 'nouveau', NULL, '2025-10-28 16:20:58'),
(28, 'N', 'N', 'test11@gmail.com', '0645789073', 'information', '', 'N', 1, '2025-10-28 17:22:25', 'nouveau', NULL, '2025-10-28 16:22:25'),
(29, 'Q', 'Q', 'admin@admin.com', '0645789073', 'information', '', 'Q', 1, '2025-10-28 17:25:04', 'nouveau', NULL, '2025-10-28 16:25:04'),
(30, 'T', 'T', 'anass@gmail.com', '0648099671', 'support', '', 'T', 1, '2025-10-28 17:28:30', 'nouveau', NULL, '2025-10-28 16:28:30'),
(31, 't', 't', 'anasslamtigui@gmail.com', '0645789073', 'information', '', 't', 1, '2025-10-28 17:29:38', 'nouveau', NULL, '2025-10-28 16:29:38'),
(32, 'Stage', 'Stage', 'test11@gmail.com', '0645789073', 'support', '', 'y', 1, '2025-10-28 17:31:33', 'nouveau', NULL, '2025-10-28 16:31:33'),
(33, 'last', 'last', 'last@gmail.com', '0645789073', 'other', 'nnn', 'last', 1, '2025-10-28 17:32:19', 'nouveau', NULL, '2025-10-28 16:32:19'),
(34, 'Stage', 'Stage', 'test11@gmail.com', '0642714214', 'support', '', 'jj', 1, '2025-10-28 17:37:11', 'nouveau', NULL, '2025-10-28 16:37:11');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `messages_contact`
--
ALTER TABLE `messages_contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_statut` (`statut`),
  ADD KEY `idx_date` (`date_message`),
  ADD KEY `idx_subject` (`subject`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `messages_contact`
--
ALTER TABLE `messages_contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
