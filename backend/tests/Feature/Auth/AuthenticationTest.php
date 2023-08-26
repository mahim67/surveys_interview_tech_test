<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Laravel\Passport\Client;
use Illuminate\Support\Facades\Hash;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use League\OAuth2\Server\Exception\OAuthServerException;

class AuthenticationTest extends TestCase
{
    // use RefreshDatabase;

    public function test_users_can_authenticate_using_oAuth()
    {
        $oauth_client_id = 2;
        $oauth_client = Client::findOrfail($oauth_client_id);

        $body = [
            'username' => 'admin@gmail.com',
            'password' => '123456789',
            'client_id' => $oauth_client_id,
            'client_secret' => $oauth_client->secret,
            'grant_type' => 'password',
            'scope' => '*'
        ];
        $this->json('POST', '/oauth/token', $body, ['Accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJsonStructure(['token_type', 'expires_in', 'access_token', 'refresh_token']);
    }
    public function test_user_unauthenticated()
    {
        $oauth_client_id = 2;
        $oauth_client = Client::findOrfail($oauth_client_id);
        $body = [
            'username' => 'admin@gmail.com',
            'password' => '123456789s',
            'client_id' => $oauth_client_id,
            'client_secret' => $oauth_client->secret,
            'grant_type' => 'password',
            'scope' => '*'
        ];
        $response =   $this->json('POST', '/oauth/token', $body, ['Accept' => 'application/json']);
        $response->assertStatus(400);
    }
}
