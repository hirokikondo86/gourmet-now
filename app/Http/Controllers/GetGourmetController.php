<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class GetGourmetController extends Controller
{
    public function gourmet(Request $req)
    {
        $lat = $req->lat;
        $lng = $req->lng;
        $partyCapacity = $req->party_capacity;
        $budget = $req->budget;
        $freeFood = $req->free_food;
        $freeDrink = $req->free_drink;
        $genre = $req->genre;
        $param = "?key=cfe3c5ca6c91c770&format=json&range=2&order=4&count=100&lat=$lat&lng=$lng&party_capacity=$partyCapacity&budget=$budget&free_food=$freeFood&free_drink=$freeDrink&genre=$genre";

        $client = new Client([
            // Base URI is used with relative requests
            'base_uri' => 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1',
            // You can set any number of default request options.
            'timeout' => 2.0,
        ]);
        $res = $client->request('GET', $param)->getBody();

        return (string) $res;
    }
}
