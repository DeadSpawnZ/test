# Routes and Methods

## /admin/:id([a-z0-9]+)?   
POST (createAdmin.png)
    This method allows you to create a new admin, then you need to give some information like email, password and the role, this last is important due to subsequent validations by the middlewares. The attribute role has been considered for future type of users and their functions.
    Two admins can not have the same email.
    This request is only allowed for admins so you need a token first.

PUT (updateAdmin.png)
    This method allows you to update the information of an admin, but not at all because the status can not be updated by this request.
    This request is only allowed for admins so you need a token first.

DELETE (deleteAdmin.png)
    This method allows you to change the status as it is mentioned before. It is necesary a status for this entity in order to avoid deleting information. Furthermore, it is known that a common user could have a variety of states like banned, active, inactive, or suspended.
    An id as parameter is mandatory for this request.
    This request is only allowed for admins so you need a token first.
## /login
POST (loginAdmin.png)
    This method allows you to get a token if your credentials are correct.
## /product/:id([a-z0-9]+)?
GET (readProduct.png)
    This method allows you to get different results for retrieving products. If you specify an id as parameter, the result will be all the information about that product. This is an optional parameter so if you leaves it blank you will get a list of all the active products.
    This request can be made by anyone, you do not have to be an admin.

POST (createProduct.png)
    This method allows you to create a new product with some attributes like sku, name, price, brand and status. The status is given as a precaution, it is not always released a product immediately when it is created.
    This request is only allowed for admins so you need a token first.

PUT (updateProduct.png)
    This method allows you to update a product which exists already. You must consider that always when a product is modified, a notification is sended by email to all the admins. (test_nodemailer.png)
    An id as parameter is mandatory for this request.
    This request is only allowed for admins so you need a token first.

DELETE (deleteProduct)
    This method allows you to set an inactive state for a product. The attribute 'state' was defined as a precaution instead of deleting registers, because even when we do not require a product anymore we could need the stored information in a nearly future for another purpuoses. 
    An id as parameter is required for this request.
    This request is only allowed for admins so you need a token first.

