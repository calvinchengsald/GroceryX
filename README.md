


GroceryX - UI for creating and managing grocery List

User must be signed in to interact with the client

Group -
  -Users can create a group at any time
  -Any user within a group can leave the group
  -Any user within a group can invite another user
  -Any user within a group can create a grocery list
  -Any user within a group can change the group name

Grocery List -
  -Any user within the group that the list belongs to can add items
  -Any user within the group that the list belongs to can edit items
  -Any user within the group that the list belongs to can check items
  -If the owner is no longer in the group, he cannot do the above actions
  -Only the owner of the list can delete the List
  -Only the owner of the list can mark the list as private/public
  -When in private mode, only the owner can view the list

User -
  -Only the user can change his Password
  -Anyone can view anyone elses profile

.env
  REACT_APP_API_URL = [URL of the API]
  expample : REACT_APP_API_URL="https://groceryx-server.herokuapp.com/"
