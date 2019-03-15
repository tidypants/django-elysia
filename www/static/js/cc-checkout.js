var currentQuestion = 1;
var answers = {};
var answersObject = {};
var totalQuestions = $('#fullSignupForm').find(".v3-card").length;
var unsaved = false;

setProgressCSS();
setWindowHeight("current");

answers["method"] = "total";

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

$('#disclosureModalLink').click(function() {
    $('.signup__lightbox__background-outer').fadeIn();
});

$('.v3-questions__fast').click(function(event) {
    var card = $(this).closest('.v3-card');
    var answer = event.target.closest("a").id.split("answ")[1];
    var question = card.attr("data-q");
    answers[question] = answer;
    nextQuestion(event);
});

$('.v3-questions__fast-card').click(function(event) {
    var card = $(this).closest('.v3-card');
    var answer = event.target.closest("a").id.split("answ")[1];
    var question = card.attr("data-q");
    answers[question] = answer;
    nextQuestion(event);
});

$('.v3-questions__fast').each(function(event) {
    var span = $(this).find('span');
    if (span.html().split('<br>').length > 2) {
        span.addClass("v3-questions__fast-threeline");
    } else if (span.html().split('<br>').length > 1) {
        span.addClass("v3-questions__fast-twoline");
    }
});

$('.v3-card__next-button').click(function(event) {
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
});

$('.v3-card__back-button').click(function() {
    previousQuestion();
});

$('.v3-questions__meter-modal').click(function() {
    $('.lightboxContentReplace').html($("[id$='ModalContent-" + $(this).attr("data-fuel") + "']").html());
    $('.signup__lightbox__background-outer').fadeIn();
});

$('.v3-lightbox__close').click(function() {
    $('.signup__lightbox__background-outer').fadeOut();
});

function nextQuestion(event) {
    if ($(event.target).hasClass("v3-card__next-button-disabled")) {
        return;
    }
    if ($("#card" + (currentQuestion + 1)).length > 0) {
        checkSends($("#card" + currentQuestion).attr("data-q"));
        currentQuestion++;
        if ($("#card" + currentQuestion).attr("data-skip") === "yes") {
            nextQuestion(event);
            return;
        }
        history.pushState(null, null, '#' + currentQuestion);
        setProgressCSS();
        $("#card" + currentQuestion).addClass("v3-card-next");
        $(".v3-card-next").animate({
            left: '50%'
        }, { duration: 500, queue: false });
        $(".v3-card-current").animate({
            left: '-300%'
        }, { duration: 500, queue: false });
        setWindowHeight("next");
        setTimeout(function() {
            $(".v3-card-current").removeClass("v3-card-current");
            $(".v3-card-next").addClass("v3-card-current");
            $(".v3-card-current").removeClass("v3-card-next");
        }, 500);
    } else {
        $(event.target).html("<div class='loader'></div>");
        checkSends("code");
    }
}

function previousQuestion() {
    currentQuestion--;
    if ($("#card" + currentQuestion).attr("data-skip") === "yes") {
        previousQuestion();
        return;
    }
    history.pushState(null, null, '#' + currentQuestion);
    setProgressCSS()
    $("#card" + currentQuestion).show();
    $("#card" + currentQuestion).css("left","-300%");
    $('.v3-card-current').animate({
        left: '300%'
    }, { duration: 500, queue: false });
    $("#card" + currentQuestion).animate({
        left: '50%'
    }, { duration: 500, queue: false });
    setTimeout(function() {
        $(".v3-card-next").removeClass("v3-card-next");
        $(".v3-card-current").removeClass("v3-card-current");
        $("#card" + currentQuestion).addClass("v3-card-current");
        setWindowHeight("current");
    }, 500);
}

function setWindowHeight(which) {
    var height = $(".v3-card-" + which).height() + 140;
    $(".v3-body").css("height", height + "px");
}

function setProgressCSS() {
    var step1End = 2;
    var step2End = 12;
    $(".v3-progress__step").removeClass("v3-progress__step-current");
    if (currentQuestion <= step1End) {
        $("#step1").addClass("v3-progress__step-current");
    } else if (currentQuestion <= step2End) {
        $("#step2").addClass("v3-progress__step-current");
    } else {
        $("#step3").addClass("v3-progress__step-current");
    }
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

function checkSends(question) {
    switch (question) {
        case "code":
            sendLead();
            break;
        case "charitable":
            runLoading();
    }
}

function submitCard() {
    var leadData = {"csrfmiddlewaretoken": csrf,"birth_day": answers["day"], "birth_month": answers["month"], "birth_year": answers["year"], "email": answers["email"], "first_name": answers["name"]};
    $.post(
        "/postcode-signup?cid=" + cid,
        leadData,
        function (data) {
            eval(data);
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

function runLoading() {
    setTimeout(function() {
        $("#v8loading1").removeClass("v8-loading__current");
        $("#v8loading1").addClass("v8-loading__complete");
        $("#v8loading2").addClass("v8-loading__current");
    }, 2500);
    setTimeout(function() {
        $("#v8loading2").removeClass("v8-loading__current");
        $("#v8loading2").addClass("v8-loading__complete");
        $("#v8loading3").addClass("v8-loading__current");
    }, 5000);
    setTimeout(function() {
        $("#v8loading3").removeClass("v8-loading__current");
        $("#v8loading3").addClass("v8-loading__complete");
    }, 7500);
    setTimeout(function() {
        currentQuestion++;
        history.pushState(null, null, '#' + currentQuestion);
        setProgressCSS();
        $("#card" + currentQuestion).addClass("v3-card-next");
        $(".v3-card-next").animate({
            left: '50%'
        }, { duration: 500, queue: false });
        $(".v3-card-current").animate({
            left: '-300%'
        }, { duration: 500, queue: false });
        setWindowHeight("next");
        setTimeout(function() {
            $(".v3-card-current").removeClass("v3-card-current");
            $(".v3-card-next").addClass("v3-card-current");
            $(".v3-card-current").removeClass("v3-card-next");
        }, 500);
    }, 8500);
}