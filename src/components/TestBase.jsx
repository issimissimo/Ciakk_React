/// React
import React from 'react';
import { useState, useEffect, useContext, useRef } from "react";

import Test from "./Test"
import Button from "./extensions/Button";


const TestBase = () => {

    const [showVideo, setShowVideo] = useState(false);

    const HandleClick = () => {
        setShowVideo(true);
    }

    return (

        <div>

            {showVideo ?
                (
                    <Test />
                )
                :
                (
                    <div className="min-h-screen flex justify-center items-center">
                        <Button
                            text="START!"
                            loading={false}
                            active={true}
                            onClick={HandleClick}
                        />
                    </div>
                )
            }




        </div>

    )
}

export default TestBase;