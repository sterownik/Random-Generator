let inputs = document.querySelectorAll("input");
let buttons = document.querySelectorAll(".btn");
let contentToHide = document.querySelector("div.all-content");
let circlesToShow = document.querySelector("div.set-circles");
let iDclassToDelete = 0;
let flagToSaveDiffrent = true;
let firstInputHTML = document.querySelector(".main_first-input");
let secondInputHTML = document.querySelector(".main_second-input");
let howMuchHTML = document.querySelector(".main__input-how");
let checkBox = document.querySelector(".main__checkbox");
let circleDisplay;
inputs.forEach(addSelectedValue);
buttons.forEach(play);

if (localStorage.getItem("saves") === null) {
    console.log('niema');

} else {
    let tab = JSON.parse(localStorage["saves"]);

    getCircle();

}

function getCircle() {


    let tab = JSON.parse(localStorage["saves"]);

    for (let i = 0; i < tab.length; i++) {
        let divFirst = document.createElement("div");
        let createSaveThere = document.createElement("div");
        createSaveThere.classList.add("circles-to-save");
        let date;
        for (let j = 0; j < tab[i].length; j++) {

            let circle = document.createElement("div");

            circle.textContent = tab[i][j][0];
            circle.style.backgroundColor = tab[i][j][1];
            circle.style.color = tab[i][j][2];
            createSaveThere.appendChild(circle);
            date = tab[i][j][3];

        }
        let dateDisplay = document.createElement("p");
        dateDisplay.textContent = date;
        let deleteBtn = document.createElement("div");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "USUŃ ZESTAW";
        divFirst.appendChild(dateDisplay);
        divFirst.appendChild(createSaveThere);
        divFirst.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function () {
            divFirst.textContent = "";

        })

        document.querySelector(".set-circles").appendChild(divFirst);
    }

}


function Create2DArray(rows) {
    let arr = [];

    for (let i = 0; i < rows; i++) {
        arr[i] = [];
    }

    return arr;
}

function play(item) {
    if (item.classList.contains("btn") && (item.classList.contains("main__button") || item.classList.contains("pick__buttton-pick-again"))) {
        item.addEventListener("click", function () {

            let firstInput = Number(firstInputHTML.value);
            let secondInput = Number(secondInputHTML.value);
            let howMuch = Number(howMuchHTML.value);
            let checkCalculate = secondInput - firstInput;
            let arrayRandom = [];
            let isHere = false;
            circleDisplay = Create2DArray(howMuch);

            if (checkBox.checked == true && checkCalculate < howMuch) {
                alert("Liczby nie mogą być unikalne!")

            } else {
                flagToSaveDiffrent = true;

                if (firstInput > secondInput) {
                    document.querySelector(".main__info").classList.remove("main__no-display");
                } else if (firstInput <= secondInput) {
                    document.querySelector(".main__info").classList.add("main__no-display");
                    if (item.classList.contains("main__button")) {
                        document.querySelector("section.pick").classList.remove("pick__no-display");
                    }

                    document.querySelector(".pick__circles").textContent = "";
                    let randomNumber;
                    for (let i = 0; i < howMuch; i++) {
                        setTimeout(function () {
                            isHere = false;
                            if (checkBox.checked == true) {
                                while (!isHere) {
                                    randomNumber = Math.floor(Math.random() * (secondInput - firstInput + 1) + firstInput);
                                    if (!arrayRandom.includes(randomNumber)) {
                                        arrayRandom.push(randomNumber);
                                        isHere = true;
                                    } else {
                                        isHere = false;
                                    }
                                }
                            } else {
                                randomNumber = Math.floor(Math.random() * (secondInput - firstInput + 1) + firstInput);
                            }
                            let randomR = Math.floor(Math.random() * (255 - 0 + 1) + 0);
                            let randomG = Math.floor(Math.random() * (255 - 0 + 1) + 0);
                            let randomB = Math.floor(Math.random() * (255 - 0 + 1) + 0);

                            let circle = document.createElement("div");
                            circle.style.backgroundColor = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
                            circle.textContent = randomNumber;
                            if (randomR + randomG + randomB > 384) {
                                circle.style.color = "black"
                            } else {
                                circle.style.color = "white"
                            }

                            document.querySelector(".pick__circles").appendChild(circle);
                            circle.classList.add("show");
                            circleDisplay[i][0] = randomNumber;
                            circleDisplay[i][1] = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
                            circleDisplay[i][2] = circle.style.color;
                            circleDisplay[i][3] = getTime();






                        }, 100 * i);


                    }


                    window.scrollTo(0, document.body.scrollHeight);
                }
            }


        })
    } else if (item.classList.contains("main__button-show") && item.classList.contains("btn")) {
        item.addEventListener("click", function () {
            showSets();
        })

    } else if (item.classList.contains("cancel") && item.classList.contains("btn")) {
        item.addEventListener("click", function () {
            hideSets();
        })
    } else if (item.classList.contains("pick__buttton-save") && item.classList.contains("btn")) {
        item.addEventListener("click", function () {
            saveSets();
        })
    }
}

function hideSets() {
    contentToHide.classList.remove("hide");
    circlesToShow.classList.remove("show");
}

function showSets() {
    contentToHide.classList.add("hide");
    circlesToShow.classList.add("show");


}

function saveSets() {
    if (flagToSaveDiffrent) {
        let toSave = document.querySelector(".pick__circles");
        let singleDiv = document.createElement("div");
        singleDiv.classList.add(iDclassToDelete);
        let deleteBtn = document.createElement("div");
        deleteBtn.classList.add("delete");
        let txt = document.createElement("p");
        txt.textContent = getTime();
        let createSaveThere = document.createElement("div");
        createSaveThere.classList.add("circles-to-save");
        createSaveThere.innerHTML = toSave.innerHTML;
        singleDiv.appendChild(txt);
        singleDiv.appendChild(createSaveThere);
        deleteBtn.textContent = "USUŃ ZESTAW";
        let toDrop = circleDisplay;
        deleteBtn.addEventListener("click", function () {
            singleDiv.textContent = "";
        })
        singleDiv.appendChild(deleteBtn);
        document.querySelector(".set-circles").appendChild(singleDiv);
        iDclassToDelete++;
        flagToSaveDiffrent = false;

        let dropHistory = JSON.parse(localStorage.getItem("saves")) || [];
        dropHistory.push(toDrop);
        localStorage.setItem("saves", JSON.stringify(dropHistory));

    } else
        alert("Nie możesz zapisać już tego zestawu liczb!")
}

function getTime() {
    let currentdate = new Date();
    return ((currentdate.getDate() < 10) ? "0" : "") + currentdate.getDate() + "." + (((currentdate.getMonth() + 1)) ? "0" : "") + (currentdate.getMonth() + 1) + "." + currentdate.getFullYear() + " " + ((currentdate.getHours() < 10) ? "0" : "") + currentdate.getHours() + ":" + ((currentdate.getMinutes() < 10) ? "0" : "") + currentdate.getMinutes() + ":" + ((currentdate.getSeconds() < 10) ? "0" : "") + currentdate.getSeconds();
}


function addSelectedValue(item) {
    if (item.classList.contains("main__input")) {

        item.addEventListener("input", (event) => {

            if (event.target.classList.contains("main_first-input")) {

                document.querySelector(".main__select-first-range").textContent = event.target.value;

            } else if (event.target.classList.contains("main_second-input")) {
                document.querySelector(".main__select-second-range").textContent = event.target.value;
            } else if (event.target.classList.contains("main__input-how")) {
                document.querySelector(".main__select-how-range").textContent = event.target.value;
            }



        })
    }
}