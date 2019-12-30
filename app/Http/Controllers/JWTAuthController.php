<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\User;
use App\Favorite;
use Auth;

class JWTAuthController extends Controller
{
    public function signup(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|max:100',
            'furigana' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8|max:255|confirmed',
            'password_confirmation' => 'required|string|min:8|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'messages' => $validator->messages(),
            ], 400);
        }

        $user = new User();
        $user->fill($req->all());
        $user->password = bcrypt($req->password);
        $user->save();

        // tokenが無効なら401を返す
        if (!$token = Auth::guard('api')->attempt(['email' => $req->email, 'password' => $req->password])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $favorites = Favorite::where('user_email', $req->email)->get(['id', 'title', 'catch', 'img_url', 'shop_url']);

        return $this->respondWithToken($token, $req->name, $favorites);
    }

    public function login(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'messages' => $validator->messages(),
            ], 400);
        }

        // tokenが無効なら401を返す
        if (!$token = Auth::guard('api')->attempt(['email' => $req->email, 'password' => $req->password])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $favorites = Favorite::where('user_email', $req->email)->get(['id', 'title', 'catch', 'img_url', 'shop_url']);
        $name = User::where('email', $req->email)->get('name');
        $name = $name[0]['name'];

        return $this->respondWithToken($token, $name, $favorites);
    }

    protected function respondWithToken($token, $name, $favorites)
    {
        date_default_timezone_set('Asia/Tokyo');

        $expire_in = Auth::guard('api')->factory()->getTTL() * 60;
        $exp = date('YmdHis', strtotime('+' . $expire_in . ' minute'));

        return response()->json([
            'token' => $token,
            'exp' => $exp,
            'name' => $name,
            'favorites' => $favorites
        ]);
    }

    public function user()
    {
        return response()->json(Auth::guard('api')->user());
    }

    public function logout()
    {
        Auth::guard('api')->logout();

        return response()->json([
            'status' => 'success',
            'message' => 'logout',
        ], 200);
    }
}
