import Component from '../../../views/component.js';

import Question from '../../../models/questions.js';
import Error404 from '../../../views/pages/error404.js';

class AskAndAnswer extends Component {
    constructor() {
        super();

        this.model = new Question();
    }

    getData() {
        return new Promise(resolve => this.model.getQuestion(this.request.id).then(question => {
            this.question = question;
            resolve(question)
        }));
    }

    render(question) {
        return new Promise(resolve => {
            let html;

            if (this.isQuestion()) {
                html = `
					<div class="question-answer-box">
				
				        <div class="question">
					        <p>${question.question}</p>
				        </div>
				 
                        <table class="answer-box">
                            <tr class="answer">
                                <td id="answer1">${question.answer1}</td>
                            </tr>
                            <tr class="answer">
                                <td id="answer2">${question.answer2}</td>
                            </tr>
                            <tr class="answer">
                                <td id="answer3">${question.answer3}</td>
                            </tr>
                        </table>
				    </div>
					`;
            } else {
                html = new Error404().render();
            }

            resolve(html);
        });
    }

    afterRender() {
        this.isQuestion() && this.setActions();
    }

    isQuestion() {
        return Object.keys(this.question).length;
    }

    setActions() {
        const answerBox = document.getElementsByClassName('answer-box')[0];

        answerBox.addEventListener('click', event => {
            let target = event.target;

            if (target.tagName === 'TD') {
                if (target.id === this.question.answer) {
                    this.countRightAnswer();

                    let rightAnswer = document.getElementById(`${target.id}`);
                    rightAnswer.classList.add('right_answer');

                    this.countAnswers();

                } else if (target.id !== this.question.answer) {
                    this.countWrongAnswer();

                    let wrongAnswer = document.getElementById(`${target.id}`),
                        rightAnswer = document.getElementById(`${this.question.answer}`);
                    wrongAnswer.classList.add('wrong_answer');
                    setTimeout(() => rightAnswer.classList.add('right_answer'), 2000);

                    this.countAnswers();
                }
            }
        }, {once: true});
    }

    redirectToNextQuestion(id) {
        if (this.request.id >= 1 && this.request.id < 10) {
            id = +id + 1;
            location.hash = `#/questions/${id}`;
        }
    }

    countRightAnswer() {
        const answer = {};
        answer[this.request.id] = 'true';

        if (localStorage.counter) {
            const allAnswers = JSON.parse(localStorage.counter);
            const data = allAnswers.filter(el => Object.keys(el) != this.request.id);
            data.push(answer);
            localStorage.setItem('counter', JSON.stringify(data));
            return;
        }

        localStorage.setItem('counter', JSON.stringify([answer]));
    }

    countWrongAnswer() {
        const answer = {};
        answer[this.request.id] = 'false';

        if (localStorage.counter) {
            const allAnswers = JSON.parse(localStorage.counter);
            const data = allAnswers.filter(el => Object.keys(el) != this.request.id);
            data.push(answer);
            localStorage.setItem('counter', JSON.stringify(data));
            return;
        }

        localStorage.setItem('counter', JSON.stringify([answer]));
    }

    countAnswers() {
        const numberOfAnswers = JSON.parse(localStorage.counter);
        if (numberOfAnswers.length === 10) {
            setTimeout(() => AskAndAnswer.redirectToResult(this.request.id), 2000);
        } else {
            setTimeout(() => this.redirectToNextQuestion(this.request.id), 3000);
        }
    }

    static redirectToResult(id) {
        location.hash = `#/questions/${id}/result`;
    }

}

export default AskAndAnswer;