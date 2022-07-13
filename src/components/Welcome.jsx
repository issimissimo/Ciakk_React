/// Utils
import { translation } from "../utils/translation";

/// AppStateEnum
import { AppStateEnum } from "../App";

/// CSS Anim
import Reveal from "react-awesome-reveal";
import { fadeInUp, fadeOutUp, lineFadeInLeft, lineFadeInRight, lineFadeOutLeft, lineFadeOutRight } from "../utils/revealCustomAnimations";

/// React
import { useState, useEffect, useContext, useRef } from "react";




///
/// WELCOME
///
const Welcome = ({ data, HandleChangeState }) => {

  const [enter, setEnter] = useState(true);
  const lineTopRef = useRef();
  const lineBottomRef = useRef();

  const duration = 5000;

  useEffect(() => {

    setTimeout(() => {
      GoNext();
    }, duration);
  }, []);


  const GoNext = () => {
    // setEnter(false);
  }


  return (
    <div className="min-h-screen flex flex-col justify-center items-center">


      <Reveal keyframes={enter ? fadeInUp : fadeOutUp} delay={enter ? 0 : 200}>
        <p className="text-2xl font-serif my-4">{translation(data.language).welcomeTitle}</p>
      </Reveal>

      <div className="my-2">

        <Reveal keyframes={enter ? lineFadeInLeft : lineFadeOutLeft} delay={enter ? 1000 : 0}>
          <div ref={lineTopRef} className="bg-white h-1 relative" />
        </Reveal>

        <Reveal keyframes={enter ? fadeInUp : fadeOutUp} delay={enter ? 500 : 300}>
          <p className="text-5xl font-bebas p-0 my-2">{data.receiver}</p>
        </Reveal>

        <Reveal keyframes={enter ? lineFadeInRight : lineFadeOutRight} delay={enter ? 1000 : 0}>
          <div ref={lineBottomRef} className="bg-white h-1 relative -mt-2" />
        </Reveal>

      </div>


      {/* <Reveal keyframes={exit ? outroAnimation : introAnimation} delay={500}>
                <button
                    type="button"
                    onClick={() => { HandleChangeState(AppStateEnum.MESSAGE) }}
                    // onClick={() => { setExit(true) }}
                    className="border-[1px] p-4 px-7 mt-10 border-black rounded-full">
                    READ MESSAGE
                </button>
            </Reveal> */}
    </div>
  )
}

export default Welcome;