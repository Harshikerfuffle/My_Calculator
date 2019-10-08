const kwhToJoules = 3.6e+6;
let completenessMeter = 0;

function onloadFunction() {
        if (typeof(Storage) !== "undefined") { // Code for localStorage/sessionStorage.
        if (localStorage.clickcount){
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        } 
        else {localStorage.clickcount = 1;}

        //setting user type 
        let usercount = Number(localStorage.clickcount);
        if (usercount == 1) 
            localStorage.usertype = "Naive";
        if ((usercount > 1) && (usercount < 6)) 
            localStorage.usertype = "Novice";
        if ((usercount >= 6) && (usercount < 11))
            localStorage.usertype = "Typical";
        if (usercount >= 11) 
            localStorage.usertype = "Advanced";

        let userType = localStorage.usertype;
        if (userType == "Typical" || userType == "Advanced") {
            // Show the expand button
            document.getElementById("expand-check-energy").style.display = "block";
        } else {
            document.getElementById("naive").style.display = "block";
        }
    } 
    else {/*Sorry! No Web Storage support.. */}
}

//set user type so that it can be used in HTML for counting
function setUser(userType, clickCount) {
    localStorage.usertype = userType;
    localStorage.clickcount = clickCount;
}

function CalcEnergy() {
    let timecharged = document.getElementById('usertimeinput').value;
    let energy = timecharged * 85 / 1000;
    document.getElementById('showenergy').innerHTML = "Your device used " + energy + " " + "kWh of energy which is " + energy * kwhToJoules + "J in Joules. <br> The cost of your electricity consumption is " + energy * 13.19 + " cents or $ " + energy * 13.19/100 + ".";
}

function myInput() {
    addMore();
    document.getElementById("advanced").style.display = "block";
}

//Javascript for Popover
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});

//function to add more row in the HTML 
function addMore(){
    let expanded = document.getElementById("expanded");
    let divElement = document.createElement("div");
    divElement.innerHTML = '<select id = "dropdown">' +
                    '<option value="desktop">Desktop</option>' + 
                    '<option value="laptop">Laptop</option>' +
                    '<option value="tablet">Tablet</option>' + 
                    '<option value="mobile">Mobile</option>' + 
                    '<option value="smartwatch">Smartwatch</option>' + 
                    '</select>' + 
                    '<input id="userwattinput" placeholder="Enter Power in Watts">' + 
                    '<input id="userhourinput" placeholder="Enter time used in hours">'
    expanded.appendChild(divElement);
//    let select = document.createElement("select");
//    let option1 = document.createElement("option");
//    option1.value = "desktop";
//    option1.innerHTML = "Desktop"
//    let option1 = document.createElement("option");
//    option1.value = "desktop";
//    option1.innerText = "Desktop"
    document.getElementById("progress-bar").style.width = "25%";
}

//function for Advanced Users
function getTotalEnergyInKWh() {
    expanded = document.getElementById("expanded");
    sum = 0;
    for (let i = 0; i < expanded.children.length; i++) {
        let expanded_child = expanded.children[i];
        sum = sum + (expanded_child.children[1].value * expanded_child.children[2].value);
    }
    sum = sum /1000;
    return sum;
}

//function for Advanced Users
function calcTotalEnergy() {
    let energy = getTotalEnergyInKWh();
    document.getElementById('showtotalenergy').innerHTML = "<div>Your devices used a total of " + energy + "kWh of energy which is " + energy * kwhToJoules + " J in Joules.</div>";
    
    document.getElementById("cost").style.display = "block";
    document.getElementById("progress-bar").style.width = "50%";
}

//function for Advanced Users
function calcCostInCents() {
    let energycost = getTotalEnergyInKWh() * 13.19;
    document.getElementById("showtotalcost").innerHTML = "<div> The cost of your electricity consumption is " + energycost + " cents or $ " + energycost/100 + ".</div>";
    document.getElementById("progress-bar").style.width = "75%";
}

//function for Naive Users
function calcTotalEnergyAndCost() {
    let energy = document.getElementById("userwattinput_naive").value * document.getElementById("userhourinput_naive").value;
    
    let energyInKwh = energy/1000;
    let costInCents = energyInKwh * 13.19;
    document.getElementById('showtotalcost_naive').innerHTML = "<div>Your devices used a total of " + energy + "kWh of energy which is " + energy * kwhToJoules + " J in Joules. The cost of your electricity consumption is " + costInCents + " cents or $ " + costInCents/100 + ".</div>";

    document.getElementById("progress-bar").style.width = "100%";
}


