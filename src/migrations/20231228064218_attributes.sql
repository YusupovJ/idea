-- migrate:up
INSERT INTO attributes (name_uz, name_ru) VALUES ("Brendla", "Бренды");
INSERT INTO attributes (name_uz, name_ru) VALUES ("Rangla", "Цвета");
INSERT INTO attributes (name_uz, name_ru) VALUES ("Camera", "Камера");
INSERT INTO attributes (name_uz, name_ru) VALUES ("Volt", "Вольт");
INSERT INTO attributes (name_uz, name_ru) VALUES ("Prosesor", "Процессор");
INSERT INTO attributes (name_uz, name_ru) VALUES ("Videoqarta", "Видеокарта");

-- migrate:down

DELETE FROM attributes;