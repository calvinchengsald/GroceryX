

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

}

export default UserModel;
