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


/* ---------------------------------------------------------------
                        Trip Type Filter
 -----------------------------------------------------------------*/
class City{
    constructor(name, relaxation, historical, culture, cuisine,button,mobile_button,selected) {
    this.name = name;
    this.relaxation = relaxation;
    this.history = historical;
    this.culture = culture;
    this.cuisine = cuisine;
    this.button = button;
    this.button_mobile = mobile_button;
    this.selected = selected;
  }

}


var cities = [];
var city = new City('cairo',false,true,true,true,
    document.getElementById('cairo'),document.getElementById('cairo_m'),false);
cities.push(city);
 city = new City('alexandria',false,true,true,true,
    document.getElementById('alexandria'),document.getElementById('alexandria_m'),false);
cities.push(city);
 city = new City('luxour',false,true,true,false,
    document.getElementById('luxour'),document.getElementById('luxour_m'),false);
cities.push(city);
 city = new City('aswan',false,true,true,false,
    document.getElementById('aswan'),document.getElementById('aswan_m'),false);
cities.push(city);
 city = new City('dahab',true,false,false,false,
    document.getElementById('dahab'),document.getElementById('dahab_m'),false);
cities.push(city);
 city = new City('marsa_alam',true,false,true,false,
    document.getElementById('marsa_alam'),document.getElementById('marsa_alam_m'),false);
cities.push(city);
city = new City('siwa',true,false,true,false,
    document.getElementById('siwa'),document.getElementById('siwa_m'),false);
cities.push(city);




var relaxation = false;
var historical = false;
var culture = false ;
var cuisine = false ;


var trip_type = "";
var about_trip = "";

function change_filter(button) {


    var all_disappeared = true;
    if (button.className === "btn btn-outline-info type_btn" || button.className === "btn btn-outline-info type_btn mobile" ) {
        if(button.className === "btn btn-outline-info type_btn")
            button.className = "btn btn-info type_btn";
        else if(button.className === "btn btn-outline-info type_btn mobile")
            button.className = "btn btn-info type_btn mobile";
        if(button.id === "relaxation" || button.id === "relaxation_mobile")
        {
            relaxation = true;
            trip_type +="relaxation/";
        }
        else if(button.id === "historical" || button.id === "historical_mobile")
        {
            historical = true;
            trip_type +="historical/";
        }
        else if(button.id === "culture" || button.id === "culture_mobile")
        {
            culture = true;
            trip_type +="local_culture/";
        }
        else if(button.id === "cuisine" || button.id === "cuisine_mobile")
        {
            cuisine = true;
            trip_type +="local_cuisine/";
        }
    }
    else
    {
        if(button.className === "btn btn-info type_btn")
            button.className = "btn btn-outline-info type_btn";
        else if(button.className === "btn btn-info type_btn mobile")
            button.className = "btn btn-outline-info type_btn mobile";
        if(button.id === "relaxation" || button.id === "relaxation_mobile")
        {
            relaxation = false;
            trip_type =trip_type.replace("relaxation/", "");
        }
        else if(button.id === "historical" || button.id === "historical_mobile")
        {
            historical = false;
            trip_type =trip_type.replace("historical/", "");
        }
        else if(button.id === "culture" || button.id === "culture_mobile")
        {
            culture = false;
            trip_type =trip_type.replace("local_culture/", "");
        }
        else if(button.id === "cuisine" || button.id === "cuisine_mobile")
        {
            cuisine = false;
            trip_type =trip_type.replace("local_cuisine/", "");
        }
    }



    if (relaxation || historical || culture || cuisine)
    {
        for(var i =0; i<cities.length; i++){
            cities[i].button.style.display = "none";
            cities[i].selected = false;
        }
    }
    if (!relaxation && !historical && !culture && !cuisine)
    {
        for( i =0; i<cities.length; i++){
            cities[i].button.style.display = "inline";
            cities[i].selected = false;
        }
    }
    if(relaxation){
        for( i =0; i<cities.length; i++){
            if(cities[i].relaxation)
            {
                cities[i].button.style.display = "inline";
                cities[i].selected = true;
            }
                
        }
    }

    if(historical){
        for( i =0; i<cities.length; i++){
            if(cities[i].history)
            {
                cities[i].button.style.display = "inline";
                cities[i].selected = true;
            }
        }
    }

    if(culture){
        for( i =0; i<cities.length; i++){
            if(cities[i].culture)
            {
                cities[i].button.style.display = "inline";
                cities[i].selected = true;
            }
        }
    }

    if(cuisine){
        for( i =0; i<cities.length; i++){
            if(cities[i].cuisine)
            {
                cities[i].button.style.display = "inline";
                cities[i].selected = true;
            }
        }
    }
    /*
    for( i =0; i<cities.length; i++){
        if(relaxation && !historical && !culture && !cuisine) //relaxation
        {
            if(cities[i].relaxation)
                cities[i].button.style.display = "inline";
        }
        else if(relaxation && historical && !culture && !cuisine) //relaxation and historical
        {
            if(cities[i].relaxation && cities[i].history)
                cities[i].button.style.display = "inline";
        }
        else if(relaxation && historical && culture && !cuisine) //relaxation and historical and culture
        {
            if(cities[i].relaxation && cities[i].history && cities[i].culture)
                cities[i].button.style.display = "inline";
        }
        else if(relaxation && historical && culture && cuisine) //all
        {
            if(cities[i].relaxation && cities[i].history && cities[i].culture && cities[i].cuisine)
                cities[i].button.style.display = "inline";
        }
        else if(!relaxation && historical && !culture && !cuisine) // historical
        {
            if(cities[i].history)
                cities[i].button.style.display = "inline";
        }
        else if(!relaxation && historical && culture && !cuisine) //historical and culture
        {
            if(cities[i].history && cities[i].culture)
                cities[i].button.style.display = "inline";
        }
        else if(!relaxation && historical && culture && cuisine) // historical and culture and cuisine
        {
            if(cities[i].history && cities[i].culture && cities[i].cuisine)
                cities[i].button.style.display = "inline";
        }
        else if(!relaxation && !historical && culture && !cuisine) //culture
        {
            if(cities[i].culture)
                cities[i].button.style.display = "inline";
        }
        else if(!relaxation && !historical && culture && cuisine) //culture and cuisine
        {
            if(cities[i].culture && cities[i].cuisine)
                cities[i].button.style.display = "inline";
        }
        else if(!relaxation && !historical && !culture && cuisine) //cuisine
        {
            if(cities[i].cuisine)
                cities[i].button.style.display = "inline";
        }
        else if(relaxation && !historical && culture && !cuisine) //relaxation and culture
        {
            if(cities[i].relaxation && cities[i].culture)
                cities[i].button.style.display = "inline";
        }
        else if(relaxation && !historical && culture && cuisine) //relaxation and culture and cuisine
        {
            if(cities[i].relaxation && cities[i].culture && cities[i].cuisine)
                cities[i].button.style.display = "inline";
        }
        else if(relaxation && !historical && !culture && cuisine) //relaxation and cuisine
        {
            if(cities[i].relaxation && cities[i].cuisine)
                cities[i].button.style.display = "inline";
        }
        else if(!relaxation && historical && !culture && cuisine) // historical and cuisine
        {
            if(cities[i].history && cities[i].cuisine)
                cities[i].button.style.display = "inline";
        }
        else if(relaxation && !historical && culture && cuisine) //relaxation and historical and cuisine
        {
            if(cities[i].relaxation && cities[i].history && cities[i].cuisine)
                cities[i].button.style.display = "inline";
        }


    }

    */
        for( i =0; i<cities.length; i++){
            if(cities[i].button.style.display !== "none")
            {
                all_disappeared = false;
                break;
            }
        }
        if(all_disappeared){
            document.getElementById('whereToGo').style.display = 'none';
        }
        else
        {
            document.getElementById('whereToGo').style.display = 'inline';
        }

        if(trip_type != ""){
            document.getElementById('trip_type_error').style.display = 'none';
        }

}




/* ---------------------------------------------------------------
                        Tab change
 -----------------------------------------------------------------*/
var submitting = false;
var authenticated = false;
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //To be on the top of the tab

  // ... and fix the Previous/Next buttons:
  if (n === 0) {
    document.getElementById("previous").style.display = "none";
  } else {
    document.getElementById("previous").style.display = "inline";
  }
  if (n === (x.length - 1)) {
      if(document.getElementById('signup_div').style.display === 'inline'){
        document.getElementById("next").style.display = "inline";
        document.getElementById("next").innerHTML = "Sign Up and Send Request";
      }
      else if(document.getElementById('signin_div').style.display === 'inline'){
        document.getElementById("next").style.display = "inline";
        document.getElementById("next").innerHTML = "Send Request";
      }
      else{
        document.getElementById("next").style.display = "none";
      } 
  } else {
    document.getElementById("next").style.display = "inline";
    document.getElementById("next").innerHTML = "Next"; 
  }

  //to display cities to begin from in tab 3
    if(n===2){
        for(var i=0;i<cities.length;i++){
            document.getElementById(cities[i].name+"_tab3").style.display = 'none';
            if(cities[i].selected){
                document.getElementById(cities[i].name+"_tab3").style.display = "inline";
            }
            if(!cities[i].selected)
            {
                document.getElementById(cities[i].name+"_in").checked = false;
            }
        }
    }
    if(n===2 &&authenticated){
        document.getElementById("next").innerHTML = "Send Request";
    }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
  var navOffset = 100;
  var div_postion = $("#title").offset().top - navOffset;
  $('html, body').animate({
      scrollTop: div_postion
  }, 750); // 1000 for scroll speed
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
    
    // put it in the  valid function when complete
    if(currentTab===3 && n===1 && isValid()){
        document.getElementsByClassName("step")[currentTab].className += " finish";
        if(document.getElementById('next').innerHTML === "Sign In")
        {
            var email =document.getElementById('email_input').value;
            var password = document.getElementById('password_input_signin').value;
                $.ajax({
                type: "POST",
                url: 'ajax_signIn/',
                data:{email,password},
                success: function (auth) {
                    if(auth==="yes"){
                        authenticated = true;
                        document.getElementById('password_succes_signin').style.display = "inline"
                        document.getElementById('next').innerHTML = "Send Request";
                    }   
                    else{
                        authenticated = false;
                        document.getElementById('password_error_signin').style.display = "inline";
                        document.getElementById('password_error_signin').innerHTML = "Error!!: Invalid Password"; 
                    }      
                }
            });
        }
        else if(authenticated){
            submitting = true;
            document.getElementsByClassName("step")[currentTab].className += " finish";
            document.getElementById('trip_type').value = trip_type;
            document.getElementById('about_trip').value = about_trip;
            document.getElementById('country_complete').value = $('#address-country').find(":selected").text();
            $("input[name=csrfmiddlewaretoken]").val(getCookie('csrftoken'));   
            document.forms['design_form'].submit();
        }
        else if(document.getElementById('next').innerHTML === "Sign Up and Send Request"){
            submitting = true;
            document.getElementsByClassName("step")[currentTab].className += " finish";
            document.getElementById('trip_type').value = trip_type;
            document.getElementById('about_trip').value = about_trip;
            document.getElementById('country_complete').value = $('#address-country').find(":selected").text();
            $("input[name=csrfmiddlewaretoken]").val(getCookie('csrftoken'));   
            document.forms['design_form'].submit();
        }

       
    }
    else if(currentTab===2 && n===1 && authenticated && isValid()){
        submitting = true;
        document.getElementsByClassName("step")[currentTab].className += " finish";
        document.getElementById('trip_type').value = trip_type;
        document.getElementById('about_trip').value = about_trip;
        document.getElementById('country_complete').value = $('#address-country').find(":selected").text();
        document.forms['design_form'].submit();
    }
    else if(currentTab!==3 && n===1 && isValid()){
            document.getElementsByClassName("step")[currentTab].className += " finish";
            x[currentTab].style.display = "none";
            currentTab = currentTab + n;
            showTab(currentTab);
    }
    else if(n===-1)
    {
        document.getElementsByClassName("step")[currentTab-1].classList.remove("finish");
        x[currentTab].style.display = "none";
        currentTab = currentTab + n;
        showTab(currentTab);
    }
  
}



    

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function step_button(n) {
     // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
if(n<currentTab){
    x[currentTab].style.display = "none";
    currentTab = n;
    showTab(n);
}
    
}

	$('.number').each(function () {
	  $(this).number();
	});

// function to get month for the next year in array to be in the drop list

function monthList(){
    var date = new Date();
    var current_year = date.getFullYear();
    var current_month = date.getMonth() + 2; // add one for index and one to be at the next month
    var monthlist = [];
    for(var i = 0;i<10;i++){

        if(current_month ==1){
            monthlist.push('January '+String(current_year));
            current_month++;
        }
        else if(current_month ==2){
            monthlist.push('February '+String(current_year));
            current_month++;
        }
        else if(current_month ==3){
            monthlist.push('March '+String(current_year));
            current_month++;
        }
        else if(current_month ==4){
            monthlist.push('April '+String(current_year));
            current_month++;
        }
        else if(current_month ==5){
            monthlist.push('May '+String(current_year));
            current_month++;
        }
        else if(current_month ==6){
            monthlist.push('June '+String(current_year));
            current_month++;
        }
        else if(current_month ==7){
            monthlist.push('July '+String(current_year));
            current_month++;
        }
        else if(current_month ==8){
            monthlist.push('August '+String(current_year));
            current_month++;
        }
        else if(current_month ==9){
            monthlist.push('September '+String(current_year));
            current_month++;
        }
        else if(current_month ==10){
            monthlist.push('October '+String(current_year));
            current_month++;
        }
        else if(current_month ==11){
            monthlist.push('November '+String(current_year));
            current_month++;
        }
        else if(current_month ==12){
            monthlist.push('December '+String(current_year));
            current_month=1;
            current_year++;
        }
    }
    return monthlist;
}
var monthlist = monthList();
for(var i=0;i<10;i++){
    document.getElementById("option"+String(i+1)).value = monthlist[i];
    document.getElementById("option"+String(i+1)).innerHTML = monthlist[i];
}
var period_options = ['Give me a suggestion','Less than a week','1 week','2 weeks',
                        '3 weeks','More than 3 week'];
for(var i=0;i<6;i++){
    document.getElementById('op'+String(i+1)).value = period_options[i];
    document.getElementById('op'+String(i+1)).innerHTML = period_options[i];
}



//Display Only Date till today //

    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;     // getMonth() is zero-based
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
       month = '0' + month.toString();
    if(day < 10)
       day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;
    $('#arrival_date').attr('min', maxDate);
    document.getElementById('departure_date').disabled = true;


function adjustDate(date) {
        if(!Date.parse(date.value))
        {
            document.getElementById('departure_date').value = null;
            document.getElementById('departure_date').disabled = true;  
        }
        else{
            document.getElementById('departure_date').disabled = false;
            $('#departure_date').attr('min', date.value);
        }   
}


function showQuestion(radio) {
    var questions = document.getElementsByClassName('variable_question')
    for(var i =0; i<questions.length;i++)
    {
        questions[i].style.display = 'none';
    }
    // to reser hidden questions not so not go get to me at database
    document.getElementById('number_adult').value = 1;
    document.getElementById('number_children').value = 0;
    var couple_radios = $("input[name=couple_question]");
        for(var i =0; i<couple_radios.length;i++)
        {
            couple_radios[i].checked = false;
        }

    if(radio.id === "couple"){
        document.getElementById('couple_question').style.display = 'inline';
    }
    else if(radio.id === "family" || radio.id === "friends"){
        
        document.getElementById('number_people').style.display = 'inline';
    }
        
}

function showQuestion2(radio) {
    var questions = document.getElementsByClassName('variable_question2')
    for(var i =0; i<questions.length;i++)
    {
        questions[i].style.display = 'none';
    }
    document.getElementById('arrival_date').valueAsDate = null;
    document.getElementById('departure_date').valueAsDate = null;
    document.getElementById('arrival_date').disabled = true;
    document.getElementById('departure_date').disabled = true;
    document.getElementById('month').value = "";
    document.getElementById('period').value = "";
    if(radio.id === "date_yes"){
        document.getElementById('exact_dates').style.display = 'inline';
        document.getElementById('arrival_date').disabled = false;
    }
    else if(radio.id === "date_no")
    {
        document.getElementById('notSure_date').style.display = 'inline';
    }
        
}


$( document ).ready(function() {

    document.getElementById('additional_info_textarea').value = "";

    var radio = $("input:radio");
    for(var i =0; i<radio.length;i++)
    {
        radio[i].checked = false;
    }
    var checkbox = $("input[type=checkbox]");
    for(var i =0; i<checkbox.length;i++)
    {
        checkbox[i].checked = false;
    }
    var numbers = $("input[type=number]");
    for(var i =0; i<numbers.length;i++)
    {
        numbers[i].value = 0;
    }
    document.getElementById('number_adult').value = 1;
    var dates = $("input[type=date]");
    for(var i =0; i<dates.length;i++)
    {
        dates[i].valueAsDate = null;
        dates[i].disabled =true;
    }
    var text = $("input[type=text]");
    for(var i =0; i<text.length;i++)
    {
        text[i].value =""
    }
    var passwords = $("input[type=password]");
    for(var i =0; i<passwords.length;i++)
    {
        passwords[i].value =""
    }
    // to fix where to begin question render error
    var screenWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth; 
    if(screenWidth<767){
        document.getElementById('wheretobegin_div').classList.replace('col-2','col-md');
        document.getElementById('guide_time_div').classList.replace('col-3','col-md');
        document.getElementById('next').classList.add("btn-sm");
        document.getElementById('previous').classList.add("btn-sm");
    }

    //tab 4 icons

    document.getElementById('email_checked').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('password_view_signup').style.display = 'none';
    document.getElementById('password_view_signup2').style.display = 'none';
    document.getElementById('password_view_signin').style.display = 'none';
    document.getElementById('email_input').value = "";
    document.getElementById('address-country').value = "";
    document.getElementById('email_input').value = "";
    document.getElementById('password_input_signin').value ="";

    $.ajax({
        type: "POST",
        url: 'ajax_check_auth/',
        success: function (auth) {
            if(auth==="yes")
            {
                document.getElementById('step4').style.display = "none";
                authenticated = true;
            }
            else
                authenticated = false;
        }
    });
    

});

/* ---------------------------------------------------------------
                         Function to remove error msg 
 -----------------------------------------------------------------*/

 function checkbox_error(pressed_checkbox){
    var checkbox1 = document.getElementById('highlights');
    var checkbox2 = document.getElementById('off_the_beaten_track');
    if(checkbox1.checked || checkbox2.checked)
    {
        document.getElementById('about_trip_question_error').style.display = 'none';
        document.getElementById('about_trip_question_error_mobile').style.display = 'none';
    }
    if(pressed_checkbox.checked)
        about_trip += pressed_checkbox.value+"/";
    else
        about_trip = about_trip.replace(pressed_checkbox.value+"/","");
 }

 function budget_error(){
    var budget = document.getElementById('budget');
    if(budget.value > "0")
        document.getElementById('budget_error').style.display = 'none';
        document.getElementById('budget_error_mobile').style.display = 'none';
 }

 function Tab2_first_question(){
    document.getElementById('people_question_error').style.display = 'none';
    document.getElementById('people_question_error_mobile').style.display = 'none';
 }

 function Tab2_couple_question(){
    document.getElementById('couple_question_error').style.display = 'none';
    document.getElementById('couple_question_error_mobile').style.display = 'none';
 }

 function Tab2_number_question(){
    var number_adult = document.getElementById('number_adult').value;
    var number_children = document.getElementById('number_children').value;
    if(number_adult>"1" || number_children>"0"){
        document.getElementById('number_people_error').style.display = 'none';
        document.getElementById('number_people_error_mobile').style.display = 'none';
    } 
 }
 function Tab2_exact_question(){
        document.getElementById('exactTime_question_error').style.display = 'none';
        document.getElementById('exactTime_question_error_mobile').style.display = 'none';
 }
 

function Tab2_notSure_questionDrop(){ 
    var month_select = document.getElementById('month').value;
    var period_select = document.getElementById('period').value;
    if(month_select!="" && period_select!="")
    {
        document.getElementById('notSure_date_error').style.display = 'none';
        document.getElementById('notSure_date_error_mobile').style.display = 'none';
    }
}

function Tab2_calender(){
    var arrival_date = document.getElementById('arrival_date').valueAsDate;
    var departure_date = document.getElementById('departure_date').valueAsDate;
    if(arrival_date!=null && departure_date!=null)
    {
        document.getElementById('exact_dates_error').style.display = 'none';
        document.getElementById('exact_dates_error_mobile').style.display = 'none';
    }
}
function Tab3_wheretobegin(){
    
        document.getElementById('whereTobeginTrip_question_error').style.display = 'none';
        document.getElementById('whereTobeginTrip_question_error_mobile').style.display = 'none';
}
function Tab3_language(){
    
    document.getElementById('language_question_error').style.display = 'none';
    document.getElementById('language_question_error_mobile').style.display = 'none';
}
function Tab3_agenttime(){
    
    document.getElementById('guide_time_question_error').style.display = 'none';
    document.getElementById('guide_time_question_error_mobile').style.display = 'none';
}
function Tab3_welcome(){
    
    document.getElementById('welcome_question_error').style.display = 'none';
    document.getElementById('welcome_question_error_mobile').style.display = 'none';
}
function Tab3_byebye(){
    
    document.getElementById('byebye_question_error').style.display = 'none';
    document.getElementById('byebye_question_error_mobile').style.display = 'none';
}
function Tab3_car(){
    
    document.getElementById('car_question_error').style.display = 'none';
    document.getElementById('car_question_error_mobile').style.display = 'none';
}
function Tab3_camera(){
    
    document.getElementById('camera_question_error').style.display = 'none';
    document.getElementById('camera_question_error_mobile').style.display = 'none';
}

function Tab4_password_signup(password){
    var reg = /^(.{0,7}|[^0-9]*)$/;
    var password2 = document.getElementById('password_input_signup2');
    if(password.value!=="")
        document.getElementById('password_error').style.display = 'none';
    if(reg.test(password.value) && password.value!==""){
        if(password.value===password2.value){
            document.getElementById('password_notStrong2').style.display = 'none';
        }
        document.getElementById('password_notStrong').style.display = 'inline';
    }
    else{
        if(password.value===password2.value){
            document.getElementById('password_notStrong2').style.display = 'none';
        }
        document.getElementById('password_notStrong').style.display = 'none';
        return true;
    }
}
function Tab4_password_signup2(password){
    var password1 = document.getElementById('password_input_signup');
    if(password.value!=="")
        document.getElementById('password_error2').style.display = 'none';
    if(password1.value!==password.value){
        document.getElementById('password_notStrong2').style.display = 'inline';
    }
    else{
        document.getElementById('password_notStrong2').style.display = 'none';
    }
}  
function Tab4_title(){
    document.getElementById('title_question_error').style.display = 'none';
}
function Tab4_first_name(first_name){
    
    if(first_name.value!=="")
        document.getElementById('first_name_error').style.display = 'none';
}
function Tab4_last_name(last_name){
    
    if(last_name.value!=="")
        document.getElementById('last_name_error').style.display = 'none';
}
function Tab4_country(country){
    
    if(country.value!=="")
        document.getElementById('country_question_error').style.display = 'none';
}
function Tab4_phone(phone){
    
    if(phone.value!=="")
        document.getElementById('mobile_error').style.display = 'none';
}
function Tab4_birthday(birthday){
    
    if(birthday.valueAsDate!==null)
        document.getElementById('birthDay_question_error').style.display = 'none';
}

function Tab4_password_signin(password){

    if(password.value!=="")
        document.getElementById('password_error_signin').style.display = 'none';
}

/* ---------------------------------------------------------------
                        Validation Function
 -----------------------------------------------------------------*/

function isValid(){
    var valid = true;
    var ScreenWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth; // the or for all clients 
    if(currentTab == 0){
        var checkbox1 = document.getElementById('highlights');
        var checkbox2 = document.getElementById('off_the_beaten_track');
        var budget = document.getElementById('budget')
        // trip type question
        if(trip_type == ""){
            
            if(ScreenWidth>767)
            {
                document.getElementById('trip_type_error').style.display = 'inline';
                document.getElementById('trip_type_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('trip_type_error').style.display = 'none';
                document.getElementById('trip_type_error_mobile').style.display = 'inline';
            }
            valid = false;
            //for scrooling to show error
            var navOffset = 100;
            var div_postion = $("#TripType").offset().top - navOffset;
            $('html, body').animate({
                scrollTop: div_postion
            }, 1000);  
        }
        //about trip question
        if(!checkbox1.checked && !checkbox2.checked)
        {
            if(ScreenWidth>767)
            {
                document.getElementById('about_trip_question_error').style.display = 'inline';
                document.getElementById('about_trip_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('about_trip_question_error').style.display = 'none';
                document.getElementById('about_trip_question_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#about_trip_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000);
            }
            valid = false;
        }
        //bufget question
        if(budget.value === "0"){
            if(ScreenWidth>767)
            {
                document.getElementById('budget_error').style.display = 'inline';
                document.getElementById('budget_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('budget_error').style.display = 'none';
                document.getElementById('budget_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#budget_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000);
            }
            valid = false;
        }
        return valid ;
    }
    else if(currentTab == 1){
        // first question
        var solo = document.getElementById('solo').checked;
        var couple = document.getElementById('couple').checked;
        var family = document.getElementById('family').checked;
        var friends = document.getElementById('friends').checked;
        if(!solo && !couple && !family && !friends)
        {
            if(ScreenWidth>767)
            {
                document.getElementById('people_question_error').style.display = 'inline';
                document.getElementById('people_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('people_question_error').style.display = 'none';
                document.getElementById('people_question_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#people_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        // second question when choose couple in first
        var couple_question = document.getElementById('')
        var vacation = document.getElementById('vacation').checked;
        var honey_moon = document.getElementById('honey_moon').checked;
        var other = document.getElementById('other').checked;
        if(!vacation && !honey_moon && !other && $('#couple_question').is(':visible'))
        {
            if(ScreenWidth>767)
            {
                document.getElementById('couple_question_error').style.display = 'inline';
                document.getElementById('couple_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('couple_question_error').style.display = 'none';
                document.getElementById('couple_question_error_mobile').style.display = 'inline';
            }       
            //for scrolling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#couple_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        // numbers question when choose family or friends in first
        var adult_number = document.getElementById('number_adult').value;
        var children_number = document.getElementById('number_children').value;
        if(adult_number ==1 && children_number==0 && $('#number_people').is(':visible'))
        {
            if(ScreenWidth>767)
            {
                document.getElementById('number_people_error').style.display = 'inline';
                document.getElementById('number_people_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('number_people_error').style.display = 'none';
                document.getElementById('number_people_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#number_people").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        // question to check for exact date
        var date_yes = document.getElementById('date_yes').checked;
        var date_no = document.getElementById('date_no').checked;
        if(!date_yes && !date_no)
        {
            if(ScreenWidth>767)
            {
                document.getElementById('exactTime_question_error').style.display = 'inline';
                document.getElementById('exactTime_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('exactTime_question_error').style.display = 'none';
                document.getElementById('exactTime_question_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#exactTime_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        // question to check for exact date
        var month_select = document.getElementById('month').value;
        var period_select = document.getElementById('period').value;
        if((month_select =="" || period_select=="") && $('#notSure_date').is(':visible'))
        {
            if(ScreenWidth>767)
            {
                document.getElementById('notSure_date_error').style.display = 'inline';
                document.getElementById('notSure_date_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('notSure_date_error').style.display = 'none';
                document.getElementById('notSure_date_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#notSure_date").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        var arrival_date = document.getElementById('arrival_date').valueAsDate;
        var departure_date = document.getElementById('departure_date').valueAsDate;
        if((arrival_date ==null || departure_date==null) && $('#exact_dates').is(':visible'))
        {
            if(ScreenWidth>767)
            {
                document.getElementById('exact_dates_error').style.display = 'inline';
                document.getElementById('exact_dates_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('exact_dates_error').style.display = 'none';
                document.getElementById('exact_dates_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#exact_dates").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        return valid;
    }
    else  if(currentTab == 2){

        // first to check for where to begin trip 
        var cario_in = document.getElementById('cairo_in').checked;
        var alexandria_in = document.getElementById('alexandria_in').checked;
        var luxour_in = document.getElementById('luxour_in').checked;
        var aswan_in = document.getElementById('aswan_in').checked;
        var dahab_in = document.getElementById('dahab_in').checked;
        var marsa_alam_in = document.getElementById('marsa_alam_in').checked;
        var siwa_in = document.getElementById('siwa_in').checked;
        if(!cario_in && !alexandria_in && !luxour_in && !aswan_in && !dahab_in && !marsa_alam_in && !siwa_in)
        {
            if(ScreenWidth>767)
            {
                document.getElementById('whereTobeginTrip_question_error').style.display = 'inline';
                document.getElementById('whereTobeginTrip_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('whereTobeginTrip_question_error').style.display = 'none';
                document.getElementById('whereTobeginTrip_question_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#whereTobeginTrip_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        // second to check for the guide language
        var english = document.getElementById('english').checked;
        var french = document.getElementById('french').checked;
        if(!english && !french)
        {
            if(ScreenWidth>767)
            {
                document.getElementById('language_question_error').style.display = 'inline';
                document.getElementById('language_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('language_question_error').style.display = 'none';
                document.getElementById('language_question_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#language_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        // third to check for the guide time
        var from9to5 = document.getElementById('from9to5').checked;
        var from5to12 = document.getElementById('from5to12').checked;
        if(!from9to5 && !from5to12)
        {
            if(ScreenWidth>767)
            {
                document.getElementById('guide_time_question_error').style.display = 'inline';
                document.getElementById('guide_time_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('guide_time_question_error').style.display = 'none';
                document.getElementById('guide_time_question_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#guide_time_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        // forth to check if he want us to welcome him
        var welcome_yes = document.getElementById('welcome_yes').checked;
        var welcome_no = document.getElementById('welcome_no').checked;
        if(!welcome_yes && !welcome_no)
        {
            if(ScreenWidth>767)
            {
                document.getElementById('welcome_question_error').style.display = 'inline';
                document.getElementById('welcome_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('welcome_question_error_mobile').style.display = 'none';
                document.getElementById('welcome_question_error').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#welcome_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        // fifth to check if he want us to byebye him
        var byebye_yes = document.getElementById('byebye_yes').checked;
        var byebye_no = document.getElementById('byebye_no').checked;
        if(!byebye_yes && !byebye_no)
        {
            if(ScreenWidth>767)
            {
                document.getElementById('byebye_question_error').style.display = 'inline';
                document.getElementById('byebye_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('byebye_question_error').style.display = 'none';
                document.getElementById('byebye_question_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#byebye_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        // sixth to check if he want car
        var car_yes = document.getElementById('car_yes').checked;
        var car_no = document.getElementById('car_no').checked;
        if(!car_yes && !car_no)
        {
            if(ScreenWidth>767)
            {
                document.getElementById('car_question_error').style.display = 'inline';
                document.getElementById('car_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('car_question_error').style.display = 'none';
                document.getElementById('car_question_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#car_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        // seventh to check if he want a camera
        var camera_yes = document.getElementById('camera_yes').checked;
        var camera_no = document.getElementById('camera_no').checked;
        if(!camera_yes && !camera_no)
        {
            if(ScreenWidth>767)
            {
                document.getElementById('camera_question_error').style.display = 'inline';
                document.getElementById('camera_question_error_mobile').style.display = 'none';
            }
            else
            {
                document.getElementById('camera_question_error').style.display = 'none';
                document.getElementById('camera_question_error_mobile').style.display = 'inline';
            }       
            //for scrooling to show error
            if(valid){
                var navOffset = 100;
                var div_postion = $("#camera_question").offset().top - navOffset;
                $('html, body').animate({
                    scrollTop: div_postion
                }, 1000); // 1000 for scroll speed
            }
            valid = false;
        }
        return valid;
    }
    else if(currentTab == 3){
        if(document.getElementById('signup_div').style.display==="inline"){
            // password question
            var password_input_signup = document.getElementById('password_input_signup');
            if(password_input_signup.value==="")
            {
                document.getElementById('password_error').style.display = 'inline';   
                //for scrooling to show error
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#password_div_signup").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }
            else if(!password_IsStrong(password_input_signup)){
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#password_div_signup").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }
            //password 2 question
            var password_input_signup2 = document.getElementById('password_input_signup2');
            if(password_input_signup2.value==="")
            {
                document.getElementById('password_error2').style.display = 'inline';   
                //for scrooling to show error
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#password_div_signup2").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }
            else if(password_input_signup.value!==password_input_signup2.value){
                document.getElementById('password_notStrong2').style.display = 'inline';
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#password_div_signup2").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }

            // title question
            var ms = document.getElementById('ms').checked;
            var mr = document.getElementById('mr').checked;
            if(!ms && !mr)
            {
                document.getElementById('title_question_error').style.display = 'inline';   
                //for scrooling to show error
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#title_question").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }
            // first name question
            var first_name = document.getElementById('first_name').value;
            
            if(first_name==="")
            {
                document.getElementById('first_name_error').style.display = 'inline';   
                //for scrooling to show error
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#name_question").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }
            // lastname question
            var last_name = document.getElementById('last_name').value;
            if(last_name ==="")
            {
                document.getElementById('last_name_error').style.display = 'inline';   
                //for scrooling to show error
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#name_question").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }
            // country question
            var country = document.getElementById('address-country').value;
            if(country ==="")
            {
                document.getElementById('country_question_error').style.display = 'inline';   
                //for scrooling to show error
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#country_question").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }
            // phone question
            var phone = document.getElementById('phone').value;
            if(phone ==="")
            {
                document.getElementById('mobile_error').style.display = 'inline';   
                //for scrooling to show error
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#country_question").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }
            else if(document.querySelector("#valid-msg").style.display!=="inline"){
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#country_question").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }
            // birthday question
            var birthday = document.getElementById('birthday').valueAsDate;
            if(birthday === null)
            {
                document.getElementById('birthDay_question_error').style.display = 'inline';   
                //for scrooling to show error
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#birthDay_question").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }  
        }
        else if(document.getElementById('signin_div').style.display==="inline"){
            // password question
            var password_input_signin = document.getElementById('password_input_signin');
            if(password_input_signin.value==="")
            {
                document.getElementById('password_error_signin').style.display = 'inline';   
                //for scrooling to show error
                if(valid){
                    var navOffset = 100;
                    var div_postion = $("#password_div_signin").offset().top - navOffset;
                    $('html, body').animate({
                        scrollTop: div_postion
                    }, 1000); // 1000 for scroll speed
                }
                valid = false;
            }
        }
        return valid;
    }

 }



 // function to hide bugs when resizing window
 window.addEventListener('resize', function () {
    var screenWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth; // the or for all clients
        var mobile_errors = document.getElementsByClassName('error_message_mobile');
        var windows_errors = document.getElementsByClassName('error_message');
    if(screenWidth>767){
        
        for(var i =0; i<windows_errors.length;i++)
        {
            if(mobile_errors[i].style.display==='inline')
            {
                mobile_errors[i].style.display ='none';
                windows_errors[i].style.display = 'inline';
            }
        }
        if( document.getElementById('wheretobegin_div').classList.contains("col-md"))
            document.getElementById('wheretobegin_div').classList.replace('col-md','col-3');
        if( document.getElementById('guide_time_div').classList.contains("col-md"))    
            document.getElementById('guide_time_div').classList.replace('col-md','col-3');
    }
    else{
        for(var i =0; i<windows_errors.length;i++)
        {   
            if(windows_errors[i].style.display==='inline')
            {
                mobile_errors[i].style.display ='inline';
                windows_errors[i].style.display = 'none';
            }
        }
        if( document.getElementById('wheretobegin_div').classList.contains('col-3'))
            document.getElementById('wheretobegin_div').classList.replace('col-3','col-md');
        if( document.getElementById('guide_time_div').classList.contains("col-3"))    
            document.getElementById('guide_time_div').classList.replace('col-3','col-md');
    }  
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
  utilsScript: "../static/design_form/intl-tel-input-master/build/js/utils.js?1549804213570"
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
        document.getElementById('mobile_complete').value = iti.getNumber();
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

  
/// fucntion to toggle password 
function toggle_password(img){
    var password_signin = document.getElementById('password_input_signin');
    var password_signup = document.getElementById('password_input_signup');
    var password_signup2 = document.getElementById('password_input_signup2');
    if(img.id==="password_view_signin"){
        password_signin.type = "password";
        document.getElementById('password_view_signin').style.display = 'none';
        document.getElementById('password_hide_signin').style.display = 'inline';
    }
    else if(img.id==="password_hide_signin"){
        password_signin.type = "text";
        document.getElementById('password_view_signin').style.display = 'inline';
        document.getElementById('password_hide_signin').style.display = 'none';
    }
    else if(img.id==="password_view_signup"){
        password_signup.type = "password";
        document.getElementById('password_view_signup').style.display = 'none';
        document.getElementById('password_hide_signup').style.display = 'inline';
    }
    else if(img.id==="password_hide_signup"){
        password_signup.type = "text";
        document.getElementById('password_view_signup').style.display = 'inline';
        document.getElementById('password_hide_signup').style.display = 'none';
    }
    else if(img.id==="password_view_signup2"){
        password_signup2.type = "password";
        document.getElementById('password_view_signup2').style.display = 'none';
        document.getElementById('password_hide_signup2').style.display = 'inline';
    }
    else if(img.id==="password_hide_signup2"){
        password_signup2.type = "text";
        document.getElementById('password_view_signup2').style.display = 'inline';
        document.getElementById('password_hide_signup2').style.display = 'none';
    }
}

function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField.value) == false)
    {
        document.getElementById('invalid_email').style.display = 'inline';
        return false;
    }
    document.getElementById('invalid_email').style.display = 'none';
    return true;

}



//function to check for user auth to not enter tab 3 if auth


// not to enter ajax function 2 times
var in_ajax = 0;

function checkEmail(){
    var email = document.getElementById('email_input');
    if(validateEmail(email)){
        // code to check for mail with ajax
        emailValue = email.value;
        if ((emailValue != "") && (in_ajax != 1)) {
            in_ajax = 1;
            document.getElementById('checkButton_div').style.display="none";
            document.getElementById('loading').style.display="inline";

            $("#email_info").load('check_email/', {emailValue}, function(email_info) {
                showSubTab(email_info);
                in_ajax = 0;
            });
        } 
    }
}


/// function on change email
function hide_divs(){
    document.getElementById('signin_div').style.display = "none";
    document.getElementById('signup_div').style.display = "none";
    document.getElementById('email_checked').style.display = 'none';
    document.getElementById('checkButton_div').style.display = 'inline';
    document.getElementById('next').style.display = 'none';


    //elemets reset
    document.getElementById('email_info').innerHTML = "";
    document.getElementById('password_input_signin').value = "";
    document.getElementById('password_input_signup').value = "";
    document.getElementById('password_input_signup2').value = "";
    document.getElementById('ms').checked = false;
    document.getElementById('mr').checked = false;
    document.getElementById('first_name').value = "";
    document.getElementById('last_name').value = "";
    document.getElementById('address-country').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('birthday').valueAsDate = null;
}

function password_IsStrong(password){
    // regular expersion for invalid password
    var reg = /^(.{0,7}|[^0-9]*)$/;
    if(reg.test(password.value)){
        document.getElementById('password_notStrong').style.display = 'inline';
        return false;
    }
    else{
        document.getElementById('password_notStrong').style.display = 'none';
        return true;
    }
}

function showSubTab(email_info){

    if(email_info ==="There is already an AmieGoo account set up with this email address"){
        document.getElementById('signin_div').style.display = "inline";
        document.getElementById('signup_div').style.display = "none";
        document.getElementById('next').style.display = 'inline';
        document.getElementById('next').innerHTML = 'Sign In';
        document.getElementById('checkButton_div').style.display = 'none';
        document.getElementById('loading').style.display = "none";
        document.getElementById('email_checked').style.display = 'inline';
    }
    else if(email_info ==="No account with this email found please Create an account")
    {
        document.getElementById('signin_div').style.display = "none";
        document.getElementById('signup_div').style.display = "inline";
        document.getElementById('next').style.display = 'inline';
        document.getElementById('next').innerHTML = 'Sign Up and Send Request';
        document.getElementById('checkButton_div').style.display = 'none';
        document.getElementById('loading').style.display = "none";
        document.getElementById('email_checked').style.display = 'inline';
        document.getElementById('birthday').disabled = false;
    }
}


window.onbeforeunload = function() {
    if(submitting)
        return;
    else
        return confirm('Are You Sure You Want To Leave The Form Before Sending Request ?');
};