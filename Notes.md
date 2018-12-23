# Notes

## Operating requirements

* Route: 30 mins (_routeTime_)
* Hours a day: 10 hours (_totalTime_)
* Dispatch rate: 4 busses per hour
** 40 departs total

## Bus specs

* Charge rate of 15.0% SOC per 5 minutes
** +30% in 10 mins
** +45% in 15 mins
** +60% in 20 mins
** +90% in 30 mins
* Consumption: `5.8 + Math.random() * 5.8` _soc_ / 5 mins

## Variables

* _routeTime_  Time that it takes to complete the route
* _totalTime_  Operating timespan
* _progress_   Amount of minutes a bus has been driving
* _onRoute_    Whether a bus is driving or not
* _soc_        Current state of charge of a bus

## Manual

* Consumption:
** 10% _soc_ / 5 mins
** 30% _soc_ / 15 mins

* Consumption full route (30 mins)
** min: 6 * -5.8%  = -34.8% ~ -35%
** max: 6 * -11.6% = -69.6% ~ -70%

### -35% case

        |     1     |     2     |     3     |     4     |     5      |     6     |    7   |    8   |    9   |   10   |     
* 1: OR |ST 65 ST 30|           |           |           |            |           |        |        |        |        |     
* 1: C  |           |60 90      |           |           |            |           |        |        |        |        |     
* 1: OR |           |      ST 55|ST 20      |           |            |           |        |        |        |        |     
* 1: C  |           |           |      50 80|           |            |           |        |        |        |        |     
* 1: OR |           |           |           |ST 45 ST 10|            |           |        |        |        |        |     
* 1: C  |           |           |           |           |40 70 100   |           |        |        |        |        |     
* 1: C  |           |           |           |           |          ST|65 ST 30   |        |        |        |        |     

* 1:    |ST    ST   |      ST   |ST         |ST    ST   |          ST|   ST      |
* 1:    |1     3    |      3    |1          |1     3    |          4 |   2       |

### -70% case

* 1: OR |ST 30      |           |           |           |            |           |        |        |        |        |     
* 1: C  |      60 90|           |           |           |            |           |        |        |        |        |     
* 1: OR |           |ST 20      |           |           |            |           |        |        |        |        |     
* 1: C  |           |      50 80|           |           |            |           |        |        |        |        |     
* 1: OR |           |           |ST 10      |           |            |           |        |        |        |        |     
* 1: C  |           |           |      40 70|100        |            |           |        |        |        |        |     
* 1: C  |           |           |           |    ST 30  |            |           |        |        |        |        |     

* 1:    |ST         |ST         |ST         |    ST     |    ST      |    ST     |
* 1:    |1          |1          |1          |    2      |    2       |    2      |

## Estimate

* Lower limit 2 busses?
* 3 busses?
* Upper limit 4 busses