const kwhToJoules = 3.6e+6;

function CalcEnergy() {
    let timecharged = document.getElementById('usertimeinput').value;
    let energy = timecharged * 85 / 1000;
    document.getElementById('showenergy').innerHTML = "Your device used " + energy + " " + "kWh of energy which is " + energy * kwhToJoules + "J in Joules. <br> The cost of your electricity consumption is " + energy * 13.19 + " cents or $ " + energy * 13.19/100 + ".";
}

// Add a Save button to save the value in the input box to local storage.
function saveValue(){
    if (typeof(Storage) !== "undefined") { // Code for localStorage/sessionStorage.
        if (localStorage.clickcount){
            localStorage.clickcount = localStorage.clickcount++;
        } else {
            localStorage.clickcount = 1;
        }
    } 
    else { /* Sorry! No Web Storage support.. */ }
    let numberOfHours = document.getElementById("usertimeinput").value;
    localStorage.setItem("key_numberOfHours", numberOfHours); //Store
}

// Add a Load button to load the value from local storage into the input box.
function loadValue(){
    document.getElementById("usertimeinput").value = localStorage.getItem("key_numberOfHours"); //retrieve
}

function myInput() {
	document.getElementById('expandableContent').style.display='block';
}


