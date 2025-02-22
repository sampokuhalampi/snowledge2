/**

Component for showing snow record information for segment

Luonut: Markku Nirkkonen

Päivityshistoria

13.12.2021 Juho Kumara
Updated styling

5.12.2021 Juho Kumara
Snow type names, icons and skiiability values are now shown correctly.

7.11.2021 Oona Laitamaki
Updated layout design

23.10.2021 Oona Laitamaki
Changed layout design & added relative timestamp, skiability elements and sub snowtypes

18.10.2021
Moved here from Info.js

**/


import * as React from "react";
import { useMediaQuery } from "react-responsive";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Link from "@material-ui/core/Link";
import DisplaySnowType from "./DisplaySnowType";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  addPadding: {
    padding: "5px 15px",
  },
  close: {
    color: "white",
    left: "85%",
  },
  divider: {
    height: "1px",
    background: "#707070",
    margin: "15px 5px 15px 5px",
  },
  snowInfo: {
    alignContent: "center",
  },
  bigHeaders: {
    fontFamily: "Donau",
    letterSpacing: 4,
    textTransform: "uppercase",
    fontWeight: 600,
    display: "block",
    color: "white",
  },
  smallHeaders: {
    fontFamily: "Donau",
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: 600,
    display: "block",
    fontSize: "medium",
  },
  normalText: {
    fontFamily: "Donau",
    letterSpacing: 2,
    fontWeight: 300,
    fontSize: "medium",
  },
  textContainer: {
    overflowY: "scroll",
    paddingLeft: "5px",
    maxHeight: "140px",
  },
  smallText: {
    fontFamily: "Donau",
    letterSpacing: 2,
    fontWeight: 100,
    fontSize: "small",
    marginLeft: "5px",
  },
  mediumText: {
    fontFamily: "Donau",
    letterSpacing: 2,
    fontWeight: 300,
    fontSize: "medium",
  },
  dangerIcon: {
    verticalAlign: "middle",
  },
  sponsorContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  sponsor: {
    maxWidth: "40px",
    maxHeight: "40px",
    padding: "10px"
  },
  reviewButton: {
    borderRadius: "30px",
    textTransform: "none",
    width: "100%",
    maxWidth: "280px",
    maxHeight: "40px",
    marginBottom: "5px",
    fontFamily: "Donau",
    color: "#FFF",
    letterSpacing: 2,
    fontWeight: 300,
    fontSize: "medium",
  },
  authorTag: {
    padding: "4px",
    margin: "4px",
    fontFamily: "Donau",
    letterSpacing: 2,
    fontWeight: 300,
    fontSize: "small",
    justifyContent: "center",
    borderRadius: "7px",
  },
  timeStamp: {
    fontFamily: "Donau",
    letterSpacing: 2,
    fontWeight: 600,
    fontSize: "medium",
    marginLeft: "5px",
  },
  expandOpen: {
    color: "#FFF",
    transform: "rotate(90deg)"
  },
  expandClosed: {
    color: "#FFF",
    transform: "rotate(-90deg)"
  },
  expandButton: {
    borderRadius: "30px",
    textTransform: "none",
    width: "150px",
    height: "30px",
    marginBottom: "5px",
    backgroundColor: "#374B6A",
  },
  snowComment: {
    borderRadius: "20px",
    backgroundColor: "rgba(186, 186, 186, 0.31)",
    paddingLeft: "20px",
    margin: 5,
  },
}));

function getRelativeTimestamp(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (Math.round(elapsed / 1000) == 1) {
      return "1 sekunti sitten";
    }
    return `${Math.round(elapsed / 1000)} sekuntia sitten`;
  } else if (elapsed < msPerHour) {
    if (Math.round(elapsed / msPerMinute) == 1) {
      return "1 minuutti sitten";
    }
    return `${Math.round(elapsed / msPerMinute)} minuuttia sitten`;
  } else if (elapsed < msPerDay) {
    if (Math.round(elapsed / msPerHour) == 1) {
      return "1 tunti sitten";
    }
    return `${Math.round(elapsed / msPerHour)} tuntia sitten`;
  } else if (elapsed < msPerMonth) {
    if (Math.round(elapsed / msPerDay) == 1) {
      return "1 päivä sitten";
    }
    return `noin ${Math.round(elapsed / msPerDay)} päivää sitten`;
  } else if (elapsed < msPerYear) {
    if (Math.round(elapsed / msPerMonth) == 1) {
      return "1 kuukausi sitten";
    }
    return `noin ${Math.round(elapsed / msPerMonth)} kuukautta sitten`;
  } else {
    if (Math.round(elapsed / msPerYear) == 1) {
      return "1 vuosi sitten";
    }
    return `noin ${Math.round(elapsed / msPerYear)} vuotta sitten`;
  }
}


function SnowRecordView({ segmentdata, writeReviewEnabled, openForm, openFeedback, close, signedUser, sponsors}) {
  const classes = useStyles();
  // Avalanche warning LINK
  const url = "https://www.pallaksenpollot.com/";
  // 0px  XS  600px  SM  900px  MD
  const isXS = useMediaQuery({ query: "(max-width: 599px)" });
  //const isSM = useMediaQuery({ query: "(min-width: 600px) and (max-width: 900px)" });
  const description = (segmentdata.update === null || segmentdata.update === undefined ? "" : segmentdata.update.Kuvaus);

  const isEmpty = (segmentdata.update === null || segmentdata.update === undefined ? true : checkIfEmpty());

  const [expanded, setExpanded] = React.useState(false);
  const [guideTime, setGuideTime] = React.useState("");
  const [userTimes, setUserTimes] = React.useState([]);


  //Calculate all timestamps only in the first render
  React.useEffect(() => {

    // Parsitaan päivämäärä ja aika päivityksestä, mikäli päivitys löytyy
    if (segmentdata.update !== null && segmentdata.update !== undefined) {
      let currentTime = new Date();
  
      if(segmentdata.update.Aika !== null && segmentdata.update.Aika !== undefined) {
        // Datasta saadaan viimeisin päivitysaika
        let latestUpdateTime = new Date(segmentdata.update.Aika);
        let guideUpdateTime = `Viimeksi päivitetty: ${getRelativeTimestamp(currentTime, latestUpdateTime)}`;
        setGuideTime(guideUpdateTime);
      }
  
      let userTime1 = "";
      let userTime2 = "";
      let userTime3 = "";

      if(segmentdata.update.A1_Aika !== null) {
        // Datasta saadaan viimeisin päivitysaika
        let latestUpdateTime = new Date(segmentdata.update.A1_Aika);
        userTime1 = `Viimeksi päivitetty: ${getRelativeTimestamp(currentTime, latestUpdateTime)}`;
      }
      if(segmentdata.update.A2_Aika !== null) {
        // Datasta saadaan viimeisin päivitysaika
        let latestUpdateTime = new Date(segmentdata.update.A2_Aika);
        userTime2 = `Viimeksi päivitetty: ${getRelativeTimestamp(currentTime, latestUpdateTime)}`;
      }
      if(segmentdata.update.A3_Aika !== null) {
        // Datasta saadaan viimeisin päivitysaika
        let latestUpdateTime = new Date(segmentdata.update.A3_Aika);
        userTime3 = `Viimeksi päivitetty: ${getRelativeTimestamp(currentTime, latestUpdateTime)}`;
      }

      setUserTimes([userTime1, userTime2, userTime3]);
    }
  }, [segmentdata]);


  // Gets boolean value of snowtype visibility, by given index (indices 1&2 are primary types, 3&4 are secondary types, 5 user type)
  function isEnabled(index) {
    if (segmentdata.update !== null && segmentdata.update !== undefined) {

      switch (index) {
      case 1:
        if (segmentdata.update.Lumi1 !== undefined) return true;
        break;
      case 2:
        if (segmentdata.update.Lumi2 !== undefined) return true;
        break;
      case 3:
        if (segmentdata.update.Lumi3 !== undefined) return true;
        break;
      case 4:
        if (segmentdata.update.Lumi4 !== undefined) return true;
        break;
      case 5:
        if (segmentdata.update.Lumi5 !== undefined) return true;
        break;
      default:
        break;
      }

      return false;
    }
  }

  function ifGuideInfoExists() {
    if(isEnabled(1) || isEnabled(2) || isEnabled(3) || isEnabled(4)) {
      return true;
    }
    return false;
  }

  function ifUserInfoExists() {
    if(isEnabled(5)) {
      return true;
    }
    return false;
  }

  function checkIfEmpty() {
    if(ifGuideInfoExists() || ifUserInfoExists()) {
      return false;
    }
    return true;
  }

  //Set expanded
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  var dangerimage;
  var dangertext;

  // Alustetaan komponentit, mikäli valitulla segmentillä on lumivyöryvaara
  if (segmentdata !== null) {
    if (segmentdata.Lumivyöryvaara) {
      // Lumivyöryvaaran merkin tiedostonimi on !.png
      dangerimage = <Grid item xs={12} sm={12} style={{ backgroundColor: "orange", margin: 0, paddingBottom: "1%" }}>
        <img className={classes.dangerIcon} style={isXS ? { maxWidth: "15%" } : { maxWidth: "8%" }} src={process.env.PUBLIC_URL + "/icons/avalanche.svg"} alt="lumivyöryvaaran logo" />
      </Grid>;
      dangertext = <div>
        <Typography className={classes.normalText} variant="subtitle1" color="error" display="inline">Tarkista lumivyörytilanne nettisivuiltamme: </Typography>
        <Link className={classes.normalText} href={url} rel="noopener noreferrer" variant="subtitle1" display="inline">{url}</Link>
        <Grid item xs={12} sm={12} style={{ backgroundColor: "orange", margin: 0, paddingBottom: "1%" }}></Grid>
      </div>;
    } else {
      dangerimage = <div />;
      dangertext = null;
    }
  }

  function StonesAndBranchesWithHeader(props) {
    return (
      <div>
        {props.option === 1 && (
          <Grid item sm={6} style={{display: "flex", padding: (isXS ? "0px 15px" : "0px")}}>
            <DisplaySnowType Lumilaatu={21} Nimi={"Kiviä"} Hiihdettavyys={null} Main={false} Guide={false}/>
          </Grid>                      )}
        {props.option === 2 && (
          <Grid item sm={6} style={{display: "flex", padding: (isXS ? "0px 15px" : "0px")}}>
            <DisplaySnowType Lumilaatu={22} Nimi={"Oksia"} Hiihdettavyys={null} Main={false} Guide={false}/>
          </Grid>                      )}
        {props.option === 3 && (
          <Grid style={{display: "flex", padding: (isXS ? "0px 15px" : "0px")}}>
            <DisplaySnowType Lumilaatu={21} Nimi={"Kiviä"} Hiihdettavyys={null} Main={false} Guide={false}/>
            <DisplaySnowType Lumilaatu={22} Nimi={"Oksia"} Hiihdettavyys={null} Main={false} Guide={false}/>
          </Grid>
        )}
      </div>
    );
  }

  function StonesAndBranches(props) {
    return (
      <>
        {props.option === 1 && ( <Grid item xs={6} sm={6}>
          <CardMedia
            component={"img"}
            style={{display: "block", width: "85%"}}
            src={process.env.PUBLIC_URL + "/icons/snowtypes-and-harms/" + 21 + ".svg"}
            alt="lumityypin logo"
          /></Grid>                  )}
        {props.option === 2 && ( <Grid item xs={6} sm={6}>
          <CardMedia
            component={"img"}
            style={{display: "block", width: "85%"}}
            src={process.env.PUBLIC_URL + "/icons/snowtypes-and-harms/" + 22 + ".svg"}
            alt="lumityypin logo"
          /></Grid>                   )}
        {props.option === 3 && ( <Grid item xs={12} sm={12} container>
          <Grid item xs={6} sm={6}>
            <CardMedia
              component={"img"}
              style={{display: "block", width: "85%"}}
              src={process.env.PUBLIC_URL + "/icons/snowtypes-and-harms/" + 21 + ".svg"}
              alt="lumityypin logo"
            /> 
          </Grid>
          <Grid item xs={6} sm={6}>
            <CardMedia
              component={"img"}
              style={{display: "block", width: "85%"}}
              src={process.env.PUBLIC_URL + "/icons/snowtypes-and-harms/" + 22 + ".svg"}
              alt="lumityypin logo"
            />          
          </Grid>
        </Grid>)}
      </>
    );
  }

  function TimeStamp(props) {
    let timeText = "";
    if(props.fromGuide) {
      timeText = guideTime;
    } else {
      timeText = userTimes[props.index];
    }
    return (
      <Grid item sm={12} xs={12} container style={{paddingTop: "10px"}}>
        <Grid item sm={12} xs={12}>
          <Typography className={classes.timeStamp} style={{fontWeight: (props.tag ? "600" : "400")}}>{timeText}</Typography>
        </Grid>
        {props.tag && <Grid>
          <Typography 
            className={classes.authorTag} 
            style={{backgroundColor: (props.fromGuide ? "#4C4C4C" : "#C4C4C4"), color: (props.fromGuide ? "#FFF" : "#000")}}>
            {props.fromGuide ? "Pallaksen Pöllöt" : "Vierailija" }
          </Typography>
        </Grid>}
      </Grid >
    );
  }

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} sm={12} style={{ backgroundColor: "#000000B3", margin: 0, paddingBottom: "1%" }}>
        {/* Button for closing snow record view */}
        <Grid item xs={12} sm={12}>
          <IconButton aria-label="close" style={isXS ? { color: "white", left: "85%" } : { color: "white", left: "90%", paddingTop: "1%", paddingBottom: 0 }} onClick={() => close()}>
            <CloseIcon />
          </IconButton>
        </Grid>

        {/* Segment name */}
        <Grid item xs={12} sm={12}>
          <Typography className={classes.bigHeaders} variant="h5" align="center" component="p">
            {segmentdata === null ? "Ei nimitietoa" : segmentdata.Nimi}
          </Typography>
        </Grid>
      </Grid>

      <Grid container style={{display: writeReviewEnabled === true ? "none" : ""}}>
        {/* Avalanche warning and icon if needed */}
        <Grid item xs={12} sm={12} align="center">
          {segmentdata === null ? null : dangerimage}
          {segmentdata === null ? null : dangertext}
        </Grid>
        
        {/* Forest segment view */}
        {segmentdata.Nimi === "Metsä" && 
          <Grid item xs={12} sm={12} container className={classes.addPadding}>
            <Grid item xs={12} sm={5} container className={classes.snowInfo}>
              <Grid item xs={4} sm={3}>
                <CardMedia 
                  component={"img"} 
                  src={process.env.PUBLIC_URL + "/icons/snowtypes-and-harms/icon_forest.svg"} 
                  alt="lumityypin logo"
                />
              </Grid>
              <Grid item container xs={8} sm={9} className={classes.snowInfo}>
                <Grid item xs={12} sm={12}>
                  <Typography className={classes.smallHeaders} variant="body1" component="p">
                    Metsäalue
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>}
        
        {/* Pohjamaasto, kommentoi näkyviin jos halutaan näyttää */}
        {/* <Typography variant="subtitle1" align="center" component="p">
          {segmentdata === null ? "Ei tietoa pohjamaastosta" : segmentdata.Maasto}
          </Typography> */}
        {(!isEmpty) && 
          <Grid item xs={12} sm={12} container className={classes.addPadding}>

            {ifGuideInfoExists() && <>
              {/* Main snowtype info */}
              {isEnabled(1) && <Grid item xs={12} sm={6}>
                <DisplaySnowType Lumilaatu={segmentdata.update.Lumilaatu_ID1} Nimi={segmentdata.update.Lumi1.Nimi} Hiihdettavyys={segmentdata.update.Lumi1.Hiihdettavyys} Main={true} Guide={true}/>
              </Grid>
              }
              {/* Main snowtype info 2 */}
              {isEnabled(2) && <Grid item xs={12} sm={6}>
                <DisplaySnowType Lumilaatu={segmentdata.update.Lumilaatu_ID2} Nimi={segmentdata.update.Lumi2.Nimi} Hiihdettavyys={segmentdata.update.Lumi2.Hiihdettavyys} Main={true} Guide={true}/>
              </Grid>
              }
              {/* Secondary snowtypes */}
              {isEnabled(3) && <Grid item xs={12} sm={6}>
                <DisplaySnowType Lumilaatu={segmentdata.update.Toissijainen_ID1} Nimi={segmentdata.update.Lumi3.Nimi} Hiihdettavyys={segmentdata.update.Lumi3.Hiihdettavyys} Main={false} Guide={true}/>
              </Grid>
              }
              {isEnabled(4) && <Grid item xs={12} sm={6}>
                <DisplaySnowType Lumilaatu={segmentdata.update.Toissijainen_ID2} Nimi={segmentdata.update.Lumi4.Nimi} Hiihdettavyys={segmentdata.update.Lumi4.Hiihdettavyys} Main={false} Guide={true}/>
              </Grid>
              }                            
            </>}
            {!ifGuideInfoExists() && <>
              <Typography className={classes.smallText}>Alueella ei ole Pallaksen Pöllöjen vahvistamaa tietoa. Alla oleva tieto pohjautuu tunturissa vierailleen päivitykseen.</Typography>
              <Grid item xs={12} sm={6}>
                <DisplaySnowType Lumilaatu={segmentdata.update.Lumi5.ID} Nimi={segmentdata.update.Lumi5.Nimi} Hiihdettavyys={segmentdata.update.Lumi5.Hiihdettavyys} Main={true} Guide={false}/>
              </Grid>

              <StonesAndBranchesWithHeader option={segmentdata.update.A1_Lisätiedot} />

              <TimeStamp fromGuide={false} tag={true} index={0}/>
          
              <Grid item xs={12} sm={12}>
                <Divider className={classes.divider} />
              </Grid>
            </>}

            <Grid item xs={12} sm={12}>
              {ifGuideInfoExists() && <>
                {/* Description of segment, this might be changed later */}
                {description !== "" && description !== null &&
                  <Grid item xs={12} sm={12} align="start" className={classes.textContainer}>
                    <p className={classes.normalText}>
                      {description}
                    </p>
                  </Grid>            
                }

                {/* Info about latest update time */}

                <TimeStamp fromGuide={true} tag={true}/>

                <Grid item xs={12} sm={12}>
                  <Divider className={classes.divider} />
                </Grid> 
              </>}


              {/* User-made snowtypes */}
              {ifUserInfoExists() && <Grid item xs={12} sm={12} container>
                {ifGuideInfoExists() && <>

                  {/* Open-close infos */}
                  <Box>
                    <IconButton
                      className={classes.expandButton}
                      onClick={handleExpandClick}
                      style={{backgroundColor: "#374B6A"}}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <Typography className={classes.mediumText} style={{marginRight: "5px", color: "#FFF"}}>Käyttäjäarviot</Typography>
                      <Typography className={expanded ? classes.expandOpen : classes.expandClosed}>{isXS? "<":"〱"}</Typography>
                    </IconButton>
                  </Box>

                  <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <Typography className={classes.smallText}>Alla oleva tieto pohjautuu tunturissa vierailleen päivitykseen.</Typography>

                    {segmentdata.update.Lumi5 !== undefined && <Grid item xs={12} sm={12} className={classes.snowComment} container>
                      <Grid item xs={8} sm={6}>
                        <DisplaySnowType Lumilaatu={segmentdata.update.Lumi5.ID} Nimi={segmentdata.update.Lumi5.Nimi} Hiihdettavyys={segmentdata.update.Lumi5.Hiihdettavyys} Main={true} Guide={false}/>
                      </Grid>
                      <Grid item sm={2}></Grid>
                      <Grid item xs={4} sm={4} container style={{alignContent: "center"}}>
                        <StonesAndBranches option={segmentdata.update.A1_Lisätiedot} />
                      </Grid>
                      <TimeStamp fromGuide={false} index={0} />

                    </Grid>}

                    {segmentdata.update.Lumi6 !== undefined && <Grid item xs={12} sm={12} className={classes.snowComment} container>
                      <Grid item xs={8} sm={6}>
                        <DisplaySnowType Lumilaatu={segmentdata.update.Lumi6.ID} Nimi={segmentdata.update.Lumi6.Nimi} Hiihdettavyys={segmentdata.update.Lumi6.Hiihdettavyys} Main={true} Guide={false}/>
                      </Grid>
                      <Grid item sm={2}></Grid>
                      <Grid item xs={4} sm={4} container style={{alignContent: "center"}}>
                        <StonesAndBranches option={segmentdata.update.A2_Lisätiedot} />
                      </Grid>

                      <TimeStamp fromGuide={false} index={1} />

                    </Grid>}

                    {segmentdata.update.Lumi7 !== undefined && <Grid item xs={12} sm={12} className={classes.snowComment} container>
                      <Grid item xs={8} sm={6}>
                        <DisplaySnowType Lumilaatu={segmentdata.update.Lumi7.ID} Nimi={segmentdata.update.Lumi7.Nimi} Hiihdettavyys={segmentdata.update.Lumi7.Hiihdettavyys} Main={true} Guide={false}/>
                      </Grid>
                      <Grid item sm={2}></Grid>
                      <Grid item xs={4} sm={4} container style={{alignContent: "center"}}>
                        <StonesAndBranches option={segmentdata.update.A3_Lisätiedot} />
                      </Grid>
                      <TimeStamp fromGuide={false} index={2} />
                    </Grid>}

                    <Grid item xs={12} sm={12}>
                      <Divider className={classes.divider} />
                    </Grid> 
                
                  </Collapse>
                </> }
              </Grid>}
            </Grid>
      

            {/* Snow review buttons */}
            {!signedUser && (expanded || (!ifGuideInfoExists() || !ifUserInfoExists())) && (
              <Grid item xs={12} sm={12}>                  
                <Grid item xs={12} sm={12}>       
                  <Typography className={classes.mediumText} style={{padding: "0px 0px 10px 5px"}}>Liikuitko alueella?</Typography> 
                </Grid>

                <Grid container spacing={(isXS ? 0 : 2)} style={{marginBottom: "10px"}}>
                  <Grid item xs={12} sm={7}>
                    <Button 
                      variant="contained" className={classes.reviewButton} style={{backgroundColor: "#374B6A"}} onClick={openForm}>Kyllä, lisää arvio lumitilanteesta.</Button>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Button variant="contained" className={classes.reviewButton} style={{backgroundColor: "#4C4C4C"}} onClick={openFeedback}>Lisää muu havainto.</Button>
                  </Grid>
                </Grid>
              </Grid>
            )}

          </Grid>}
        {(isEmpty) && 
          <Grid item xs={12} sm={12} container className={classes.addPadding}>
            <Typography className={classes.timeStamp} style={{marginBottom: "10px"}}>
              Ei havaintoja alueelta.
            </Typography>

            {!signedUser && (
              <Grid item xs={12} sm={12}>                  
                <Grid item xs={12} sm={12}>       
                  <Typography className={classes.mediumText} style={{padding: "0px 0px 10px 5px"}}>Liikuitko alueella?</Typography> 
                </Grid>

                <Grid container spacing={(isXS ? 0 : 2)} style={{marginBottom: "10px"}}>
                  <Grid item xs={12} sm={7}>
                    <Button 
                      variant="contained" className={classes.reviewButton} style={{backgroundColor: "#374B6A"}} onClick={openForm}>Kyllä, lisää arvio lumitilanteesta.</Button>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Button variant="contained" className={classes.reviewButton} style={{backgroundColor: "#4C4C4C"}} onClick={openFeedback}>Lisää muu havainto.</Button>
                  </Grid>
                </Grid>
              </Grid>
            )}

          </Grid>
        }

        {/* Sponsor logos */}
        
        {!isEmpty &&
        <Grid container item xs={12} className={classes.sponsorContainer} >
          {sponsors !== undefined && <>
            {sponsors.length >= 1 && sponsors[0].logo !== "" && 
              <a href={sponsors[0].address} target="_blank" rel="noopener noreferrer">
                <img src={"sponsorit/" + sponsors[0].logo} alt="" className={classes.sponsor} />
              </a> }
            {sponsors.length >= 2 && sponsors[1].logo !== "" && 
              <a href={sponsors[1].address} target="_blank" rel="noopener noreferrer">
                <img src={"sponsorit/" + sponsors[1].logo} alt="" className={classes.sponsor} />
              </a> }
            {sponsors.length >= 3 && sponsors[2].logo !== "" && 
              <a href={sponsors[2].address} target="_blank" rel="noopener noreferrer">
                <img src={"sponsorit/" + sponsors[2].logo} alt="" className={classes.sponsor} />
              </a> }           
          </>}
        </Grid>}
        

      </Grid>
    </Grid> 
  );
}

export default SnowRecordView;
