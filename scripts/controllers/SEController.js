class SEController {
    constructor(clientId, key) {
        this.clientId = clientId;
        this.key = key;
        this.defaultPath = 'https://api.stackexchange.com/2.2/';
        this.site = "stackoverflow";
    }

    authenticate(redirectUri) {
        let urlPath = "https://stackexchange.com/oauth/dialog";
        let scope = "write_access";
        if (!sessionStorage.getItem("authenticated")) {
            window.location = urlPath + "/?client_id=" + this.clientId + "&" + "scope=" + scope + "&" + "redirect_uri=" + redirectUri;
        } else {
            throw "Already authenticated!";
        }
    }

    async getUserInfo() {
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        if (sessionStorage.getItem("site") !== null) {
            site = sessionStorage.getItem("site");
        }
        return fetch(this.defaultPath + "me?" + "key=" + this.key + "&" + "access_token=" + sessionStorage.getItem("access_token") + "&" + "site=" + this.site)
            .then(response => {
                if (!response.ok) {
                    throw response.statusText;
                }
                return response.json();
            })
            .then(data => {
                return data.items[0];
            })
            .catch(err => {
                throw err;
            });
    }

    async logout() {
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        return fetch(this.defaultPath + "access-tokens/" + sessionStorage.getItem("access_token") + "/invalidate?" + "key=" + this.key)
            .then(response => {
                if (!response.ok) {
                    throw response.statusText;
                }
                return response.json();
            })
            .then(data => {
                sessionStorage.clear();
                return data.items[0];
            })
            .catch(err => {
                throw err;
            });
    }

    //Returns questions with specified page size and minimum 5 answers (accepted or not)
    async getQuestions(numberOfQuestions) {
        if (numberOfQuestions === undefined) {
            throw "Please specify the number of questions you want to retreive!";
        }
        return fetch(this.defaultPath + "search/advanced?" + "pagesize=" + numberOfQuestions + "&" + "site=" + this.site + "&" + "filter=" + "!--gVN.zYJKFz" + "&" + "key=" + this.key + "&" + "answers=5")
            .then(response => {
                if (!response.ok) {
                    throw response.statusText;
                }
                return response.json();
            })
            .then(data => {
                return data.items;
            })
            .catch((err) => {
                throw err;
            });
    }

    async getAnswers(questionId, numberOfAnswers) {
        if (questionId === undefined) {
            throw "No questionId error!";
        }
        if (numberOfAnswers === undefined) {
            throw "Please specify the number of answers you want to retreive!";
        }
        return fetch(this.defaultPath + "questions" + "/" + questionId + "/answers?" + "pagesize=" + numberOfAnswers + "&" + "site=" + this.site + "&" + "key=" + this.key + "&" + "filter=" + "!9Z(-wzftf")
            .then(response => {
                if (!response.ok) {
                    throw response.statusText;
                }
                return response.json();
            })
            .then(data => {
                return data.items;
            })
            .catch((err) => {
                throw err;
            });
    }

    async upvoteAnswer(answerId) {
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        if (answerId === undefined) {
            throw "No answerId error!";
        }
        return fetch(this.defaultPath + "answers" + "/" + answerId + "/upvote", {
                method: 'post',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'id=' + answerId + '&key=9)bOO0dxebBgnNxZafI7Tg((&access_token=' + sessionStorage.getItem("access_token") + '&preview=false&filter=default&site=' + this.site
            })
            .then(response => {
                if (!response.ok) {
                    throw response.statusText;
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch((err) => {
                throw err;
            });
    }
}

var SE = new SEController(13513, '9)bOO0dxebBgnNxZafI7Tg((');