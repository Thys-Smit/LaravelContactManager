<?php

namespace App\Http\Controllers;

use App\Contact;
use Illuminate\Http\Request;

class ContactsController extends Controller
{   
    // Get all the contacts
    public function index() 
    {
        $allContacts = Contact::get();

        return response()->json($allContacts);
    }


    //Get all the contacts for a user
    public function showContactsByUser($id)
    {
        $contacts = Contact::where('fkUserId', $id)->get();

        return response()->json($contacts);
    }


    // Store a single contact
    public function store(Request $request)
    {
        $validContact = $request->validate([
            'name' => 'required|alpha',
            'surname' => 'required|alpha',
            'cellnumber' => 'required|regex:/^[0-9]{10}$/',
            'worknumber' => 'nullable|regex:/^[0-9]{10}$/',
            'fkUserId' => 'required|integer'
        ]);

        $contact = Contact::create($validContact);
        
        return response()->json($contact);
    }


    // Get details of specific contact
    public function show($id)
    {
        $contact = Contact::findOrFail($id);

        return response()->json($contact);
    }


    // Delete a specific contact
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $result = $contact->delete();
        
        return response()->json($result);
    }
}
