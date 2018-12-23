class Bus {

	constructor(name, soc) {
		this.name = name
		this.soc = soc
		this.route_ticker = 0
		this.route_time = 0
		this.worst_case_energy_consumption = 70
		this.driving = false
	}

	// log state
	logState() {
		console.log(`  Bus ${this.name}: SOC ${this.soc.toFixed(0)}, ${this.driving ? `@ ${this.route_ticker} / ${this.route_time/5}` : `charging`}`);
	}

	// take step in simulation
	step() {
		if (this.driving) {
			this.drive()
		} else {
			this.charge()
		}

		// log bus state
		this.logState()

		// take post step actions
		this.postStepActions()
	}

	// take post step actions
	postStepActions() {
		// stop the bus if at the end of the route
		if (this.route_ticker == this.route_time/5) {
			this.route_ticker = 0
			this.stop()
		}
	}

	// drive
	drive() {
		// get consumed energy
		const energy_consumed = this.energyConsumed()
		if (!this.hasChargeAvailable(energy_consumed)) {
			throw Error(`Bus stranded. Ran out of juice at ${this.route_ticker} / ${this.route_time / 5} of route`);
		}
		this.route_ticker += 1
		this.soc = Math.max(0, this.soc - energy_consumed);
	}
	// energy consumed per step (5 mins)
	energyConsumed() {
		return 5.8 + Math.random() * 5.8
	}
	// worst case energy consumed on complete route
	worstCaseEnergyConsumed() {
		return 2 * 5.8 * this.route_time / 5
	}
	// worst case energy consumed on whole route
	canCompleteRoute() {
		return this.hasChargeAvailable(this.worstCaseEnergyConsumed());
	}

	// energy charched per step (5 mins)
	energyCharged() {
		return 15.0
	}
	// hasCharge: check if the charge is available
	hasChargeAvailable(charge) {
		return this.soc >= charge
	}
	// charge
	charge() {
		this.soc = Math.min(100, this.soc + this.energyCharged())
	}

	// check if the vehicle is not driving
	isOnRoute() {
		return this.driving
	}

	// stop the bus / start charging
	stop() {
		// guard: check if bus is driving
		if (!this.isOnRoute()) {
			return;
		}

		// stop the bus
		this.driving = false
		console.log(`  Bus ${this.name} stopped`)
	}

	// start the bus / start driving
	start(route_time) {
		// guard: check if bus is driving
		if (this.isOnRoute()) {
			throw Error(`Can't start a driving bus. Bus currently at ${this.route_ticker} / ${this.route_time / 5} of route`);
		}

		// start the bus
		this.route_time = route_time
		this.driving = true
		console.log(`  Bus ${this.name} started`)
	}
}

module.exports = Bus
