const Dispatch = require("./dispatch")
const Depot    = require("./depot")
// const Bus      = require("./bus")

const depot = new Depot(130);
const dispatch = new Dispatch(depot);

// dispatch.addVehicle(new Bus("32", 100))
// dispatch.addVehicle(new Bus("33", 100))
// dispatch.addVehicle(new Bus("34", 100))
// dispatch.addVehicle(new Bus("35", 100))

try {
	dispatch.start()
} catch (error) {
    console.error(error)
}
