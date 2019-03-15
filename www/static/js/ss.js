var currentQuestion = 1;
var answers = {};
var answersObject = {};
var totalQuestions = $('#fullSignupForm').find(".v3-card").length;
var unsaved = false;

setWindowHeight("current");

var nameCheckRE = new RegExp("(\\w+)(\\s+)(\\w+)");
$.validator.addMethod("namecheck", function(value, element) {
    return nameCheckRE.test(value);
}, "Please enter your first and last name.");

jQuery.validator.addMethod("exactlength", function(value, element, param) {
    return this.optional(element) || value.length == param;
}, $.validator.format("Please enter exactly {0} characters."));

$.validator.methods.email = function( value, element ) {
    return this.optional( element ) || /[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z0-9_.-]+/.test( value );
};

$('#fullSignupForm').validate({
    onKeyup: true,
    rules: {
        name: {
            required: true,
            minlength: 2
        },
        email: {
            required: true,
            email: true
        },
        day: {
            required: true
        },
        month: {
            required: true
        },
        year: {
            required: true
        }
    }
});

$('.ss-questions__box, .ss-questions__box-small, .ss-questions__box-medium, .ss-questions__fast-card').click(function(event) {
    var card = $(this).closest('.ss-card');
    var answer = event.target.closest("a").id.split("answ")[1];
    var question = card.attr("data-q");
    answers[question] = answer;
	setSkips(question);
    nextQuestion(event);
});

$('.ss-card__next-button').click(function(event) {
    var card = $(this).closest('.ss-card');
    if (card.find('input, select').valid()) {
        var showingForms = card.find('input.valid, select.valid');
        for (index = 0; index < showingForms.length; ++index) {
            var inputSelect = $(showingForms[index]);
            var answer = inputSelect.val();
            var question = inputSelect.attr("name");
            answers[question] = answer;
            if (inputSelect.is("select")) {
                var question_id = inputSelect.attr("name") + "_id";
                var question_name = inputSelect.attr("name") + "_name";
                answers[question_id] = answer;
                answers[question_name] = inputSelect.find("option:selected").text().replace("%", "");
            }
        }
        nextQuestion(event);
    }
});

$('.v3-lightbox__close').click(function() {
    $('.signup__lightbox__background-outer').fadeOut();
});

function nextQuestion(event) {
    if ($("#card" + (currentQuestion + 1)).length > 0) {
        checkSends($("#card" + currentQuestion).attr("data-q"));
        currentQuestion++;
        if ($("#card" + currentQuestion).attr("data-skip") === "yes") {
            nextQuestion(event);
            return;
        }
        history.pushState(null, null, '#' + currentQuestion);
        $("#card" + currentQuestion).addClass("ss-card-next");
        $(".ss-card-next").animate({
            left: '50%'
        }, { duration: 500, queue: false });
        $(".ss-card-current").animate({
            left: '-300%'
        }, { duration: 500, queue: false });
        setWindowHeight("next");
        setTimeout(function() {
            $(".ss-card-current").removeClass("ss-card-current");
            $(".ss-card-next").addClass("ss-card-current");
            $(".ss-card-current").removeClass("ss-card-next");
        }, 500);
    } else {
        $(event.target).html("<div class='loader'></div>");
        checkSends("email");
    }
}

function previousQuestion() {
    currentQuestion--;
    if ($("#card" + currentQuestion).attr("data-skip") === "yes") {
        previousQuestion();
        return;
    }
    history.pushState(null, null, '#' + currentQuestion);
    $("#card" + currentQuestion).show();
    $("#card" + currentQuestion).css("left","-300%");
    $('.ss-card-current').animate({
        left: '300%'
    }, { duration: 500, queue: false });
    $("#card" + currentQuestion).animate({
        left: '50%'
    }, { duration: 500, queue: false });
    setTimeout(function() {
        $(".ss-card-next").removeClass("ss-card-next");
        $(".ss-card-current").removeClass("ss-card-current");
        $("#card" + currentQuestion).addClass("ss-card-current");
        setWindowHeight("current");
    }, 500);
}

function setWindowHeight(which) {
    var height = $(".ss-card-" + which).height() + 140;
    $(".v3-body").css("height", height + "px");
}

function goToQuestion(question) {
    if (question > currentQuestion) {
        currentQuestion = question - 1;
        nextQuestion();
    } else if (question < currentQuestion) {
        currentQuestion = question + 1;
        previousQuestion();
    }
}

function setSkips(question) {
    switch (question) {
        case "star_sign":
            var star_sign = "";
            var first_month = "";
            var last_month = "";
            var first_month_start = 0;
            var first_month_end = 0;
            var last_month_end = 0;
            switch (answers[question]) {
                case "1":
                    star_sign = "Aries";
                    first_month = "March";
                    last_month = "April";
                    first_month_start = 21;
                    first_month_end = 31;
                    last_month_end = 20;
                    break;
                case "2":
                    star_sign = "Taurus";
                    first_month = "April";
                    last_month = "May";
                    first_month_start = 21;
                    first_month_end = 30;
                    last_month_end = 20;
                    break;
                case "3":
                    star_sign = "Gemini";
                    first_month = "May";
                    last_month = "June";
                    first_month_start = 21;
                    first_month_end = 31;
                    last_month_end = 20;
                    break;
                case "4":
                    star_sign = "Cancer";
                    first_month = "June";
                    last_month = "July";
                    first_month_start = 21;
                    first_month_end = 30;
                    last_month_end = 22;
                    break;
                case "5":
                    star_sign = "Leo";
                    first_month = "July";
                    last_month = "August";
                    first_month_start = 23;
                    first_month_end = 31;
                    last_month_end = 22;
                    break;
                case "6":
                    star_sign = "Virgo";
                    first_month = "August";
                    last_month = "September";
                    first_month_start = 23;
                    first_month_end = 31;
                    last_month_end = 21;
                    break;
                case "7":
                    star_sign = "Libra";
                    first_month = "September";
                    last_month = "October";
                    first_month_start = 22;
                    first_month_end = 30;
                    last_month_end = 20;
                    break;
                case "8":
                    star_sign = "Scorpio";
                    first_month = "October";
                    last_month = "November";
                    first_month_start = 21;
                    first_month_end = 31;
                    last_month_end = 20;
                    break;
                case "9":
                    star_sign = "Sagittarius";
                    first_month = "November";
                    last_month = "December";
                    first_month_start = 21;
                    first_month_end = 30;
                    last_month_end = 21;
                    break;
                case "10":
                    star_sign = "Capricorn";
                    first_month = "December";
                    last_month = "January";
                    first_month_start = 22;
                    first_month_end = 31;
                    last_month_end = 21;
                    break;
                case "11":
                    star_sign = "Aquarius";
                    first_month = "January";
                    last_month = "February";
                    first_month_start = 22;
                    first_month_end = 31;
                    last_month_end = 18;
                    break;
                case "12":
                    star_sign = "Pisces";
                    first_month = "February";
                    last_month = "March";
                    first_month_start = 19;
                    first_month_end = 28;
                    last_month_end = 20;
                    break;
            }
            $("#day-1").append("<h3 class='ss-questions__section-title'>" + first_month + "</h3>");
            $("#day-2").append("<h3 class='ss-questions__section-title'>" + last_month + "</h3>");
            var i;
            for (i = parseInt(first_month_start); i <= parseInt(first_month_end); i++) {
                $("#day-1").append("<a class='ss-questions__box-small' id='q2answ" + first_month + "-" + i + "'>" + i + "</a>");
            }
            var j;
            for (j = 1; j <= parseInt(last_month_end); j++) {
                $("#day-2").append("<a class='ss-questions__box-small' id='q2answ" + last_month + "-" + j + "'>" + j + "</a>");
            }
            $("[data-q='day']").find('.ss-questions__box, .ss-questions__box-small, .ss-questions__box-medium').click(function(event) {
                var card = $(this).closest('.ss-card');
                var answer = event.target.closest("a").id.split("answ")[1];
                var question = card.attr("data-q");
                answers[question] = answer;
                setSkips(question);
                nextQuestion(event);
            });
            break;
        case "decade":
            var i2;
            for (i2 = parseInt(answers["decade"]); i2 <= (parseInt(answers["decade"]) + 9); i2++) {
                $("#year-1").append("<a class='ss-questions__box-medium' id='q4answ" + i2 + "'>" + i2 + "</a>");
            }
            $("[data-q='year']").find('.ss-questions__box, .ss-questions__box-small, .ss-questions__box-medium').click(function(event) {
                var card = $(this).closest('.ss-card');
                var answer = event.target.closest("a").id.split("answ")[1];
                var question = card.attr("data-q");
                answers[question] = answer;
                setSkips(question);
                nextQuestion(event);
            });
            break;
        case "day":
            var birth_day = answers["day"].split("-")[1];
            var birth_month = answers["day"].split("-")[0];
            answers["day"] = birth_day;
            switch (birth_month) {
                case "January":
                    answers["month"] = "01";
                    break;
                case "February":
                    answers["month"] = "02";
                    break;
                case "March":
                    answers["month"] = "03";
                    break;
                case "April":
                    answers["month"] = "04";
                    break;
                case "May":
                    answers["month"] = "05";
                    break;
                case "June":
                    answers["month"] = "06";
                    break;
                case "July":
                    answers["month"] = "07";
                    break;
                case "August":
                    answers["month"] = "08";
                    break;
                case "September":
                    answers["month"] = "09";
                    break;
                case "October":
                    answers["month"] = "10";
                    break;
                case "November":
                    answers["month"] = "11";
                    break;
                case "December":
                    answers["month"] = "12";
                    break;
            }
            break;
    }
}

function checkSends(question) {
    console.log("checking sends " + question);
    switch (question) {
        case "email":
            console.log("sending lead");
            sendLead();
            break;
    }
}

function sendLead() {
    var leadData = {"csrfmiddlewaretoken": csrf, "birth_day": answers["day"], "birth_month": answers["month"], "birth_year": answers["year"], "email": answers["email"], "first_name": answers["name"]};
    $.post(
        "/postcode-signup?cid=" + cid,
        leadData,
        function () {
            window.location.href = '/check-email-ss'
        }
    );
}

$("input, select, a").on('keydown', function(e) {
    if (e.keyCode === 9) {
        if ($(this).hasClass("noTab")) {
            e.preventDefault();
        }
    } else if (e.keyCode === 13) {
        var card = $(this).closest('.v3-card');
        if (card.find('input, select').valid()) {
            var showingForms = card.find('input.valid, select.valid');
            for (index = 0; index < showingForms.length; ++index) {
                var inputSelect = $(showingForms[index]);
                var answer = inputSelect.val();
                var question = inputSelect.attr("name");
                answers[question] = answer;
                if (inputSelect.is("select")) {
                    var question_id = inputSelect.attr("name") + "_id";
                    var question_name = inputSelect.attr("name") + "_name";
                    answers[question_id] = answer;
                    answers[question_name] = inputSelect.find("option:selected").text().replace("%", "");
                }
            }
            nextQuestion(event);
        }
    }
});

$(document).ready(function() {
    function unloadPage(){
        if(unsaved){
            return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
        }
    }
    window.onbeforeunload = unloadPage;
});

window.onhashchange = function(event) {
    var url = window.location.href;
    var hash = url.split("#")[1];
    if (hash !== toString(currentQuestion)) {
        if (parseInt(hash) < currentQuestion) {
            previousQuestion();
        }
    }
};
