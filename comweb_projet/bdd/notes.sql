-- 
-- Structure de la table `Notes`
-- 

CREATE TABLE `Notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `subject` text NOT NULL,
  `note` double NOT NULL,
  `mdp` text NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 
-- Déchargement des données de la table `Notes`
-- 

INSERT INTO `Notes` (`ID`, `Name`, `Subject`, `Note`, `mdp`) VALUES
(1, 'Abdel', 'Maths', 3, 'Abdel1'),
(2, 'Jean', 'Maths', 14, 'Jean2'),
(3, 'Simon', 'Philosophie', 18, 'Simon3'),
(4, 'Maxime', 'Informatique', 20, 'Maxime4'),
(5, 'Evan', 'Ontologie', 0, 'Evan5');


