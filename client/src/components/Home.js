import React from 'react'
import backImage1 from '../assets/homepageimage1.jpg'
import backImage2 from '../assets/homepageimage3.jpg'
import catdog from '../assets/catdog.png'
import shots from '../assets/shots.jpg'
import grooming from '../assets/grooming.jpg'
import visits from '../assets/visits.jpg'
import { Link } from "react-router-dom"


export default function Home() {
    return (
    <div>
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
      <img  className="bd-placeholder-img img-fluid" width="100%" height="100%" src={backImage1}></img>
        <div className="container">
          <div className="carousel-caption text-start text-dark secondary ">
            <h1>Your pets in the rigth hands!</h1>
            <h4>We have special services for the most special pets!</h4>
            <p><Link to="/appointment" className="btn btn-lg btn-dark">Make appointment!</Link></p>
          </div>
        </div>
      </div>
      <div className="carousel-item">
      <img  className="bd-placeholder-img img-fluid" width="100%" height="100%" src={backImage2}></img>
        <div className="container">
          <div className="carousel-caption text-warning">
            <h1>Don't miss any shots!</h1>
            <h4>We will send you a reminder every time your pet needs a regular shot</h4>
            <p><Link to="/appointment" className="btn btn-lg btn-dark">Sign up now!</Link></p>
          </div>
        </div>
      </div>
      <div className="carousel-item">
      <img  className="bd-placeholder-img img-fluid" width="100%" height="100%" src={catdog}></img>
        <div className="container">
          <div className="carousel-caption text-start text-dark">
            <h1>All your pets clinic history in the same place!</h1>
            <h4>Get instant access to your pet clinic history, upcoming appointments and more!</h4>
            <p><Link to="/appointment" className="btn btn-lg btn-dark">Sign up now!</Link></p>
          </div>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>

<div className="container marketing servicesTop text-center">
<div className="row">
  <div className="col-lg-4">
    <img  className="bd-placeholder-img rounded-circle" src={grooming} width="140" height="140"></img>
    {/* <svg class="bd-placeholder-img rounded-circle" src={grooming} width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Grooming</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg> */}
    <h2>Grooming</h2>
    <p>A happy grooming experience</p>
    <p><Link to="/appointment" className="btn btn-lg btn-dark" >Make appointment!</Link></p>
  </div>

  <div className="col-lg-4">
    <img  className="bd-placeholder-img rounded-circle" src={visits} width="140" height="140"></img>
    <h2>Visits</h2>
    <p>Routine veterinary visits help your pet live a long, healthy, and happy life</p>
    <p><Link to="/appointment" className="btn btn-lg btn-dark">Make appointment!</Link></p>
  </div>

  <div className="col-lg-4">
    <img  className="bd-placeholder-img rounded-circle" src={shots} width="140" height="140"></img>
    <h2>Shots</h2>
    <p>Vaccinations can help avoid costly treatments for diseases that can be prevented</p>
    <p><Link to="/appointment" className="btn btn-lg btn-dark">Make appointment!</Link></p>
  </div>
</div>
</div>
</div>
    )
}