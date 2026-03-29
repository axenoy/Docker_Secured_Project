# Frontend
The frontend provides a minimal user inteface for interacting with the backend API. 
The frontend is split into two separate interfaces:
* User intarface
* Admin interface

# Admin

### /admin/index.html
Entry page for the admin interface. Provides navigation to the admin login page.

### /admin/login.html
Admin authentication page. Contains a login form which sends credentials to the backend API. JavaScript logic is handled by: /admin/js/auth.js

### /admin/dashboard.html
Administraive dashboard. Provides functionality to retrieve and display user records from the backend API.

### /admin/js/auth.js
Handles administrator authenticaion. 

### /admin/js/dashboard.js
Handles dashboard functionality. 

### /admin/css/style.css
Basic styling for the admin interface.

# User
Provides functionality for basic user operations.

### /user/index.html
Entry page for the user interface. Provides navigation to user login and registration.

### /user/login.html
User login page. Login logic is implemented in /user/js/auth.js

### /user/register.html
User registration page. 

### /user/profile.html
Displays user profile information retrieved from the backend. Profile data is loaded dynamically using: /user/js/profile.js

### /user/js/auth.js
Handles user authentication and registration. 

### /user/js/profile.js
Handles profile data retrieval.

### /user/css/style.css
Basic styling for the user interface.
