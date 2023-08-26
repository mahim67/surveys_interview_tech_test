<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\FeedbackQuestionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['auth:api']], function () {
    Route::post('user', [UserController::class, 'index']);
    Route::post('logout', [UserController::class, 'logoutApi']);

    /* Feedback Routes */
    Route::prefix('feedbacks')->group(function () {
        Route::post('/', [FeedbackController::class, 'list']);
        Route::post('/store', [FeedbackController::class, 'store']);
        Route::post('/{feedback}/update', [FeedbackController::class, 'update']);
        Route::post('/show/{feedback}', [FeedbackController::class, 'show']);
        Route::post('/{feedback}/delete', [FeedbackController::class, 'delete']);

        /* Feedback Responses */
        Route::post('/{feedback}/responses', [FeedbackController::class, 'feedbackResponses']);

        /* Feedback Questions */
        Route::post('/{feedback}/questions', [FeedbackQuestionController::class, 'list']);
        Route::post('/{feedback}/questions/store', [FeedbackQuestionController::class, 'store']);
        Route::post('/{feedback}/questions/show/{question}', [FeedbackQuestionController::class, 'show']);
        Route::post('/questions/{question}/update', [FeedbackQuestionController::class, 'update']);
        Route::post('/questions/{question}/delete', [FeedbackQuestionController::class, 'delete']);

    });

});

Route::post('register',[UserController::class,'store']);

Route::post('feedbacks/get-feedback/{link}',[FeedbackController::class,'getFeedback']);
Route::post('feedbacks/store-user-feedback',[FeedbackController::class,'storeUserFeedback']);