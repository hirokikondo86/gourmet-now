<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    public $incrementing = false; // ← 追加

    protected $keyType = 'string'; // ← 追加

    protected $fillable = [
        'id', 'user_email', 'title', 'catch', 'img_url', 'shop_url',
    ];
}
