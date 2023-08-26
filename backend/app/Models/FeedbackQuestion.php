<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackQuestion extends Model
{
    use HasFactory;
    protected $table = 'feedback_questions';
    protected $guarded = [];

    /**
     * Get all of the answers for the FeedbackQuestion
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function answers()
    {
        return $this->hasMany(FeedbackResponse::class, 'feedback_question_id');
    }
}
