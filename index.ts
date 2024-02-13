// import Drow from "./drow";
// import {commObject, MainComment} from "./types"

interface commObject {
    author_avatar: string,
    author_name: string,
    date_time: string,
    text: string,
    isFavorite: boolean,
    rating: number,
    ratingBorder: number,
    valueOfRating: number,
    valueOfAnswers: number
}

interface MainComment extends commObject {
    answers?: commObject[]
}
let MainComments: MainComment[] = [];
if (localStorage.getItem("comments") !== null) {                                        // Если в в локальном хранилище что-то есть, записали это в главный массив
    MainComments = JSON.parse(localStorage.getItem("comments") as string);
}

interface User {
    firstName: string | null,
    avatar:    string | null
}

let usersGroup:     User[]  = [];
let arrowToggle:    boolean = true;
const commetnArrowPosition = document.querySelector(".comment_header_arrow") as HTMLElement;      //рисуем стрелочку вверх/вниз
      commetnArrowPosition.textContent = "▼";

let favoriteToggle: boolean = false;

const select = document.querySelector(".comment_header_sorterMenu") as HTMLSelectElement;                       // обрабатываем выбор сортировщика
select.addEventListener("change", () => {
    drowClass.drowComment(mainObjSortFunc(select.value, arrowToggle, favoriteToggle, MainComments))
});

function mainObjSortFunc(prop: any, arrTogl: boolean, favTogl: boolean, obj: MainComment[]) {
        
    if (favTogl) {
        obj = obj.filter((favorite) => favorite.isFavorite == true || "answers" in favorite);
       }

    return obj.sort((a,b) => {

        switch (prop) {                             // вот тут долго пытался сократить запись, но все время не получалось(( оставил криво, но работает!))
            case "date_time":
                return arrTogl ? ((a.date_time > b.date_time) ? 1 : -1) : ((a.date_time < b.date_time) ? 1 : -1);
            case "rating":
                return arrTogl ? ((a.rating > b.rating) ? 1 : -1) : ((a.rating < b.rating) ? 1 : -1);
            case "valueOfRating":
                return arrTogl ? ((a.valueOfRating > b.valueOfRating) ? 1 : -1) : ((a.valueOfRating < b.valueOfRating) ? 1 : -1);
            case "valueOfAnswers":
                return arrTogl ? ((a.valueOfAnswers > b.valueOfAnswers) ? 1 : -1) : ((a.valueOfAnswers < b.valueOfAnswers) ? 1 : -1);
            default:
                return 0;
        }
    });
}

// --------------- Отдельный CLASS рисования комментариев --------------------- //
class Drow {
    commentPosition: HTMLElement | null;
    countElementPosition: HTMLElement | null;

    constructor () {
        this.commentPosition = document.querySelector(".comment");
        this.countElementPosition = document.querySelector(".comment_header_counterElement");
    }

    drowComment(SortCommObj: MainComment[]) {                                                                                 // рисуем все кооментарии

        while (this.commentPosition?.firstChild) {                                                  // очищаем все что есть на эране в области комментариев = удаляем дочерние элементы 
            this.commentPosition.removeChild(this.commentPosition.firstChild);
        }        

        for (let i:number = 0; i < SortCommObj.length; i++) {
    
            let CommElement: HTMLElement = document.createElement("div");                   // создаем блок основного комментария
                CommElement.classList.add("comment_block");
                CommElement.setAttribute("Data-index", String(i));
    
                let CommElem_foto: HTMLImageElement = document.createElement("img");
                    CommElem_foto.classList.add("comment_authorFoto");
                    CommElem_foto.src = SortCommObj[i].author_avatar;
                    CommElem_foto.setAttribute("alt", SortCommObj[i].author_avatar);
                
                CommElement.appendChild(CommElem_foto);
    
                let CommElem_head: HTMLElement = document.createElement("div");
                    CommElem_head.classList.add("comment_textHead");
    
                    let CommElem_head_name: HTMLElement = document.createElement("div");
                        CommElem_head_name.classList.add("author_name");
                        CommElem_head_name.textContent = SortCommObj[i].author_name;
                        CommElem_head.appendChild(CommElem_head_name);
    
                    let CommElem_head_date: HTMLElement = document.createElement("div");
                        CommElem_head_date.classList.add("comment_textHead_date");
                        CommElem_head_date.textContent = SortCommObj[i].date_time;


                        CommElem_head.appendChild(CommElem_head_date);
                    
                CommElement.appendChild(CommElem_head);
    
                let CommElem_text: HTMLElement = document.createElement("p");
                    CommElem_text.classList.add("comment_textContent");
                    CommElem_text.textContent = SortCommObj[i].text;
                    CommElement.appendChild(CommElem_text);
    
                let CommElem_bottom: HTMLElement = document.createElement("div");
                    CommElem_bottom.classList.add("comment_bottom");
    
                    let CommElem_bottom_answBut: HTMLElement = document.createElement("div");
                        CommElem_bottom_answBut.classList.add("comment_bottom_answerButton");
                        CommElem_bottom_answBut.setAttribute("data-answBut", String(i));
                        CommElem_bottom_answBut.addEventListener ("click", () => {
                            saveAnswer(SortCommObj, i)
                        });
    
                        let CommElem_bottom_answButImg: HTMLImageElement = document.createElement("img");
                            CommElem_bottom_answButImg.src = "./SVG/BackArrow.svg";
                            CommElem_bottom_answButImg.setAttribute("alt", "./SVG/BackArrow.svg");
                            CommElem_bottom_answBut.appendChild(CommElem_bottom_answButImg);
    
                        let CommElem_bottom_answButTxt: HTMLElement = document.createElement("div");
                            CommElem_bottom_answButTxt.textContent = "Ответить";
                            CommElem_bottom_answBut.appendChild(CommElem_bottom_answButTxt);
    
                CommElem_bottom.appendChild(CommElem_bottom_answBut);
    
                    let CommElem_bottom_favBut: HTMLElement = document.createElement("div");
                        CommElem_bottom_favBut.classList.add("comment_bottom_favorite");
    
                        let CommElem_bottom_favButImg: HTMLImageElement = document.createElement("img");
                            CommElem_bottom_favButImg.setAttribute("Data-favButImg", String(i));
                        let CommElem_bottom_favButTxt: HTMLElement = document.createElement("div");
                            CommElem_bottom_favButTxt.setAttribute("Data-favButTxt", String(i));
                        
                        if (SortCommObj[i].isFavorite) {
                            CommElem_bottom_favButImg.src = "./SVG/HeartFullIcon.svg";
                            CommElem_bottom_favButImg.setAttribute("alt", "./SVG/HeartFullIcon.svg");
                            CommElem_bottom_favButTxt.textContent = "В избранном";
                        } else {
                            CommElem_bottom_favButImg.src = "./SVG/HeartEmptyIcon.svg";
                            CommElem_bottom_favButImg.setAttribute("alt", "./SVG/HeartEmptyIcon.svg");
                            CommElem_bottom_favButTxt.textContent = "В избранное";
                        }
                    CommElem_bottom_favBut.appendChild(CommElem_bottom_favButImg);
                    CommElem_bottom_favBut.appendChild(CommElem_bottom_favButTxt);
                    
                CommElem_bottom.appendChild(CommElem_bottom_favBut);

                    CommElem_bottom_favBut.addEventListener ("click", () => {
                        let CommElem_bottom_favButImgPosit = document.querySelector('[Data-favButImg="'+ i +'"]') as HTMLImageElement;
                        let CommElem_bottom_favButTxtPosit = document.querySelector('[Data-favButTxt="'+ i +'"]') as HTMLElement;
                        if (SortCommObj[i].isFavorite) {
                            SortCommObj[i].isFavorite = false;
                            CommElem_bottom_favButImgPosit.src = "./SVG/HeartEmptyIcon.svg";
                            CommElem_bottom_favButImgPosit.setAttribute("alt", "./SVG/HeartEmptyIcon.svg");
                            CommElem_bottom_favButTxtPosit.textContent = "В избранное";
                            localStorage.setItem("comments", JSON.stringify(SortCommObj));
    
                        } else {
                            SortCommObj[i].isFavorite = true;
                            CommElem_bottom_favButImgPosit.src = "./SVG/HeartFullIcon.svg";
                            CommElem_bottom_favButImgPosit.setAttribute("alt", "./SVG/HeartFullIcon.svg");
                            CommElem_bottom_favButTxtPosit.textContent = "В избранном";
                            localStorage.setItem("comments", JSON.stringify(SortCommObj));
                        }
                    });
    
                    let CommElem_bottom_rtnBut: HTMLElement = document.createElement("div");
                        CommElem_bottom_rtnBut.classList.add("comment_bottom_reiting");
    
                        let CommElem_bottom_rtnButNgt: HTMLElement = document.createElement("div");
                            CommElem_bottom_rtnButNgt.classList.add("comment_bottom_reitingNegative");
                            CommElem_bottom_rtnButNgt.textContent = "-";
                            CommElem_bottom_rtnBut.appendChild(CommElem_bottom_rtnButNgt);
                            CommElem_bottom_rtnButNgt.addEventListener ("click", () => {
                                
                                SortCommObj[i].rating - 1 >= SortCommObj[i].ratingBorder - 1 ? SortCommObj[i].rating-- : SortCommObj[i].rating;

                                CommElem_bottom_rtnButVle = document.querySelector('[Data-rtnButVle="'+ i +'"]') as HTMLElement;
                                CommElem_bottom_rtnButVle.textContent = `${SortCommObj[i].rating}`;
                                if (SortCommObj[i].rating < 0) {
                                    CommElem_bottom_rtnButVle.style.color = "#FF0000";
                                } else if (SortCommObj[i].rating === 0) {
                                    CommElem_bottom_rtnButVle.style.color = "#D9D9D9";
                                } else {
                                    CommElem_bottom_rtnButVle.style.color = "#8AC540";
                                }
                                localStorage.setItem("comments", JSON.stringify(SortCommObj));                                
                            });
    
                        let CommElem_bottom_rtnButVle: HTMLElement = document.createElement("div");
                            CommElem_bottom_rtnButVle.classList.add("comment_bottom_reitingValue");
                            CommElem_bottom_rtnButVle.setAttribute("Data-rtnButVle", String(i));
                            CommElem_bottom_rtnButVle.textContent = `${SortCommObj[i].rating}`;
                            CommElem_bottom_rtnBut.appendChild(CommElem_bottom_rtnButVle);
    
                            if (SortCommObj[i].rating < 0) {
                                CommElem_bottom_rtnButVle.style.color = "#FF0000";
                            } else if (SortCommObj[i].rating === 0) {
                                CommElem_bottom_rtnButVle.style.color = "#D9D9D9";
                            } else {
                                CommElem_bottom_rtnButVle.style.color = "#8AC540";
                            }
        
                        let CommElem_bottom_rtnButPst: HTMLElement = document.createElement("div");
                            CommElem_bottom_rtnButPst.classList.add("comment_bottom_reitingPositive");
                            CommElem_bottom_rtnButPst.textContent = "+";
                            CommElem_bottom_rtnBut.appendChild(CommElem_bottom_rtnButPst);
                            CommElem_bottom_rtnButPst.addEventListener ("click", () => {

                                SortCommObj[i].rating + 1 <= SortCommObj[i].ratingBorder + 1 ? SortCommObj[i].rating++ : SortCommObj[i].rating;
                                
                                CommElem_bottom_rtnButVle = document.querySelector('[Data-rtnButVle="'+ i +'"]') as HTMLElement;
                                CommElem_bottom_rtnButVle.textContent = `${SortCommObj[i].rating}`;
                                if (SortCommObj[i].rating < 0) {
                                    CommElem_bottom_rtnButVle.style.color = "#FF0000";
                                } else if (SortCommObj[i].rating === 0) {
                                    CommElem_bottom_rtnButVle.style.color = "#D9D9D9";
                                } else {
                                    CommElem_bottom_rtnButVle.style.color = "#8AC540";
                                }

                                localStorage.setItem("comments", JSON.stringify(SortCommObj));
                            });
                        
                CommElem_bottom.appendChild(CommElem_bottom_rtnBut);
    
            CommElement.appendChild(CommElem_bottom);
            this.commentPosition?.insertBefore(CommElement, this.commentPosition.firstChild);
            this.commentPosition?.scrollIntoView();
          
            if (this.countElementPosition) {
                this.countElementPosition.textContent = `(${SortCommObj.length})`;
            }

            if (SortCommObj[i].answers !== undefined) {                                                 // проверяем есть ли ответ в комментарии
                if (SortCommObj[i].answers?.length !== undefined) {
                    
                    let answerLength: number = SortCommObj[i].answers?.length as number;
                    for (let y:number = 0; y < answerLength; y++) {                                     // выводим все ответы на комментарий
                        
                        let AnsReit = SortCommObj[i].answers?.[y];
                        
                        let CommElement: HTMLElement = document.createElement("div");                   // создаем блок ответа
                            CommElement.classList.add("answer_block");
                            CommElement.setAttribute("Data-answ-index", String(i));
    
                            let CommElem_foto: HTMLImageElement = document.createElement("img");
                                CommElem_foto.classList.add("comment_authorFoto");
                                CommElem_foto.src = AnsReit?.author_avatar as string;                    //!!!! вот тут прикольно! после (?) надо ставить (.) - answers?.[y]
                                CommElem_foto.setAttribute("alt", AnsReit?.author_avatar as string);
                                CommElement.appendChild(CommElem_foto);
    
                            let CommElem_head: HTMLElement = document.createElement("div");
                                CommElem_head.classList.add("comment_textHead");

                                    let CommElem_head_wrap: HTMLElement = document.createElement("div");
                                        CommElem_head_wrap.classList.add("comment_answer_commentAuthor_wrapper");

                                        let CommElem_head_name: HTMLElement = document.createElement("div");
                                            CommElem_head_name.classList.add("author_name");
                                            CommElem_head_name.textContent = AnsReit?.author_name as string;
                                            CommElem_head_wrap.appendChild(CommElem_head_name);

                                        let CommElem_head_answButImg: HTMLImageElement = document.createElement("img");
                                            CommElem_head_answButImg.src = "./SVG/BackArrow.svg";
                                            CommElem_head_answButImg.setAttribute("alt", "./SVG/BackArrow.svg");
                                            CommElem_head_wrap.appendChild(CommElem_head_answButImg);

                                        let CommElem_head_AuthName: HTMLElement = document.createElement("div");
                                            CommElem_head_AuthName.classList.add("comment_answer_commentAuthor");
                                            CommElem_head_AuthName.textContent = SortCommObj[i].author_name as string;
                                            CommElem_head_wrap.appendChild(CommElem_head_AuthName);
                                
                                    CommElem_head.appendChild(CommElem_head_wrap);

                                let CommElem_head_date: HTMLElement = document.createElement("div");
                                    CommElem_head_date.classList.add("comment_textHead_date");
                                    CommElem_head_date.textContent = AnsReit?.date_time as string;
                    
                                    CommElem_head.appendChild(CommElem_head_date);
                                
                            CommElement.appendChild(CommElem_head);
    
                            let CommElem_text: HTMLElement = document.createElement("p");
                                CommElem_text.classList.add("comment_textContent");
                                CommElem_text.textContent = AnsReit?.text as string;
                            
                            CommElement.appendChild(CommElem_text);
    
                            let CommElem_bottom: HTMLElement = document.createElement("div");
                                CommElem_bottom.classList.add("comment_bottom");
                
                            let CommElem_bottom_favBut: HTMLElement = document.createElement("div");
                                CommElem_bottom_favBut.classList.add("comment_bottom_favorite");
            
                                let CommElem_bottom_favButImg: HTMLImageElement = document.createElement("img");
                                    CommElem_bottom_favButImg.setAttribute("Data-AnsfavButImg", String(i)+String(y));
                                let CommElem_bottom_favButTxt: HTMLElement = document.createElement("div");
                                    CommElem_bottom_favButTxt.setAttribute("Data-AnsfavButTxt", String(i)+String(y));
                                
                                if (AnsReit?.isFavorite) {
                                    CommElem_bottom_favButImg.src = "./SVG/HeartFullIcon.svg";
                                    CommElem_bottom_favButImg.setAttribute("alt", "./SVG/HeartFullIcon.svg");
                                    CommElem_bottom_favButTxt.textContent = "В избранном";
                                } else {
                                    CommElem_bottom_favButImg.src = "./SVG/HeartEmptyIcon.svg";
                                    CommElem_bottom_favButImg.setAttribute("alt", "./SVG/HeartEmptyIcon.svg");
                                    CommElem_bottom_favButTxt.textContent = "В избранное";
                                }
                                CommElem_bottom_favBut.appendChild(CommElem_bottom_favButImg);
                                CommElem_bottom_favBut.appendChild(CommElem_bottom_favButTxt);
                    
                            CommElem_bottom.appendChild(CommElem_bottom_favBut);

                                CommElem_bottom_favBut.addEventListener ("click", () => {
                                    let CommElem_bottom_favButImgPosit = document.querySelector('[Data-AnsfavButImg="'+ i + y +'"]') as HTMLImageElement;
                                    let CommElem_bottom_favButTxtPosit = document.querySelector('[Data-AnsfavButTxt="'+ i + y +'"]') as HTMLElement;
                                    if (AnsReit?.isFavorite) {
                                        if (AnsReit) {
                                            AnsReit.isFavorite = false;
                                        }
                                        CommElem_bottom_favButImgPosit.src = "./SVG/HeartEmptyIcon.svg";
                                        CommElem_bottom_favButImgPosit.setAttribute("alt", "./SVG/HeartEmptyIcon.svg");
                                        CommElem_bottom_favButTxtPosit.textContent = "В избранное";
                                        localStorage.setItem("comments", JSON.stringify(SortCommObj));
                                    } else {
                                        if (AnsReit) {
                                            AnsReit.isFavorite = true;
                                        }
                                        CommElem_bottom_favButImgPosit.src = "./SVG/HeartFullIcon.svg";
                                        CommElem_bottom_favButImgPosit.setAttribute("alt", "./SVG/HeartFullIcon.svg");
                                        CommElem_bottom_favButTxtPosit.textContent = "В избранном";
                                        localStorage.setItem("comments", JSON.stringify(SortCommObj));
                                    }
                                }, { once: true });
    
                                let CommElem_bottom_rtnBut: HTMLElement = document.createElement("div");
                                    CommElem_bottom_rtnBut.classList.add("comment_bottom_reiting");
                
                                    let CommElem_bottom_rtnButNgt: HTMLElement = document.createElement("div");
                                        CommElem_bottom_rtnButNgt.classList.add("comment_bottom_reitingNegative");
                                        CommElem_bottom_rtnButNgt.textContent = "-";
                                        CommElem_bottom_rtnBut.appendChild(CommElem_bottom_rtnButNgt);
                                        CommElem_bottom_rtnButNgt.addEventListener ("click", () => {
                                                                                        
                                            if (AnsReit) {
                                                AnsReit.rating - 1 >= AnsReit.ratingBorder - 1 ? AnsReit.rating-- : AnsReit.rating;

                                                CommElem_bottom_rtnButVle = document.querySelector('[Data-AnsRtnButVle="'+ i + y +'"]') as HTMLElement;
                                                CommElem_bottom_rtnButVle.textContent = `${AnsReit.rating}`;
                                                if (AnsReit.rating < 0) {
                                                    CommElem_bottom_rtnButVle.style.color = "#FF0000";
                                                } else if (AnsReit.rating === 0) {
                                                    CommElem_bottom_rtnButVle.style.color = "#D9D9D9";
                                                } else {
                                                    CommElem_bottom_rtnButVle.style.color = "#8AC540";
                                                }
                                                    localStorage.setItem("comments", JSON.stringify(SortCommObj));
                                            }
                                        });
                    
                                    let CommElem_bottom_rtnButVle: HTMLElement = document.createElement("div");
                                        CommElem_bottom_rtnButVle.classList.add("comment_bottom_reitingValue");
                                        CommElem_bottom_rtnButVle.setAttribute("Data-AnsRtnButVle", String(i)+String(y));
                                        CommElem_bottom_rtnButVle.textContent = `${AnsReit?.rating}`;
                                        CommElem_bottom_rtnBut.appendChild(CommElem_bottom_rtnButVle);
                                        
                                        if (AnsReit != undefined && AnsReit.rating < 0) {
                                            CommElem_bottom_rtnButVle.style.color = "#FF0000";
                                        } else if (AnsReit != undefined && AnsReit.rating === 0) {
                                            CommElem_bottom_rtnButVle.style.color = "#D9D9D9";
                                        } else {
                                            CommElem_bottom_rtnButVle.style.color = "#8AC540";
                                        }
                
                                    let CommElem_bottom_rtnButPst: HTMLElement = document.createElement("div");
                                        CommElem_bottom_rtnButPst.classList.add("comment_bottom_reitingPositive");
                                        CommElem_bottom_rtnButPst.textContent = "+";
                                        CommElem_bottom_rtnBut.appendChild(CommElem_bottom_rtnButPst);
                                        CommElem_bottom_rtnButPst.addEventListener ("click", () => {
                                           
                                            if (AnsReit) {
                                                AnsReit.rating + 1 <= AnsReit.ratingBorder + 1 ? AnsReit.rating++ : AnsReit.rating;

                                                CommElem_bottom_rtnButVle = document.querySelector('[Data-AnsRtnButVle="'+ i + y +'"]') as HTMLElement;
                                                CommElem_bottom_rtnButVle.textContent = `${AnsReit.rating}`;
                                                if (AnsReit.rating < 0) {
                                                    CommElem_bottom_rtnButVle.style.color = "#FF0000";
                                                } else if (AnsReit.rating === 0) {
                                                    CommElem_bottom_rtnButVle.style.color = "#D9D9D9";
                                                } else {
                                                    CommElem_bottom_rtnButVle.style.color = "#8AC540";
                                                }
                                                    localStorage.setItem("comments", JSON.stringify(SortCommObj));
                                            }
                                        });
                                    
                                CommElem_bottom.appendChild(CommElem_bottom_rtnBut);
                
                        CommElement.appendChild(CommElem_bottom);

                        let answerPosition: HTMLTextAreaElement | null = document.querySelector('[Data-index="'+ i +'"]');
                        answerPosition?.after(CommElement);
                        answerPosition?.scrollIntoView();
                    }

                }


            }
        }
    }
}
// --------------- окончание отдельного CLASS рисования комментариев --------------------- //

const drowClass = new Drow();

getUsers()

for (let i:number = 0; i < MainComments.length; i++) {                  // устанавливаем новые границы изменеия рейтинга для нового пользователя
    MainComments[i].ratingBorder = MainComments[i].rating;
    let ansTempVal = MainComments[i].answers;
    if (ansTempVal != undefined) {
        for (let y:number = 0; y < ansTempVal.length; y++) {
            ansTempVal[y].ratingBorder = ansTempVal[y].rating;
        }
    }
}

drowClass.drowComment(mainObjSortFunc(select.value, arrowToggle, favoriteToggle, MainComments))

function getUsers() {                                                                 // получаем пользователей
    fetch ('https://randomuser.me/api/?results=5')                                  // 5 пользователей получаем на всякий случай. используем только первого
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

inputButton?.addEventListener("click", (event) => {                                             // обрабатываем нажатие кнопки ОТПРАВИТЬ
    if (inputFieldPosition?.value !== "") {
        if (inputFieldPosition) {
            let inputComment: commObject = {author_avatar: "", author_name: "", date_time: "", text: "", isFavorite: false, rating: 0, 
                                            ratingBorder: 0, valueOfRating: 0, valueOfAnswers: 0};
            if (usersGroup[0].avatar && usersGroup[0].firstName) {
                let currDate: Date = new Date();
                let currDateString: string = `${("0"+currDate.getDate()).slice(-2)}.${("0"+(currDate.getMonth()+1)).slice(-2)} ${("0"+currDate.getHours()).slice(-2)}:${("0"+currDate.getMinutes()).slice(-2)}`;
                
                inputComment = {author_avatar: usersGroup[0].avatar, author_name: usersGroup[0].firstName, 
                                date_time: currDateString, text: inputFieldPosition.value, isFavorite: false, 
                                rating: 0, ratingBorder: 0, valueOfRating:0, valueOfAnswers: 0};
                
                MainComments.push(inputComment);
            }
                
            localStorage.setItem("comments", JSON.stringify(MainComments));
                
            textSizePosition.textContent = "Макс. 1000 символов";
            inputFieldPosition.value = "";

        }
        drowClass.drowComment(JSON.parse(JSON.stringify(MainComments)));
    }
})



const headerFavoritePosition: HTMLElement | null = document.querySelector(".comment_header_favorite");      // обрабатываем нажание на Избранное
headerFavoritePosition?.addEventListener ("click", () => {
    if (favoriteToggle) {
        headerFavoritePosition.style.color = "#BFBFBF";
        favoriteToggle = false;
    } else {
        headerFavoritePosition.style.color = "#000000";
        favoriteToggle = true;
    }
    drowClass.drowComment(mainObjSortFunc(select.value, arrowToggle, favoriteToggle, MainComments))
});


function saveAnswer(obj:MainComment[], index: number) {
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

        inputAnswerFieldButtonPosition?.addEventListener("click", (event) => {                                             // обрабатываем нажатие кнопки ОТПРАВИТЬ ОТВЕТ
            if (inputAnswerFieldElement.value !== "") {
                let inputComment: commObject = {author_avatar: "", author_name: "", date_time: "", text: "", isFavorite: false, rating: 0, 
                                            ratingBorder: 0, valueOfRating: 0, valueOfAnswers: 0};
                if (usersGroup[0].avatar && usersGroup[0].firstName) {
                    let currDate: Date = new Date();
                    let currDateString: string = `${("0"+currDate.getDate()).slice(-2)}.${("0"+(currDate.getMonth()+1)).slice(-2)} ${("0"+currDate.getHours()).slice(-2)}:${("0"+currDate.getMinutes()).slice(-2)}`;
                    
                    inputComment = {author_avatar: usersGroup[0].avatar, author_name: usersGroup[0].firstName, 
                        date_time: currDateString, text: inputAnswerFieldElement.value, isFavorite: false, 
                        rating: 0, ratingBorder: 0, valueOfRating: 0, valueOfAnswers: 0};
                    }
                if (!obj[index].answers) {
                    obj[index].answers = [];
                }
                obj[index].answers?.push(inputComment);
                obj[index].valueOfAnswers++;
                console.log(obj[index].valueOfAnswers)
                localStorage.setItem("comments", JSON.stringify(obj));
                
                drowClass.drowComment(mainObjSortFunc(select.value, arrowToggle, favoriteToggle, obj))

                document.querySelector(".answer_comment")?.remove();
            }
        });
    } else {
        document.querySelector(".answer_comment")?.remove();
    }
}

const newsColumnPosition: HTMLElement | null = document.querySelector(".news_column");      

windowDrow()

function windowDrow() {                                                                 //отрисывываем шаблон экрана 8 / 2 прямоугольников(-а)
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

commetnArrowPosition.addEventListener ("click", () => {
    if (arrowToggle) {
        commetnArrowPosition.textContent = "▲";
        arrowToggle = false;
    } else {
        commetnArrowPosition.textContent = "▼";
        arrowToggle = true;
    }
    
    drowClass.drowComment(mainObjSortFunc(select.value, arrowToggle, favoriteToggle, MainComments))
})




