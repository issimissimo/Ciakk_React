/// Utils
import { translation } from "../utils/translation";

/// AppStateEnum
import { AppStateEnum } from "../App";

/// CSS Anim
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";


const introAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0px, 50px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const outroAnimation = keyframes`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0px, -50px, 0);
  }
`;



/// React
import { useState, useEffect, useContext, useRef } from "react";

const Welcome = ({ data, HandleChangeState }) => {

    const [exit, setExit] = useState(false);

    // return (
    //     <CSSTransition in={inProp} timeout={2000} classNames="my-node">
    //         <div className="min-h-screen flex flex-col justify-center items-center">
    //             <p className="text-2xl">{translation(data.language).welcomeTitle}</p>
    //             <p className="text-3xl font-bold my-3">{data.receiver}</p>


    //             <button
    //                 type="button"
    //                 // onClick={() => { HandleChangeState(AppStateEnum.MESSAGE) }}
    //                 onClick={() => setInProp(true)}
    //                 className="border-[1px] p-4 px-7 mt-10 border-black rounded-full">
    //                 READ MESSAGE
    //             </button>




    //         </div>
    //     </CSSTransition>
    // )

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <Reveal keyframes={exit ? outroAnimation : introAnimation} delay={200}>
                <p className="text-2xl">{translation(data.language).welcomeTitle}</p>
                <p className="text-3xl font-bold my-3">{data.receiver}</p>
            </Reveal>

            <Reveal keyframes={exit ? outroAnimation : introAnimation} delay={500}>
                <button
                    type="button"
                    onClick={() => { HandleChangeState(AppStateEnum.MESSAGE) }}
                    // onClick={() => { setExit(true) }}
                    className="border-[1px] p-4 px-7 mt-10 border-black rounded-full">
                    READ MESSAGE
                </button>
            </Reveal>
        </div>
    )



}

export default Welcome;