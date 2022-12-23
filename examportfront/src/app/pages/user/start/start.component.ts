import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  qid: any;
  questions:any;

  marksGot =0;
  correctAnswers =0;
  attempted = 0;
  isSubmit=false;
  timer: any;


  constructor(private locationSt: LocationStrategy, private route: ActivatedRoute, private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.route.snapshot.params['qid'];
    // alert(this.qid);
    this.loadQuestions();
    
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data: any) => {
      // console.log(data);
      this.questions=data;
      this.timer= this.questions.length*2*60;
      this.questions.forEach((q:any)=>{
        q['givenAnswer'] ='';
      });
      this.startTimer();
    },
      (error) => {
        console.log(error);
        Swal.fire("Error", 'Error in loading questions of quiz', 'error');

      });
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    })
  }

  submitQuiz()
  {
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Submit'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
        //calculation
       
      }
    })

  }


  startTimer(){
   let t = window.setInterval(()=>{
      //code
      if(this.timer <= 0){
        this.evalQuiz()
        clearInterval(t)
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let hh= Math.floor(this.timer/60/60);
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${hh} H : ${mm} M : ${ss} S`;
  }

  evalQuiz(){
    this.isSubmit=true;
    this.questions.forEach((q: any)=>{
      if(q.givenAnswer==q.answer){
        this.correctAnswers++;
        let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
        this.marksGot+=marksSingle;
      }
      if(q.givenAnswer.trim()!=''){
        this.attempted++;
      }
      
    });
  }
}
