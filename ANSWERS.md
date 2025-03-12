### UI Tasks - Answers

1. To improve the layout of the login screen, I'll apply some modern styling using Angular's built-in directives and CSS.
2. Contacts screen improvements: Use larger text with some spacing, add spinner for enhanced feedback, and ensure headers, rows, and actions look polished
3. Implemented a responsive navigation drawer using Angular Material's MatSidenav. This will allow the menu to collapse into a hamburger icon on smaller screens while keeping the full navbar on larger screens.
4. Added Material UI styling with mat-form-field for better input display.
5. Replaced prompt() function dialogs with a Material Dialog for a modern UI.
6. Create a new messages component with stand-alone module that has functionality to send messages. And will handle sending messages with a structured form.


### Full-stack Tasks - Answers

1. 
Angular Fixes:
Implemented API calls in ProfileManagementComponent to update user profile and password.
Integrated ApiService methods for updateMe and updatePassword.

Backend API Updates:
UserController: Added authentication checks, improved validation, and better error handling.
API Routes: Refactored with Route::controller(), improved maintainability, and ensured structured grouping. 

2. Incorporated the API service from the NG source to be used by the profile management component, and added integration with the Laravel API, including addition of user management functions
3. Added GQL query to retrieve user messages on the API side, and also added GQL functionality on the FE side


### System Design - Answers

1. I think the app could do with some refactoring, and applying the separation of concern design pattern and factory design pattern for some re-usable code, like the CSS :-)
2. How the FE and BE (GQL and REST) functionalities are all in one place, and also the Docker setup, with multiple directories per dependent docker image, I think they could also be consolidated into a single Docker file
3. Not sooo good on UI/UX designs :-), but I think we could've made the styles global for re-usability, and also the nav-bars etc... :-)

### About the Test - Answers

1. The assessment was okay, amid not expecting the FE and BE to share the same repo :-)
2. Given the chance, I would separate the FE and BE using the separation of concerns design pattern, to make then more independent of each other. Consolidate the Docker files into a single Docker file. Make stylesheets global and re-usable. And also split the GQL and REST endpoints into different repos, so that there's indepdency, where if one service fails, the whole project won't be affected as some part use REST and other GQL respectively.
3. Yes, it was fairly okay to setup the project.
