let colorPicker = document.getElementById("colorDiv");
let slider = document.getElementById("slider");
let rightButton = document.getElementById("colorButtonRight");
let leftButton = document.getElementById("colorButtonLeft");
let gradient = document.getElementById("gradient");
let middleButton = document.getElementById("colorButtonMiddle");
let middleSwitch = document.getElementById("checkbox");
let page = document.getElementById("stranka");
let disableMiddleButton  = document.getElementById("disableMiddleButton");

let btnIndex = 0;
let colorWidthHalf = 95;

let LeftColor = "#A1A1A1";
let RightColor = "#A1A1A1";
let MiddleColor = null;
let checked;
let backgroundClick = false;


function hideColor() {
    ChangeActive();
}
function LeftButtonPressed() {
    colorPicker.style.marginLeft = leftButton.getBoundingClientRect().x - colorWidthHalf + "px";
    btnIndex = 0;
    colorPicker.style.display = "inherit";
    backgroundClick = true;
    ChangeActive();
}
function MiddleButtonPressed() {
    colorPicker.style.marginLeft = middleButton.getBoundingClientRect().x - colorWidthHalf + "px";
    middleSwitch = true;
    btnIndex = 1;
    colorPicker.style.display = "inherit";
    backgroundClick = true;
    MiddleColor = odpovedi[pocetstranek - 1][1];

    ChangeActive();
    MoveGradient();
}
function DisableMiddleButton() {
    MiddleColor = "null";
    middleButton.style.backgroundColor = "#00000000";
    backgroundClick = true;

    MoveGradient();
}
function RightButtonPressed() {
    colorPicker.style.marginLeft = rightButton.getBoundingClientRect().x - colorWidthHalf + "px";
    btnIndex = 2;
    colorPicker.style.display = "inherit";
    backgroundClick = true;

    ChangeActive();

}
function backgroundClicked(){
    if(!backgroundClick){
    colorPicker.style.display = "none";
    btnIndex = -1;
    ChangeActive();
    }

    backgroundClick = false;
}
function backgroundClickedtutorial(){
    colorPicker.style.display = "none";
    btnIndex = -1;
    ChangeActive();
    backgroundClick = false;
}
function MoveToButtonIndex() {
    if (btnIndex == 0)
        LeftButtonPressed();
    else if (btnIndex == 1)
        MiddleButtonPressed();
    else if (btnIndex == 2)
        RightButtonPressed();
}
function ChangeActive() {
    switch (btnIndex) {
        case 0:
            leftButton.style.borderWidth = '4px';
            rightButton.style.borderWidth = '2px';
            middleButton.style.borderWidth = '2px';

            leftButton.style.borderRadius = '10px';
            rightButton.style.borderRadius = '1000px';
            middleButton.style.borderRadius = '1000px';

            break;
        case 1:
            leftButton.style.borderWidth = '2px';
            rightButton.style.borderWidth = '2px';
            middleButton.style.borderWidth = '4px';

            leftButton.style.borderRadius = '1000px';
            rightButton.style.borderRadius = '1000px';
            middleButton.style.borderRadius = '10px';
            break;
        case 2:
            leftButton.style.borderWidth = '2px';
            rightButton.style.borderWidth = '4px';
            middleButton.style.borderWidth = '2px';

            leftButton.style.borderRadius = '1000px';
            rightButton.style.borderRadius = '10px';
            middleButton.style.borderRadius = '1000px';
        break;
        case -1:
            leftButton.style.borderWidth = '2px';
            rightButton.style.borderWidth = '2px';
            middleButton.style.borderWidth = '2px';

            leftButton.style.borderRadius = '1000px';
            rightButton.style.borderRadius = '1000px';
            middleButton.style.borderRadius = '1000px';
            break;
    }
}
function Barvy(button) {
    let barva = window.getComputedStyle(button).backgroundColor;
    backgroundClick = true;

    switch (btnIndex) {
        case 0:
            LeftColor = barva;
            leftButton.style.backgroundColor = barva;
            break;
        case 1:
            MiddleColor = barva;
            middleButton.style.backgroundColor = barva;

            checked = true;
            break;
        case 2:
            RightColor = barva;
            rightButton.style.backgroundColor = barva;
            break;

    }
    MoveGradient();
}
function MoveGradient() {
    if (MiddleColor != "null") {
        let col = "linear-gradient(to right, " + LeftColor + " , " + MiddleColor + " , " + RightColor + " )";
        gradient.style.background = col;
    }
    else {
        let col = "linear-gradient(to right, " + LeftColor + ", " + RightColor + " 100%)";
        gradient.style.background = col;
    }
}
function GradientAdjust(x) {
    y = 0.8 * (x - 50) + 50;
    return y;
}




let pocetstranek = 1;
let soupisotazek = [["skvělé", "dobré", "neutrální", "špatné", "příšerné"], ["nádherné", "hezké", "neutrální", "ošklivé", "ohavné"], ["rychlé", "svižné", "neutrální", "zvolna", "pomalé"], ["biologie", "programování", "chemie", "němčina"]] //slova nad sliderem (budou v budoucnu přicházet ze serveru)
let celkovypocetotazek = soupisotazek.length;
let odpovedi = [];
let barvy = ["#A1A1A1", "null", "#A1A1A1"]; // zapisuje pouze 3 barvy
if (localStorage.getItem("odpovedi")) {
}
else {
    for (let i = 0; i < celkovypocetotazek; i++) { // vytvori JSON se samými šedými barvami
        odpovedi[i] = barvy;
    }
    localStorage.setItem("odpovedi", JSON.stringify(odpovedi));
}

function start() {
    if (localStorage.getItem("pouzil")) {
        document.getElementById("buttonstart").style.display = "none";
        document.getElementById("konec").style.display = "block";
        document.getElementById("konec").innerHTML = "Průzkum jste již vyplnil(a), moc děkujeme.";
        localStorage.removeItem("odpovedi");
    }
    else {
        odpovedi = JSON.parse(localStorage.getItem("odpovedi"));
        console.log(odpovedi[0][1]);
        if (odpovedi[0][1] == "null") {
            gradient.style.background = "linear-gradient(to right, " + odpovedi[0][0] + ", " + odpovedi[0][2] + " 100%)";
            checked = false;
        }
        else {
            gradient.style.background = "linear-gradient(to right, " + odpovedi[0][0] + "," + odpovedi[0][1] + "," + odpovedi[0][2] + " 100%)";
            checked = true;
        }
        LeftColor = odpovedi[0][0];
        MiddleColor = odpovedi[0][1];
        RightColor = odpovedi[0][2];
        leftButton.style.backgroundColor = odpovedi[0][0];
        if (odpovedi[0][1] != "null") {
            middleButton.style.background = odpovedi[0][1];
        } else {
            middleButton.style.background = "#A1A1A100";
        }
        rightButton.style.backgroundColor = odpovedi[0][2];
        document.getElementById("buttonstart").style.display = "none";
        document.getElementById("stranka").style.display = "block";

        document.getElementById("scaleLi").innerHTML = ''; //vypis slov nad sliderem
        for (let i = 0; i < soupisotazek[0].length; i++) {
            document.getElementById("scaleLi").innerHTML += "<li style='text-align:center;width:" + 100 / soupisotazek[0].length + "%'>" + soupisotazek[0][i] + "</li>";
        }

        document.getElementById("cislostranky").innerHTML = pocetstranek + "/" + celkovypocetotazek;
    }
}
function dalsi() {
    odpovedi = JSON.parse(localStorage.getItem("odpovedi"));
    odpovedi[pocetstranek - 1][0] = LeftColor;
    odpovedi[pocetstranek - 1][1] = MiddleColor;
    odpovedi[pocetstranek - 1][2] = RightColor;
    localStorage.setItem("odpovedi", JSON.stringify(odpovedi));
    if (celkovypocetotazek == pocetstranek)// zápis do online databáze v případě, že jsme na poslední stránce
    {
        document.getElementById("stranka").style.display = "none";
        document.getElementById("konec").style.display = "block";
        localStorage.removeItem("odpovedi");
        localStorage.setItem("pouzil", "ano");
    } else {
        LeftColor = odpovedi[pocetstranek][0];
        MiddleColor = odpovedi[pocetstranek][1];
        RightColor = odpovedi[pocetstranek][2];
        if (odpovedi[pocetstranek][1] == "null") {
            gradient.style.background = "linear-gradient(to right, " + odpovedi[pocetstranek][0] + ", " + odpovedi[pocetstranek][2] + " 100%)";
            checked = false;
        }
        else {
            gradient.style.background = "linear-gradient(to right, " + odpovedi[pocetstranek][0] + "," + odpovedi[pocetstranek][1] + "," + odpovedi[pocetstranek][2] + " 100%)";
            checked = true;
        }
        leftButton.style.backgroundColor = odpovedi[pocetstranek][0];
        if (odpovedi[pocetstranek][1] == "null") {
            middleButton.style.backgroundColor = "#00000000";

        } else
            middleButton.style.backgroundColor = odpovedi[pocetstranek][1];
        rightButton.style.backgroundColor = odpovedi[pocetstranek][2];

        document.getElementById("scaleLi").innerHTML = ''; //vypis slov nad sliderem
        for (let i = 0; i < soupisotazek[pocetstranek].length; i++) {
            document.getElementById("scaleLi").innerHTML += "<li style='text-align:center;width:" + 100 / soupisotazek[pocetstranek].length + "%'>" + soupisotazek[pocetstranek][i] + "</li>";
        }

        pocetstranek = pocetstranek + 1;
        document.getElementById("cislostranky").innerHTML = pocetstranek + "/" + celkovypocetotazek;
        if (celkovypocetotazek == pocetstranek) {
            document.getElementById("dalsi").innerHTML = "Ukončit dotazník";
        } else {
            document.getElementById("dalsi").innerHTML = 'Další <svg width="24" height="20" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path fill="white" d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>';
        }
    }
}
function zpatky() {
    if ((pocetstranek - 2) >= 0) {
        odpovedi = JSON.parse(localStorage.getItem("odpovedi"));
        odpovedi[pocetstranek - 1][0] = LeftColor;
        odpovedi[pocetstranek - 1][1] = MiddleColor;
        odpovedi[pocetstranek - 1][2] = RightColor;
        localStorage.setItem("odpovedi", JSON.stringify(odpovedi));
        pocetstranek = pocetstranek - 1;
        LeftColor = odpovedi[pocetstranek - 1][0];
        MiddleColor = odpovedi[pocetstranek - 1][1];
        RightColor = odpovedi[pocetstranek - 1][2];
        if (odpovedi[pocetstranek - 1][1] == "null") {
            gradient.style.background = "linear-gradient(to right, " + odpovedi[pocetstranek - 1][0] + ", " + odpovedi[pocetstranek - 1][2] + " 100%)";
            checked = false;
        }
        else {
            gradient.style.background = "linear-gradient(to right, " + odpovedi[pocetstranek - 1][0] + "," + odpovedi[pocetstranek - 1][1] + "," + odpovedi[pocetstranek - 1][2] + " 100%)";
            checked = true;
        }
        leftButton.style.backgroundColor = odpovedi[pocetstranek - 1][0];
        if (odpovedi[pocetstranek - 1][1] == "null") {
            middleButton.style.backgroundColor = "#00000000";

        } else
            middleButton.style.backgroundColor = odpovedi[pocetstranek - 1][1];

        rightButton.style.backgroundColor = odpovedi[pocetstranek - 1][2];
        document.getElementById("cislostranky").innerHTML = pocetstranek + "/" + celkovypocetotazek;

        document.getElementById("scaleLi").innerHTML = ''; //vypis slov nad sliderem
        for (let i = 0; i < soupisotazek[pocetstranek - 1].length; i++) {
            document.getElementById("scaleLi").innerHTML += "<li style='text-align:center;width:" + 100 / soupisotazek[pocetstranek - 1].length + "%'>" + soupisotazek[pocetstranek - 1][i] + "</li>";
        }

        if (celkovypocetotazek == pocetstranek) {
            document.getElementById("dalsi").innerHTML = "Ukončit dotazník";
        } else {
            document.getElementById("dalsi").innerHTML = 'Další <svg width="24" height="20" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path fill="white" d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>';
        }
    }

}

//tutorial 
document.getElementById("cursortutorial").style.display="none";
let tutorialwords = ["horké","vlažné","studené"];
const tutorialtext = document.createElement("div");
tutorialtext.setAttribute("id","tutorialtext");
document.body.appendChild(tutorialtext);
movesofcursor();
function movesofcursor (){
    document.getElementById("dalsi").style.display="none";
    document.getElementById("zpatky").style.display="none";
    document.getElementById("cislostranky").style.display="none";
    document.getElementById("stranka").style.display = "block";
    document.getElementById("buttonstart").style.display = "none";
    document.getElementById("scaleLi").innerHTML = ''; //vypis slov nad sliderem
        for (let i = 0; i < tutorialwords.length; i++) {
            document.getElementById("scaleLi").innerHTML += "<li style='text-align:center;width:" + 100 / tutorialwords.length + "%'>" + tutorialwords[i] + "</li>";
        }
        page.onclick = "";
        document.body.onclick = "";
        for(let i = 0; i < document.getElementsByTagName("button").length; i++){
            document.getElementsByTagName("button")[i].onclick="";
        }
        for(let i = 0; i < document.getElementsByTagName("input").length; i++){
            document.getElementsByTagName("input")[i].onclick="";
        }
        DisableMiddleButton();
        // create tutorial pop up
        const tutorialrealtext = document.createTextNode("Budeme mít za úkol přiřadit barvy ke slovům nad nimi, můžete přiřadit 2 nebo 3 barvy jak uvidíte v následující animaci.");
        tutorialtext.appendChild(tutorialrealtext);
        const tutorialbutton = document.createElement("button");
        const textnode = document.createTextNode("Další");
        tutorialbutton.appendChild(textnode);
        tutorialtext.appendChild(tutorialbutton);
        tutorialbutton.setAttribute("id","tutorialbutton");
        page.style.filter ="blur(8px)"
        tutorialbutton.onclick= function (){
        document.getElementById("cursortutorial").style.display="block";
        page.style.filter ="blur(0px)"
        setTimeout(firstmove, 500);
        tutorialtext.style.display="none";
        } 
        
    }
function firstmove(){
    document.querySelector(':root').style.setProperty('--secondleft', document.getElementById("colorButtonLeft").getBoundingClientRect().x.toFixed()+'px');
    document.querySelector(':root').style.setProperty('--secondtop', document.getElementById("colorButtonLeft").getBoundingClientRect().top.toFixed()+'px');
    document.getElementById("cursortutorial").style.animation = "moves 2s forwards"; //first move of the cursor
    setTimeout(tutorialclick, 2000);
    setTimeout(secondmove, 2500);
}
function secondmove(){
    document.getElementById("cursortutorial").style.animation = "none";
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    r.style.setProperty('--firstleft',rs.getPropertyValue('--secondleft'));
    r.style.setProperty('--firsttop',rs.getPropertyValue('--secondtop'));
    r.style.setProperty('--secondleft', document.getElementById("button8").getBoundingClientRect().x.toFixed()+'px');
    r.style.setProperty('--secondtop', document.getElementById("button8").getBoundingClientRect().top.toFixed()+'px');
    document.getElementById("cursortutorial").style.animation = "moves 2s forwards"; //second move of the cursor
    setTimeout(tutorialclick, 2000);
    setTimeout(thirdmove, 2500);
}
function thirdmove(){
    document.getElementById("cursortutorial").style.animation = "none";
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    r.style.setProperty('--firstleft',rs.getPropertyValue('--secondleft'));
    r.style.setProperty('--firsttop',rs.getPropertyValue('--secondtop'));
    r.style.setProperty('--secondleft', document.getElementById("colorButtonRight").getBoundingClientRect().x.toFixed()+'px');
    r.style.setProperty('--secondtop', document.getElementById("colorButtonRight").getBoundingClientRect().top.toFixed()+'px');
    document.getElementById("cursortutorial").style.animation = "moves 2s forwards"; //second move of the cursor
    setTimeout(tutorialclick, 2000);
    setTimeout(fourthmove, 2500);
}
function fourthmove(){
    document.getElementById("cursortutorial").style.animation = "none";
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    r.style.setProperty('--firstleft',rs.getPropertyValue('--secondleft'));
    r.style.setProperty('--firsttop',rs.getPropertyValue('--secondtop'));
    r.style.setProperty('--secondleft', document.getElementById("button20").getBoundingClientRect().x.toFixed()+'px');
    r.style.setProperty('--secondtop', document.getElementById("button20").getBoundingClientRect().top.toFixed()+'px');
    document.getElementById("cursortutorial").style.animation = "moves 2s forwards"; //second move of the cursor
    setTimeout(tutorialclick, 2000);
    setTimeout(fifthmove, 2500);
}
function fifthmove(){
    document.getElementById("cursortutorial").style.animation = "none";
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    r.style.setProperty('--firstleft',rs.getPropertyValue('--secondleft'));
    r.style.setProperty('--firsttop',rs.getPropertyValue('--secondtop'));
    r.style.setProperty('--secondleft', document.getElementById("colorButtonMiddle").getBoundingClientRect().x.toFixed()+'px');
    r.style.setProperty('--secondtop', document.getElementById("colorButtonMiddle").getBoundingClientRect().top.toFixed()+'px');
    document.getElementById("cursortutorial").style.animation = "moves 2s forwards"; //second move of the cursor
    setTimeout(tutorialclick, 2000);
    setTimeout(sixthmove, 2500);
}
function sixthmove(){
    document.getElementById("cursortutorial").style.animation = "none";
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    r.style.setProperty('--firstleft',rs.getPropertyValue('--secondleft'));
    r.style.setProperty('--firsttop',rs.getPropertyValue('--secondtop'));
    r.style.setProperty('--secondleft', document.getElementById("button4").getBoundingClientRect().x.toFixed()+'px');
    r.style.setProperty('--secondtop', document.getElementById("button4").getBoundingClientRect().top.toFixed()+'px');
    document.getElementById("cursortutorial").style.animation = "moves 2s forwards"; //second move of the cursor
    setTimeout(tutorialclick, 2000);
    while (tutorialtext.firstChild) {
        tutorialtext.removeChild(tutorialtext.firstChild);
    }
    setTimeout(() => {
    page.style.filter ="blur(0px)"
    tutorialtext.style.display="block";
    const tutorialrealtext = document.createTextNode("Prostřední barvu můžete též zrušit a nechat pouze dvě.");
    tutorialtext.appendChild(tutorialrealtext);
    const tutorialbutton = document.createElement("button");
    const textnode = document.createTextNode("Další");
    tutorialbutton.appendChild(textnode);
    tutorialtext.appendChild(tutorialbutton);
    tutorialbutton.setAttribute("id","tutorialbutton");
    page.style.filter ="blur(8px)"
    tutorialbutton.onclick= function (){
    page.style.filter ="blur(0px)"
    setTimeout(sevethmove, 500);
    tutorialtext.style.display="none";
    } 
    }, 2500); 
}
function sevethmove(){
    document.getElementById("cursortutorial").style.animation = "none";
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    r.style.setProperty('--firstleft',rs.getPropertyValue('--secondleft'));
    r.style.setProperty('--firsttop',rs.getPropertyValue('--secondtop'));
    r.style.setProperty('--secondleft', document.getElementById("disableMiddleButton").getBoundingClientRect().x.toFixed()+'px');
    r.style.setProperty('--secondtop', document.getElementById("disableMiddleButton").getBoundingClientRect().top.toFixed()+'px');
    document.getElementById("cursortutorial").style.animation = "moves 2s forwards"; //second move of the cursor
    setTimeout(tutorialclick, 2000);
    setTimeout(eighthmove,2500)
}
function eighthmove(){
    document.getElementById("cursortutorial").style.animation = "none";
    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    r.style.setProperty('--firstleft',rs.getPropertyValue('--secondleft'));
    r.style.setProperty('--firsttop',rs.getPropertyValue('--secondtop'));
    r.style.setProperty('--secondleft', document.getElementById("button7").getBoundingClientRect().x.toFixed()*1.2+'px');
    r.style.setProperty('--secondtop', document.getElementById("button7").getBoundingClientRect().top.toFixed()+'px');
    document.getElementById("cursortutorial").style.animation = "moves 2s forwards"; //second move of the cursor
    setTimeout(tutorialclick, 2000);
    while (tutorialtext.firstChild) {
        tutorialtext.removeChild(tutorialtext.firstChild);
    }
    setTimeout(() => {
    page.style.filter ="blur(0px)"
    tutorialtext.style.display="block";
    const tutorialrealtext = document.createTextNode("Nyní můžete pokračovat na výzkum.");
    tutorialtext.appendChild(tutorialrealtext);
    const tutorialbutton = document.createElement("button");
    const textnode = document.createTextNode("Začít test");
    tutorialbutton.appendChild(textnode);
    tutorialtext.appendChild(tutorialbutton);
    tutorialbutton.setAttribute("id","tutorialbutton");
    page.style.filter ="blur(8px)"
    tutorialbutton.onclick= function (){ //shows the start menu
    for(let i = 0; i < document.getElementById("preset").getElementsByTagName("button").length; i++){
            document.getElementById("preset").getElementsByTagName("button")[i].onclick=function (){Barvy(this);};
    }
    document.getElementById("dalsi").style.display="block";
    document.getElementById("zpatky").style.display="block";
    document.getElementById("cislostranky").style.display="block";
    rightButton.onclick=function(){RightButtonPressed()}
    leftButton.onclick=function(){LeftButtonPressed()}
    middleButton.onclick=function(){MiddleButtonPressed()}
    disableMiddleButton.onclick=function(){DisableMiddleButton()}
    page.onclick=function(){hideColor()}
    document.body.onclick=function(){backgroundClicked()}
    document.getElementById("dalsi").onclick=function(){dalsi()}
    document.getElementById("zpatky").onclick=function(){zpatky()}
    page.style.filter ="blur(0px)"
    setTimeout(start, 500);
    tutorialtext.style.display="none";
    document.getElementById("cursortutorial").style.display="none";
    } 
    }, 2500);
}

move=1;

function tutorialclick(){
    const ripple = document.createElement("div");
   ripple.className = "ripple";
   document.body.appendChild(ripple);
  ripple.style.top =  document.getElementById("cursortutorial").getBoundingClientRect().top.toFixed()+"px";
  ripple.style.left =   document.getElementById("cursortutorial").getBoundingClientRect().left.toFixed()+"px";
   ripple.style.animation = "ripple-effect .4s  linear";
   ripple.onanimationend = () => {
     document.body.removeChild(ripple);
   }
   if(move==1){LeftButtonPressed();
} else if(move==2){
    
    setTimeout(Barvy(document.getElementById("button8")), 1000);
} else if(move==3){
    
    RightButtonPressed();
} else if(move==4){
    
    setTimeout(Barvy(document.getElementById("button20")), 1000);
} else if(move==5){
    
    MiddleButtonPressed();
     // problem s automatickým přiřazením
} else if(move==6){
    
    setTimeout(Barvy(document.getElementById("button4")), 1000);
} else if(move==7){
    DisableMiddleButton();
} else if(move==8){
    backgroundClickedtutorial();
}
   move+=1;
}