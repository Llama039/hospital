DROP TABLE IF EXISTS hospital_staff;

CREATE TABLE hospital_staff (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    parent_id INT
);


INSERT INTO hospital_staff (id, name, parent_id) VALUES
(1, 'Medical Director', NULL);


INSERT INTO hospital_staff (id, name, parent_id) VALUES
(2, 'Head of Department', 1);


INSERT INTO hospital_staff (id, name, parent_id) VALUES
(3, 'Attending Physician', 2);


INSERT INTO hospital_staff (id, name, parent_id) VALUES
(4, 'Resident', 3),
(5, 'Intern', 3);


INSERT INTO hospital_staff (id, name, parent_id) VALUES
(6, 'Nurse', 3);


INSERT INTO hospital_staff (id, name, parent_id) VALUES
(7, 'Physician Assistant', 3);


INSERT INTO hospital_staff (id, name, parent_id) VALUES
(8, 'Medical Assistant', 2);

DROP USER IF EXISTS hospital_user;
CREATE USER hospital_user WITH PASSWORD '123';
GRANT SELECT ON TABLE hospital_staff TO hospital_user;
