<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\FeedbackResponse;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function list()
    {
        $feedbacks = Feedback::where('user_id', auth()->user()->id)->get();
        return response()->json([
            'status' => 'ok',
            'data' => $feedbacks
        ]);
    }

    public function store(Request $request)
    {
        try {
            $feedback = Feedback::create($request->all() + ['link' => Str::uuid()]);
            return response()->json([
                'status' => 'ok',
                'feedback' => $feedback,
                'msg' => 'Saved Successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->getMessage()
            ]);
        }
    }

    public function show(Feedback $feedback)
    {
        return response()->json([
            'status' => 'ok',
            'data' => $feedback
        ]);
    }

    public function update(Request $request, Feedback $feedback)
    {
        try {
            $feedback = $feedback->update($request->all());

            return response()->json([
                'status' => 'ok',
                'feedback' => $feedback,
                'msg' => 'Updated Successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->getMessage()
            ]);
        }
    }

    public function delete(Feedback $feedback)
    {
        try {

            $feedback->delete();

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

    public function getFeedback($link)
    {
        try {
            $feedback = Feedback::with('questions')->where('link', $link)->first();
            return response()->json([
                'status' => 'ok',
                'feedback' => $feedback,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->getMessage()
            ]);
        }
    }

    public function feedbackResponses(Feedback $feedback)
    {
        try {
            return response()->json([
                'status' => 'ok',
                'feedback' => $feedback->load('questions.answers'),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->getMessage()
            ]);
        }
    }

    public function storeUserFeedback(Request $request)
    {
        try {
            $answers = $request->answers;
            if (count($answers)) {
                foreach ($answers as $questionId => $answer) {
                    FeedbackResponse::create([
                        'user_name' => $request->name ?? null,
                        'user_email' => $request->email ?? null,
                        'feedback_id' => $request->feedback_id ?? null,
                        'feedback_question_id' => $questionId ?? null,
                        'answer' => $answer ?? null,
                    ]);
                }
            }

            return response()->json([
                'status' => 'ok',
                'msg' => "Thanks for your feedback"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'errors' => $e->getMessage()
            ]);
        }
    }
}
