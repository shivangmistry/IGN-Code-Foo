var videos = [];
var count = 0;
let showAll = false;

$(() => {
    init();
    setDay();
});

function setDay(){
    today = new Date();
    months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

    $("#day").text(days[today.getDay()] + ",");
    $("#date").text(months[today.getMonth()] + " " + today.getDate());
}

function init() {
    const req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', "/videos", true);

    req.onload = function () {
        var response = req.response;
        if (response.type === "error") {
            alert("Error loading videos.");
        }
        else {
            videos = response.data
            count = response.count
            setPlayArea(response.startIndex);
        }
    };
    req.send();
}

function setPlayArea(startIndex){
    $("#videoPlayer").empty();
    $("#playlistArea").empty();

    const assetIndex = 0;
    
    $("#videoPlayer").append(
        "<video id='currentVideo' controls autoplay>" +
            "<source src ='" + videos[startIndex].assets[assetIndex].url + "'  type = 'video/mp4' id = 'videoSource' >" +
            "<p>Your browser doesn't support HTML5 video. Here is a <a href='" + videos[startIndex].assets[assetIndex].url + "'>link to the video</a> instead.</p>" +
        "</video >")
    
    $('#videoTitle').text(videos[startIndex].metadata.title);
    $('#videoDescription').text(videos[startIndex].metadata.description);

    $('video').on('ended', function () {
        if(startIndex+1<count){
            console.log("Video ended.");
            setPlayArea(startIndex + 1);
        }
    });
    
    const start = parseInt(startIndex) + 1;
    const end = Math.min(start + 4, count); 
    
    setPlaylistArea(start, end);
}

function setPlaylistArea(start, end){

    if(showAll){
        end = count
    }

    videos.slice(start, end).forEach((v, index) => {
        let t = v.thumbnails[0];
        let d = v.metadata.duration;
        let mm = d%60;
        if(mm<10){
            mm = '0' + (d%60).toString();
        }
        const duration = (~~(d/60)).toString() + ":" + mm.toString();

        $("#playlistArea").append("<div class='playlistItem' videoid=" + (start+index) + ">" + 
                "<div>" +
                    "<img class='thumbnail' src=" + t.url + " alt='" + v.metadata.title + "' onclick='setPlayArea(" + (start+index) +")' >" +
                    "<span class='durationDiv'><span class='duration'>" + duration + "</span><span>" + 
                "</div>" +
                "<a onclick='setPlayArea(" + (start+index) +")'>" + v.metadata.title + "</a>" +
            "</div>");
    });

    if(end<count){
        $("#playlistArea").append("<button id='loadButton' class='redButton loadMore'>Load More</button>");
        $("#loadButton").click(function() {
            showAll = true
            $(this).hide();
            setPlaylistArea(end, count);
        })
    }

}

function test(index){
    console.log(index);
    setPlayArea(index);
}
