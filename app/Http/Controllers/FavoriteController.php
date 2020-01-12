<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Favorite;
use Auth;


class FavoriteController extends Controller
{
    /**
     * ユーザのいいねを取得する
     * @return {Array} favorites
     */
    public function getFavorites()
    {
        // ログインしているユーザを取得
        $user = Auth::guard('api')->user();
        $email = $user->email;

        $favorites = Favorite::where('user_email', $email)->get(['shop_id', 'title', 'catch', 'img_url', 'shop_url']);

        return response()->json([
            'favorites' => $favorites->toArray()
        ]);
    }

    /**
     * いいねを追加
     * @param  {Int}   $req [shop_idがくる]
     * @return {Array} $favorites
     */
    public function addFavorite(Request $req)
    {
        // ログインしているユーザを取得
        $user = Auth::guard('api')->user();
        $email = $user->email;

        // いいねした店の情報を追加
        $favorite = new Favorite();
        $favorite->fill([
            'shop_id'         => $req->id,
            'user_email' => $email,
            'title'      => $req->title,
            'catch'      => $req->catch,
            'img_url'    => $req->img_url,
            'shop_url'   => $req->shop_url,
        ])->save();

        // いいねの取得
        $favorites = Favorite::where('user_email', $email)->get(['shop_id', 'title', 'catch', 'img_url', 'shop_url']);

        return response()->json([
            'favorites' => $favorites
        ]);
    }

    /**
     * いいねを消去
     * @param  {Int}   $req [shop_idがくる]
     * @return {Array} $favorites
     */
    public function deleteFavorite(Request $req)
    {
        // ログインしているユーザを取得
        $user = Auth::guard('api')->user();
        $email = $user->email;
        $shopId = $req->id;

        // いいねを消去
        Favorite::where('shop_id', $shopId)->delete();

        // いいねの取得
        $favorites = Favorite::where('user_email', $email)->get(['shop_id', 'title', 'catch', 'img_url', 'shop_url']);

        return response()->json([
            'favorites' => $favorites->toArray()
        ]);
    }
}
