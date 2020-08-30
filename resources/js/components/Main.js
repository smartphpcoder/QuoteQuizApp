import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Questions from "./Questions";
import Result from "./Result";

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            questions: [],
            currentQuestion:1,
            selectedOption: 'single',
            score: 0,
            responses: 0
        }
        this.playAgain = this.playAgain.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        // this.nextQuestionHandler = this.nextQuestionHandler.bind(this);
    }

    componentDidMount(){
        this.getQuestions();
    }


    computeAnswer(answer){
        if(answer.correct){
            this.setState({
                score: this.state.score + 1
            })
        }
        this.setState({
            responses: this.state.responses < 10 ? this.state.responses + 1 : 10
        })
    }

    getQuestions(){
        axios.get("http://127.0.0.1:8000/quotequiz/data").then((response) => {
            if(response.status == 200){
                this.setState({
                    questions: response.data ? response.data : [],
                })
            }
            if(response.data.status == "failed" && response.data.success == false){
                this.setState({
                    noDataFound:response.data.message
                })
            }
        })
    };

    playAgain(){
        this.setState({
            questions:[],
            score: 0,
            responses: 0
        });
        this.getQuestions();
    }

    /* Next Question Event Handler
        nextQuestionHandler(){
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            })
        console.log(this.state.currentQuestion);
    }*/

    handleOptionChange (changeEvent) {
        this.setState({
          selectedOption: changeEvent.target.value
        });
        this.playAgain();
    }


    render (){
        return (
            <div className="container">
                    <div className="row">
                    <div className="col-md-12 mt-4 text-center">
                        <h3 className="font-weight-bold">Quote Quiz App</h3>
                        <small className="text-muted">Full Stack Task</small>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-8 col-centered questions">
                        <div className="card mt-3 tab-card">
                            <div className="card-header tab-card-header">
                                <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">Main</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">Settings</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="questionsContainer tab-content" id="answerTabContent">
                                <div className="tab-pane fade show active p-3" id="one" role="tabpanel" aria-labelledby="one-tab">
                                    {this.state.questions.length > 0 && this.state.responses < 10 && 
                                        this.state.questions.map(({id, question_title, answers, question_type}) => (
                                        question_type === this.state.selectedOption ? (<Questions key={id} id={id} question={question_title} answers={answers} selected={answer => this.computeAnswer(answer)} />) : null
                                    ))}
                                    {this.state.responses === 10 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
                                </div>
                                {/* 
                                    Button for Next Question
                                    <button type="button" className="btn btn-warning" onClick={this.nextQuestionHandler}>Next Question</button> 
                                */}
                                <div className="tab-pane fade p-3" id="two" role="tabpanel" aria-labelledby="two-tab">
                                    <h5 className="card-title">Select Questions Type</h5>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="settings" id="exampleRadios1" value="single" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'single'} />
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            Default Single (Yes / No)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input"  type="radio" name="settings" id="exampleRadios1" value="multiple" onChange={this.handleOptionChange} checked={this.state.selectedOption === 'multiple'} />
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            Multiple Choice
                                        </label>
                                    </div>        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="row">
                        <div className="col-md-12 mt-4 text-center">
                            <small className="text-muted">Created with Love: Badri Gogilashvili</small>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Main;

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
