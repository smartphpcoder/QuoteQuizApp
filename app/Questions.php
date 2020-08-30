<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    protected $fillable = [
        "question", "type"
    ];

    public function answers(){
        return $this->hasMany('App/Answers');
    }
}
