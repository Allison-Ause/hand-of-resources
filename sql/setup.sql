
DROP table if exists yarn;
--- needles (company, material, length)
--- patterns (name, designer, type, )
--- sheep (name, breed, cuteness)
--- aromatics (plant, scent, rare)


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