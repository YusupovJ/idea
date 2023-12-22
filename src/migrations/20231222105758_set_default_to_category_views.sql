-- migrate:up
ALTER TABLE categories MODIFY COLUMN views SET DEFAULT 0;

-- migrate:down

