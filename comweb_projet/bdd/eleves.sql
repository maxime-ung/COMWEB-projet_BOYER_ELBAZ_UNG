--
-- Structure de la table `Notes`
--

CREATE TABLE `Notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `subject` text NOT NULL,
  `note` double NOT NULL,
PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Notes`
--

INSERT INTO `Notes` (`ID`, `Name`, `Subject`, `Note`) VALUES
(1, 'Abdel', 'Maths', 3),
(2, 'Jean', 'Maths', 14),
(3, 'Simon', 'Philosophie', 18),
(4, 'Maxime', 'Informatique', 20),
(5, 'Evan', 'Ontologie', 0);