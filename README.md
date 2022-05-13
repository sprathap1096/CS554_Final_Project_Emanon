                                                          Amanon Store
This a web application for users to sell and buy books. We provide a platform for to the user to sign-up and list their book on the website and start selling them or buying the books they are interested in reading. 
As soon as the user sign-in he/she are displayed a list of books from which they can add books to the cart or remove them as per liking, we also provide a feature to open the selected books in a new page to get a better view and review the book. This application also provides features like Add to cart, review the book, and give ratings to the book. If the user wants to sell a book, then they can go to listing page and add a new book to their list with a cover picture of the book or edit the existing books, this page will also display the existing listings by the user. The order page will page will give the user the history of order placed by the user and books page will give the user the list of books owned by the user. We also provide feature to update the user profile in the profile page where the user can edit name and add or change profile picture.

Getting Started
To set up this project please follow the steps given below:

1)	Open the project folder in Visual Studio Code 

2)	Install the Node Package Manager dependencies using npm install or npm i

3)	Next, install firebase-tools as global package 
         •	For windows npm: Run npm install -g firebase-tools
         •	For macOS/Linux: 
            (a)	automatic install script: Run curl -sL https://firebase.tools | upgrade=true bash
            (b)	npm: Run npm install -g firebase-tools
            for more information visit: https://firebase.google.com/docs/cli 

4)	Now, to start the firebase emulator open new terminal in the Visual Studio Code and type:
         •    yarn emulate (to start the firebase emulator) or
         •	firebase emulators:start

5)	After the emulator starts running, we need or application to run, for this open a new terminal and run command: 
         •	yarn dev or
         •	npm run dev

6)	We will now seed the data into the emulator, after the application starts running 
    Open a browser and paste the URL: http://localhost:3000/api/seed 

7)	To check if the data has been seeded, please visit the below URL:
         •	For Auth: http://localhost:4000/auth
         •	For Viewing the Collections: http://localhost:4000/firestore 
         •	For Storage: http://localhost:4000/storage 

8)	To Sign-in/ Register the application Visit: http://localhost:3000 

To skip sign-up, sign-in using one of the users below:
         • email: ming@test.com password: "password” 
         • email: jainam@test.com password: "password"
         • email: nisil@test.com password: "password" 
         • email: suraj@test.com password: "password" 
         • email: yun@test.com  password: "password" 

9)	Information about the directories:

        •	pages: contains all the routes or views 
        •	assets: contains the image that would be used in seeding 
        •	components: houses the universal layout and various other components referenced in other pages like drawer for navigation.
        •	lib: holds all the services being used and referenced in the application such as authentication, listings, cart service etc. This directory is responsible for firebase interactions.
        •	styles: constants the style information and CSS files for the applications



  





