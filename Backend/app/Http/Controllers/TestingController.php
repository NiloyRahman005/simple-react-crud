<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class TestingController extends Controller
{
    //
    public function edit(Request $request, $id)
    {
        // Find the user by ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Validate the input data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $id, // Ensure email is unique except for the current user
        ]);

        // Update the user with validated data
        $user->update($validatedData);

        return response()->json(['message' => 'User updated successfully']);
    }
    public function create(Request $request)
    {
        // return response()->json(['msg'=>$request->all()]);

        $request->validate([
            'name'=>'required',
            'email'=>'required|unique:users,email',
            'password'=>'required'
        ]);
         User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
         ]);
         return response()->json(['msg'=>'success']);
    }


}
