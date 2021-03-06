import {UPSALES_CHANGED} from "./actionsAir";
import {upsalesDispatcher} from './dispatcher';

export const ADD_PASSENGER_MASTER = 'ADD_PASSENGER_MASTER';
export const FIRST_LOAD_MASTER = 'FIRST_LOAD_MASTER';
export const PASSENGER_ADDED_MASTER = 'PASSENGER_ADDED_MASTER';
export const REMOVE_PASSENGER_MASTER = 'REMOVE_PASSENGER_MASTER';
export const PASSENGER_REMOVED_MASTER = 'PASSENGER_REMOVED_MASTER';
export const CHANGE_PASSENGER_MASTER = 'CHANGE_PASSENGER_MASTER';
export const EDIT_NAME_PASSENGER_MASTER = 'EDIT_NAME_PASSENGER_MASTER';
export const EDITED_NAME_PASSENGER_MASTER = 'EDITED_NAME_PASSENGER_MASTER';
export const EDIT_CONTACT_PASSENGER_MASTER = 'EDIT_CONTACT_PASSENGER_MASTER';
export const PASSENGER_ARRAY_CHANGED = 'PASSENGER_ARRAY_CHANGED';



export function editMasterContactAction(contactData) {
    return { type: EDIT_CONTACT_PASSENGER_MASTER, payload : {
            surname: contactData.surname,
            name:  contactData.name,
            gender: contactData.gender,
            prefix: contactData.prefix,
            mobile:contactData.mobile,
            email: contactData.email,
            country:contactData.country,
            city: contactData.city,
            address:contactData.address,
            postcode:contactData.postcode
        }
    }
}

export function editMasterPassengerNameAction(paxId, surname, name,gender) {

    console.log('edit bus action ' + paxId + ' ' + surname);
    return (dispatch, getState) => {

        dispatch({
            type: EDIT_NAME_PASSENGER_MASTER,
            payload: {
                passengerId: paxId,
                surname: surname,
                name: name,
                gender:gender
            }
        });


        dispatch({
            type: EDITED_NAME_PASSENGER_MASTER,
            payload: {
                passengerId: paxId,
                surname: surname,
                name: name,
                gender:gender,
                passengers: getState().passengersMasterReducer
            }
        });

    }
}


export function changeMasterPassengerAction(paxId,newCode,oldCode) {
    return (dispatch, getState) => {

        dispatch({
            type: CHANGE_PASSENGER_MASTER,
            payload: {
                passengerId: paxId,
                newType: newCode,
                oldType: oldCode
            }
        });

        dispatch(upsalesDispatcher(getState,PASSENGER_ARRAY_CHANGED));
    }
}

export function removeMasterPassengerAction(paxId,paxType) {
    return (dispatch, getState) => {

        dispatch({
            type: REMOVE_PASSENGER_MASTER,
            payload: {
                passengerId: paxId,
                type: paxType
            }
        });

        dispatch(upsalesDispatcher(getState,PASSENGER_ARRAY_CHANGED));
    }
}



export function addMasterPassengerAction() {
    return (dispatch, getState) => {

        dispatch({
            type: ADD_PASSENGER_MASTER
        });

        dispatch(upsalesDispatcher(getState,PASSENGER_ARRAY_CHANGED));
    }
}



export function firstLoadMasterAction() {
    return (dispatch, getState) => {
        console.log('first load action');

        dispatch({
            type: FIRST_LOAD_MASTER,
            payload: {
                paxTypes: getState().pricingMasterAnalysisReducer,
                currency: getState().currentCurrencyReducer
            }
        });
    }
}

export function changeCurrencyAction(newCode) {
    return (dispatch, getState) => {

        dispatch({
            type: 'CHANGE_CURRENCY',
            payload: {
                passengers: getState().passengersReducer,
                newCode: newCode,
                currencies: getState().getCurrenciesReducer
            }
        });


    }
}

