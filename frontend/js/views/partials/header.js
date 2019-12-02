import Component from '../../views/component.js';

class Header extends Component {
    render() {
        const resource = this.request.resource;

        return new Promise(resolve => {
            resolve(`
                 <header class="header">                    
                     <a class="header__link ${!resource ? 'active' : ''}" href="/#/">
                         О тесте
                     </a>
                     <a class="header__link ${resource === 'questions' ? 'active' : ''}" href="/#/questions/1">
                         Вопросы
                     </a>                                            
                </header>
            `);
        });
    }
}

export default Header;