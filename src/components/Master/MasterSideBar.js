import React from 'react';


const MasterSideBar = (props) => {
    //let priceBoxStyle = {marginTop :  props.priceBoxMargin + 'px'};
    console.log(props.analysis);

    let paxPrices = [];

    props.pricing.analysis.forEach( paxType => {
		    if (paxType.count >0) {
		    	paxPrices.push(<div key={paxType} className="row">
                    	<div className="col-sm-12">
                    		{paxType.type} x {paxType.count}  {paxType.ticketPriceEuro} {props.currency.code} 
                    	</div>
		    		</div>)
		    }
    });


    let bagPrices = [];
    let insurancePrices = [];
    let totalBagCount =0;
    let insuranceCount =0;

    props.passengers.forEach( pax => {
        if (pax.active) {
            props.bagAllowance.forEach( bag => {
                let bagCountId = 0;
                props.purchasedBags.forEach( boughtBag => {
                    if (bag.id === boughtBag.bagId) {
                        if (boughtBag.paxId === pax.id) {
                            bagCountId++;
                            totalBagCount++;
                        }
                    }
                });
                if (bagCountId > 0) {
                    bagPrices.push(
                        <div key={pax.id}>
                            <div className="row">
                                <div className="col-sm-12">
                                    {pax.surname} {pax.name}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    {bagCountId} x {bag.weight} {bag.price.toFixed(2)} {props.currency.code}
                                </div>
                            </div>
                        </div>)
                }
            });


            props.boughtInsurances.forEach( boughtIns => {

                props.insuranceOptions.forEach(insOption => {

                    if ((pax.id === boughtIns.paxId) && (insOption.id === boughtIns.insuranceId)) {
                        insuranceCount++;
                        insurancePrices.push(
                            <div key={pax.id}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        {pax.surname} {pax.name}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        {insOption.title} {insOption.price.toFixed(2)} {props.currency.code}
                                    </div>
                                </div>
                            </div>)
                    }
                });
            });

        }
    });

    let bagsDiv = (<div></div>);

    if (totalBagCount > 0) {

        bagsDiv =
            (<div>
                <hr/>
                <div className="row">
                    <div className="col-sm-12">
                        <h4>Bags</h4>
                        <hr/>
                    </div>
                </div>
                {bagPrices}
            </div>);
    }



    let insuranceDiv = (<div></div>);

    if (insuranceCount > 0) {

        bagsDiv =
            (<div>
                <hr/>
                <div className="row">
                    <div className="col-sm-12">
                        <h4>Insurances</h4>
                        <hr/>
                    </div>
                </div>
                {insurancePrices}
            </div>);
    }


    let mealsDiv = (<div className="row">
        <div className="col-sm-12">
            <h4>Meals</h4>
            <hr/>
        </div>
    </div>);


    let otherUpsalesDiv = (
        <div className="row">
            <div className="col-sm-12">
                <h4>Other upsales</h4>
                <hr/>
            </div>
        </div>);


    return (
        <div className="pricebox">

            <div className="card bg-info">
                <div className="card-header">
                    <b>Price Analysis </b>
                </div>
                <div className="card-body text-white">

                    <div className="row">
                        <div className="col-sm-12">
                            <h4>Ticket Price</h4>
                            <hr/>
                        </div>
                    </div>

					{paxPrices}
                    {bagsDiv}
                    {insuranceDiv}
                    {mealsDiv}
                    {otherUpsalesDiv}


                </div>


                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-12">

                            <h4> Total Price : {props.pricing.total} {props.currency.code} </h4>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default MasterSideBar;


