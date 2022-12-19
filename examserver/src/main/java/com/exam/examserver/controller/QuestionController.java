package com.exam.examserver.controller;

import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quiz;
import com.exam.examserver.services.QuestionService;
import com.exam.examserver.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService service;

    @Autowired
    private QuizService quizService;

    //add question
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question){
        return ResponseEntity.ok(this.service.addQuestion(question));
    }

    //update the question
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question){
        return ResponseEntity.ok(this.service.updateQuestion(question));
    }

    //get all questions of any quiz
    @GetMapping("/quiz/{qid")
    public ResponseEntity<?> getQuestionsofQuiz(@PathVariable("qid") Long qid){
//        Quiz quiz = new Quiz();
//        quiz.setQid(qid);
//        Set<Question> questionsOfQuiz =this.service.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);
        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions =  quiz.getQuestions();
        List list = new ArrayList<>(questions);
        if(list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1));
        }
            Collections.shuffle(list);
            return ResponseEntity.ok(list);
        }

    //get single question
    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId){
        return this.service.getQuestion(quesId);
    }

    //delete question
    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId){
        this.service.deleteQuestion(quesId);
    }
}

