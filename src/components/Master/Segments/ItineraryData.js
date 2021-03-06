import React from 'react';
import Leg from './Leg';

const ItineraryData = function (props) {

    let legsDiv = [ <Leg data={props.tripData[0]}/>];

    if (props.tripData.length>1) {
        legsDiv.push(<Leg data={props.tripData[1]}/>)
    }


    return (
        <div className="segmentsList">

            <div className="alert alert-primary" role="alert">
                <div className="row">
                    <div className="col-md-3">
                        Your trip!
                    </div>

                    <div className="col-md-2 offset-md-7">
                        <button className="btn btn-sm btn-dark btn-block btnToggle"
                                data-toggle="collapse"
                                data-target={`.segmentsListCollapse`} aria-expanded="false"
                                aria-controls="collapseExample">
                            Toggle
                        </button>
                    </div>

                </div>
            </div>

            {legsDiv}




        </div>
    )
};

export default ItineraryData;
