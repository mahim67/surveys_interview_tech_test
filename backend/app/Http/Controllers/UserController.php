<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'status' => 'ok',
            'data' => auth()->user()
        ]);
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users|max:255',
            'password' => 'required',
            'name' => 'required',
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'status'=>'error',
                'message'=> $validator->messages()
            ]);
        }
        User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);
        return response()->json([
            'status' => 'ok',
            'message'=>'User Successfully registered'
        ]);
    }
    public function logoutApi()
    {
        if (Auth::check()) {
            $user = auth()->user();
            $user->AauthAcessToken()->delete();
        }
    }
}
