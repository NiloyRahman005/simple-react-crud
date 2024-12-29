<?php

use App\Http\Controllers\TestingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
Route::get('/users', function () {
  return response()->json([
    'users' => User::orderBy('id','desc')->get()
  ]);



});
Route::delete('/users/{id}', function ($id) {
    $user = User::find($id);

    if ($user) {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    } else {
        return response()->json(['message' => 'User not found'], 404);
    }
});


// Route::put('/users/{id}', function (Request $request, $id) {
//     return response()->json(['message'=>$id]);
//     $user = User::find($id);

//     if ($user) {
//         // Validate the data
//         $validatedData = $request->validate([
//             'name' => 'required|string|max:255',
//             'email' => 'required|email|max:255|unique:users,email,' . $id, // Ensuring the email is unique except for the current user
//         ]);

//         // Update the user with validated data
//         $user->update($validatedData);

//         return response()->json(['message' => 'User updated successfully']);
//     } else {
//         return response()->json(['message' => 'User not found'], 404);
//     }
// });

Route::put('/users/{id}',[TestingController::class,'edit']);
Route::post('/users', [TestingController::class, 'create']);
