class Dispatch {
  constructor() {
    this.vehicles = [];
  }

  start() {
    // simulate evolution of time:
    for (let step = 0; step <= 10 * 60; step += 5) {
      console.log(`Time is flowing: ${step} minutes passed.`);
      if (step < 600) {
        this.move(step);
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
    const bus = this.findVehicle();

    // fire it up if available
    if (bus) {
      bus.start();
      // this is not good
    } else {
      throw Error(`Ran out of busses at step ${step}!`);
    }
  }

  // get a bus to dispatch
  findVehicle() {
    const bus = this.vehicles.find(vehicle => {
      return !vehicle.isOnRoute() && vehicle.hasChargeAvailable(70);
    });

    return bus;
  }

  addVehicle(vehicle) {
	  this.vehicles.push(vehicle);
  }
}

module.exports = Dispatch
