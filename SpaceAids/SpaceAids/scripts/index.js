﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.


        gameStart();
    };
})();

var margin_top_num_1 = 0;
var margin_top_num_2 = 0;
var margin_btm_num_1 = 0;
var margin_btm_num_2 = 0;
var cursorX = 0;
var cursorY = 0;
var bullet_num = 0;

function gameStart() {
    starsMove();
    shoot();
    bullet_move();
    margin_btm_num_1 = -625;
    margin_top_num_2 = -625;

    //make main screen items hidden
    $("#main_module").css("visibility", "hidden");
    $("#logo").css("visibility", "hidden");

    //make game screen items visible
    $("#game_module").css("visibility", "visible");

}

function starsMove() {

    margin_top_num_1++;
    margin_top_num_2++;
    margin_btm_num_1--;
    margin_btm_num_2--;
    $("#stars").css("margin-bottom", margin_btm_num_1 + "px");
    $("#stars").css("margin-top", margin_top_num_1 + "px");
    $("#stars2").css("margin-bottom", margin_btm_num_2 + "px");
    $("#stars2").css("margin-top", margin_top_num_2 + "px");

    if (margin_btm_num_1 < -1250) {
        margin_btm_num_1 = 0;
        margin_top_num_1 = -625;
    }

    if (margin_btm_num_2 < -1250) {
        margin_btm_num_2 = 0;
        margin_top_num_2 = -625;
    }

    setTimeout(starsMove, 1);
}

function shoot() {

    ////create the bullet
    //var bullet = document.createElement("div");
    ////id
    ////var bullet_id = document.createAttribute("id");   
    ////bullet_id.value = bullet_num.toString;
    ////bullet.setAttributeNode(bullet_id);
    ////class
    //var bullet_class = document.createAttribute("class"); 
    //bullet_class.value = "bulletclass";
    //bullet.setAttributeNode(bullet_class);

    //fire the bullet
    fire(bullet_num);

    bullet_num++;
    if (bullet_num > 4) bullet_num %= 5;

    //automatic fire
    setTimeout(shoot, 200);
}

//move current bullets
function bullet_move() {

    //var margin_num = $(bullet_num.toString).css("margin-top");
    //$(bullet_num.toString).css("margin-top", margin_num - 1);

    var margin_top

    for (var i = 0; i < 5; i++) {
        margin_top = parseInt($("#bullet_" + i).css("margin-top").replace("px", ""));
        $("#bullet_" + i).css("margin-top", margin_top-10 + "px");
    }

    setTimeout(bullet_move, 5);
}

//reset a bullet
function fire(number) {
    var margin_left = parseInt($("#player").css("margin-left").replace("px", ""));
    $("#bullet_" + number).css("margin-left", margin_left + "px");
    $("#bullet_" + number).css("margin-top", "700px");
}

document.body.onmousedown = function(e) {

    if ($("#game_module").css("visibility") != "visible") return;

    var margin_num = parseInt($("#player").css("margin-left").replace("px", ""));

    if (e.clientX < document.body.clientWidth / 2) {
        //left side click
        $("#player").css("margin-left", margin_num-10 + "px");
    } else {
        //right side click
        $("#player").css("margin-left", margin_num+10 + "px");
    }
}