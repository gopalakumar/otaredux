import update from 'immutability-helper';

import {
    ADD_PASSENGER_MASTER, FIRST_LOAD_MASTER,
    CHANGE_PASSENGER_MASTER,
    REMOVE_PASSENGER_MASTER, PASSENGER_ARRAY_CHANGED
} from '../../actions/master/actionsMaster';

import {UPSALES_CHANGED} from '../../actions/master/actionsAir';


const totalPrice = 5;

const paxTypes = [
    {
        type:'ADT',
        ticketPriceEuro: 45,
        fareEuro:0,
        taxEuro:0,
        count:1
    },
    {
        type:'CNN',
        ticketPriceEuro: 10,
        fareEuro:0,
        taxEuro:0,
        count:0
    },
    {
        type:'STD',
        ticketPriceEuro: 27,
        fareEuro:0,
        taxEuro:0,
        count:0
    },
    {
        type:'INF',
        ticketPriceEuro: 5,
        fareEuro:0,
        taxEuro:0,
        count:0
    }
];

export function pricingMasterReducer(state = totalPrice, action) {
    console.log('**pricingReducer**');
    console.log('received action' + action.type);
    let total = 0;

    switch (action.type)
    {
        case FIRST_LOAD_MASTER:
            console.log('first load bus');
            console.log(action.payload);

            action.payload.paxTypes.forEach( px => {
                total += px.count * px.ticketPriceEuro;
            });

            return total;
        case PASSENGER_ARRAY_CHANGED:
        case UPSALES_CHANGED:
            console.log('UPSALES_CHANGED');

            console.log(action.payload);
            // active passengers
            let activePaxes =0;
            action.payload.passengers.forEach( pax => {
                if (pax.active) {
                    activePaxes++;
                    action.payload.boughtBags.forEach( boughtBag => {
                        if (boughtBag.paxId === pax.id) {
                            action.payload.bagAllowance.forEach( bag => {
                                if (bag.id === boughtBag.bagId) {
                                    total += bag.price;
                                }
                            });
                        }
                    });

                    action.payload.boughtInsurances.forEach(boughtIns => {
                        action.payload.insuranceOptions.forEach(insOption => {
                            if ((pax.id === boughtIns.paxId) && (insOption.id === boughtIns.insuranceId)) {
                                total += insOption.price;
                            }
                        });
                    });

                    action.payload.boughtMeals.forEach(boughtMl => {
                        action.payload.mealOptions.forEach(availbMeal => {
                            if ((pax.id == boughtMl.paxId) && (availbMeal.id == boughtMl.mealId)) {
                                total += availbMeal.price;
                            }
                        });
                    });
                }
            });

            if (action.payload.hasFlexibleTicket.state === true) {
                total +=  (activePaxes * action.payload.flexibleTicket.pricePerPax);
            }

            if (action.payload.hasBlueRibbon.state === true) {
                total +=  (activePaxes * action.payload.blueRibbonPrices.pricePerPax);
            }

            action.payload.pricesPerPax.forEach( px => {
                total += px.ticketPriceEuro * px.count;
            });
            return total;

        default:
            return state;
    }

}

export function pricingMasterAnalysisReducer(state = paxTypes, action )
{
    switch (action.type)
    {
        case FIRST_LOAD_MASTER:
            return state;
        case ADD_PASSENGER_MASTER:

            let ADTs = paxTypes[0];
            ADTs.count++;
            return update(state, {0: {$set: ADTs}});
        case REMOVE_PASSENGER_MASTER:

            let typeId = 0;
            switch (action.payload.type) {
                case 'CNN':
                    typeId = 1;
                    break;
                case 'STD':
                    typeId = 2;
                    break;
            }

            return state.map( (item, index) => {

                if (index !== typeId) {
                    // This isn't the item we care about - keep it as-is
                    return item;
                }
                else {
                    var oldItem = item;
                    oldItem.count--;
                    if (oldItem.count <0) {
                        oldItem.count =0;
                    }

                    return {
                        ...item,
                        ...oldItem
                    };
                }

            });


        case CHANGE_PASSENGER_MASTER:

            let newTypeId = 0;
            let oldTypeId = 0;
            switch (action.payload.oldType) {
                case 'CNN':
                    oldTypeId = 1;
                    break;
                case 'STD':
                    oldTypeId = 2;
                    break;
                case 'INF':
                    oldTypeId = 3;
                    break;
            }

            switch (action.payload.newType) {
                case 'CNN':
                    newTypeId = 1;
                    break;
                case 'STD':
                    newTypeId = 2;
                    break;
                case 'INF':
                    newTypeId = 3;
                    break;
            }

            return state.map( (item, index) => {

                if ((index !== oldTypeId) && (index !== newTypeId)) {
                    // This isn't the item we care about - keep it as-is
                    return item;
                }

                if (index === oldTypeId) {
                    // Otherwise, this is the one we want - return an updated value
                    var oldItem = item;
                    oldItem.count--;
                    if (oldItem.count <0) {
                        oldItem.count =0;
                    }

                    return {
                        ...item,
                        ...oldItem
                    };
                }

                if (index === newTypeId) {
                    // Otherwise, this is the one we want - return an updated value
                    var newItem = item;
                    newItem.count++;

                    return {
                        ...item,
                        ...newItem
                    };
                }
            });


        default:
            return state;
    }
}