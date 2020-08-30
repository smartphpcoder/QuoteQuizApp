<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answers extends Model
{
    protected $fillable = [
        "question_id", "answer", "correct"
    ];

    public function questions(){
        return $this->belongsTo('App\Questions');
    }
}
