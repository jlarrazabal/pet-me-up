import React from 'react'
import backImage1 from '../assets/homepageimage1'
import backImage2 from '../assets/homepageimage3'
import babypets from '../assets/babypets'
import catdog from '../assets/catdog'
import catdog2 from '../assets/catdog2'
import shots from '../assets/shots'
import grooming from '../assets/grooming'
import visits from '../assets/visits'
import { Link } from "react-router-dom"


export default function Home() {
    return (
    <div>
    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <svg class="bd-placeholder-img" width="100%" height="100%" href={backImage1} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>

        <div class="container">
          <div class="carousel-caption text-start">
            <h1>Your pets in the rigth hands!</h1>
            <p>We have special services for the most special pets!</p>
            <p><Link to="/appointment" className="btn btn-lg btn-primary">Make appointment!</Link></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <svg class="bd-placeholder-img" width="100%" height="100%" href={catdog2} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>

        <div class="container">
          <div class="carousel-caption">
            <h1>Don't miss any shots!</h1>
            <p>We will send you a reminder every time your pet needs a regular shot</p>
            <p><Link to="/appointment" className="btn btn-lg btn-primary">Sign up now!</Link></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <svg class="bd-placeholder-img" width="100%" height="100%" href={babypets} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>

        <div class="container">
          <div class="carousel-caption text-end">
            <h1>All your pets clinic history in the same place!</h1>
            <p>Get instant access to your pet clinic history, upcoming appointments and more!</p>
            <p><Link to="/appointment" className="btn btn-lg btn-primary">Sign up now!</Link></p>
          </div>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

<div class="container marketing">
<div class="row">
  <div class="col-lg-4">
    <svg class="bd-placeholder-img rounded-circle" href={grooming} width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Grooming</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
    <h2>Grooming</h2>
    <p>A happy grooming experience</p>
    <p><Link to="/appointment" className="btn btn-lg btn-primary">Make appointment!</Link></p>
  </div>

  <div class="col-lg-4">
    <svg class="bd-placeholder-img rounded-circle" href={visits} width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Visists</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
    <h2>Visits</h2>
    <p>Routine veterinary visits help your pet live a long, healthy, and happy life</p>
    <p><Link to="/appointment" className="btn btn-lg btn-primary">Make appointment!</Link></p>
  </div>

  <div class="col-lg-4">
    <svg class="bd-placeholder-img rounded-circle" href={shots} width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Shots</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>
    <h2>Shots</h2>
    <p>Vaccinations can help avoid costly treatments for diseases that can be prevented</p>
    <p><Link to="/appointment" className="btn btn-lg btn-primary">Make appointment!</Link></p>
  </div>
</div>
</div>
</div>
    )
}