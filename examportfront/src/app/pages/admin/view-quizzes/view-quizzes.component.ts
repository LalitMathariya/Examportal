import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent {

  quizzes=[
    {
      qid:23,
      title:'test',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, debitis eligendi cumque unde possimus, rerum aspernatur quidem quam nemo dolorum ipsa hic similique earum tempora voluptate atque natus non quod.',
      maxMarks:'0',
      numberOfQuestions:'0',
      active:'',
      category:{
        title:'',
      }
    },
  ]

  constructor(private _quiz:QuizService){}

  ngOnInit():void{

    this._quiz.quizzes().subscribe((data:any)=>{
      this.quizzes=data;
      //console.log(this.quizzes);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error',"Error in loading data !",'error');

    });

  }
  //delete the quiz
  deleteQuiz(qid: any){
    
    //alert(qId);
    // this._quiz.deleteQuiz(qid).subscribe((data:any)=>{
    //   this.quizzes = this.quizzes.filter((quiz)=> quiz.qid != qid);
    //   Swal.fire('Success','Quiz deleted','success');
    // },
    // (error)=>{
    //   console.log(error);
    //   Swal.fire('Error',"Error in deleting quiz !",'error');

    // });

    Swal.fire({
      icon:'info',
      title:" Are you sure ? ",
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        this._quiz.deleteQuiz(qid).subscribe((data:any)=>{
          this.quizzes = this.quizzes.filter((quiz)=> quiz.qid != qid);
          Swal.fire('Success','Quiz deleted','success');
        },
        (error)=>{
          console.log(error);
          Swal.fire('Error',"Error in deleting quiz !",'error');
    
        });
      }
    });
  }
}
