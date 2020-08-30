import React, {useState} from "react";

const Questions = ({id, question, answers, selected}) => {

    const [answer_items, setAnswer] = useState(answers);

    return (
        
        <div className="card mb-4">
            <small className="text-muted text-center mt-2"> Question: {id}</small>
            <div className="card-body text-center">
                {question}
            </div>
            <ul className="list-group list-group-flush">
                {
                    answer_items.map((item) => 
                        <button type="button" key={item.id} className="btn btn-light" onClick={() => {setAnswer([item]); selected(item); }}>
                            {item.answer}
                         </button>
                    )
                }
            </ul>
        </div>
  
    )
}

export default Questions;