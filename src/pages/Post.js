import { useState, useRef, useEffect } from "react";
// import global css here
import "../dist/output.css";
import "../tsrc/styles.css";
import "../assets/styled.css";
import rhino from "../assets/images/forminage.png";

import { useFetch } from "../hooks/useFetch";
//import axios from "axios";
export default function Post() {
  // changing states of form
  const [DoctorName, setName] = useState("");
  const [UserName, setName2] = useState("");
  const [Age, setAge] = useState("");
  const [Contact, setContact] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [Symptoms, setsymp] = useState([]);
  const [Address, setAddress] = useState("");
  //const [gender,setgender] = useState("")
  const [Relief, setRelief] = useState(0);
  const [Description, setDescription] = useState("");
  const sympInput = useRef(null);
  var Gender = "";
  let obj = {};
  // use fetch hook to post data
  const { postData, data, error } = useFetch(
    "https://frightened-colt-teddy.cyclic.app/api/doctors/post",
    "POST"
  );

  const handleSubmit = (e) => {
    //console.log(e);
    if (document.getElementById("male_hai").checked) {
      Gender = "Male";
    }
    if (document.getElementById("female_hai").checked) {
      Gender = "female";
    }

    e.preventDefault();
    let details = {
      DoctorName,
      UserName,
      Address,
      Relief,
      Contact,
      Symptoms,
      Description,
      Age,
      Gender,
    };
    obj = { ...obj, ...details };

    postData(obj);
  };

  // handle add function
  const handleAdd = (e) => {
    e.preventDefault();
    const naya = symptoms.trim(); // if any spaces
    if (naya && !Symptoms.includes(naya)) {
      setsymp((prevSymps) => [...prevSymps, naya]);
    }
    setSymptoms("");
    sympInput.current.focus(); // no need to click agaiin and again on input targert
  };

  return (
    <div>
      {/* form content */}
      <div class="cl h-screen">
        <div class="w-full -ml-32 absolute flex justify-end">
          <img src={rhino} alt="" height="670" width="650"  class = "fixed" />
        </div>
        <h1 class="font-popi xs:ml-24 xs:text-5xl font-semibold xl:text-3xl xl:-ml-3 flex xs:justify-center xl:justify-start xl:px-48 xl:-mt-8">
          {" "}
          Post Your Experience{" "}
        </h1>
        {/* <div> */}
        <div id="form" className="_form fixed">
          <form action="#" method="POST" name="addUser" onSubmit={handleSubmit}>
            <fieldset>
              <legend className="font-montes">Doctor's Name</legend>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                value={DoctorName}
              />
            </fieldset>
            <fieldset>
              <legend>Patient's Name</legend>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                onChange={(e) => setName2(e.target.value)}
                value={UserName}
              />
            </fieldset>

            <fieldset>
              <legend>Your Age</legend>
              <input
                type="number"
                name="password"
                onChange={(e) => setAge(e.target.value)}
                value={Age}
                placeholder="How old are you ?"
              />
            </fieldset>
            <fieldset>
              <legend>Contact Number</legend>
              <input
                type="number"
                name="password"
                onChange={(e) => setContact(e.target.value)}
                value={Contact}
                placeholder="Phone number"
              />
            </fieldset>

            <fieldset>
              <legend>Add Symptoms</legend>
              <textarea
                onChange={(e) => setSymptoms(e.target.value)}
                value={symptoms}
                ref={sympInput}
                name="about-your"
                placeholder="What is it bothering you ?"
                border-color="red"
              ></textarea>
              <button
                className="bg-red-500 mt-4 text-white px-7 py-2 font-popi foont-semibold rounded-lg"
                onClick={handleAdd}
              >
                Add
              </button>
              <p>
                Symptoms:{" "}
                {Symptoms.map((i) => (
                  <em key={i}>{i},</em>
                ))}
              </p>
            </fieldset>

            <fieldset>
              <legend>Relief • {Relief}%</legend>
              <input
                type="range"
                onChange={(e) => setRelief(e.target.value)}
                min="0"
                max="100"
                value={Relief}
                className="range range-success"
              />
            </fieldset>

            <fieldset>
              <legend>GENDER</legend>
              <label className="input-check">
                <input type="radio" name="gender" value="m" id="male_hai" />
                <span>Male</span>
              </label>
              <label className="input-check">
                <input type="radio" name="gender" value="f" id="female_hai" />
                <span>Female</span>
              </label>
            </fieldset>

            <fieldset>
              <legend>Doctor's Address</legend>
              <input
                type="text"
                name="password"
                onChange={(e) => setAddress(e.target.value)}
                value={Address}
                placeholder="Hawkins, Indiana"
              />
            </fieldset>
            <fieldset>
              <legend>Description</legend>
              <input
                type="text"
                name="password"
                onChange={(e) => setDescription(e.target.value)}
                value={Description}
                placeholder="Hawkins, Indiana"
              />
            </fieldset>

            <button class = "font-montes px-10 mt-4 py-2 text-white rounded-lg bg-red-500"> Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
}
