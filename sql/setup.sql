
DROP table if exists yarn;
DROP table if exists needles;
DROP table if exists cookies;
DROP table if exists sheep;
DROP table if exists aromatics;


CREATE TABLE yarn (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  brand VARCHAR,
  fiber VARCHAR,
  weight VARCHAR,
  ply INT
);

INSERT INTO yarn (brand, fiber, weight, ply) VALUES
('Woolstock', 'Wool', 'DK', 3),
('Hedgehog Fibres', 'Nylon Blend', 'Fingering', 2),
('Ritual Dyes', 'Cotton', 'Fingering', 3),
('Brooklyn Tweed', 'Merino', 'Worsted', 5);

CREATE TABLE needles (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  company VARCHAR,
  material VARCHAR,
  length INT
);

INSERT INTO needles (company, material, length) VALUES
('Chiagoo', 'Bamboo', 16),
('Nova Platina', 'Metal', 24),
('Lantern Moon', 'Walnut', 36),
('Karbonz', 'Kryptonite', 9);

CREATE TABLE cookies (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR,
  batch_yield INT,
  deliciousness INT
);

INSERT INTO cookies (name, batch_yield, deliciousness) VALUES
('Snickerdoodle', 24, 9),
('Chocolate Crinkle', 36, 10),
('Oatmeal', 12, 6),
('Shortbread', 48, 8);

CREATE TABLE sheep (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR,
  breed VARCHAR,
  region VARCHAR,
  age INT
);

INSERT INTO sheep (name, breed, region, age) VALUES
('Bopsy', 'Valais Blacknose', 'Switzerland', 2),
('Clemence', 'Awassi', 'Egypt', 7),
('Magda', 'Scottish Blackface', 'Scotland', 5),
('Dior', 'French Merino', 'France', 12);

CREATE TABLE aromatics (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR,
  color VARCHAR,
  scent_strength INT,
  toxic BOOLEAN
);

INSERT INTO aromatics (name, color, scent_strength, toxic) VALUES
('Lavender', 'Purple', 10, false),
('Rosemary', 'Green', 9, false),
('Foxglove', 'Pink', 5, true),
('Amber', 'Golden', 4, true);
