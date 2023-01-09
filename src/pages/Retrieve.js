import React, { useEffect } from "react";
import { CircularProgressbar } from "../react-circular-progressbar";
import "../react-circular-progressbar/dist/styles.css";

// importing global stylesheets
import "../dist/output.css";
import "../tsrc/styles.css";
import map from "../assets/images/map.png";
import mapImage from "../assets/images/map.png";
import doctor from "../assets/images/doctor.png";
import call from "../assets/images/call.png";
import covid from "../assets/images/fever(1).png";
import distance from "../assets/images/social-distancing(1).png";
import photo from "../assets/images/photo.jpg";
import { buildStyles } from "react-circular-progressbar";
import logo from "../assets/logo.svg";
// importing componets
import Navbar2 from "../components/Navbar2";
// importing the useFetch hook
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

//importing components
import DocCard from "../components/DocCard";
import SortByRelief from "../components/SortByRelief";
import SortByDistance from "../components/SortByDistance";
import SortBySymptoms from "../components/SortBySymptoms";
import { FormControl } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Retrieve() {
  const reliefPercentage = 65;
  const [addsym, setnewsymp] = useState("");
  const [array, setsymp] = useState([]); // array for symptoms
  const [string, setLocation] = useState("");
  const sympInput = useRef(null);
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  //const [names, setnames] = useState([]);

  // creating boolean states for sorting
  const [sortbyD, setsortD] = useState(false);
  const [sortbyR, setsortR] = useState(false);
  const [sortbyS, setsortS] = useState(false);

  // function to handle sorting
  const handleclickD = () => {
    //console.log("heyyy")
    setsortD(true);
    setsortR(false);
    setsortS(false);
  };
  const handleclickR = () => {
    setsortD(false);
    setsortR(true);
    setsortS(false);
  };
  const handleclickS = () => {
    setsortD(false);
    setsortR(false);
    setsortS(true);
  };
  var names = [];

  // function to handle ADD
  const handleAdd = (e) => {
    e.preventDefault();
    const naya = addsym.trim(); // if any leading spaces
    //naya= naya.replace(/ +/g, "");
    if (naya && !array.includes(naya)) {
      setsymp((prevSymps) => [...prevSymps, naya]);
    }
    setnewsymp("");
    sympInput.current.focus(); // no need to click again and again on input target
  };
  const handleAccess = async (e) => {
    var arrstring = "";
    e.preventDefault();
    let details = {
      array,
      string,
    };
    for (let i = 0; i < array.length; i++) {
      if (i === array.length - 1) {
        arrstring += array[i];
      } else {
        arrstring += array[i];
        arrstring += ",";
      }
    }

    try {
      const res = await fetch(
        `https://frightened-colt-teddy.cyclic.app/api/doctors/get?array=${arrstring}&string=${string}`
      );
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const d = await res.json();

      setIsPending(false);
      setData(d);
      setError(null);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("the fetch was aborted");
      } else {
        setIsPending(false);
        setError("Could not fetch the data");
      }
    }
  };
  for (const key in data) {
    if (Array.isArray(data[key])) {
      names = [...names, ...data[key]];
    }
  }
  // const height1 = 1;
  return (
    <div class = "fullwid">
      <div className="bg-greey">
        <div class="bg-greey w-full h-screen">
          <div class="bg-white fixed w-full top-0 z-50">
            <div class="xl:py-6 xs:py-14 right-0 left-0 z-10 w-full">
              <div class="px-10 flex flex-row cursor-pointer">
                <img src = {logo} class = "logo xs:-mt-9 xl:-mt-0 xs:flex xs:justify-center"/>
                <div class="flex xl:divide-x-2 xl:divide-gray-600">
                  <div>
                    <nav class="font-secularone">
                      <p class=" xl:text-3xl xs:text-8xl xs:ml-6 xl:ml-3 mr-8 lg:visible xs:mt-32 xl:mt-1 cursor-pointer text-black">
                        {" "}
                        MedZone{" "}
                      </p>
                    </nav>
                  </div>
                  <div class="px-10 xl:mt-1 xs:mt-32 xs:text-8xl  xl:text-3xl lg:-ml-0 xs:ml-12 font-kaushan">
                    Your Doctors
                  </div>
                </div>
              </div>
              <hr
                style={{
                  background: "gray",
                  color: "black",
                  borderColor: "gray",
                  height: "1px",
                  marginTop: "9px",
                }}
                class = "line"
              />
            </div>
          </div>
          <div class="xs:flex xs: xs:flex-col">
            <div class="xl:fixed xs:px-96 xl:px-0 xs:mt-56 xs:py-72 xl:mt-0 xl:py-44">
              <div class="xl:px-6 xl:-ml-0 xs:-ml-12">
                <div class="xl:ml-10 xs:ml-2 xs:px-64 xl:px-5 xs:py-100 xl:py-2 borderform xs:rounded-2xl border-4 sidebarbg -mt-10">
                  <p class="flex justify-center font-pacifico xs:text-8xl xl:text-6xl mt-7">
                    {" "}
                    Fillup!
                  </p>
                  <p class="font-semibold font-web xs:text-5xl lg:text-lg xs:mt-32 xs:mb-10 xl:mb-0 xl:mt-16">
                    {" "}
                    Write your symptoms{" "}
                  </p>
                  <div class="mt-4">
                    <FormControl>
                      <TextField
                        onChange={(e) => setnewsymp(e.target.value)}
                        value={addsym}
                        ref={sympInput}
                        sx={{
                          width: 268,
                          borderRadius: 90,
                          fontFamily: "Sans",
                        }}
                        id="outlined-basic"
                        label="cold, fever..."
                        variant="outlined"
                        size="small"
                        class = "textinp"
                      />
                    </FormControl>
                  </div>
                  <button
                    class="xl:py-2 xs:py-4 xs:px-10 xl:px-4 ml-4 xs:mt-10 xl:mt-4 xs:text-4xl xl:text-sm font-popi xs:rounded-lg bg-slate-500 text-white"
                    onClick={handleAdd}
                  >
                    {" "}
                    Add{" "}
                  </button>
                  <p>
                    Symptoms:{" "}
                    {array.map((i) => (
                      <em key={i}>{i},</em>
                    ))}
                  </p>
                  <p class="font-semibold font-web xs:text-5xl xl:text-lg xs:mt-14 xl:mt-10 mb-2">
                    {" "}
                    Your Location{" "}
                  </p>
                  <div class="xl:mt-4 xs:mt-14">
                    <FormControl>
                      <TextField
                        onChange={(e) => setLocation(e.target.value)}
                        value={string}
                        sx={{
                          width: 268,
                          borderRadius: 90,
                          fontFamily: "Sans",
                        }}
                        id="outlined-basic"
                        label="Hawkins, Indiana"
                        variant="outlined"
                        size="small"
                      />
                    </FormControl>
                  </div>
                  <button
                    class="xl:py-2 xs:px-10 xs:py-5 xl:px-5 ml-4 mb-6 xs:mt-10 xl:mt-4 xs:text-4xl xl:text-sm font-popi xs:rounded-lg bg-slate-500 text-white"
                    onClick={handleAccess}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </div>

            <div class="xl:py-40 mr-5 xl:flex xs:flex-end md:mr-32 xl:justify-end xl:items-end">
              <div class="xs:-mr-80 lg:mr-1 xl:fixed xs:-mt-24 xl:-mt-0 xl:-mb-12">
                <div class="xl:fixed dropdown xl:px-1 xs:-ml-44 xl:ml-0">
                  <label
                    tabindex="0"
                    class="btndropdown xl:py-0 px-14 bg-white text-black xl:-mr-16 hover:bg-white font-popi font-semibold m-1"
                  >
                    {" "}
                    <p class = "font-popi font-semibold xl:text-base xs:text-4xl"> Sort </p>
                  </label>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu shadow bg-base-100 rounded-box px-10"
                  >
                    <li>
                      <a class="sort1 font-popi" onClick={handleclickR}>
                        {" "}
                        Relief{" "}
                      </a>
                    </li>
                    <li>
                      <a class="sort1 font-popi" onClick={handleclickD}>
                        {" "}
                        Distance{" "}
                      </a>
                    </li>
                    <li>
                      <a class="sort1 font-popi" onClick={handleclickS}>
                        {" "}
                        Symptoms Matched{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="xl:-mt-48 xs:-mt-58 xs:flex xs:justify-center flex justify-center items-center lg:ml-40">
              {error && <p>Error occured</p>}
              {isPending && <p color="red">Loading...</p>}
              {
                sortbyD === false &&
                  sortbyR === false &&
                  sortbyS === false &&
                  data && (
                    <div class="">
                      {" "}
                      <DocCard arr={names} />{" "}
                    </div>
                  )
                // without any sorting
              }
              {sortbyR === true &&
                sortbyD === false &&
                sortbyS === false &&
                data && <SortByRelief arr={names} />}
              {sortbyD === true &&
                sortbyR === false &&
                sortbyS === false &&
                data && <SortByDistance arr={names} />}
              {sortbyS === true &&
                sortbyD === false &&
                sortbyR === false &&
                data && <SortBySymptoms arr={names} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
