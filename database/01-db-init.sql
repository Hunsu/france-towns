CREATE TABLE IF NOT EXISTS town
(
    id          SERIAL PRIMARY KEY,
    postal_code VARCHAR(5)   NOT NULl,
    town_code   VARCHAR(5)   NOT NULL,
    name        VARCHAR(100) NOT NULL
)