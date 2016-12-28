var loadURL = function(url, callback){
	var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200"){
			callback(xobj.responseText);
		}
	}
	xobj.send(null);
}

///average position at time

///average number of trains in each direction

///average time from start to finish

///average time at position

///average time between stops

///once a train reaches the end, compute the above



var Model = function (){
	var self = this;
	
}



var ViewModel = function(){
	var self = this;

	self.model = new Model();

	var apiKey = "wX9NwuHnZU2ToO7GmGR9uw";

	var getVehiclesByRouteURL = "http://realtime.mbta.com/developer/api/v2/vehiclesbyroute?api_key="

	var orangeLine = "&route=Orange";

	var redLine = "&route=Red"

	var inJson = "&format=json";

	self.selectedLine = ko.observable();

	self.availableTransitLines = ko.observableArray(['Red', 'Green', 'Orange', 'Blue', 'Silver', 'Commuter']);

	self.getLine = function(line){
		///put a switch in here

		return "&route=" + line
	}

	self.createTrain = function(data, direction, number){
		var self = this;

		this.route_id = data.route_id;
		this.trip = data.direction[direction].trip[number];

	}

	self.makeApiCall = function(){
		console.log(self.selectedLine());
		self.getVehiclesByRoute("&route=" + self.selectedLine())
	}

	self.getVehiclesByRoute = function(line) {
		var url = getVehiclesByRouteURL + apiKey + line + inJson;
		console.log(url);
		loadURL(url, function(response){
			//console.log(response);

			///database will need to built using some kind of combo of veicle ID as timestamp
			var jsonResp = JSON.parse(response);

			console.log(jsonResp);

			var train = {
				route: jsonResp.route_id
			};

		});
	};


	self.getRedlineData = function(){	
		console.log('redline');
		self.getVehiclesByRoute("&route=Red");
	}

	/*var interval = setInterval(function(){
		console.log("interval");
		self.getRedlineData();
	}, 5000);*/


}

var viewModel = new ViewModel();

ko.applyBindings(viewModel);