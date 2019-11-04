const kwhToJoules = 3.6e+6;
let completenessMeter = 0;

// Code for localStorage/sessionStorage
function onloadFunction() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        } else {
            localStorage.clickcount = 1;
        }

        //SET USER TYPE BASED ON CLICKCOUNT
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
            if (userType === "Advanced") {
                document.getElementById("featured-content").style.display = "flex";
                document.getElementById("OverflowButton").style.display = "block";
            }
        } else if (userType == "Novice") {
            document.getElementById("novice").style.display = "block";

        } else if (userType == "Naive") {
            document.getElementById("naive").style.display = "block";
        }
    } else {
        /*Sorry! No Web Storage support.. */
    }
}

//set user type so that it can be used in HTML for counting
function setUser(userType, clickCount) {
    localStorage.usertype = userType;
    localStorage.clickcount = clickCount;
}

//CALCULATION
function CalcEnergy() {
    let timecharged = document.getElementById('usertimeinput').value;
    let energy = timecharged * 85 / 1000;
    document.getElementById('showenergy').innerHTML = "Your device used " + energy + " " + "kWh of energy which is " + energy * kwhToJoules + "J in Joules. <br> The cost of your electricity consumption is " + energy * 13.19 + " cents or $ " + Number(energy * 13.19 / 100).toFixed(2) + ".";
}

function myInput() {
    addMore();
    document.getElementById("advanced").style.display = "block";
}

//Javascript for Popover
$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});

//function to add more row in the HTML 
function addMore() {
    let expanded = document.getElementById("expanded");
    let divElement = document.createElement("div");
    divElement.innerHTML = '<form class = "form-inline">' + '<select id = "dropdown" class="btn btn-secondary dropdown-toggle mr-3" data-toggle="dropdown">' + '<option value="desktop">Desktop</option>' +
        '<option value="laptop">Laptop</option>' +
        '<option value="tablet">Tablet</option>' +
        '<option value="mobile">Mobile</option>' +
        '<option value="smartwatch">Smartwatch</option>' +
        '</select>' +
        '<input class="form-control mr-3 mb-3 w-25" id="userwattinput" placeholder="Enter Power in Watts" required>' +
        '<input class="form-control mb-3 w-25" id="userhourinput" placeholder="Enter time used in hours" required>' + '</form>'
    expanded.appendChild(divElement);
    document.getElementById("progress-bar").style.width = "25%";
}

//function for Advanced Users
function getTotalEnergyInKWh() {
    expanded = document.getElementById("expanded");
    sum = 0;
    for (let i = 0; i < expanded.children.length; i++) {
        let expanded_child = expanded.children[i];
        sum = sum + (expanded_child.children[0].children[1].value * expanded_child.children[0].children[2].value);
    }
    sum = sum / 1000;
    return sum;
}

//function for Advanced Users
function calcTotalEnergy() {
    let energy = getTotalEnergyInKWh();
    document.getElementById('showtotalenergy').innerHTML = "<div>Your devices used a total of " + energy + "kWh of energy which is " + energy * kwhToJoules + " J in Joules.</div>";

    document.getElementById("cost").style.display = "block";
    document.getElementById("progress-bar").style.width = "50%";

    s1 = document.getElementById("set1").checked;
    s2 = document.getElementById("set2").checked;
    s3 = document.getElementById("set3").checked;
    if (isNaN(energy)) {
        alert("Please enter a number input");
    } else {
        if (s1) {
            document.getElementById('showtotalenergy').innerHTML = "<div>Your devices used a total of " + energy + "kWh of energy.</div>";
        } else if (s2) {
            document.getElementById('showtotalenergy').innerHTML = "<div>Your devices used a total of " + energy * kwhToJoules + " Joules of energy.</div>";
        } else if (s3) {
            document.getElementById('showtotalenergy').innerHTML = "<div>Your devices used a total of " + energy + "kWh of energy which is " + energy * kwhToJoules + " J in Joules.</div>";
        }
    }
}

//function for Advanced Users
function calcCostInCents() {
    let energycost = getTotalEnergyInKWh() * 13.19;
    document.getElementById("showtotalcost").innerHTML = "<div> The cost of your electricity consumption is " + energycost + " cents or $" + energycost / 100 + ".</div>";
    document.getElementById("progress-bar").style.width = "100%";
}

//function for Naive Users
//CALCULATION
function calcTotalEnergyAndCost() {
    let energy = document.getElementById("userwattinput_naive").value * document.getElementById("userhourinput_naive").value;

    let energyInKwh = energy / 1000;
    let costInCents = energyInKwh * 13.19;
    document.getElementById('showtotalcost_naive').innerHTML = "<div>Your devices used a total of " + energy + "kWh of energy which is " + energy * kwhToJoules + " J in Joules. The cost of your electricity consumption is " + costInCents + " cents or $" + costInCents / 100 + ".</div>";

    document.getElementById("progress-bar").style.width = "100%";
    document.getElementById("step2").style.display = "none";
}

//function for Novice Users
//CALCULATION
function calcTotalEnergyAndCostNovice() {
    let energy = document.getElementById("userwattinput_novice").value * document.getElementById("userhourinput_novice").value;

    let energyInKwh = energy / 1000;
    let costInCents = energyInKwh * 13.19;
    document.getElementById('showtotalcost_novice').innerHTML = "<div>Your devices used a total of " + energy + "kWh of energy which is " + energy * kwhToJoules + " J in Joules. The cost of your electricity consumption is " + costInCents + " cents or $" + costInCents / 100 + ".</div>";

    document.getElementById("progress-bar").style.width = "100%";
}

// function for walkthrough for Naive users
function step1a() {
    document.getElementById("step1a").style.display = "none";
}

// function for walkthrough for Naive users
function step1b() {
    document.getElementById("step1b").style.display = "none";
    document.getElementById("step2").style.display = "block";
    document.getElementById("progress-bar").style.width = "50%";
}

// function for OVERFLOW MENU 
function myOverflow() {
    document.getElementById('settingsselect').style.display = 'block';
}