class Bus {

	constructor(name, soc) {
		this.name = name
		this.route_ticker = 0
		this.soc = soc
		this.driving = false
	}

	// log state
	logState() {
		console.log(`  Bus ${this.name}: SOC ${this.soc.toFixed(0)}, ${this.driving ? `@ ${this.route_ticker} / 6` : `charging`}`)
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
		if (this.route_ticker == 6) {
			this.stop()
			this.route_ticker = 0
		}
	}

	// drive
	drive() {
		// get consumed energy
		const energy_consumed = this.energyConsumed()
		if (!this.hasChargeAvailable(energy_consumed)) {
			throw Error(`Bus stranded. Ran out of juice at ${this.route_ticker} / 6 of route`);
		}
		this.route_ticker += 1
		this.soc = Math.max(0, this.soc - energy_consumed);
	}
	// energy consumed per step (5 mins)
	energyConsumed() {
		return 5.8 + Math.random() * 5.8
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
	start() {
		// guard: check if bus is driving
		if (this.isOnRoute()) {
			throw Error(`Can't start a driving bus. Bus currently at ${this.route_ticker} / 6 of route`);
		}

		// start the bus
		this.driving = true
		console.log(`  Bus ${this.name} started`)
	}
}

module.exports = Bus
