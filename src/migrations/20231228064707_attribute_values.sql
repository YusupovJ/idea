-- migrate:up

INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('pretium', 'tellus', 2);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('et', 'luctus et', 6);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('ligula', 'adipiscing', 6);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('ac neque', 'convallis nulla', 6);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('cursus urna', 'auctor', 2);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('fusce consequat', 'porttitor lorem', 3);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('metus arcu', 'sapien urna', 3);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('nullam sit', 'risus auctor', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('amet eros', 'vestibulum', 1);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('tellus in', 'neque', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('quisque', 'pellentesque', 2);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('donec posuere', 'odio', 2);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('in', 'ipsum', 3);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('dui', 'nulla ut', 3);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('id pretium', 'luctus et', 6);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('diam', 'curabitur gravida', 3);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('donec vitae', 'tincidunt', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('tortor id', 'eu pede', 6);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('proin', 'iaculis', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('ut', 'erat', 1);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('rhoncus mauris', 'nonummy', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('sed', 'non ligula', 2);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('velit eu', 'condimentum', 2);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('vel', 'pellentesque viverra', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('mauris enim', 'vel sem', 6);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('mi nulla', 'iaculis', 1);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('lorem ipsum', 'amet', 3);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('purus phasellus', 'diam', 4);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('justo', 'faucibus orci', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('lorem ipsum', 'dapibus duis', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('libero rutrum', 'nascetur ridiculus', 4);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('quis', 'nonummy', 2);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('nulla', 'molestie nibh', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('cursus', 'felis fusce', 6);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('quam turpis', 'enim', 6);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('mauris morbi', 'curabitur', 3);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('interdum mauris', 'lorem ipsum', 4);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('donec vitae', 'eget congue', 3);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('est', 'eget', 2);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('parturient', 'ipsum ac', 1);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('ac', 'at', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('fusce', 'viverra', 4);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('elementum ligula', 'cras', 1);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('tincidunt', 'pede justo', 1);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('malesuada in', 'ullamcorper purus', 3);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('at', 'morbi porttitor', 3);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('augue', 'mi', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('est congue', 'lacus', 5);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('imperdiet nullam', 'sapien', 2);
INSERT INTO attribute_values (value_uz, value_ru, attribute_id) VALUES ('ac leo', 'adipiscing lorem', 2);

-- migrate:down

DELETE FROM attribute_values;