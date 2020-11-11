function validateEntry() {

var numbersOnly = /^\d*\.?\,?\d*$/;
document.getElementById("errorid").innerHTML = "";

if (document.getElementById("hoursPerDay").value === "" || document.getElementById("powerWatts").value === "" || document.getElementById("kwhPrice").value === "") {
		document.getElementById("errorid").innerHTML = "<b>Notice:</b> You left a required input field empty.";
		return false;
	}
else if (document.getElementById("hoursPerDay").value > 24) {
		document.getElementById("errorid").innerHTML = "<b>Notice:</b> Please check over Hours Used Per Day, it appears to be greater than 24 hours.";
		return false;
	}
else if (document.getElementById("hoursPerDay").value.match(numbersOnly) && document.getElementById("powerWatts").value.match(numbersOnly) && document.getElementById("kwhPrice").value.match(numbersOnly)) {
		return true;
	}
else {
		document.getElementById("errorid").innerHTML = "<b>Notice:</b> Check the input fields there is an invalid character, only numbers are allowed.";
		return false;
	}
}

function energyCost() {

var hoursPerDay = document.getElementById("hoursPerDay").value.replace(",",".");
var powerWatts = document.getElementById("powerWatts").value.replace(",",".");
var kwhPrice = document.getElementById("kwhPrice").value.replace(",",".");

var costPerHour = (powerWatts / 1000) * kwhPrice;
var costPerDay = hoursPerDay * costPerHour;
var costPerMonth = 30.42 * costPerDay;
var costPerYear = 12 * costPerMonth;
var kwhPerDay = (powerWatts / 1000) * hoursPerDay;
	  
document.getElementById("costPerHour").value = costPerHour.toFixed(4);
document.getElementById("costPerDay").value = costPerDay.toFixed(4);
document.getElementById("costPerMonth").value = costPerMonth.toFixed(2);
document.getElementById("costPerYear").value = costPerYear.toFixed(2);
document.getElementById("kwhPerDay").value = kwhPerDay.toFixed(2);

}