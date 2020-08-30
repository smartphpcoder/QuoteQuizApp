<?php

namespace App\Http\Controllers;
use App\Questions;
use App\Answers;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function getQuizData(){

       $questions = Questions::all();

       $questions_container = [];
       $answer_container = [];
       
        //    Questions Loop
       foreach($questions as $item){

           $answers = Answers::where("question_id", "=", $item->id)->get();
            
            //    Answers Loop
           foreach($answers as $answer_item){
                $answer_container[] = [
                    'id' => $answer_item->id,
                    'question_id' => $answer_item->question_id,
                    'answer' => $answer_item->answer,
                    'correct' => $answer_item->correct
                ];

           }

           $questions_container[] = [
            'id' => $item->id,
            'question_title' => $item->question,
            'question_type' => $item->type,
            'answers' => $answer_container
           ];

           $answer_container = [];
       }

        //    Return Json Data To Route quotequiz/data
       return response()->json($questions_container);
        
    }
}
