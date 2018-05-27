<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Verb    Path                        Action  Route Name
// GET     /users                      index   users.index
// GET     /users/create               create  users.create
// POST    /users                      store   users.store
// GET     /users/{user}               show    users.show
// GET     /users/{user}/edit          edit    users.edit
// PUT     /users/{user}               update  users.update
// DELETE  /users/{user}               destroy users.destroy

Route::prefix('api/v1')->group(function() {

    Route::resource('users', 'UsersController', [
        'only' => ['index', 'store', 'destroy']
    ]);

    Route::resource('contacts', 'ContactsController', [
        'except' => ['edit', 'update', 'create']
    ]);

    Route::get('/contacts/user/{user}', 'ContactsController@showContactsByUser');
});
