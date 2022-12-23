import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {
  qid: any;
  quiz:any;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService,private route:Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    // alert(this.qid);
    this._quiz.getQuiz(this.qid).subscribe((data: any) => {
      this.quiz= data;
      // console.log(data);

    },
    (error) => {
      Swal.fire("Error",'Error in loading data','error');
      });

  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to Start the Quiz?',
      // text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Start'
    }).then((result) => {
      if (result.isConfirmed) {

        this.route.navigate(['/start/'+this.qid]);
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
  }



}
