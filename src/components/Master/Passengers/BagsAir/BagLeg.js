import React from 'react';
import BagSelection from './BagSelection';

const BagLeg = function (props) {

    let bagArray = [];

    props.bagsAir.forEach( bag => {

        bagArray.push(<BagSelection bagData={bag}
                                    key={bag.key}
                                    legId={props.leg}
                                    currency={props.currency}
                                    purchasedBags={props.purchasedBags}
                                    paxId={props.paxId}
                                    addBagHandler={props.addBagHandler}
                                    removeBagHandler={props.removeBagHandler}/>);

    });


    return (
        <div className="row">
            <div className="col-md-12">

                <div className="card">
                    <div className="card-header">
                        {props.legTitle} (Max 2)
                    </div>
                    <div className="card-body">
                        {bagArray}
                    </div>
                </div>
            </div>
        </div>

    )

};

export default BagLeg;

