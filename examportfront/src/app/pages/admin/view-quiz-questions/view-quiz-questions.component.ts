import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent {

  // q : { qId: number; qTitle: string; } | undefined;
  qTitle:any;
  qId: any;
  questions:any =[];
  // questions: any;
  

  constructor(private _route: ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar) {
    
  }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['qtitle'];
    //  console.log(this.qId);
    //  console.log(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      // console.log(data);
      this.questions = data;
    },
    (error)=>{
      console.log(error);
    }
    )
  }

  //delete question 
  deleteQuestion(qid:any){
    //alert(qid);
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure,want to delete this question ?',
    }).then((result)=>{
     if(result.isConfirmed){
      //confirm
      this._question.deleteQuestion(qid).subscribe(
        (data)=>{
          this._snack.open('Question Deleted','',{
            duration:3000,
          });
          this.questions= this.questions.filter((q:any)=>q.quesId!=qid)
        },
        (error)=>{
        this._snack.open('Error in deleting Questions','',{
          duration:3000,
        });
        console.log(error);
        });
     }
    });
  }
}
