
CREATE DATABASE IF NOT EXISTS quiz_belieber;
USE quiz_belieber;

CREATE TABLE IF NOT EXISTS resultados (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    nome           VARCHAR(100) NOT NULL,
    pontos         INT          NOT NULL,
    total_questoes INT          NOT NULL,
    resultado      VARCHAR(100) NOT NULL
);

SELECT * FROM quiz_belieber.resultados;
