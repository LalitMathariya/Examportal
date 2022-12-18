import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

   user=null;
   auth:any;

  constructor(private login:LoginService){}


  ngOnInit():void{
   this.user=this.login.getUser();


   //direct backend se data lane ke liye request ese krte h 

  //  this.login.getCurrentUser().subscribe((user:any)=>{
  //   this.user=user;
  // },
  // (error)=>{
  //   alert('error');
  // }
  // );
    this.auth=this.login.getUserRole();
  }
    
}
