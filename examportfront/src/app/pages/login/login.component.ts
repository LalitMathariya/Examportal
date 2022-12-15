import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  
constructor(private snack:MatSnackBar, private login:LoginService){}

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
            console.log(data);

            //login...
             this.login.loginUser(data.token)

             this.login.getCurrentUser().subscribe(
              (user:any) => {
                this.login.setUser(user);
                console.log(user);

                //redirect ...Admin:admin-dashboard
                //redirect .. Normal:normal-dashboard
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

