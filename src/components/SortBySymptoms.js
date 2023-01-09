import react from "react";
import "../dist/output.css";
import "../tsrc/styles.css";
import { FormControl } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import map from "../assets/images/map.png";
import mapImage from "../assets/images/map.png";
import doctor from "../assets/images/doctor.png";
import call from "../assets/images/call.png";
import covid from "../assets/images/fever(1).png";
import distance from "../assets/images/social-distancing(1).png";
import photo from "../assets/images/photo.jpg";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function SortBySymptoms({ arr }) {
  // sort on the basis of Symptoms matched

  arr.sort((a, b) => {
    return b.Symptoms.length - a.Symptoms.length;
  });
  const percentage = 66;
  return (
    <div>
      {arr &&
        arr.map((a) => (
          <div class="xl:ml-28 grid grid-cols-1 xs:-ml-32 md:-mr-24 xl:grid xl:grid-cols-1 md:transition md:grid md:grid-cols-1 gap-1 xl:px-32">
            <div class="-mt-44">
              <div class="absolute cardnew" style={{ textAlign: "left" }}>
                <div class="rounded-xl shadow-xl flex flex-col w-full card-background image image-1 codepen relative">
                  <div
                    class="flex xs:flex xs:ml-96 circular xs:justify-end xl:ml-96 mt-4"
                    // style={{ height: 70, width: 70 }}
                  >
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',

                        // Colors
                        pathColor: `rgba(62, 199, 83, ${percentage / 100})`,
                        textColor: "rgb(62, 199, 83)",
                        trailColor: "#d6d6d6",
                        // backgroundColor: '#3e98c7',
                      })}
                      class="circular"
                    />
                  </div>

                  <div class="flex text-xl font-semibold xs:-mt-36 xl:-mt-20 ml-5">
                    <img
                      src={doctor}
                      alt=""
                      height="21"
                      width="28"
                      class="mr-2 doctorimg"
                    />
                    <p class="font-montes xl:text-base xs:text-5xl xs:mt-7 xl:mt-2 xs:ml-5 xl:ml-1">
                      {" "}
                      {a.DoctorName}{" "}
                    </p>
                    {/* <div class="text-xs mt-4 ml-1">(He/Her)</div> */}
                  </div>
                  <div class="font-web flex flex-row font-semibold text-xl xs:mt-8 xl:mt-6 ml-5">
                    <div>
                      <img
                        src={covid}
                        alt=""
                        height="12"
                        width="30"
                        class="mr-2 -mt-3 covidimg"
                      />
                    </div>
                    <p class="xl:ml-1 xs:-mt-3 symps xs:ml-5 xl:-mt-3 mb-2 xs:text-5xl xl:text-base">
                      {" "}
                      <p> Fever, cough, cold, weakness, horny,</p> <br />{" "}
                      <p> bahuthorny, randi, chuddo, kalapan, ara ara</p>{" "}
                    </p>
                  </div>
                  <div class="map-responsive font-popi xs:mt-4 xl:mt-2 ml-5">
                    <div class="inline-flex justify-start items-start">
                      <img
                        src={mapImage}
                        alt=""
                        height="25"
                        width="25"
                        class="mapimg"
                      />
                      <a
                        href=" https://goo.gl/maps/UvwzYjnb2v81gBUN8"
                        class="location-button xs:text-5xl xl:text-sm xs:ml-7 xl:ml-4 xs:mt-5 xl:-mt-0"
                      >
                        {" "}
                        {a.Address} <br />
                      </a>
                      <div class="xs:ml-48 xl:-ml-4 xs:flex xs:flex-row">
                        <img
                          src={call}
                          alt=""
                          height="9"
                          width="35"
                          class=" xl:ml-12 xs:-ml-44 mt-1 callimg"
                        />
                        <p class="font-web font-bold xl:ml-2 xl:mt-0 xs:mt-4 xs:text-5xl xl:text-base">
                          {" "}
                          +91-9999999999
                        </p>
                      </div>
                    </div>

                    <div class="-mt-1">
                      <hr
                        style={{
                          background: "gray",
                          color: "black",
                          borderColor: "gray",
                          height: "1px",
                          marginTop: "10px",
                        }}
                      />
                      <div class="mt-2 inline-flex">
                        <img
                          src={distance}
                          alt=""
                          height="25"
                          width="28"
                          class="distanceimg"
                        />
                        <p class="font-web font-bold xs:text-5xl xl:mt-0 xs:mt-5 xl:text-base ml-2">
                          {" "}
                          273km &nbsp; away
                        </p>
                      </div>
                      <div class="flex justify-end">
                        <p class="font-web xl:text-base xs:text-5xl font-bold mr-10 xs:-mt-20 xl:-mt-9">
                          {" "}
                          {a.UserName}{" "}
                          {/* bhai isme break line add krdena bhenchod */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Accordion
                sx={{
                  maxWidth: 480,
                  maxHeight: 2000,
                  size: 20,
                }}
                class="pannn"
              >
                <AccordionSummary
                  sx={{
                    backgroundColor: "#D7F0D7",
                    maxWidth: 480,
                    fontFamily: "Roboto",
                    borderRadius: 2,
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    sx={{
                      marginLeft: 1,
                    }}
                    class="morer"
                  >
                    More info
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Typography class="xs:text-5xl xl:text-base">
                    {a.Description}
                  </Typography>
                  <Typography class="xs:text-5xl xl:text-base">
                    Manant Tyagi
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        ))}
    </div>
  );
}
