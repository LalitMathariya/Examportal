import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

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
  

  constructor(private _route: ActivatedRoute,private _question:QuestionService) {
    
  }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['qtitle'];
    //  console.log(this.qId);
    //  console.log(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      console.log(data);
      this.questions = data;
    },
    (error)=>{
      console.log(error);
    }
    )
  }
}
