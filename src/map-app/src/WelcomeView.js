/**
Welcome view of the application.
Has text that contains information about the application and a spot for sponsor logos.
Recent changes:
7.12 Emil Calonius
Updated layout for mobile
1.12 Emil Calonius
Created component
 **/

import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import welcomeText from "./welcome_text.txt";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#292929",
    height: "100%",
    display: "flex",
    flexFlow: "column"
  },
  textContainer: {
    overflowY: "scroll",
    flex: 4
  },
  text: {
    color: "white",
    padding: "5px",
    display: "block",
    fontSize: 20,
    fontFamily: "Donau"
  },
  icon: {
    height: "89px",
    width: "144px",
  },
  iconContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  sponsorContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "20px"
  },
  sponsor: {
    maxWidth: "60px",
    maxHeight: "60px",
    padding: "10px"
  },
  mobileRoot: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    height: "100%",
    display: "flex",
    flexFlow: "column"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10px"
  }
}));

function WelcomeView(props) {
  const [ text, setText ] = React.useState([]);

  React.useEffect(() => {
    // Reads the file welcome_text.txt located in the same folder
    // splits it on newlines and sets the "text"-variable as the resiulting array
    const readText = async () => {
      fetch(welcomeText)
        .then((r) => r.text())
        .then(text => setText(text.split("\n")));
    };
    readText();
  }, []);

  const styledClasses = useStyles();

  if(props.isMobile) {
    return(
      <Box className={styledClasses.mobileRoot}>
        <Box className={styledClasses.iconContainer} style={{flex: 2}}>
          <img src="pallaksen_pollot_logo_white.png" alt="Pallaksen pöllöt logo" className={styledClasses.icon} />
        </Box>
        <Box className={styledClasses.textContainer} style={{flex: 8, marginLeft: "30px", marginRight: "15px", marginTop: "10px"}}>
          {
            text.map((paragraph, index) => {
              return <Typography key={index} className={styledClasses.text}>{paragraph}</Typography>;
            })
          }
        </Box>

        
        <Box className={styledClasses.sponsorContainer} style={{flex: 2}}>
          {props.sponsors !== undefined && <>
            {props.sponsors.length >= 1 && props.sponsors[0].logo !== "" && 
              <a href={props.sponsors[0].address} target="_blank" rel="noopener noreferrer">
                <img src={"sponsorit/" + props.sponsors[0].logo} alt="" className={styledClasses.sponsor} />
              </a> }
            {props.sponsors.length >= 2 && props.sponsors[1].logo !== "" && 
              <a href={props.sponsors[1].address} target="_blank" rel="noopener noreferrer">
                <img src={"sponsorit/" + props.sponsors[1].logo} alt="" className={styledClasses.sponsor} />
              </a> }
            {props.sponsors.length >= 3 && props.sponsors[2].logo !== "" && 
              <a href={props.sponsors[2].address} target="_blank" rel="noopener noreferrer">
                <img src={"sponsorit/" + props.sponsors[2].logo} alt="" className={styledClasses.sponsor} />
              </a> }           
          </>}   
        </Box>
        
        <Box className={styledClasses.buttonContainer}>
          <Button
            variant="contained"
            onClick={props.updateShowWelcomeView}
            style={{flex: 1, maxHeight: "50px", maxWidth: "300px", fontWeight: "bold"}}
          >
            TUTUSTU LUMITILANTEESEEN
          </Button>
        </Box>
      </Box>
    );
  } else {
    return(
      <Box className={styledClasses.root}>
        <Box className={styledClasses.iconContainer}>
          <img src="pallaksen_pollot_logo_white.png" alt="Pallaksen pöllöt logo" className={styledClasses.icon} />
        </Box>
        <Box className={styledClasses.textContainer} style={{marginLeft: "50px", marginRight: "50px"}}>
          {
            text.map((paragraph, index) => {
              return <Typography key={index} className={styledClasses.text}>{paragraph}</Typography>;
            })
          }
        </Box>
        
        <Box className={styledClasses.sponsorContainer}>
          {props.sponsors !== undefined && <>
            {props.sponsors.length >= 1 && props.sponsors[0].logo !== "" && 
              <a href={props.sponsors[0].address} target="_blank" rel="noopener noreferrer">
                <img src={"sponsorit/" + props.sponsors[0].logo} alt="" className={styledClasses.sponsor} />
              </a> }
            {props.sponsors.length >= 2 && props.sponsors[1].logo !== "" && 
              <a href={props.sponsors[1].address} target="_blank" rel="noopener noreferrer">
                <img src={"sponsorit/" + props.sponsors[1].logo} alt="" className={styledClasses.sponsor} />
              </a> }
            {props.sponsors.length >= 3 && props.sponsors[2].logo !== "" && 
              <a href={props.sponsors[2].address} target="_blank" rel="noopener noreferrer">
                <img src={"sponsorit/" + props.sponsors[2].logo} alt="" className={styledClasses.sponsor} />
              </a> }           
          </>}
        </Box>
        
      </Box>
    );
  }
}

export default WelcomeView;