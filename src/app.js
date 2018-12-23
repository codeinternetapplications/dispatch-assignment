const Dispatch = require("./dispatch")
const Bus      = require("./bus")

const dispatch = new Dispatch()

dispatch.addVehicle(new Bus("32", 100))
dispatch.addVehicle(new Bus("33", 100))
dispatch.addVehicle(new Bus("34", 100))
dispatch.addVehicle(new Bus("35", 100))

try {
	dispatch.start()
} catch (error) {
    console.error(error)
}
