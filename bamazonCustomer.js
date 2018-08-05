// Requiring mysql
var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require("./keys.js");
var new_line = "\r\n";
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 8889,
    // Your username
    user: "rooty",
    //password
    // process.env.MySQL_DB_Password
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + new_line);
    display();
  });
  
  function display() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log("ID|Product Name|Department Name|Price|In Stock|");
      console.log("- - - - - - - - - - - - - - - - - - - - - - - -")
      for(var i = 0; i < res.length; i++){
        console.log(
            res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name
            + " | " + res[i].price + " | " + res[i].stock_quantity + " | "
        );
      }
      console.log("- - - - - - - - - - - - - - - - - - - - - - - -")

      promptUser();
      connection.end();
    });
  }

  function promptUser() {
    inquirer
      .prompt([
      {
        name: "selectedProduct",
        type: "input",
        message: "Please select ID of the product you would like to buy?"
      },{
        name: "quantity",
        type: "input",
        message: "Select how many you would like to purchase?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          else {
            return false;
          };
        }
      }
  ])
  .then(function(answer) {
      // var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE id ?" ;
      connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE id " + answer.item_id, function(err, res) {
        var item = "";
        for (var i = 0; i < res.length; i++) {
          if (res[i].id === parseInt(answer.item_id)) {
            item = res[i];
          };
          console.log(
            "ID: " +
              item.item +
              " | Product: " +
              item.product_name +
              " | Department: " +
              item.department_name +
              " | Price: " +
              item.price +
              " | Quantity: " +
              item.stock_quantity);
            }
        });
  });

// ======================================================================
// ======================================================================
// ======================================================================
  var StockItem = product.stock_quantity - parseInt(answer.quantity);
  var updatedDatabase = product.product_sales + (answer.quantity * chosenProduct.price);

  // check to make sure there is enough of that item in stock
  if (stockItem >= 0) {
    connection.query("UPDATE products SET stock_quantity= ?, product_sales=? WHERE id=?", [inStock, updatedGrossSales, answer.item], function (err, res) {
      if (err) throw err;
      else {
        console.log("You successfully purchased " + answer.quantity + " " + product.product_name + "(s) for a total cost of $" + product.price * answer.quantity);
        display();
      }
    });
  }
  else {
    console.log("There is not enough of that item in stock.");
    display();
  };

}
