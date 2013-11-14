function getVal(id) { return document.getElementById(id).value; }
function getID(id) { return document.getElementById(id); }

var isMetric = false,
	distance = getID("distance"),
	mileage = getID("mileage"),
	gasCost = getID("gasCost"),
	unitSwitch = getID("unitSwitch");

unitSwitch.addEventListener('click', checkUnit);

var goButton = function() {
	var distValue = getVal("distance"),
		mileValue = getVal("mileage"),
		gasCost = getVal("gasCost"),
		totalCost;
		if (isMetric == false) {
			totalCost = (distValue / mileValue) * gasCost;
		}
		else if (isMetric) {
			totalCost = ((distValue / 100) * mileValue * gasCost);
		}


	if ((totalCost == null) || isNaN(totalCost))
		;
	else {
		totalCost = (Math.round(totalCost * 100)/100).toFixed(2);
		document.getElementById("answer").innerHTML=("That'll cost about $" + totalCost);
		document.getElementById("answerPanel").style.display = "inline";
	}
	window.location.href= '#answerPanel'
}

// Stack Overflow: http://stackoverflow.com/questions/19805287/how-to-stay-dry-multiple-inputs-that-trigger-the-same-function-on-keypress
// checks for enter keypress on textboxes
var elements = document.getElementsByClassName("textbox");
for (var i = 0; i < elements.length; i++)
	elements[i].onkeypress = keyHandler;

//Stack Overflow: http://stackoverflow.com/questions/13952686/how-to-make-html-input-tag-only-accept-numerical-values
function keyHandler(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
		return false;
	else if(charCode == 13) {
		goButton();
	}
	return true;
}

function checkUnit() {
	if(isMetric) {
		distance.placeholder = "How far are you going? (mi)";
		mileage.placeholder = "How many MPG does your car get?";
		gasCost.placeholder = "What's the average cost of gas? (/gal)";
		unitSwitch.innerHTML = "Go metric";
	}
	else {
		distance.placeholder = "How far are you going? (km)";
		mileage.placeholder = "How many L/100km does your car get?";
		gasCost.placeholder = "What's the average cost of gas? (/L)";
		unitSwitch.innerHTML = "Go imperial";
	}	
	unitSwitch.innerHTML = (isMetric ? "Go imperial" : "Go metric")
	isMetric = !isMetric;
}
