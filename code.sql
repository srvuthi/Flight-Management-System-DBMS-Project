-- 🛫 STEP 1: Create the Database
CREATE DATABASE FL_Management;
USE FL_Management;

-- ✈️ STEP 2: Create All Tables

-- 1️⃣ Flight Table
CREATE TABLE Flight (
    Flight_No VARCHAR(10) PRIMARY KEY,
    Dept_Time DATETIME NOT NULL,
    Arr_Time DATETIME NOT NULL,
    Flight_Duration TIME GENERATED ALWAYS AS (TIMEDIFF(Arr_Time, Dept_Time)) STORED
);

-- 2️⃣ Airport Table
CREATE TABLE Airport (
    Airport_ID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Location VARCHAR(100) NOT NULL
);

-- 3️⃣ Aircraft Table
CREATE TABLE Aircraft (
    Aircraft_ID VARCHAR(10) PRIMARY KEY,
    Model VARCHAR(50),
    Capacity INT CHECK (Capacity > 0),
    Manufacturer ENUM('Airbus', 'Boeing', 'Embraer', 'Comac')
);

-- 4️⃣ Tickets Table
CREATE TABLE Tickets (
    Ticket_ID VARCHAR(10) PRIMARY KEY,
    Class ENUM('Economy', 'Premium Economy', 'Business', 'First') NOT NULL,
    Seat_No VARCHAR(10),
    Flight_No VARCHAR(10),
    FOREIGN KEY (Flight_No) REFERENCES Flight(Flight_No)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5️⃣ Passenger Table
CREATE TABLE Passenger (
    Passenger_ID VARCHAR(10) PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Gender ENUM('Male', 'Female', 'Other'),
    Nationality VARCHAR(50),
    Contact_No VARCHAR(15)
);

-- 6️⃣ Finance Table
CREATE TABLE Finance (
    Transaction_ID VARCHAR(10) PRIMARY KEY,
    Passenger_ID VARCHAR(10),
    Amount DECIMAL(10,2) CHECK (Amount > 0),
    Date DATE,
    Transaction_Type ENUM('Card','UPI','Cash'),
    FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- 7️⃣ Admin Table
CREATE TABLE Admin (
    Admin_ID VARCHAR(10) PRIMARY KEY,
    Role ENUM('Employee', 'Airport_Manager', 'CEO'),
    Username VARCHAR(50) UNIQUE,
    Password VARCHAR(50)
);

-- 8️⃣ 2FA (Weak Entity)
CREATE TABLE TwoFA (
    Contact_No VARCHAR(15),
    OTP INT,
    Admin_ID VARCHAR(10),
    PRIMARY KEY (Contact_No, Admin_ID),
    FOREIGN KEY (Admin_ID) REFERENCES Admin(Admin_ID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ✈️ STEP 3: Relationships Between Tables
-- (Already handled through foreign keys above)

-- ✈️ STEP 4: Sample Data Insertion (10 records per major table)

-- Flight Data
INSERT INTO Flight (Flight_No, Dept_Time, Arr_Time)
VALUES 
('FL101', '2025-11-01 06:00:00', '2025-11-01 08:00:00'),
('FL102', '2025-11-01 09:30:00', '2025-11-01 12:00:00'),
('FL103', '2025-11-02 07:15:00', '2025-11-02 09:00:00'),
('FL104', '2025-11-02 15:00:00', '2025-11-02 18:00:00'),
('FL105', '2025-11-03 12:00:00', '2025-11-03 14:30:00'),
('FL106', '2025-11-04 08:00:00', '2025-11-04 10:00:00'),
('FL107', '2025-11-04 19:30:00', '2025-11-04 22:15:00'),
('FL108', '2025-11-05 06:45:00', '2025-11-05 09:20:00'),
('FL109', '2025-11-06 11:00:00', '2025-11-06 13:40:00'),
('FL110', '2025-11-06 14:00:00', '2025-11-06 17:10:00');

-- Airport Data
INSERT INTO Airport VALUES
('AP01','Indira Gandhi International','Delhi'),
('AP02','Chhatrapati Shivaji International','Mumbai'),
('AP03','Kempegowda International','Bangalore'),
('AP04','Netaji Subhash Chandra Bose','Kolkata'),
('AP05','Chennai International','Chennai'),
('AP06','Rajiv Gandhi International','Hyderabad'),
('AP07','Sardar Vallabhbhai Patel','Ahmedabad'),
('AP08','Cochin International','Kochi'),
('AP09','Trivandrum International','Thiruvananthapuram'),
('AP10','Pune International','Pune');

-- Aircraft Data
INSERT INTO Aircraft VALUES
('AC01','A320',180,'Airbus'),
('AC02','B737',200,'Boeing'),
('AC03','E195',132,'Embraer'),
('AC04','C919',168,'Comac'),
('AC05','A321',220,'Airbus'),
('AC06','B787',250,'Boeing'),
('AC07','E175',88,'Embraer'),
('AC08','C929',200,'Comac'),
('AC09','A350',300,'Airbus'),
('AC10','B777',350,'Boeing');

-- Passenger Data
INSERT INTO Passenger VALUES
('P01','John','Doe','Male','Indian','9876543210'),
('P02','Riya','Sharma','Female','Indian','8765432109'),
('P03','Kabir','Singh','Male','Indian','9998877665'),
('P04','Aarav','Mehta','Male','Indian','9123456789'),
('P05','Diya','Patel','Female','Indian','9345678901'),
('P06','Maya','Rao','Female','Indian','9988776655'),
('P07','Raj','Verma','Male','Indian','9001122334'),
('P08','Sara','Ali','Female','Indian','9090909090'),
('P09','Arjun','Kapoor','Male','Indian','9911223344'),
('P10','Karan','Khanna','Male','Indian','9800765432');

-- Admin Data
INSERT INTO Admin VALUES
('AD01','Employee','emp01','pass01'),
('AD02','Employee','emp02','pass02'),
('AD03','Airport_Manager','mgr01','pass03'),
('AD04','CEO','ceo01','pass04'),
('AD05','Employee','emp03','pass05'),
('AD06','Employee','emp04','pass06'),
('AD07','Airport_Manager','mgr02','pass07'),
('AD08','CEO','ceo02','pass08'),
('AD09','Employee','emp05','pass09'),
('AD10','Employee','emp06','pass10');

-- 2FA Data
INSERT INTO TwoFA VALUES
('9876543210',123456,'AD01'),
('8765432109',234567,'AD02'),
('9998877665',345678,'AD03'),
('9123456789',456789,'AD04'),
('9345678901',567890,'AD05'),
('9988776655',678901,'AD06'),
('9001122334',789012,'AD07'),
('9090909090',890123,'AD08'),
('9911223344',901234,'AD09'),
('9800765432',112233,'AD10');

-- Tickets Data
INSERT INTO Tickets VALUES
('T01','Economy','12A','FL101'),
('T02','Business','2B','FL102'),
('T03','First','1A','FL103'),
('T04','Premium Economy','10C','FL104'),
('T05','Economy','14D','FL105'),
('T06','Business','3C','FL106'),
('T07','First','1B','FL107'),
('T08','Economy','15F','FL108'),
('T09','Economy','13E','FL109'),
('T10','Business','4D','FL110');

-- Finance Data
INSERT INTO Finance VALUES
('TX01','P01',5500.00,'2025-10-29','UPI'),
('TX02','P02',6200.00,'2025-10-29','Card'),
('TX03','P03',4800.00,'2025-10-29','Cash'),
('TX04','P04',8000.00,'2025-10-29','UPI'),
('TX05','P05',4000.00,'2025-10-29','Card'),
('TX06','P06',7200.00,'2025-10-29','UPI'),
('TX07','P07',3500.00,'2025-10-29','Cash'),
('TX08','P08',6400.00,'2025-10-29','Card'),
('TX09','P09',4100.00,'2025-10-29','UPI'),
('TX10','P10',9000.00,'2025-10-29','Card');

-- 🧠 STEP 5: Functions

DELIMITER //
CREATE FUNCTION TotalRevenue()
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE total DECIMAL(10,2);
    SELECT SUM(Amount) INTO total FROM Finance;
    RETURN IFNULL(total,0.00);
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION FlightDuration(FlightCode VARCHAR(10))
RETURNS TIME
DETERMINISTIC
BEGIN
    DECLARE duration TIME;
    SELECT TIMEDIFF(Arr_Time, Dept_Time) INTO duration FROM Flight WHERE Flight_No = FlightCode;
    RETURN duration;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION PassengerTickets(pid VARCHAR(10))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE count_t INT;
    SELECT COUNT(*) INTO count_t FROM Tickets;
    RETURN count_t;
END //
DELIMITER ;

-- ⚙️ STEP 6: Stored Procedures

DELIMITER //
CREATE PROCEDURE AddPassenger(IN pid VARCHAR(10), IN fname VARCHAR(50), IN lname VARCHAR(50),
    IN gender ENUM('Male','Female','Other'), IN nat VARCHAR(50), IN contact VARCHAR(15))
BEGIN
    INSERT INTO Passenger VALUES(pid,fname,lname,gender,nat,contact);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetFlightRevenue(IN fno VARCHAR(10))
BEGIN
    SELECT SUM(F.Amount) AS Total_Revenue
    FROM Finance F
    JOIN Passenger P ON F.Passenger_ID=P.Passenger_ID
    JOIN Tickets T ON T.Flight_No=fno;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ListAllFlights()
BEGIN
    SELECT * FROM Flight;
END //
DELIMITER ;

-- 🚨 STEP 7: Triggers

DELIMITER //
CREATE TRIGGER Finance_Positive_Before_Insert
BEFORE INSERT ON Finance
FOR EACH ROW
BEGIN
    IF NEW.Amount <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Amount must be greater than zero!';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER Finance_Positive_Before_Update
BEFORE UPDATE ON Finance
FOR EACH ROW
BEGIN
    IF NEW.Amount <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Updated amount must be positive!';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER Ticket_Before_Insert
BEFORE INSERT ON Tickets
FOR EACH ROW
BEGIN
    IF NEW.Seat_No = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Seat number cannot be empty!';
    END IF;
END //
DELIMITER ;

-- ✅ TEST COMMANDS
SELECT * FROM Passenger;
SELECT * FROM Flight;
SELECT TotalRevenue();
CALL ListAllFlights();
