import Component from '../../views/component.js';

class About extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="about"> 
                    <h1 class="page-title">Добро пожаловать!</h1>                   
                    <p class="about__info">Предлагаем проверить, насколько хорошо вы знаете белорусский язык.</p>
                    <a class="about__btn-start button" href="#/questions/1" title="Click here to get started!">Начать тест</a>
                </div>
            `);
        });
    }
}

export default About;