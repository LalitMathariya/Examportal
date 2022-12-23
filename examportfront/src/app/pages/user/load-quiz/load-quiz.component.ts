import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {

  catId:any;
  quizzes: any=[
    {
      qid:1,
      title:'',
      description:'',
      category:{
        title:'',
      }
    },
  ]

  constructor(private _route:ActivatedRoute,private _quiz:QuizService){}


  ngOnInit():void{

   
    this._route.params.subscribe((params:any)=>{
      this.catId= params['catId'];
      if(this.catId==0){
        // alert("All the quiz");
        this._quiz.getActiveQuizzes().subscribe((data:any)=>{
          this.quizzes=data;
          // console.log(data);
        },
        (error)=>{
            console.log(error);
            Swal.fire("Error",'Error in loading all quizzes','error');
        });
  
      }else{
        // console.log("load specific quiz");
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes=data;
            //console.log(data);
          }, 
          (error)=>{
            Swal.fire("Error",'error in loading data','error');
          }
          )
      }
    });

    //alert(this.catId);

    


  }

}
