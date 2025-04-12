import React from "react";
import "./Content.css";

export default function Content() {
  return (
    <>
      <div className="container1">
        <h3 className="heading">
          <b>People Are hungry !</b>
        </h3>
        <p className="para">
          According to the National Health Survey 2017 report, about 19 crore
          people in India sleep empty stomachs at night and about 4500 children
          under five years of age die every day in the country due to hunger and
          malnutrition.
        </p>
      </div>

      <div className="container2">
        <h3 className="heading">Food Wastage</h3>
        <p className="para">
          According to the Food Waste Index Report 2021 by the United Nations
          Environment Programme (UNEP), India generates about 68.7 million tons
          of food waste per year, out of which 11.9 million tons come from the
          food service sector. his sector includes restaurants, hotels,
          caterers, canteens, and other establishments that serve food to
          customers.
        </p>
      </div>

      <div className="container3">
        <h3 className=" heading initiative">
          <b>Our Initiative</b>
        </h3>
        <p className="para initiative">
          Reducing food wastage and feeding needed people by linking businesses
          with surplus food to communities in need. Using advanced technology,
          we streamline the process of matching supply with demand, simplify
          collaboration for our partners.
        </p>
      </div>
      <div className="container4"></div>
      <div className="cards">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Give Food</h5>
            <p className="card-text">Donate food to needy through us!</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Get Food</h5>
            <p className="card-text">Get food by registering with us!</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Give hand</h5>
            <p className="card-text">Volunteer with us!</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Give Money</h5>
            <p className="card-text">Fund us to feed the needy!</p>
          </div>
        </div>
      </div>
    </>
  );
}
