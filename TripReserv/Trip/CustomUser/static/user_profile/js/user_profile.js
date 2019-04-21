// to get csrftoken and setup ajax with it 
function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}
$(function () {
    $.ajaxSetup({
        headers: { "X-CSRFToken": getCookie("csrftoken") }
    });
});

var input = document.querySelector("#phone");
var errorMsg = document.querySelector("#error-msg");
var validMsg = document.querySelector("#valid-msg");
var countryData = window.intlTelInputGlobals.getCountryData();
var addressDropdown = document.querySelector("#address-country");



// here, the index maps to the error code returned from getValidationError - see readme
var errorMap = [ "Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

// initialise plugin
var iti = window.intlTelInput(input, {
    nationalMode: true,
    utilsScript: "/static/user_profile/intl-tel-input-master/build/js/utils.js?1549804213570"
});


// populate the country dropdown
for (var i = 0; i < countryData.length; i++) {
var country = countryData[i];
var optionNode = document.createElement("option");
optionNode.value = country.iso2;
var textNode = document.createTextNode(country.name);
optionNode.appendChild(textNode);
addressDropdown.appendChild(optionNode);
}
// set it's initial value
addressDropdown.value = iti.getSelectedCountryData().iso2;
// listen to the telephone input for changes
input.addEventListener('countrychange', function(e) {
addressDropdown.value = iti.getSelectedCountryData().iso2;
});
// listen to the address dropdown for changes
addressDropdown.addEventListener('change', function() {
iti.setCountry(this.value);
});



/////for error and valid msgs
var reset = function() {
input.classList.remove("error");
errorMsg.innerHTML = "";
errorMsg.style.display = 'none';
validMsg.style.display = 'none';
};
// on blur: validate
input.addEventListener('blur', function() {
reset();
if (input.value.trim()) {
if (iti.isValidNumber()) {
    //document.getElementById('mobile_complete').value = iti.getNumber();
    validMsg.style.display = 'inline'
} else {
  input.classList.add("error");
  var errorCode = iti.getValidationError();
  errorMsg.innerHTML = errorMap[errorCode];
  errorMsg.style.display = 'inline';
}
}
});

// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);



function showhide(button,trip_id) {
    if(button.innerHTML == "<i id=\"showhideIcon"+String(trip_id)+"\" class=\"fas fa-plus\"></i> Show Full Details"){
        button.innerHTML = "<i id=\"showhideIcon"+String(trip_id)+"\" class=\"fas fa-minus\"></i> Show Summary";
        document.getElementById("summ_div"+String(trip_id)).style.display = "none";
        document.getElementById("full_div"+String(trip_id)).style.display = "inline";
    }
    else if(button.innerHTML == "<i id=\"showhideIcon"+String(trip_id)+"\" class=\"fas fa-minus\"></i> Show Summary"){
        button.innerHTML = "<i id=\"showhideIcon"+String(trip_id)+"\" class=\"fas fa-plus\"></i> Show Full Details";
        document.getElementById("full_div"+String(trip_id)).style.display = "none";
        document.getElementById("summ_div"+String(trip_id)).style.display = "inline";
        //for scrooling to show error
        var navOffset = 100;
        var div_postion = $("#summ_div"+String(trip_id)).offset().top - navOffset;
        $('html, body').animate({
            scrollTop: div_postion
        }, 750);
    }
}

function cancelRequest(trip_id){
    if(confirm("Are You Sure You Want to Cancel Trip Request ??"))
    {
        document.forms['cancel_request_form'].submit();
    }
}

$( document ).ready(function() {
    
    


});