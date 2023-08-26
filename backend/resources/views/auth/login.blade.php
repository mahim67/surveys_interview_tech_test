<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body>
    <div class="row mt-5">
        <div class="col-md-4"></div>
        <div class="col-md-4">
            <div class="card">
                <div class=" card-body">
                    <form action="{{ route('login') }}" method="post">
                        @csrf
                        <table class="table">
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input name="email" placeholder="Email Address" id="input-username"
                                class="form-control" type="text" autofocus="off" required />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input name="password" placeholder="Enter Password" id="input-username"
                                class="form-control" type="password" autofocus="off" required />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <div class="text-right mb-3">
                                        <button type="submit" name="login" class="btn btn-info btn-block"><i class="fa fa-key">
                                                <b>{{ __('LOGIN') }}</b></i></button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                     
                       
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
