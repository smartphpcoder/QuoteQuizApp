import React from "react";

const Result = ({score, playAgain}) => {

    return (
        <div className="panel panel-default text-center">
            <div className="panel-body mb-2">You Scored {score} / 10 Questions!</div>
            <button type="button" className="btn btn-success" onClick={playAgain}>PlayAgain</button>
        </div>
    )
}

export default Result;