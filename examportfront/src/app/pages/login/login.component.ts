import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {



  loginData={
    username:'',
    password: '',
  };
  
constructor(private snack:MatSnackBar, private login:LoginService,private router:Router){}

  formSubmit(){
    console.log("Login button clicked");

        if(this.loginData.username.trim()=='' || this.loginData.username==null)
        {
            this.snack.open("Username is required",'',{
              duration:3000,
            }); 
            return;
        }


        if(this.loginData.password.trim()=='' || this.loginData.password==null)
        {
            this.snack.open("Password is required",'',{
              duration:3000,
            }); 
            return;
        }

        //request server to generate token
        this.login.generateToken(this.loginData).subscribe(
          (data:any)=>{
            console.log('success');
            // console.log(data);

            //login...
             this.login.loginUser(data.token)

             this.login.getCurrentUser().subscribe(
              (user:any) => {
                this.login.setUser(user);
                // console.log(user);
                //redirect ...Admin:admin-dashboard
                //redirect .. Normal:normal-dashboard
                if(this.login.getUserRole()=="ADMIN"){
                  //admin dashboard
                  this.router.navigate(['admin']);
                  this.login.loginStatusSubject.next(true);
                  // window.location.href='/admin'
                }else if(this.login.getUserRole()=="NORMAL"){
                  //normal user dashboard
                  this.router.navigate(['user-dashboard']);
                  this.login.loginStatusSubject.next(true);
                  // window.location.href='/user-dashboard'

                }else{
                  this.login.logout();
                }

              }
             )

          },
          (error)=>{
            console.log("Error !");
            console.log(error);
            this.snack.open('Invalid details !! Try again','',{
              duration:3000,
            });
          }
        );
  }
}

