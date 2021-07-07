# Project 3: Food-Invy

## Overview
As a group of three, we all shared interests in preventing food waste and I particularly wanted to incorporate *best before* dates on foods somehow so we set about creating a food inventory - with a twist.  

The general idea is to encourage thoughtfulness around food and waste by logging food that people have at home and encouraging cooking or sharing over throwing out. Based on this, we can recommend suitable recipes from our catalogue to encourage food use with the hope that our users may potentially find unexpected uses for items at the back of the fridge / cupboards.  

[Deployed Here](https://food-invy.netlify.app/)

### Architecture
This was our first project where we tasked to build a full stack application using  the MERN stack. 

![Architecture](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/mern-stack-architecture.jpeg)

### Web Technologies / Frameworks
* MongoDB
* Express
* React
* Node
* Model, View, Controller (MVC)
* Bulma
* HTML5 and CSS3

### Tools
* Zoom
* Github
* Visual Studio Live Share
* Excalidraw - White boarding 
* Slack
* Cloudinary

### External API
* Mapbox

### Technical Requirements
* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it’s publicly accessible.

## Approach
Once we had the idea down, we started to think about how to break this up into Models, Views and Controllers on the backend. We realised at the start that our idea was quite difficult to explain and was confusing to others so it was critical to figure out our models and controller logic. 

Once we noted down the fields we wanted in our database, we moved onto sketching out the visualisations of the user journey. This helped everyone to check in and make sure we all understood what we were working towards. 

### Whiteboard
![Whiteboard](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/whiteboard.png)

### Models
* Item
* User
* Inventory Item
* Recipe

#### Item - Icon Considerations
I initially looked into consuming an external api for grocery items with the advantage of gaining access to thousands of item and rich data, however I wasn’t happy with the images they provided. I then considered making users upload their own images which would be a bad UX with unmanaged images. In the end I found some great icon packs on Flaticon and decided to host them on Cloudinary and use them as seeded data. 

*/api/items*
![Item Endpoint](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/item-endpoint.png)


#### Inventory Item Model
Here’s an example of the Inventory Item model. This references the Item model’s data to initialise the item’s default attributes while extending it with additional fields containing user input data for a customised item. The User model is also referenced to link this data to the user’s record. 

![Inventory Item Model](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/inventory-item-model.png)

### Controllers
 
#### Inventory Item Controller - Update
I worked on the Edit controller and as already mentioned, each Inventory Item belongs to a user and therefore only the owner should be able to edit their item. I accessed the current user ID from the payload on the request and compared it with the owner’s ID.

*back-end*
![Inventory Item Controller Back End](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/update-inventory-item.png)

*api put request*
![Put Request](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/put-request.png)

On the front end I conditionally rendered the *Save Changes* button if the *Edit* button is clicked.  I listened for the `onChange()` event to save the new quantity in state. Once the save button is clicked, I called the `put` request, passing in the Inventory Item ID and the new quantity value. Finally, the page is refreshed to reflect the update.

*front-end*
![Handle Edit](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/handle-edit.png)

![Conditional Rendering](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/edit-quantity.png)

*edit Inventory Item*
![Edit UI](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/edit-card.png)


### Recipe Match Logic
We broke down the recipe matching logic into the following steps:

Comparing recipes by their ingredients with the user inventory items.
	1. Get all user items (inventory items)
	2. Get all recipes (catalogue recipes)
	3. Look for a potential recipe (loop through each ingredient in the recipe and compare with inventory item)
	4. If no match is found, break the loop, otherwise set Boolean to true and return

*recipe finder*
![Recipe Finder UI](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/no-recipes)

*recipes index*
![Recipe Index UI](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/recipes.png)

### Shared Item
We wanted to encourage food waste prevention and cooking as opposed to over consumption and though it would be a great to integrate food sharing on a map using the Mapbox API. From the Item Inventory, a user can also share an item. All shared items for a user will appear on a scrollable card set on a pin on the map.

*sharingMap*
![Sharing Map Logic](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/sharing-map-code.png)

*find shared food*
![Map](https://github.com/AbuBakr-S/project-3-client/blob/main/src/assest/map.png)


## Unsolved Problems / Major Hurdles
* Edit was tricky so a workaround was to use the placeholder in the form. 

## Future Additions + Key Learning
* Expiry Date Tracker - Desktop Notification / Email alert
* Food Preference Filter - This is currently not being used to filter recipes from registration. Food categories should be a drop down from the user model options.
* Improve user experience of sharing an item

This was my first full stack project in a trio and I learnt a ton. Communication and organisation was key as we all had different levels of experience and comfortability as well as different schedules. We generally preferred splitting into a pair and a solo task at different milestones to work around this. I also learnt how essential planning and breaking down logic is, particularly when figuring out achievable goals.

Token authentication and noSQL databases was also new and getting some hands on experience in handling data on the from end from the database was invaluable. I also learnt a lot about what you can do with Custom Errors by extending the Error class which I thought was really cool.  

