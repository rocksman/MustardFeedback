fq = {
    no: 0
}
cl = {
    no: 0
}
atm = {
    no: 0
}
ser = {
    no: 0
}
vm = {
    no: 0
}
feedback = {
    "name" : "",
    "phone" : "",
    "basic feedback": "",
    "food quality": "",
    "cleanliness": "",
    "atmosphere": "",
    "service": "",
    "value for money": ""
}
$('.basic').on('click',function(){
    var id = this.id;
    var val = document.getElementById(id).value;
    feedback["basic feedback"] = val;
    $("#modal1").fadeIn("1000");
})
$('#sbmt').on('click', function () {
    $("#modal1").fadeOut("1000");
    $.ajax({
        type: 'post',
        url: '/feedback',
        data: feedback,
        success: function (resultData) {
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
    });
});
$('.far').on('click', function () {
    var tcls = this.className;
    var tid = this.id;
    validate(tcls);
    $(this).addClass("checked");
    eval(tcls.split(' ')[2]).no = 1;
    allotValues(tcls, tid);
});
var validate = function (chID) {
    var clas = chID.split(' ')[2];
    if (eval(clas).no > 0) {
        $('.' + clas).removeClass("checked");
    }
}
var allotValues = function (clsnm, idnm) {
    if (clsnm.split(' ')[2] == "fq") {
        if (idnm.split('')[2] == 1)
            feedback["food quality"] = "good";
        if (idnm.split('')[2] == 2)
            feedback["food quality"] = "okay";
        if (idnm.split('')[2] == 3)
            feedback["food quality"] = "bad";
    }
    if (clsnm.split(' ')[2] == "cl") {
        if (idnm.split('')[2] == 1)
            feedback["cleanliness"] = "good";
        if (idnm.split('')[2] == 2)
            feedback["cleanliness"] = "okay";
        if (idnm.split('')[2] == 3)
            feedback["cleanliness"] = "bad";
    }
    if (clsnm.split(' ')[2] == "atm") {
        if (idnm.split('')[3] == 1)
            feedback["atmosphere"] = "good";
        if (idnm.split('')[3] == 2)
            feedback["atmosphere"] = "okay";
        if (idnm.split('')[3] == 3)
            feedback["atmosphere"] = "bad";
    }
    if (clsnm.split(' ')[2] == "ser") {
        if (idnm.split('')[3] == 1)
            feedback["service"] = "good";
        if (idnm.split('')[3] == 2)
            feedback["service"] = "okay";
        if (idnm.split('')[3] == 3)
            feedback["service"] = "bad";
    }
    if (clsnm.split(' ')[2] == "vm") {
        if (idnm.split('')[2] == 1)
            feedback["value for money"] = "good";
        if (idnm.split('')[2] == 2)
            feedback["value for money"] = "okay";
        if (idnm.split('')[2] == 3)
            feedback["value for money"] = "bad";
    }
}