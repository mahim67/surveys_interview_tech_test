<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\FeedbackQuestion;
use Illuminate\Http\Request;

class FeedbackQuestionController extends Controller
{
    public function list(Feedback $feedback)
    {
        $questions = $feedback->questions()->get();
        return response()->json([
            'status' => 'ok',
            'feedback' => $feedback,
            'data' => $questions
        ]);
    }
    
    public function store(Request $request, Feedback $feedback)
    {
        try {
            $questions = $feedback->questions()->create($request->all());

            return response()->json([
                'status' => 'ok',
                'feedback' => $feedback,
                'data' => $questions,
                'msg' => 'Saved Successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function show(Feedback $feedback, FeedbackQuestion $question)
    {
        try {
            return response()->json([
                'status' => 'ok',
                'feedback' => $feedback,
                'data' => $question
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function update(Request $request, FeedbackQuestion $question)
    {
        $question = $question->update($request->all());

        try {
            return response()->json([
                'status' => 'ok',
                'data' => $question,
                'msg' => 'Updated Successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function delete(FeedbackQuestion $question)
    {
        try {
            
            $question->delete();
            
            return response()->json([
                'status' => 'ok',
                'msg' => 'Deleted Successfully',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->getMessage()
            ]);
        }
    }
}
