//To filter where to go list on input change
function filter() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    ul.style.display = "";
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
//to hide list on input blur
function myBlurFunc () {
    var ul = document.getElementById("myUL");
    var li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        li[i].style.display = "none";
    }
}
document.addEventListener("click", (evt) => {
    const flyoutElement = document.getElementById("myInput");
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement == flyoutElement) {
            // This is a click inside. Do nothing, just return.
            console.log("Clicked inside!");
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    myBlurFunc();
});
// to copy choosed li text to input
function copyToinput (cityName) {
    var cityName = cityName.innerText;
    var input = document.getElementById("myInput");
    input.value = cityName;

}

