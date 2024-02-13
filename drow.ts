import {commObject, MainComment} from "./types"

class Drow {
    MainCommObj: MainComment[];
    commentPosition: HTMLElement | null;
    countElementPosition: HTMLElement | null;

    constructor (MainCommObj: MainComment[]) {
        this.MainCommObj = MainCommObj;
        this.commentPosition = document.querySelector(".comment");
        this.countElementPosition = document.querySelector(".comment_header_counterElement");
    }

    drowComment() {                                                                    // рисуем все кооментарии
        while (this.commentPosition?.firstChild) {                                                  // удаляем дочерние элементы 
            this.commentPosition.removeChild(this.commentPosition.firstChild);
        }
        
        for (let i:number = 0; i < this.MainCommObj.length; i++) {
    
            let mainCommElement: HTMLElement = document.createElement("div");                   // создаем блок основного комментария
                mainCommElement.classList.add("comment_block");
                mainCommElement.setAttribute("Data-index", String(i));
    
                let mainCommElem_foto: HTMLImageElement = document.createElement("img");
                    mainCommElem_foto.classList.add("comment_authorFoto");
                    mainCommElem_foto.src = this.MainCommObj[i].author_avatar;
                    mainCommElem_foto.setAttribute("alt", this.MainCommObj[i].author_avatar);
                    mainCommElement?.appendChild(mainCommElem_foto);
    
                let mainCommElem_head: HTMLElement = document.createElement("div");
                    mainCommElem_head.classList.add("comment_textHead");
    
                    let mainCommElem_head_name: HTMLElement = document.createElement("div");
                        mainCommElem_head_name.classList.add("author_name");
                        mainCommElem_head_name.textContent = this.MainCommObj[i].author_name;
                        mainCommElem_head.appendChild(mainCommElem_head_name);
    
                    let mainCommElem_head_date: HTMLElement = document.createElement("div");
                        mainCommElem_head_date.classList.add("comment_textHead_date");
                        mainCommElem_head_date.textContent = this.MainCommObj[i].date_time;
                        mainCommElem_head.appendChild(mainCommElem_head_date);
                    
                mainCommElement.appendChild(mainCommElem_head);
    
                let mainCommElem_text: HTMLElement = document.createElement("p");
                    mainCommElem_text.classList.add("comment_textContent");
                    mainCommElem_text.textContent = this.MainCommObj[i].text;
                    mainCommElement.appendChild(mainCommElem_text);
    
                let mainCommElem_bottom: HTMLElement = document.createElement("div");
                    mainCommElem_bottom.classList.add("comment_bottom");
    
                    let mainCommElem_bottom_answBut: HTMLElement = document.createElement("div");
                        mainCommElem_bottom_answBut.classList.add("comment_bottom_answerButton");
                        mainCommElem_bottom_answBut.setAttribute("data-answBut", String(i));
                        // mainCommElem_bottom_answBut.addEventListener ("click", () => {
                        //     this.MainCommObj[i] = saveAnswer(this.MainCommObj[i], i);
                        //     // console.log(MainComments[i])
                        //     localStorage.setItem("comments", JSON.stringify(this.MainCommObj));
                        // });
    
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
                        
                        if (this.MainCommObj[i].isFavorite) {
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
                        if (this.MainCommObj[i].isFavorite) {
                            this.MainCommObj[i].isFavorite = false;
                            mainCommElem_bottom_favButImgPosit.src = "./SVG/HeartEmptyIcon.svg";
                            mainCommElem_bottom_favButImgPosit.setAttribute("alt", "./SVG/HeartEmptyIcon.svg");
                            mainCommElem_bottom_favButTxtPosit.textContent = "В избранное";
    
                        } else {
                            this.MainCommObj[i].isFavorite = true;
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
                        // mainCommElem_bottom_rtnButNgt.addEventListener ("click", () => {
                        //     raitingChangeFunc(false, i)
                        // });
    
                        let mainCommElem_bottom_rtnButVle: HTMLElement = document.createElement("div");
                        mainCommElem_bottom_rtnButVle.classList.add("comment_bottom_reitingValue");
                        mainCommElem_bottom_rtnButVle.setAttribute("Data-rtnButVle", String(i));
                        mainCommElem_bottom_rtnButVle.textContent = `${this.MainCommObj[i].raiting}`;
                        mainCommElem_bottom_rtnBut.appendChild(mainCommElem_bottom_rtnButVle);
    
                        if (this.MainCommObj[i].raiting < 0) {
                            mainCommElem_bottom_rtnButVle.style.color = "#FF0000";
                        } else if (this.MainCommObj[i].raiting = 0) {
                            mainCommElem_bottom_rtnButVle.style.color = "#D9D9D9";
                        } else {
                            mainCommElem_bottom_rtnButVle.style.color = "#8AC540";
                        }
    
                        let mainCommElem_bottom_rtnButPst: HTMLElement = document.createElement("div");
                        mainCommElem_bottom_rtnButPst.classList.add("comment_bottom_reitingPositive");
                        mainCommElem_bottom_rtnButPst.textContent = "+";
                        mainCommElem_bottom_rtnButPst.setAttribute("Data-rtnButPst", String(i));
                        mainCommElem_bottom_rtnBut.appendChild(mainCommElem_bottom_rtnButPst);
                        // mainCommElem_bottom_rtnButPst.addEventListener ("click", () => {
                        //     raitingChangeFunc(true, i)
                        // });
                        
                mainCommElem_bottom.appendChild(mainCommElem_bottom_rtnBut);
    
            mainCommElement.appendChild(mainCommElem_bottom);
            this.commentPosition?.insertBefore(mainCommElement, this.commentPosition.firstChild);
    
            console.log("MainComments[i].answers", this.MainCommObj[i].answers)
    
            // if (MainCommObj[i].answers?.length !== undefined) {
            //     console.log("колич ответов - ", MainCommObj[i].answers?.length)
            // } else {
            //     console.log("в сообщении "+i+" нет ответов")
            // }
            
            if (this.countElementPosition) {
                this.countElementPosition.textContent = `(${this.MainCommObj.length})`;
            }
        }
    }



}
export default Drow;