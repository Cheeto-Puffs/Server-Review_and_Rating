-- create database in postgre shell first
-- run 'psql -d sdc -f Schema.sql' in terminal in postgreSQL folder

DROP TABLE IF EXISTS "reviews";

CREATE TABLE "reviews" (
  "id" SERIAL PRIMARY KEY,
  "product_id" INT NOT NULL,
  "rating" SMALLINT CHECK (rating between 1 and 5),
  "date" BIGINT NOT NULL,
  "summary" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "recommend" BOOLEAN,
  "reported" BOOLEAN DEFAULT false,
  "reviewer_name" VARCHAR(50) NOT NULL,
  "reviewer_email" VARCHAR(500) NOT NULL,
  "response" TEXT DEFAULT '',
  "helpfulness" INT DEFAULT 0
);

DROP TABLE IF EXISTS "reviews_photos";

CREATE TABLE "reviews_photos" (
  "id" SERIAL PRIMARY KEY,
  "review_id" INT REFERENCES "reviews" (id),
  "url" VARCHAR(2048) NOT NULL
);

DROP TABLE IF EXISTS "characteristics";

CREATE TABLE "characteristics" (
  "id" SERIAL PRIMARY KEY,
  "product_id" INT,
  "name" VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS "characteristic_reviews";

CREATE TABLE "characteristic_reviews" (
  "id" SERIAL PRIMARY KEY,
  "characteristic_id" INT REFERENCES "characteristics" (id),
  "review_id" INT REFERENCES "reviews" (id),
  "value" SMALLINT CHECK (value between 1 and 5)
);

COPY reviews
FROM '/Users/x/Desktop/SDC Data/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_photos
FROM '/Users/x/Desktop/SDC Data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics
FROM '/Users/x/Desktop/SDC Data/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews
FROM '/Users/x/Desktop/SDC Data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

SELECT setval(pg_get_serial_sequence('reviews', 'id'), max(id)) FROM reviews;
SELECT setval(pg_get_serial_sequence('reviews_photos', 'id'), max(id)) FROM reviews_photos;
SELECT setval(pg_get_serial_sequence('characteristic_reviews', 'id'), max(id)) FROM characteristic_reviews;

CREATE INDEX review_product_id_idx ON reviews (product_id);
CREATE INDEX characteristics_product_id_idx ON characteristics (product_id);
CREATE INDEX characteristics_characteristics_id_idx ON characteristic_reviews (characteristic_id);
CREATE INDEX reviews_photos_review_idx ON reviews_photos (review_id);