export default function CheackOutStep(props){
    const {signin,shipping, placeorder} = props

    return(
        <>
        <div className="row text-center mt-2">
            <div className="col-4" style={{borderTop: signin ? "3px solid  #ff8000" : "3px solid gray" }}><h4 style={{color: signin ? "#ff8000":"gray"}}>Sign in </h4></div>


            <div className="col-4" style={{borderTop: shipping ? "3px solid  #ff8000" : "3px solid gray"}}><h4 style={{color: shipping ? "#ff8000":"gray"}}>Shipping</h4></div>

            <div className="col-4" style={{borderTop: placeorder ? "3px solid  #ff8000" : "3px solid gray"}}><h4 style={{color: placeorder ? "#ff8000":"gray"}}>Placeorder</h4></div>
           
        </div>
        </>
    )
    }