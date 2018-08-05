DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id  INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES(01, "Rice Cooker", "Kitchen and Dinng", 39.99, 15),(02, "Jordan's", "Clothing", 299.99, 12),
(03, "Blender", "Kitchen and Dinng", 25.99, 30),(04, "Samsung TV", "Electronics", 599.99, 3),
(05, "PS4", "Electronics", 459.99, 15), (06, "Bananas", "Food", 2.99, 45),(07, "Diapers", "Kids", 24.99, 150),
(08, "Bacon", "Food", 5.99, 51),(09, "Pears", "Food", .99,  20),(10, "Shampoo", "Cosmetics", 6.99, 55);  

