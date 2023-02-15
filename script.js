//Hides refresh button on load, could be optimized in the future
window.onload = function() {
    document.getElementById("refresh").style.display="none";
};

//Clears all the check boxes
function clearBoxes(){
    var checkedBoxes = document.querySelectorAll('input:checked') //Get all the boxes that are checked
    for (var i = 0; i < checkedBoxes.length; i++) { //Run through each checked box and uncheck it
        checkedBoxes[i].checked = false;
    }
}

function getCheckboxLabel(checkbox) {
    if (checkbox.parentNode.tagName === 'LABEL') {
        return checkbox.parentNode
    }
    if (checkbox.id) {
        return document.querySelector('label[for="' + checkbox.id + '"]')
    }
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

//Calculates your score
function calculateScore() {
    var totalChecked = document.querySelectorAll('input[type="checkbox"]:checked') //Gets all the boxes that were checked
    var score = 100 - totalChecked.length //Subtracts the amount of boxes checked from 100, which results in the score

    var college_e = document.getElementById("college");
    var college = college_e.options[college_e.selectedIndex].text;
    var course_e = document.getElementById("course");
    var course = course_e.options[course_e.selectedIndex].text;
    var gender_e = document.getElementById("gender");
    var gender = gender_e.options[gender_e.selectedIndex].text;

    var all_checked = "0".repeat(100);

    totalChecked.forEach(function(x) {
        var i = parseInt(x.name) - 1;
        all_checked = all_checked.replaceAt(i, '1')
    })

    var all_checked_hex = parseInt(all_checked, 2).toString(16);

    // var all_checked = Array.prototype.map.call(totalChecked, function(x) { return [x.name, getCheckboxLabel(x).textContent] });

    gtag('event', 'submit_results', {
        'all_checked': all_checked_hex,
        'score': score,
        'college': college,
        'course': course,
        'gender': gender
      });

    //Associates your score with what it says about you
    var meaning;
    if (score >= 98) {
        meaning = "You&#39re as pure as trinmo that got admitted based on representing their country in the international math olympiad. Or you&#39re an offer holder - try again next year."
    } else if (score >= 94) {
        meaning = "You&#39re definitely a fresher and it shows."
    } else if (score >= 90) {
        meaning = "You&#39re two terms into Cambridge and think you&#39re edgy. Wait 3-4 working weeks until after your first heartbreak before re-taking the test."
    } else if (score >= 80) {
        meaning = "You&#39re either a second year with mild stories most of which you can tell your nan; or a tragically-inexperienced finalist."
    } else if (score >= 70) {
        meaning = "You&#39re beginning to disappoint your parents and you&#39re secretly enjoying it."
    }  else if (score >= 65) {
        meaning = "A hardened finalist? Perhaps even a post-grad that stayed on after their undergrad just to feel something before diving into the cold, cold world of corporate sex."
    }  else if (score >= 60) {
        meaning = "This is giving thunderbolts and lightning very very frightening. You&#39ve either intermitted or are seriously thinking about it."
    } else if (score >= 50) {
        meaning = "You&#39re worthy of a Varsity article dedicated to you and your escapades in this fine establishment. Well done."
    } else if (score >= 1) {
        meaning = "I&#39m not sure how you got below 50, but congratulations - you&#39re a degenerate truly worthy of being at Cambridge. You&#39ll probably get a 2.ii or a 3 and will be happy you passed."
    } else {
        meaning = "Ticking everything just to see what this prompt will be is Oxf*rd behaviour. Or you&#39ve gone out of your way to treat this as a to-do list - post a camfess and I&#39ll buy you a pint or two."
    }

    var scoreDiv = document.getElementById("score"); //Gets the score div which is where the score is displayed
    var meaningDiv = document.getElementById("meaning"); //Gets the score div which is where the score is displayed
    scoreDiv.innerHTML = "Your Score: " + score.toString() //Sets the div text to your score
    meaningDiv.innerHTML = meaning //Sets the div text to your meaning
    document.getElementById("hiding").style.display="inline";
    document.getElementById("refresh").style.display="inline"; //Reveals the refresh page button
    document.body.scrollTop = 0; // Scrolls to top of the page for Safari
    document.documentElement.scrollTop = 0; // Scrolls to the top of the page for Chrome, Firefox, IE, and Opera
}

//Clears the page (clear page button)
function clearPage() {
    clearBoxes() //Calls the clearBoxes function to clear all the boxes
    var scoreDiv = document.getElementById("score"); //Gets the score div which is where the score is displayed
    var meaningDiv = document.getElementById("meaning"); //Gets the score div which is where the score is displayed
    scoreDiv.innerHTML = "" //Makes the score div blank
    meaningDiv.innerHTML = "" //Makes the meaning div blank
    document.getElementById("hiding").style.display="none";
    document.getElementById("refresh").style.display="none"; //Hides the clear page button button
}
