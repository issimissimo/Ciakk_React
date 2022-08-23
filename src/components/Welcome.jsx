/// Utils
import { translation } from "../utils/translation";

/// CSS Anim
import Reveal from "react-awesome-reveal";
import { fadeIn, fadeOut } from "../utils/revealCustomAnimations";

/// SCSS
import "../flowers.scss";

/// React
import { useState, useEffect } from "react";



function lerp(value1, value2, amount) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
};



///
/// WELCOME
///
const Welcome = ({ data, onGoNext }) => {

  const [enter, setEnter] = useState(true);
  const [titleVisible, setTitleVisible] = useState(false);
  const duration = 6000;

  useEffect(() => {
    setFlowersVisibility(0, 1, 1.5, () => {
      setTitleVisible(true);
    });

    setTimeout(() => {
      setEnter(false);
      setFlowersVisibility(1, 0, 1, () => {
        onGoNext();
      });
    }, duration);
  }, []);


  const setFlowersVisibility = (start, end, duration, callback) => {
    let value = 0;

    function setVisibility(start, end, duration, callback) {
      let _alpha = lerp(start, end, value);
      let _percentage = 100 - (_alpha * 100);
      document.documentElement.style.setProperty('--percentage', _percentage + '%');
      document.documentElement.style.setProperty('--alpha', _alpha);
      setTimeout(() => {
        if (value < 1) {
          value += 0.01;
          setVisibility(start, end, duration, callback);
        }
        else {
          if (callback !== undefined) callback();
        }
      }, duration * 10)
    }
    setVisibility(start, end, duration, callback);
  }


  return (
    <>
      <div className="flowers"></div>

      {titleVisible &&
        <div className="flex-1 flex flex-col justify-center items-center z-10">
          <Reveal keyframes={enter ? fadeIn : fadeOut} delay={enter ? 0 : 0}>
            <p className="text-4xl font-script-1 text-white opacity-70 p-0">{translation(data.language).welcomeTitle}</p>
          </Reveal>

          <Reveal keyframes={enter ? fadeIn : fadeOut} delay={enter ? 0 : 0}>
            <p className="text-5xl font-script-1 text-white p-0 mt-3">{data.receiver}</p>
          </Reveal>
        </div>
      }
    </>
  )
}

export default Welcome;