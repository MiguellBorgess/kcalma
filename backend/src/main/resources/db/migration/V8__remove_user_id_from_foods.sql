ALTER TABLE foods
DROP FOREIGN KEY foods_ibfk_1;

ALTER TABLE foods
DROP INDEX UK_food_user_name;

ALTER TABLE foods
DROP COLUMN user_id;