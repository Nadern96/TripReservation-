/*****************Places dropdown menu *******************************/
$('ul.navbar-nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});
/**********************************************************************/

/**********************************************************************/
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// if user press escape button it will close the modal
$(document).keyup(function(e) {
     if (e.key === "Escape") {
         // write your logic here.
        modal.style.display = "none";
    }
});
/************************************************************************/
var sign_in = document.getElementById('sign-in');
function go_SignUp(){
    sign_in.style.display = "none";
    console.log("hello");
}

/************ To make alert message disappear after ***********/
setTimeout(function(){$('.alert').fadeOut();}, 15000);
