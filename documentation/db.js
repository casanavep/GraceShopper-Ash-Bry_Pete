/* Keep the DB Clean
As you work on your data models, please consider the types of data that you will receive, what you want to make required and how you will propagate those errors to the user.

PRODUCTS
Must have title, description, price, and inventory quantity
Must belong to at least one category
If there is no photo, there must be a placeholder photo used
---------------------------columns---------------------------
id: SERIAL PRIMARY KEY
title: VARCHAR(255) UNIQUE NOT NULL
description: VARCHAR(255)
price DEC (8,2)
quantity INT NOT NULL
category_id INT REFERENCES categories(id)
photoId

categories
---------------------------columns---------------------------
id: SERIAL PRIMARY KEY
name VARCHAR(255) UNIQUE NOT NULL

example:
1 shoes
2 pants
3 hats
4 belts

USERS
Users must have a valid email address
Users email must be unique
---------------------------columns---------------------------
id: SERIAL PRIMARY KEY
emailaddress VARCHAR(255) UNIQUE NOT NULL
    note: use REGEX on input to filter for valid email construct; email will be 
     $.*\@.*\.*^
password: VARCHAR(255) NOT NULL
    note: ****hashed*** 
admin: BOOLEAN NOT NULL DEFAULT false

country VARCHAR(255) NOT NULL
fullname (recipient) VARCHAR(255) NOT NULL
phonenumber INT UNIQUE NOT NULL
address VARCHAR(255) NOT NULL
city VARCHAR(255) NOT NULL
state VARCHAR(255) NOT NULL
zip VARCHAR(255) NOT NULL


ORDER
Orders must belong to a user OR guest session (authenticated vs unauthenticated)
Orders must contain line items that capture the price, current product ID and quantity
If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes
---------------------------columns---------------------------
id: SERIAL PRIMARY KEY
// loggedin BOOLEAN NOT NULL
user_id INT REFERENCES users(id) 
 note: null = guests
status VARCHAR(255) NOT NULL DEFAULT "cart"
 note: in cart or purchased/complete
 note: don't ref another table, so price at purchase time is captured


MANY to MANY Tables:
product_to_order table
---------------------------columns---------------------------
id: SERIAL PRIMARY KEY
product_id INT REFERENCES products(id)
order_id INT REFERENCES orders(id)
purchaseprice DEC(8,2) NOT NULL
quantity INT NOT NULL


REVIEWS
All reviews must belong to a product
All reviews must belong to a user
All reviews must be at least X characters
---------------------------columns---------------------------
id: SERIAL PRIMARY KEY
product_id INT REFERENCES products(id)
user_id INT REFERENCES users(id)
review VARCHAR(255) NOT NULL
rating INT NOT NULL
   note: 1 - 5 start review

*/
