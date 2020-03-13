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
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', "/videos", true);

    req.onload = function () {
        var response = req.response;
        if (response.type === "error") {
            alert("Erro occured.")
        }
        else {
            console.log(response);
        }
    };
    req.send();
}