const Dispatch = require("./dispatch")
const Bus      = require("./bus")

// create bus depot
const depot = {
    getBus: name => new Bus(name, 100)
}
// dispatch.addVehicle(new Bus("32", 100))
// dispatch.addVehicle(new Bus("33", 100))
// dispatch.addVehicle(new Bus("34", 100))
// dispatch.addVehicle(new Bus("35", 100))

const dispatch = new Dispatch(depot);

try {
	dispatch.start()
} catch (error) {
    console.error(error)
}
