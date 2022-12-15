import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

//current user: which is loggedin
public getCurrentUser(){
  return this.http.get(`${baseUrl}/current-user`);
}

  //generate token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
    }


    //login user: set token in local storage
    public loginUser(token: string){
      localStorage.setItem('token',token);
      return true;
    }

    //islogin : User is login or not
    public isLoggedIn(){
      let tokenStr = localStorage.getItem("token");
      if(tokenStr==undefined || tokenStr == '' || tokenStr==null){
        return false;
      }else{
        return true;
      }
    }

    //logout : remove token from local storage
    public logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    }

    //getToken : return token
    public getToken(){
      return localStorage.getItem('token');
    }

    //set user details in local storage is insecure practice but it is not sensitive at all soo we can store it in local storage
    
     public setUser(user: any){
      localStorage.setItem('user', JSON.stringify(user));
     }

     //getuser : for getting user details from local storage
     public getUser(){
      let userStr = localStorage.getItem("user");
      if(userStr!=null){
        return JSON.parse(userStr);
      } else{
         this.logout();
         return null;
      }
     }


     //getUserRole(): User ka role nikalne ke liye h 

     public getUserRole(){
      let user = this.getUser();
      return user.authorities[0].authority;
     }
}
