<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    // Get all the users
    public function index() 
    {
        $allUsers = User::get();

        return response()->json($allUsers);
    }

    // Store a single user
    public function store(Request $request)
    {
        $validUser = $request->validate([
            'name' => 'required|alpha',
            'surname' => 'required|alpha'
        ]);

        $users = User::create($validUser);
        
        return response()->json($users);
    }

    // Delete a specific user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $result = $user->delete();
        
        return response()->json($user);
    }
}
