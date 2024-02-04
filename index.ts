// import Drow from "./drow.ts";

interface commObject {
    author_avatar: string,
    author_name: string,
    date_time: string,
    text: string,
    isFavorite: boolean,
    raiting: number,
    replay_author_name?: string
}
interface MainComment extends commObject {
    answers?: commObject[]
}
let MainComments: MainComment[] = [];

if (localStorage.getItem("comments") !== null) {
MainComments = JSON.parse(localStorage.getItem("comments") as string);
}

interface User {
    firstName: string | null,
    avatar:    string | null
}
let usersGroup: User[] = [];

// const drowClass = new Drow(MainComments);

const commentPosition: HTMLElement | null = document.querySelector(".comment");
const countElementPosition: HTMLElement | null = document.querySelector(".comment_header_counterElement");

getUsers()

drowComment(MainComments)

function getUsers() {                                                                 // получаем пользователей
    fetch ('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((data) => {
        for (let i:number = 0; i < 5; i++) {
            let users: User = {firstName: null, avatar: null};
            users.firstName = data.results[i].name.first;
            users.avatar    = data.results[i].picture.thumbnail;
            usersGroup.push(users);
        }
        const commentAuthorPosition = document.querySelector(".comment_authorFoto") as HTMLImageElement;
        const authorNamePosition    = document.querySelector(".author_name") as HTMLElement;
            if (usersGroup[0].avatar && usersGroup[0].firstName) {
                commentAuthorPosition.src = usersGroup[0].avatar;
                authorNamePosition.textContent = usersGroup[0].firstName;
            }
    })
    .catch((error) => {console.log("JSON Error:" + error)});
}
const inputFieldPosition: HTMLTextAreaElement | null = document.querySelector(".comment_inputField");
const textSizePosition = document.querySelector(".text_size") as HTMLElement;

inputFieldPosition?.addEventListener("input", (event) => {                           // считаем длину ввода, отображаем количество введенных символов
    if (inputFieldPosition.value) {
        let inputFieldLength = inputFieldPosition.value.length;
            textSizePosition.textContent = `${inputFieldLength} / 1000`;
            if (inputFieldLength >= 100) {
                textSizePosition.style.color = "red";
            } else {
                textSizePosition.style.color = "#BFBFBF";
            }
            inputFieldPosition.style.height = ``                                                // увеличиваем высоту поля ввода, если не влезло в одну строку (загуглил)
            inputFieldPosition.style.height = `${inputFieldPosition.scrollHeight + 5}px`
    }
})

const inputButton: HTMLButtonElement | null = document.querySelector(".comment_inputButton");

inputButton?.addEventListener("click", (event) => {                                             // обрабатываем нажатие кнопки
    if (inputFieldPosition?.value !== "") {
        if (inputFieldPosition) {
            let inputComment:     commObject = {author_avatar: "", author_name: "", date_time: "", text: "", isFavorite: false, raiting: 0};
            if (usersGroup[0].avatar && usersGroup[0].firstName) {
                let currDate: Date = new Date();
                let currDateString: string = `${("0"+currDate.getDate()).slice(-2)}.${("0"+currDate.getMonth()+1).slice(-2)} ${("0"+currDate.getHours()).slice(-2)}:${("0"+currDate.getMinutes()).slice(-2)}`;
                
                inputComment = {author_avatar: usersGroup[0].avatar, author_name: usersGroup[0].firstName, 
                                date_time: currDateString, text: inputFieldPosition.value, isFavorite: false, raiting: 0};
                    
                MainComments.push(inputComment);
            }
                
            localStorage.setItem("comments", JSON.stringify(MainComments));
                
            textSizePosition.textContent = "Макс. 1000 символов";
            inputFieldPosition.value = "";

        }
        drowComment(MainComments);
    }
})

function drowComment(MainCommObj: MainComment[]) {                                                                    // рисуем все кооментарии
    while (commentPosition?.firstChild) {                                                  // удаляем дочерние элементы 
        commentPosition.removeChild(commentPosition.firstChild);
    }
    
    for (let i:number = 0; i < MainCommObj.length; i++) {

        let mainCommElement: HTMLElement = document.createElement("div");                   // создаем блок основного комментария
            mainCommElement.classList.add("comment_block");
            mainCommElement.setAttribute("Data-index", String(i));

            let mainCommElem_foto: HTMLImageElement = document.createElement("img");
                mainCommElem_foto.classList.add("comment_authorFoto");
                mainCommElem_foto.src = MainCommObj[i].author_avatar;
                mainCommElem_foto.setAttribute("alt", MainCommObj[i].author_avatar);
                mainCommElement?.appendChild(mainCommElem_foto);

            let mainCommElem_head: HTMLElement = document.createElement("div");
                mainCommElem_head.classList.add("comment_textHead");

                let mainCommElem_head_name: HTMLElement = document.createElement("div");
                    mainCommElem_head_name.classList.add("author_name");
                    mainCommElem_head_name.textContent = MainCommObj[i].author_name;
                    mainCommElem_head.appendChild(mainCommElem_head_name);

                let mainCommElem_head_date: HTMLElement = document.createElement("div");
                    mainCommElem_head_date.classList.add("comment_textHead_date");
                    mainCommElem_head_date.textContent = MainCommObj[i].date_time;
                    mainCommElem_head.appendChild(mainCommElem_head_date);
                
            mainCommElement.appendChild(mainCommElem_head);

            let mainCommElem_text: HTMLElement = document.createElement("p");
                mainCommElem_text.classList.add("comment_textContent");
                mainCommElem_text.textContent = MainCommObj[i].text;
                mainCommElement.appendChild(mainCommElem_text);

            let mainCommElem_bottom: HTMLElement = document.createElement("div");
                mainCommElem_bottom.classList.add("comment_bottom");

                let mainCommElem_bottom_answBut: HTMLElement = document.createElement("div");
                    mainCommElem_bottom_answBut.classList.add("comment_bottom_answerButton");
                    mainCommElem_bottom_answBut.setAttribute("data-answBut", String(i));
                    mainCommElem_bottom_answBut.addEventListener ("click", () => {
                        MainCommObj[i] = saveAnswer(MainCommObj[i], i);
                        // console.log(MainComments[i])
                        localStorage.setItem("comments", JSON.stringify(MainCommObj));
                    });

                    let mainCommElem_bottom_answButImg: HTMLImageElement = document.createElement("img");
                        mainCommElem_bottom_answButImg.src = "./SVG/BackArrow.svg";
                        mainCommElem_bottom_answButImg.setAttribute("alt", "./SVG/BackArrow.svg");
                        mainCommElem_bottom_answBut.appendChild(mainCommElem_bottom_answButImg);

                    let mainCommElem_bottom_answButTxt: HTMLElement = document.createElement("div");
                        mainCommElem_bottom_answButTxt.textContent = "Ответить";
                        mainCommElem_bottom_answBut.appendChild(mainCommElem_bottom_answButTxt);

            mainCommElem_bottom.appendChild(mainCommElem_bottom_answBut);

                let mainCommElem_bottom_favBut: HTMLElement = document.createElement("div");
                    mainCommElem_bottom_favBut.classList.add("comment_bottom_favorite");

                    let mainCommElem_bottom_favButImg: HTMLImageElement = document.createElement("img");
                        mainCommElem_bottom_favButImg.setAttribute("Data-favButImg", String(i));
                    let mainCommElem_bottom_favButTxt: HTMLElement = document.createElement("div");
                        mainCommElem_bottom_favButTxt.setAttribute("Data-favButTxt", String(i));
                    
                    if (MainCommObj[i].isFavorite) {
                        mainCommElem_bottom_favButImg.src = "./SVG/HeartFullIcon.svg";
                        mainCommElem_bottom_favButImg.setAttribute("alt", "./SVG/HeartFullIcon.svg");
                        mainCommElem_bottom_favButTxt.textContent = "В избранном";
                    } else {
                        mainCommElem_bottom_favButImg.src = "./SVG/HeartEmptyIcon.svg";
                        mainCommElem_bottom_favButImg.setAttribute("alt", "./SVG/HeartEmptyIcon.svg");
                        mainCommElem_bottom_favButTxt.textContent = "В избранное";
                    }
                mainCommElem_bottom_favBut.appendChild(mainCommElem_bottom_favButImg);
                mainCommElem_bottom_favBut.appendChild(mainCommElem_bottom_favButTxt);
                
            mainCommElem_bottom.appendChild(mainCommElem_bottom_favBut);
                mainCommElem_bottom_favBut.addEventListener ("click", () => {
                    let mainCommElem_bottom_favButImgPosit = document.querySelector('[Data-favButImg="'+ i +'"]') as HTMLImageElement;
                    let mainCommElem_bottom_favButTxtPosit = document.querySelector('[Data-favButTxt="'+ i +'"]') as HTMLElement;
                    if (MainCommObj[i].isFavorite) {
                        MainCommObj[i].isFavorite = false;
                        mainCommElem_bottom_favButImgPosit.src = "./SVG/HeartEmptyIcon.svg";
                        mainCommElem_bottom_favButImgPosit.setAttribute("alt", "./SVG/HeartEmptyIcon.svg");
                        mainCommElem_bottom_favButTxtPosit.textContent = "В избранное";

                    } else {
                        MainCommObj[i].isFavorite = true;
                        mainCommElem_bottom_favButImgPosit.src = "./SVG/HeartFullIcon.svg";
                        mainCommElem_bottom_favButImgPosit.setAttribute("alt", "./SVG/HeartFullIcon.svg");
                        mainCommElem_bottom_favButTxtPosit.textContent = "В избранном";
                    }
                });

                let mainCommElem_bottom_rtnBut: HTMLElement = document.createElement("div");
                    mainCommElem_bottom_rtnBut.classList.add("comment_bottom_reiting");

                    let mainCommElem_bottom_rtnButNgt: HTMLElement = document.createElement("div");
                    mainCommElem_bottom_rtnButNgt.classList.add("comment_bottom_reitingNegative");
                    mainCommElem_bottom_rtnButNgt.setAttribute("Data-rtnButNgt", String(i));
                    mainCommElem_bottom_rtnButNgt.textContent = "-";
                    mainCommElem_bottom_rtnBut.appendChild(mainCommElem_bottom_rtnButNgt);
                    mainCommElem_bottom_rtnButNgt.addEventListener ("click", () => {
                        raitingChangeFunc(false, i)
                    });

                    let mainCommElem_bottom_rtnButVle: HTMLElement = document.createElement("div");
                    mainCommElem_bottom_rtnButVle.classList.add("comment_bottom_reitingValue");
                    mainCommElem_bottom_rtnButVle.setAttribute("Data-rtnButVle", String(i));
                    mainCommElem_bottom_rtnButVle.textContent = `${MainComments[i].raiting}`;
                    mainCommElem_bottom_rtnBut.appendChild(mainCommElem_bottom_rtnButVle);

                    if (MainCommObj[i].raiting < 0) {
                        mainCommElem_bottom_rtnButVle.style.color = "#FF0000";
                    } else if (MainCommObj[i].raiting = 0) {
                        mainCommElem_bottom_rtnButVle.style.color = "#D9D9D9";
                    } else {
                        mainCommElem_bottom_rtnButVle.style.color = "#8AC540";
                    }

                    let mainCommElem_bottom_rtnButPst: HTMLElement = document.createElement("div");
                    mainCommElem_bottom_rtnButPst.classList.add("comment_bottom_reitingPositive");
                    mainCommElem_bottom_rtnButPst.textContent = "+";
                    mainCommElem_bottom_rtnButPst.setAttribute("Data-rtnButPst", String(i));
                    mainCommElem_bottom_rtnBut.appendChild(mainCommElem_bottom_rtnButPst);
                    mainCommElem_bottom_rtnButPst.addEventListener ("click", () => {
                        raitingChangeFunc(true, i)
                    });
                    
            mainCommElem_bottom.appendChild(mainCommElem_bottom_rtnBut);

        mainCommElement.appendChild(mainCommElem_bottom);
        commentPosition?.insertBefore(mainCommElement, commentPosition.firstChild);
        commentPosition?.scrollIntoView();

        console.log("MainComments[i].answers", MainCommObj[i].answers)

        // if (MainCommObj[i].answers?.length !== undefined) {
        //     console.log("колич ответов - ", MainCommObj[i].answers?.length)
        // } else {
        //     console.log("в сообщении "+i+" нет ответов")
        // }
        
        if (countElementPosition) {
            countElementPosition.textContent = `(${MainCommObj.length})`;
        }
    }
}








const headerFavoritePosition: HTMLElement | null = document.querySelector(".comment_header_favorite");      // обрабатываем нажание на Избранное
headerFavoritePosition?.addEventListener ("click", () => {
    favoriteFunc();
});

function favoriteFunc() {
    console.log("Favorite pressed...")
}







function raitingChangeFunc(toggle: boolean, index: number) {
    if (toggle) {
        MainComments[index].raiting++;
    } else {
        MainComments[index].raiting--;
    }
    let mainCommElem_bottom_rtnButVle = document.querySelector('[Data-rtnButVle="'+ index +'"]') as HTMLElement;
        mainCommElem_bottom_rtnButVle.textContent = `${MainComments[index].raiting}`;
        if (MainComments[index].raiting < 0) {
            mainCommElem_bottom_rtnButVle.style.color = "#FF0000";
        } else if (MainComments[index].raiting == 0) {
            mainCommElem_bottom_rtnButVle.style.color = "#D9D9D9";
        } else {
            mainCommElem_bottom_rtnButVle.style.color = "#8AC540";
        }
}

function saveAnswer(obj:MainComment, index: number): MainComment {
    let isAnswer_comment: HTMLElement | null = document.querySelector(".answer_comment");

    if (isAnswer_comment === null) {

        const inputAnswerFieldPosition: HTMLTextAreaElement | null = document.querySelector('[Data-index="'+ index +'"]');
        
        let inputAnswerFieldBlock: HTMLElement = document.createElement("div");
        inputAnswerFieldBlock.classList.add("answer_comment");

        let inputAnswerFieldImg: HTMLElement = document.createElement("div");
            inputAnswerFieldImg.classList.add("comment_authorFoto");
            inputAnswerFieldBlock.appendChild(inputAnswerFieldImg);

        let inputAnswerFieldHead: HTMLElement = document.createElement("div");
        inputAnswerFieldHead.classList.add("comment_main_header");
        let inputAnswerFieldAuth: HTMLElement = document.createElement("div");
            inputAnswerFieldAuth.classList.add("author_name");
            inputAnswerFieldHead.appendChild(inputAnswerFieldAuth);
            let inputAnswerFieldTxtSize: HTMLElement = document.createElement("div");
            inputAnswerFieldTxtSize.classList.add("answer_text_size");
            inputAnswerFieldTxtSize.textContent = "Макс. 1000 символов";
            inputAnswerFieldHead.appendChild(inputAnswerFieldTxtSize);            
            inputAnswerFieldBlock.appendChild(inputAnswerFieldHead);

        let inputAnswerFieldElement: HTMLTextAreaElement = document.createElement("textarea");
            inputAnswerFieldElement.classList.add("comment_inputField");
            inputAnswerFieldElement.setAttribute("type", "text");
            inputAnswerFieldElement.setAttribute("maxLength", "100");
            inputAnswerFieldElement.setAttribute("placeholder", "Введите текст сообщения...");
            inputAnswerFieldElement.setAttribute("autocorrect", "on");
            inputAnswerFieldElement.setAttribute("rows", "1");
            inputAnswerFieldBlock.appendChild(inputAnswerFieldElement);
        
        let inputAnswerFieldButton: HTMLButtonElement = document.createElement("button");
            inputAnswerFieldButton.classList.add("answer_comment_inputButton");
            inputAnswerFieldButton.textContent = "Отправить ответ";
            inputAnswerFieldBlock.appendChild(inputAnswerFieldButton);

        inputAnswerFieldPosition?.after(inputAnswerFieldBlock);
    
        const answerTextSizePosition = document.querySelector(".answer_text_size") as HTMLElement;
        inputAnswerFieldElement?.addEventListener("input", (event) => {                           // считаем длину ввода, отображаем количество введенных символов
            if (inputAnswerFieldElement.value) {
                let inputFieldLength = inputAnswerFieldElement.value.length;
                answerTextSizePosition.textContent = `${inputFieldLength} / 1000`;
                    if (inputFieldLength >= 100) {
                        answerTextSizePosition.style.color = "red";
                    } else {
                        answerTextSizePosition.style.color = "#BFBFBF";
                    }
                    inputAnswerFieldElement.style.height = ``                                                // увеличиваем высоту поля ввода, если не влезло в одну строку (загуглил)
                    inputAnswerFieldElement.style.height = `${inputAnswerFieldElement.scrollHeight + 5}px`
            }
        });

        let inputAnswerFieldButtonPosition: HTMLButtonElement | null = document.querySelector(".answer_comment_inputButton");

        inputAnswerFieldButtonPosition?.addEventListener("click", (event) => {                                             // обрабатываем нажатие кнопки ответа
            if (inputAnswerFieldElement.value !== "") {
                let inputComment: commObject = {author_avatar: "", author_name: "", date_time: "", text: "", isFavorite: false, raiting: 0};
                if (usersGroup[1].avatar && usersGroup[1].firstName) {
                    let currDate: Date = new Date();
                    let currDateString: string = `${("0"+currDate.getDate()).slice(-2)}.${("0"+currDate.getMonth()+1).slice(-2)} ${("0"+currDate.getHours()).slice(-2)}:${("0"+currDate.getMinutes()).slice(-2)}`;
                    
                    inputComment = {author_avatar: usersGroup[1].avatar, author_name: usersGroup[1].firstName, 
                        date_time: currDateString, text: inputAnswerFieldElement.value, isFavorite: false, raiting: 0};
                    }
                if (!obj.answers) {
                    obj.answers = [];
                }
                obj.answers.push(inputComment);
                document.querySelector(".answer_comment")?.remove();
            }
        });
    } else {
        document.querySelector(".answer_comment")?.remove();
    }
    return obj;
}

const newsColumnPosition: HTMLElement | null = document.querySelector(".news_column");      //рисуем 8 / 2 прямоугольников(-а)

windowDrow()

function windowDrow() {
    if (newsColumnPosition && newsColumnPosition.innerHTML !== "") {
        newsColumnPosition.innerHTML = "";
    }
    let yy:number = window.innerWidth > 320 ? 8 : 2;
        for (let i:number = 0; i < yy; i++) {
            if (newsColumnPosition) {
                let newsColumnElement: HTMLElement = document.createElement("div");
                newsColumnElement.style.backgroundColor = "#D9D9D9";
                if (yy === 8) {
                    newsColumnElement.style.width = "48%";
                } else {
                    newsColumnElement.style.width = "100%";
                }
                newsColumnElement.style.height = "61px";
                newsColumnPosition.appendChild(newsColumnElement);
            }
        }
    }

window.addEventListener("resize", () => {
    windowDrow();
});

let arrowToggle: boolean = true;

const commetnArrowPosition = document.querySelector(".comment_header_arrow") as HTMLElement;      //рисуем стрелочку вверх/вниз
commetnArrowPosition.textContent = "▼";

commetnArrowPosition.addEventListener ("click", () => {
    if (arrowToggle) {
        commetnArrowPosition.textContent = "▲";
        arrowToggle = false;
    } else {
        commetnArrowPosition.textContent = "▼";
        arrowToggle = true;
    }

})





