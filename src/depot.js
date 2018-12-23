const Bus = require("./bus")

class Depot {

	constructor(init_bus_number) {
		this.bus_number = init_bus_number;
	}

	// create bus depot
	getBus(name) {
		return new Bus(++this.bus_number, 100);
	}
}

module.exports = Depot
