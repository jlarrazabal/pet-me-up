import React from 'react'

export default Canceled = () => {
  return (
      <div>
          <h3>Do you care for your pet? Then book an appointment!</h3>
          <h1>Routine veterinary visits help your pet live a long, healthy, and happy life</h1>
          <img  className={"img-fluid img-thumbnail"} src={mco} width="370" height="370"/>
          <Link to="/appointment" className="btn btn-lg btn-primary">Make appointment!</Link>
      </div>
  )  
}