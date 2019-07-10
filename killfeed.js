$(function() {
    var tKillNames = ["BlendeR", "BLDR" , "blendereqq" , "blenderoo"];//you can add or remove here more "teammates"
    var ctKillNames = ["void cAimbot::DrawFov( int iIndex )", "you", "can", "add", "more", "here"]; //you can add here more "enemies"
    var weapons = ["ssg", "ak47", "deagle", "awp" /*, "g3sg1", "m4a4"*/]; //you can add or remove here more images of weapons here
    var $killFeedContainer = $('.kill-feed');
    var $killFeedElement = $('.kill-feed > div').hide();

    function handleKillFeed() {
        var $newFeedElement = $killFeedElement.clone();
        $newFeedElement.find('.weapons img:first-child').attr('src', './images/' + weapons[Math.floor(Math.random() * weapons.length)] + '.png'); //drawing a weapon
        $newFeedElement.find('.t').text(tKillNames[Math.floor(Math.random() * tKillNames.length)]); //drawing a "teammate"
        $newFeedElement.find('.ct').text(ctKillNames[Math.floor(Math.random() * ctKillNames.length)]);//drawing a "enemy"
        $killFeedContainer.append($newFeedElement.show().delay(2000).fadeOut(1000, function() { //drawing a container
            $(this).remove()
        }))
    }
    $(document).on("contextmenu", function(e) {
        e.preventDefault()
    });
    window.setInterval(handleKillFeed, 450)// time between kills
}); 