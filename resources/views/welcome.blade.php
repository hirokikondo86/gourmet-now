<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="./img/logo.png">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="keywords" content="料理,ご提案">
    <meta name="description" content="あなたの「なう」に合わせて料理をご提案。">
    <title>グルメなう</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
</head>

<body>
    <div id="root"></div>
    <!-- JavaScript -->
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>