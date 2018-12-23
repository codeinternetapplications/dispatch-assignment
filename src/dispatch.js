class Dispatch {
	constructor(depot) {
		this.vehicles = [];
		this.depot = depot
		this.bus_number = 100
	}

	start() {
		// simulate evolution of time:
		for (let step = 0; step <= 10 * 60; step += 5) {
			console.log(`Time is flowing: ${step} minutes passed.`);
			if (step < 600) {
				this.move(step);
			}
			if (step == 600) {
				console.log(`\nA total of ${this.vehicles.length} busses were necessary to complete today's service`);
			}
		}
	}

	move(step) {
		// dispatch a bus every 15 minutes
		if (step % 15 === 0) this.dispatch(step);

		// move the vehicles
		this.vehicles.map(vehicle => {
			vehicle.step();
		});

		// stop the busses
		if (step === 595) this.vehicles.map(vehicle => vehicle.stop());
	}

	dispatch(step) {
		// find a bus to dispatch
		const bus = this.getVehicle();

		// fire it up if available
		if (bus) {
			bus.start();
			// this is not good
		} else {
			throw Error(`Ran out of busses at step ${step}!`);
		}
	}

	// get a bus to dispatch
	getVehicle() {
		// init
		let bus = null;

		// get the busses at the charging station that are ready to go
		const busses = this.vehicles.filter(vehicle => {
			return !vehicle.isOnRoute() && vehicle.hasChargeAvailable(70);
		});

		// find the bus at the charging station with the highest SOC
		if (busses.length != 0) {
			bus = busses[0];
			busses.forEach(a_bus => {
				if (a_bus.soc > bus.soc) bus = a_bus;
			});
			console.log(`  Fetching bus ${bus.name} from the charging station`);
		// no busses available
		} else {
			// get one from the depot
			bus = this.depot.getBus(++this.bus_number);
			console.log(`\n  Requested new bus ${bus.name} from the DEPOT\n`);
			// push it to today's stack
			this.vehicles.push(bus);
		}

		return bus;
	}

	// addVehicle(vehicle) {
	// 		this.vehicles.push(vehicle);
	// }
}

module.exports = Dispatch
