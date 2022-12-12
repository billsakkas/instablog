# Steps for completing the test

1. Install Parse server and parse sdk using the parse server example repo.

   - Requires a Mongodb server for which you will get a link (DB_URI)
   - Should also have a working Parse dashboard

2. Create a frontend (Angular, Bootstrap CSS, Parse SDK) site that displays those landmarks in a list

   - The site should be responsive

   - Should show the landmarks in the order they should appear, based on the `order` field in the class

     - In the home screen we should see a list of the landmarks

       - Each landmarks' photo thumbnail (`photo_thumb`) should appear to the left

       - The title should be the landmarks' `title` and should be a link to the full article of the landmark

       - Beneath the title we should see the landmarks' `short_info`

     - In the landmarks full page screen we should see the same info plus the `description` plus the link to the official site of the landmark

     - When the user clicks on the thumbnail photo the full size photo should open (either in a new tab or on a popup in the same page)

     - Should have a search input box allowing every user to be able to search for a specific building (eg, searching for "burj" the results should return both the "Burj Khalifa" and the "Burj Al Arab" articles)

   - Should allow an administrator to login and logout using the credentials: admin:admin

   - The administrator should be able to edit each documents' text fields
     - Each photo should be saved as a parse file in the `photo` field (optional)
     - The system should not allow photos larger than 5MB to be uploaded (should display a warning message) (optional)
       (eg. The Atlantis_The_Palm_Exterior_large.jpg file should fail to upload while the Atlantis_The_Palm_Exterior_small.jpg should succeed) (optional)
     - The system should automatically create a thumbnail for each photo (250px x 250px) using the `sharp` library and save it in the `photo_thumb` field which will be used as the small article photo. (optional)

## Notes

1. The server should read any parameters from a .env located in the root of the project (a sample .env file will be provided) which should not be added to Version Control, but instead should be separately send through email when the assignment is completed.
2. The project should use git and should be uploaded in a github repo

## Related links

https://parseplatform.org/
http://docs.parseplatform.org/ (Documentation)
http://docs.parseplatform.org/js/guide/

https://github.com/parse-community/parse-server
https://github.com/parse-community/parse-server-example (Bootstrap)
https://github.com/parse-community/parse-dashboard

https://www.npmjs.com/package/dotenv (dotenv module)
https://www.npmjs.com/package/sharp (sharp module)
