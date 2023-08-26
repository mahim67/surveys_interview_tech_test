#Project Backend

### How to install

- `cp .env.example .env`
- `php artisan key:generate`
- `composer update`
- `php artisan migrate`
- `php artisan optimize:clear`
- `php artisan serve --port=8002`

### Write some test case for user authentication and registration.
Using Laravel Passport Authentication System
- `php artisan passport:install`
  `Then copy client_id and client_secret..This value paste on React .env file.`