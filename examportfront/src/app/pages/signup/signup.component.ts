import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService,private snack:MatSnackBar){}

  public user = {
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void {}

  formSubmit(){
  //  console.log(this.user);
   if(this.user.username=='' || this.user.username==null){
   // alert("Username is required !!");
   this.snack.open("Username is required !!",'Okay!',{
    duration:3000,
    // verticalPosition:'top',
    // horizontalPosition:'right',
   });
    return ;
   }
   //addUser:UserService
   this.userService.addUser(this.user).subscribe(
    (data:any)=>{
      //success
      // console.log(data);
      //alert("success");
      Swal.fire("Success","User id "+data.id+" is Registered",'success');
    },
    (error)=>{
      //error
      console.log("something went wrong");
      //alert("something went wrong");
      this.snack.open("Something went Wrong !!",'Okay!',{
        duration:3000,
        // verticalPosition:'top',
        // horizontalPosition:'right',
       });
    }

   )
  }

}
