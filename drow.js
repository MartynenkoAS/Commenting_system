"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Drow = /** @class */ (function () {
    function Drow(MainCommObj) {
        this.MainCommObj = MainCommObj;
        this.commentPosition = document.querySelector(".comment");
        this.countElementPosition = document.querySelector(".comment_header_counterElement");
    }
    Drow.prototype.drowComment = function () {
        var _this = this;
        var _a, _b;
        while ((_a = this.commentPosition) === null || _a === void 0 ? void 0 : _a.firstChild) { // удаляем дочерние элементы 
            this.commentPosition.removeChild(this.commentPosition.firstChild);
        }
        var _loop_1 = function (i) {
            var mainCommElement = document.createElement("div"); // создаем блок основного комментария
            mainCommElement.classList.add("comment_block");
            mainCommElement.setAttribute("Data-index", String(i));
            var mainCommElem_foto = document.createElement("img");
            mainCommElem_foto.classList.add("comment_authorFoto");
            mainCommElem_foto.src = this_1.MainCommObj[i].author_avatar;
            mainCommElem_foto.setAttribute("alt", this_1.MainCommObj[i].author_avatar);
            mainCommElement === null || mainCommElement === void 0 ? void 0 : mainCommElement.appendChild(mainCommElem_foto);
            var mainCommElem_head = document.createElement("div");
            mainCommElem_head.classList.add("comment_textHead");
            var mainCommElem_head_name = document.createElement("div");
            mainCommElem_head_name.classList.add("author_name");
            mainCommElem_head_name.textContent = this_1.MainCommObj[i].author_name;
            mainCommElem_head.appendChild(mainCommElem_head_name);
            var mainCommElem_head_date = document.createElement("div");
            mainCommElem_head_date.classList.add("comment_textHead_date");
            mainCommElem_head_date.textContent = this_1.MainCommObj[i].date_time;
            mainCommElem_head.appendChild(mainCommElem_head_date);
            mainCommElement.appendChild(mainCommElem_head);
            var mainCommElem_text = document.createElement("p");
            mainCommElem_text.classList.add("comment_textContent");
            mainCommElem_text.textContent = this_1.MainCommObj[i].text;
            mainCommElement.appendChild(mainCommElem_text);
            var mainCommElem_bottom = document.createElement("div");
            mainCommElem_bottom.classList.add("comment_bottom");
            var mainCommElem_bottom_answBut = document.createElement("div");
            mainCommElem_bottom_answBut.classList.add("comment_bottom_answerButton");
            mainCommElem_bottom_answBut.setAttribute("data-answBut", String(i));
            // mainCommElem_bottom_answBut.addEventListener ("click", () => {
            //     this.MainCommObj[i] = saveAnswer(this.MainCommObj[i], i);
            //     // console.log(MainComments[i])
            //     localStorage.setItem("comments", JSON.stringify(this.MainCommObj));
            // });
            var mainCommElem_bottom_answButImg = document.createElement("img");
            mainCommElem_bottom_answButImg.src = "./SVG/BackArrow.svg";
            mainCommElem_bottom_answButImg.setAttribute("alt", "./SVG/BackArrow.svg");
            mainCommElem_bottom_answBut.appendChild(mainCommElem_bottom_answButImg);
            var mainCommElem_bottom_answButTxt = document.createElement("div");
            mainCommElem_bottom_answButTxt.textContent = "Ответить";
            mainCommElem_bottom_answBut.appendChild(mainCommElem_bottom_answButTxt);
            mainCommElem_bottom.appendChild(mainCommElem_bottom_answBut);
            var mainCommElem_bottom_favBut = document.createElement("div");
            mainCommElem_bottom_favBut.classList.add("comment_bottom_favorite");
            var mainCommElem_bottom_favButImg = document.createElement("img");
            mainCommElem_bottom_favButImg.setAttribute("Data-favButImg", String(i));
            var mainCommElem_bottom_favButTxt = document.createElement("div");
            mainCommElem_bottom_favButTxt.setAttribute("Data-favButTxt", String(i));
            if (this_1.MainCommObj[i].isFavorite) {
                mainCommElem_bottom_favButImg.src = "./SVG/HeartFullIcon.svg";
                mainCommElem_bottom_favButImg.setAttribute("alt", "./SVG/HeartFullIcon.svg");
                mainCommElem_bottom_favButTxt.textContent = "В избранном";
            }
            else {
                mainCommElem_bottom_favButImg.src = "./SVG/HeartEmptyIcon.svg";
                mainCommElem_bottom_favButImg.setAttribute("alt", "./SVG/HeartEmptyIcon.svg");
                mainCommElem_bottom_favButTxt.textContent = "В избранное";
            }
            mainCommElem_bottom_favBut.appendChild(mainCommElem_bottom_favButImg);
            mainCommElem_bottom_favBut.appendChild(mainCommElem_bottom_favButTxt);
            mainCommElem_bottom.appendChild(mainCommElem_bottom_favBut);
            mainCommElem_bottom_favBut.addEventListener("click", function () {
                var mainCommElem_bottom_favButImgPosit = document.querySelector('[Data-favButImg="' + i + '"]');
                var mainCommElem_bottom_favButTxtPosit = document.querySelector('[Data-favButTxt="' + i + '"]');
                if (_this.MainCommObj[i].isFavorite) {
                    _this.MainCommObj[i].isFavorite = false;
                    mainCommElem_bottom_favButImgPosit.src = "./SVG/HeartEmptyIcon.svg";
                    mainCommElem_bottom_favButImgPosit.setAttribute("alt", "./SVG/HeartEmptyIcon.svg");
                    mainCommElem_bottom_favButTxtPosit.textContent = "В избранное";
                }
                else {
                    _this.MainCommObj[i].isFavorite = true;
                    mainCommElem_bottom_favButImgPosit.src = "./SVG/HeartFullIcon.svg";
                    mainCommElem_bottom_favButImgPosit.setAttribute("alt", "./SVG/HeartFullIcon.svg");
                    mainCommElem_bottom_favButTxtPosit.textContent = "В избранном";
                }
            });
            var mainCommElem_bottom_rtnBut = document.createElement("div");
            mainCommElem_bottom_rtnBut.classList.add("comment_bottom_reiting");
            var mainCommElem_bottom_rtnButNgt = document.createElement("div");
            mainCommElem_bottom_rtnButNgt.classList.add("comment_bottom_reitingNegative");
            mainCommElem_bottom_rtnButNgt.setAttribute("Data-rtnButNgt", String(i));
            mainCommElem_bottom_rtnButNgt.textContent = "-";
            mainCommElem_bottom_rtnBut.appendChild(mainCommElem_bottom_rtnButNgt);
            // mainCommElem_bottom_rtnButNgt.addEventListener ("click", () => {
            //     raitingChangeFunc(false, i)
            // });
            var mainCommElem_bottom_rtnButVle = document.createElement("div");
            mainCommElem_bottom_rtnButVle.classList.add("comment_bottom_reitingValue");
            mainCommElem_bottom_rtnButVle.setAttribute("Data-rtnButVle", String(i));
            mainCommElem_bottom_rtnButVle.textContent = "".concat(this_1.MainCommObj[i].raiting);
            mainCommElem_bottom_rtnBut.appendChild(mainCommElem_bottom_rtnButVle);
            if (this_1.MainCommObj[i].raiting < 0) {
                mainCommElem_bottom_rtnButVle.style.color = "#FF0000";
            }
            else if (this_1.MainCommObj[i].raiting = 0) {
                mainCommElem_bottom_rtnButVle.style.color = "#D9D9D9";
            }
            else {
                mainCommElem_bottom_rtnButVle.style.color = "#8AC540";
            }
            var mainCommElem_bottom_rtnButPst = document.createElement("div");
            mainCommElem_bottom_rtnButPst.classList.add("comment_bottom_reitingPositive");
            mainCommElem_bottom_rtnButPst.textContent = "+";
            mainCommElem_bottom_rtnButPst.setAttribute("Data-rtnButPst", String(i));
            mainCommElem_bottom_rtnBut.appendChild(mainCommElem_bottom_rtnButPst);
            // mainCommElem_bottom_rtnButPst.addEventListener ("click", () => {
            //     raitingChangeFunc(true, i)
            // });
            mainCommElem_bottom.appendChild(mainCommElem_bottom_rtnBut);
            mainCommElement.appendChild(mainCommElem_bottom);
            (_b = this_1.commentPosition) === null || _b === void 0 ? void 0 : _b.insertBefore(mainCommElement, this_1.commentPosition.firstChild);
            console.log("MainComments[i].answers", this_1.MainCommObj[i].answers);
            // if (MainCommObj[i].answers?.length !== undefined) {
            //     console.log("колич ответов - ", MainCommObj[i].answers?.length)
            // } else {
            //     console.log("в сообщении "+i+" нет ответов")
            // }
            if (this_1.countElementPosition) {
                this_1.countElementPosition.textContent = "(".concat(this_1.MainCommObj.length, ")");
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.MainCommObj.length; i++) {
            _loop_1(i);
        }
    };
    return Drow;
}());
exports.default = Drow;
