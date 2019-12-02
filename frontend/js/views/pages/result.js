import AskAndAnswer from '../../views/pages/tasks/question-answer.js';

import Error404 from '../../views/pages/error404.js';

class Result extends AskAndAnswer {
    render(question) {
        return new Promise(resolve => {
            let html;

            if (this.isQuestion()) {
                html = `
                    <div class="result">                                    
                    </div>
					`;
            } else {
                html = new Error404().render();
            }
            resolve(html);
        });
    }

    afterRender() {
        this.isQuestion() && Result.counterResult();
    }

    isQuestion() {
        return Array.isArray(JSON.parse(localStorage.getItem('counter')));
    }


    static counterResult() {
        let numberOfRightAnswers = JSON.parse(localStorage.getItem('counter')).filter(el => el[Object.keys(el)[0]] == 'true').length;
        Result.drawResult(numberOfRightAnswers);
    }

    static drawResult(numberOfRightAnswers) {
        let counter = document.getElementsByClassName('result')[0];
        counter.innerHTML = `<h1>Ваш результат: ${numberOfRightAnswers}/10</h1>`;

        switch (numberOfRightAnswers) {
            case 0:
            case 1:
            case 2:
                counter.innerHTML += '<h3>Как же так!</h3>' +
                    '<div>Вы точно знаете белорусский? Вам не помешает открыть школьный учебник и подучить некоторые слова и правила.</div>';
                break;

            case 3:
            case 4:
                counter.innerHTML += '<h3>Могло быть и лучше.</h3>' +
                    '<div>Вы учили белорусский в школе, но в обыденной жизни им совсем не пользуетесь.</div>';
                break;

            case 5:
            case 6:
                counter.innerHTML += '<h3>Это не предел!</h3>' +
                    '<div>Возможно о погоде вы поговорить сможете, но более серьезные беседы на белорусском вам пока не по плечу. Не сдавайтесь, говорите на родном языке больше и чаще. Тогда точно все получится!</div>';
                break;

            case 7:
            case 8:
                counter.innerHTML += '<h3>У вас хорошие знания белорусского!</h3>' +
                    '<div>Главное, не бросайте учить новые слова. Их в нашем языке предостаточно.</div>';
                break;

            case 9:
            case 10:
                counter.innerHTML += '<h3>Блестяще!</h3>' +
                    '<div>Ваши знания родного языка на высоте. Наверняка, вы уверенно владеете белорусским.</div>';
                break;
        }

        counter.innerHTML += '<a class="btn-start-again button" href="/#/" title="Click here to get main page!">Вернуться на главную страницу</a>';

        localStorage.clear();
    }
}

export default Result;