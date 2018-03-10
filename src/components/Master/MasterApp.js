import React, {Component} from 'react';

import MasterPassengerList from './Passengers/MasterPassengerList';
import MasterSideBar from './MasterSideBar';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import FontAwesome from 'react-fontawesome';
import {addMasterPassengerAction,firstLoadMasterAction,editMasterPassengerNameAction,editMasterContactAction,
    changeMasterPassengerAction,removeMasterPassengerAction
    } from '../../actions/master/actionsMaster';

import {airAirBagAction,removeAirBagAction} from '../../actions/master/actionsAir';
import MasterContact from './Passengers/MasterContact';
import MasterPayment from './MasterPayment';
import {contactMasterReducer} from "../../reducers/master/passengersMaster";
import {getBagsReducer, getPurchasedBagsReducer} from "../../reducers/air/bagsAir";



class MasterApp extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    componentWillMount() {
        console.log('PROPS ' + this.props.product);
        this.props.firstLoad();

    }

    render() {
        return (
            <div className='busApp'>
                <div className='row'>

                    <div className='col-md-8'>

                        <MasterPassengerList
                            product={this.props.product}
                            addPaxHandler={this.props.addPaxHandler}
                            removePaxHandler={this.props.removePaxHandler}
                            editPaxHandler={this.props.editPaxHandler}
                            editNameHandler={this.props.editPaxNameHandler}
                            addBagHandler={this.props.addBagHandler}
                            removeBagHandler={this.props.removeBagHandler}
                            passengers={this.props.passengers}
                            currency={this.props.currency}
                            insurances={this.props.insuranceAir}
                            bagsAir={this.props.bagsAir}/>
                    </div>

                    <div className='col-md-3'>
                        <MasterSideBar currency={this.props.currency}
                                       bagAllowance={this.props.bagsAir}
                                       passengers={this.props.passengers}
                                       pricing={this.props.pricing}/>
                    </div>
                </div>


                <div className='row'>
                    <div className='col-md-8'>
                        <MasterContact contact={this.props.contact}
                                    editContactHandler={this.props.editContactHandler}/>
                    </div>
                </div>


                {this.props.product !== 'air' &&
                    <div className='row'>
                        <div className='col-md-8'>
                            <MasterPayment/>
                        </div>
                    </div>
                }

                {this.props.product === 'air' &&
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <button className="btn btn-success btn-lg">Continue</button>
                    </div>
                </div>
                }
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        passengers: state.passengersMasterReducer,
        currency: state.currentCurrencyReducer,
        pricing:  {
            total: state.pricingMasterReducer,
            analysis: state.pricingMasterAnalysisReducer
        },
        contact: state.contactMasterReducer,
        insuranceAir: state.airInsuranceReducer,
        bagsAir : state.getBagsReducer
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addPaxHandler: addMasterPassengerAction,
        removePaxHandler:removeMasterPassengerAction,
        editPaxHandler:changeMasterPassengerAction,
        firstLoad: firstLoadMasterAction,
        editPaxNameHandler: editMasterPassengerNameAction,
        editContactHandler: editMasterContactAction,
        addBagHandler: airAirBagAction,
        removeBagHandler:removeAirBagAction
    }, dispatch);
}


export default connect(mapStateToProps,matchDispatchToProps )(MasterApp);


