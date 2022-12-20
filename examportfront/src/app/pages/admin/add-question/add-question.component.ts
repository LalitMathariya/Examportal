import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  qId:any;
  qTitle:any;
  question:any ={
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };
  constructor(private _route:ActivatedRoute){}

  ngOnInit():void{

    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['qtitle'];
    // alert(this.qId);
    this.question.quiz['qid']=this.qId;
    // this.question.quiz['qtitle']=this.qTitle;

  }

}
