class Question {
    getQuestion(id) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `http://localhost:3000/api/questions/${id}`, true);

            xhr.onload = () => {
                try {
                    resolve(JSON.parse(xhr.response))
                } catch(error) {
                    Question.showError();
                }
            };

            xhr.send();
        });
    }

    static showError() {
       const contentContainer = document.getElementsByClassName('content-container')[0];
        contentContainer.innerHTML = '<div class="page-title">Произошла ошибка при загрузке данных.</div>';
    }
}

export default Question;