This project contains an automated test using WebDriverIO with JavaScript on the demo website https://www.saucedemo.com/

Installation & Setup

1. Clone the repository

git clone https://github.com/LiudmylaHorobets/saucedemo
cd saucedemo

2. Install dependencies
   npm install

3. Running Tests
   npm run wdio

Test Case Descriptions

1. UC-1 Test Login form with empty credentials:
   Type any credentials into "Username" and "Password" fields.
   Clear the inputs.
   Hit the "Login" button.
   Check the error messages: "Username is required".

2. UC-2 Test Login form with credentials by passing Username:

Type any credentials in username.
Enter password.
Clear the "Password" input.
Hit the "Login" button.
Check the error messages: "Password is required".

3. UC-3 Test Login form with credentials by passing Username & Password:

Type credentials in username which are under Accepted username are sections.
Enter password as secret sauce.
Click on Login and validate the title “Swag Labs” in the dashboard.
