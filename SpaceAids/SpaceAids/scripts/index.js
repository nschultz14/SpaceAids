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
var enemy_num = 0;
var isDead = false;

function gameStart() {
    starsMove();
    shoot();
    bullet_move();
    enemy();
    enemyMove();
    enemy_bullet_collision();
    enemy_player_collision();
    margin_btm_num_1 = -625;
    margin_top_num_2 = -625;

    //make main screen items hidden
    $("#main_module").css("visibility", "hidden");
    $("#logo").css("visibility", "hidden");

    //make game screen items visible
    $("#game_module").css("visibility", "visible");

}

function enemy_bullet_collision() {
    
    for(var enemy_num = 0; enemy_num < 5; enemy_num++) {
        for (var bullet_num = 0; bullet_num < 5; bullet_num++) {

            var enemy_left = $("#enemy_" + enemy_num).offset().left;
            var enemy_right = $("#enemy_" + enemy_num).offset().left + 5;
            var enemy_top = $("#enemy_" + enemy_num).offset().top;
            var enemy_bottom = $("#enemy_" + enemy_num).offset().top + 5;

            var bullet_left = $("#bullet_" + bullet_num).offset().left;
            var bullet_right = $("#bullet_" + bullet_num).offset().left + 2;
            var bullet_top = $("#bullet_" + bullet_num).offset().top;
            var bullet_bottom = $("#bullet_" + bullet_num).offset().top + 2;

            if ((enemy_left < bullet_right ||
                enemy_right < bullet_left) &&

                (enemy_bottom < bullet_top ||
                enemy_top < bullet_bottom)) {

                enemyReset(enemy_num);
                fire(bullet_num);
            }
        }
    }


    setTimeout(enemy_bullet_collision, 2);
}

function enemy_player_collision() {

    if (isDead) return;

    for (var enemy_num = 0; enemy_num < 5; enemy_num++) {


        var enemy_left = $("#enemy_" + enemy_num).offset().left-25;
        var enemy_right = $("#enemy_" + enemy_num).offset().right+50;
        var enemy_top = $("#enemy_" + enemy_num).offset().top-25;
        var enemy_bottom = $("#enemy_" + enemy_num).offset().bottom+50;

        var player_left = $("#player").offset().left-25;
        var player_right = $("#player").offset().right+50;
        var player_top = $("#player").offset().top-25;
        var player_bottom = $("#player").offset().bottom+50;

        //var enemy_left = parseInt($("#enemy_" + enemy_num).css("margin-left").replace("px", ""));
        //var enemy_right = parseInt($("#enemy_" + enemy_num).css("margin-left").replace("px", "")) + 35;
        //var enemy_top = parseInt($("#enemy_" + enemy_num).css("margin-top").replace("px", ""));
        //var enemy_bottom = parseInt($("#enemy_" + enemy_num).css("margin-top").replace("px", "")) - 35;

        //var player_left = parseInt($("#player").css("margin-left").replace("px", ""));
        //var player_right = parseInt($("#player").css("margin-left").replace("px", "")) + 10;
        //var player_top = parseInt($("#player").css("margin-top").replace("px", ""));
        //var player_bottom = parseInt($("#player").css("margin-top").replace("px", "")) - 25;

        //var rect1 = { x: enemy_left, y: enemy_top, width: 50, height: 50 }
        //var rect2 = { x: player_left, y: player_top, width: 50, height: 50 }

        //if (rect1.x < rect2.x + rect2.width &&
        //   rect1.x + rect1.width > rect2.x &&
        //   rect1.y < rect2.y + rect2.height &&
        //   rect1.height + rect1.y > rect2.y) {
            
        //    death();
        //}

            if ((enemy_left < player_left ||
                enemy_right > player_right) &&

                (enemy_bottom < player_bottom ||
                enemy_top > player_top)) {

                window.alert("Thank you for your donation of: $0.05");
                death();
            }
    }

    setTimeout(enemy_player_collision, 2);
}

function enemy() {
    if (isDead) return;

    enemyReset(enemy_num);

    enemy_num++;
    if (enemy_num > 4) enemy_num %= 5;

    //regenerate when hit the user
    setTimeout(enemy, 2000);
}

function enemyMove() {
    if (isDead) return;

    var margin_top

    for (var i = 0; i < 5; i++) {
        margin_top = parseInt($("#enemy_" + i).css("margin-top").replace("px", ""));
        $("#enemy_" + i).css("margin-top", margin_top + 2 + "px");
    }

    setTimeout(enemyMove, 1);
}

function enemyReset(number) {
    var margin_left = Math.random()*350;
    $("#enemy_" + number).css("margin-left", margin_left + 30 + "px");
    $("#enemy_" + number).css("margin-top", "-700px");
}

function stopScrolling() {

    if ($("#highscore_module").css("visibility") != "hidden" ||
       $("#credit_module").css("visibility") != "hidden" ||
        $("#settings_module").css("visibility") != "hidden" ||
        $("#transaction_module").css("visibility") != "hidden") return;

    window.scrollTo(0, 0);
    
    setTimeout(stopScrolling, 1);
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

    if (isDead) return;

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
    setTimeout(shoot, 500);
}

//move current bullets
function bullet_move() {

    if (isDead) return;

    //var margin_num = $(bullet_num.toString).css("margin-top");
    //$(bullet_num.toString).css("margin-top", margin_num - 1);

    var margin_top

    for (var i = 0; i < 5; i++) {
        margin_top = parseInt($("#bullet_" + i).css("margin-top").replace("px", ""));
        $("#bullet_" + i).css("margin-top", margin_top-5 + "px");
    }

    setTimeout(bullet_move, 1);
}

//reset a bullet
function fire(number) {
    var margin_left = parseInt($("#player").css("margin-left").replace("px", ""));
    $("#bullet_" + number).css("margin-left", margin_left+30 + "px");
    $("#bullet_" + number).css("margin-top", "-150px");
}

document.body.onmousedown = function (e) {

    if (isDead) {
        main_view();
        return;
    }

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

function death() {
    isDead = true;

    //display game over
    $("#death_module").css("visibility", "visible");
    $("#death_module").css("position", "absolute");
    //$("#death").css("position", "absolute");
    //$("#death").css("margin-top", "-180%");
}


/*
    NAVIGATION
*/
function main_view() {
    $("#game_module").css("visibility", "hidden");
    $("#death_module").css("visibility", "hidden");
    $("#credit_module").css("visibility", "hidden");
    $("#highscore_module").css("visibility", "hidden");
    $("#transactions_module").css("visibility", "hidden");
    $("#settings_module").css("visibility", "hidden");
    $("#main_module").css("visibility", "visible");
    $("#logo").css("visibility", "visible");
    stopScrolling();
}

function highscores_view() {

    $("#main_module").css("visibility", "hidden");
    $("#highscore_module").css("visibility", "visible");
}

function settings_view() {

    $("#main_module").css("visibility", "hidden");
    $("#settings_module").css("visibility", "visible");
}

function transaction_view() {

    $("#main_module").css("visibility", "hidden");
    $("#transactions_module").css("visibility", "visible");
}