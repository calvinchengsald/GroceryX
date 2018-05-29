

class UserModel {

  constructor(){
    this.login = false;
    this.name = "calvin";
    this.password = 'temp';
    this.username = "kewl";
  //  this.id;
  //  this.userData;
  }

  setUserData(data){
    this.userData = Object.assign({},data);
  }
  isPartOfGroceryList(groceryList){
    return this.isPartOfGroup(groceryList.group);
  }
  isPartOfGroup(groupData){
    let ultBool = false;
    groupData.groupusers.map((groupuser)=>{
      if(groupuser.user.id === this.userData.id){
        ultBool = true;
      }
      return;
    });
    return ultBool;
  }

  updateUserData(callback){
    let myurl = `${process.env.REACT_APP_API_URL}user/${this.userData.id}`;
    let bodyFormData = new Object();
    bodyFormData.needJSONbreakup = "J$0nBr4k3";
    this.fetchData(myurl,bodyFormData, (err,data)=>{
      if(err){
        console.log("there was an error updating user data");
      }
      else {
        this.userData = Object.assign({},data);
        return callback();
      }
    })
  }

  fetchData(myurl,bodyFormData, callback){
    fetch(myurl, {
      body : JSON.stringify(bodyFormData),
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html',
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })
    .then((response) => {
      return response.json();
    })
    .then( (data)=> {
      return callback(null, data);
    })
    .catch((error) =>{
      return callback("Something went wrong with the server");

    });
  }

  signOut(){
    this.login= false;
    this.userData = null;
  }

}

export default UserModel;
