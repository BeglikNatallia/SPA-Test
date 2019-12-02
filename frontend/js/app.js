import Utils from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import About from './views/pages/about.js';
import Error404 from './views/pages/error404.js';

import AskAndAnswer from './views/pages/tasks/question-answer.js';
import Result from './views/pages/result.js';

const Routes = {
    '/': About,
    '/questions/:id': AskAndAnswer,
    '/questions/:id/result': Result
};

function router() {
    const headerContainer = document.getElementsByClassName('header-container')[0],
          contentContainer = document.getElementsByClassName('content-container')[0],
          footerContainer = document.getElementsByClassName('footer-container')[0],
          header = new Header(),
          footer = new Footer();

    header.render().then(html => {
        headerContainer.innerHTML = html;
    });

    const request = Utils.parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.result ? `/${request.result}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
		page.render(data).then(html => {
			contentContainer.innerHTML = html;
			page.afterRender();
		});
    });

    footer.render().then(html => {
        footerContainer.innerHTML = html;
    });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);