<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Laravel\Passport\Client;
use Illuminate\Support\Facades\Hash;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserRegistrationTest extends TestCase
{
    // use RefreshDatabase;

    public function test_users_registration()
    {
        $oauth_client_id = 2;
        $oauth_client = Client::findOrfail($oauth_client_id);

        $body = [
            'name' => 'admin',
            'email' => rand(100000,50000000)."@gmail.com",
            'password' => 'password',
            'client_id' => $oauth_client_id,
            'client_secret' => $oauth_client->secret,
            'grant_type' => 'password',
            'scope' => '*'
        ];
        $this->json('POST', '/api/register', $body, ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJson(['status' => 'ok']);
    }
    public function test_duplicate_users_registration()
    {
        $oauth_client_id = 2;
        $oauth_client = Client::findOrfail($oauth_client_id);

        $body = [
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => 'password',
            'client_id' => $oauth_client_id,
            'client_secret' => $oauth_client->secret,
            'grant_type' => 'password',
            'scope' => '*'
        ];
        $this->json('POST', '/api/register', $body, ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJson(['status' => 'error', 'message' => ['email' => ['The email has already been taken.']]]);
    }
}
