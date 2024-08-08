/**
 * @name RalseiSender
 * @author exosZoldyck
 * @description Adds a menu that lets you send a random image of Ralsei
 * @version 1.0.2
 */

/*
                    :@@.                        
                   @%--@@                       
                 #@------@@:                    
                 %@------@@:                    
              .@@=---------%@                   
         @@@@@@@@=---------%@@@@@@@             
         @@=-+*@@=---------#@*+--%@             
         @@=---**----------+*----%@             
   @@@@@%--------------------------%@@@@@@%     
 @%--------------%@@@@@=-@@+--------------=@@.  
   @@=--------=@@@@@@@@@@@@+-----------+*@@     
   @@@@+++++++*****@@@@@@@@#+++++++++++@@@@     
     %@**@@@@@@@@**@@@@@@@@#*@@@@@@@@@@**       
     ..**@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@**       
     =+@@@@@@@%----@@@@@@@@@@=---%@@@@@@@*+     
     =*@@@@@@-=@@@@-=@@@@@@+-@@@@+-@@@@@@*+     
     =*@@@@+=@@@@:.@%======#@::@@@@==@@@@@@++   
   ++@@@@@@=-@@@@: @%--@@--%@..@@@@==@@@@@@**.  
 **@@@@@@@@@@-=@@@@-=@@@@@@+-@@@@+-@@@@@@@@@@** 
  .**@@@@@@@@@%----@@@@@@@@@@=---#@@@@@@@@@**.  
 ++@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*+ 
   ****@@**@@@@@@@@**@@@@@@#*@@@@@@@@**@@****.  
       *+  +*@@####**######**####@@*+  +*.      
           +***********************@@           
           %@**********************@@           
           %@@@******************%@.            
           %@*#@@@@****************@@           
         @@#***********************@@           
         @@#*****=-----+*------****@@           
        .@@#*****--@@@@=-@@@@--******@@.        
       @@********--@@@@@@@@@@--******@@.        
       @@******-----+@@@@@@+-----+*****%@       
       @@******--------@@--------+*****@@       
     #%******----------==----------+*****%#     
   @@******--------------------------******@@.  
 @@*****+------------------------------+*****@@ 
 .:@@@@------++--++------------++--------%@@@@@ 
       @@@@@@@%----@%--+***%@****=-%@@@@@.      
              .@@@@@@@@@@@@@@@@@@@@             
              .**@@@@**..**@@@@**:.             
           =++*@@@@@@**  **%@@@@@#+++           
         **@@@@@@@@@@**  **%@@@@@@@@@**.        
         ***********+      =***********.        
*/

module.exports = class RalseiSender {
  start() {
    BdApi.DOM.addStyle('RalseiSender', ralseiSenderStyle); 
    
    addButton();

    const handler = function(event) { 
      const menu = document.getElementById("ralseiMenu");
      const openMenuButton = document.getElementById("ralseiBtn");
      if(menu == undefined || openMenuButton == undefined) return;
  
      if (!menu.contains(event.target) && !openMenuButton.contains(event.target)) closeRalseiMenu();
    };

    document.removeEventListener('click', handler);
    document.addEventListener('click', handler);
  }
  
  onSwitch() {
    addButton();
    removeChaos();
  }

  stop() {
    try{
      closeRalseiMenu();
      removeButton();
      removeChaos();
    }
    catch{}
  }
}

const webLocationRootDir = "wallebot.com/ralsei"; // Must NOT end with '/'
const apiPHPFileLocation = `https://${webLocationRootDir}/api.php`; // Must start with 'https://'
const filterExclusionsDefault = "webp+mp4+dir";
const filterExclusions1 = "gif";
const filterExclusions2 = "jpg+jpeg+png";

const buttonIcon1 = "https://wallebot.com/ralsei/assets/discord/ralsei-discord-icon-1.webp";
const buttonIcon2 = "https://wallebot.com/ralsei/assets/discord/ralsei-discord-icon-2.webp";
const reloadImageButtonIcon = `<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C16.3556 22 20.0584 19.2159 21.4307 15.3332C21.6148 14.8125 21.3418 14.2412 20.8211 14.0572C20.3004 13.8731 19.7291 14.146 19.545 14.6668C18.4463 17.7753 15.4817 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C13.5516 4 14.8662 4.56117 16.1162 5.4406C16.9569 6.03212 17.7348 6.74106 18.5242 7.5H15.5C14.9477 7.5 14.5 7.94772 14.5 8.5C14.5 9.05228 14.9477 9.5 15.5 9.5H21C21.5523 9.5 22 9.05228 22 8.5V3C22 2.44772 21.5523 2 21 2C20.4477 2 20 2.44772 20 3V6.14371C19.1517 5.32583 18.2456 4.49337 17.267 3.80489C15.7949 2.76916 14.0847 2 12 2Z" fill="#ffffff"/></svg>` // https://www.svgrepo.com/collection/wolf-kit-rounded-line-icons/ 
// "https://wallebot.com/ralsei/assets/icons/refresh.webp";
const closeButtonIcon = `<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.70711 3.29289C4.31658 2.90237 3.68342 2.90237 3.29289 3.29289C2.90237 3.68342 2.90237 4.31658 3.29289 4.70711L10.5858 12L3.29289 19.2929C2.90237 19.6834 2.90237 20.3166 3.29289 20.7071C3.68342 21.0976 4.31658 21.0976 4.70711 20.7071L12 13.4142L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L13.4142 12L20.7071 4.70711C21.0976 4.31658 21.0976 3.68342 20.7071 3.29289C20.3166 2.90237 19.6834 2.90237 19.2929 3.29289L12 10.5858L4.70711 3.29289Z" fill="#ffffff"/></svg>` // https://www.svgrepo.com/collection/wolf-kit-rounded-line-icons/
// "https://wallebot.com/ralsei/assets/icons/close.webp";
// const bufferImage = "https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif";
const spinnyBoy = "https://wallebot.com/ralsei/assets/images/spin.webp";

let filterButtonState1 = true;
let filterButtonState2 = true;
let msgSendDelayActive = false;
let delayActive = false;
let movement;

function addButton(){
  if (document.getElementById("ralseiBtn") != undefined) return;
  const buttonsPannel = document.querySelector("div.buttons_d0696b");            // Needs to be updated regularly
  const stickerButton = document.querySelectorAll(".buttonContainer_d0696b")[1]; //

  if (buttonsPannel == undefined) throw "ERROR: Unable to find button parent object!";
  
  const openMenuButton = document.createElement("button");
  openMenuButton.id = "ralseiBtn";
  openMenuButton.classList.add('RalseiSender-button-openmenu');
  openMenuButton.addEventListener("click", () => {openRalseiMenu()});
  openMenuButton.addEventListener("mouseover", () => {buttonImg.src = buttonIcon2});
  openMenuButton.addEventListener("mouseout", () => {if(document.getElementById("ralseiMenu") == undefined) buttonImg.src = buttonIcon1});

  const buttonImg = document.createElement("img");
  buttonImg.id = "ralseiBtn_Img"
  buttonImg.src = buttonIcon1;

  buttonsPannel.append(openMenuButton);
  if (stickerButton != undefined) stickerButton.after(openMenuButton);
  openMenuButton.append(buttonImg);
}

function removeButton(){
  const openMenuButton = document.getElementById("ralseiBtn");
  if (openMenuButton != undefined) openMenuButton.remove();
}

function openRalseiMenu(){  
  if (document.getElementById("ralseiMenu") != undefined) {
    closeRalseiMenu();
    return;
  }

  const chatContainer = document.querySelector("main.chatContent_a7d72e"); // Needs to be updated regularly

  const menu = document.createElement("div");
  menu.id = "ralseiMenu"
  menu.classList.add('RalseiSender-menu');
  
  const buttonImg = document.getElementById("ralseiBtn_Img");
  buttonImg.src = buttonIcon2;

  chatContainer.append(menu);
  loadImage();
}

function closeRalseiMenu(){
  const menu = document.getElementById("ralseiMenu");

  const openMenuButton = document.getElementById("ralseiBtn");
  const buttonImg = document.getElementById("ralseiBtn_Img");
  if (!openMenuButton.matches(':hover')) buttonImg.src = buttonIcon1; 

  if (menu != undefined) menu.remove();
}

function showLoadingText(){
  const loadingDivParent = document.getElementById('ralseiImgContainer');
  if (loadingDivParent == undefined) return;

  const loadingDiv = document.createElement('div');
  loadingDiv.id = "ralseiLoading";
  loadingDiv.classList.add('RalseiSender-loading');
  loadingDivParent.append(loadingDiv);

  let loadingText = "Loading...";
  loadingTextArray = loadingText.split("");

  let counter = 0;
  let previosElement;
  let letterPosX = 0;
  loadingTextArray.forEach(loadingTextChar => {
      const loadingTextCharElement = document.createElement('span');
      loadingTextCharElement.id = "ralseiLoading_letter_" + (counter + 1);
      loadingTextCharElement.classList.add('RalseiSender-loading-letter');
      loadingTextCharElement.innerHTML = loadingTextChar;
      loadingTextCharElement.style.animationDelay = "0." + counter + "s";
      
      if (counter > 0) previosElement = document.getElementById("ralseiLoading_letter_" + counter);

      if (counter > 0) {
        letterPosX += previosElement.getBoundingClientRect().width;
        loadingTextCharElement.style.left = letterPosX + "px";
      }
      else loadingTextCharElement.style.left = "0px";

      counter += 1;

      loadingDiv.append(loadingTextCharElement);
      if (counter == 1) previosElement = loadingTextCharElement;
  });

  loadingDiv.style.width = (letterPosX + previosElement.getBoundingClientRect().width) + "px";

  previosElement.addEventListener("animationend", () => {
    const loadingTextCharElements = document.getElementsByClassName('RalseiSender-loading-letter');
    for(let i = 0; i < loadingTextCharElements.length; i++){
      loadingTextCharElements[i].style.animationName = "none";
      setTimeout(() => {loadingTextCharElements[i].style.animationName = "RalseiSender-loading-letter";}, 100);
    }
  });
}

function hideLoadingText(){
  const loadingDiv = document.getElementById("ralseiLoading");
  if (loadingDiv == undefined) return;

  loadingDiv.remove();
}

function loadImage(){
  const menu = document.getElementById("ralseiMenu"); 
  if (menu == undefined) return writeToConsole("RalseiSender: ERROR! No menu element found!");

  const navButtonContainer = document.createElement("div");
  navButtonContainer.classList.add('RalseiSender-navbuttoncontainer');

  const reloadImageButton = document.createElement("button");
  reloadImageButton.classList.add('RalseiSender-button-reloadimage');
  reloadImageButton.addEventListener("click", () => {reloadImage()});
  reloadImageButton.innerHTML = reloadImageButtonIcon; //`<img src='${reloadImageButtonIcon}' style='width: 22px; height: 22px;'>`;

  if (!filterButtonState1 && !filterButtonState2) { 
    filterButtonState1 = true; 
    filterButtonState2 = true; 
  } 

  const filterButton1 = document.createElement("button");
  filterButton1.id = "ralseiFilterBtn1";
  filterButton1.classList.add('RalseiSender-button-filter');
  filterButton1.addEventListener("click", () => {changeFilterState(1)});
  filterButton1.innerHTML = `Images`;
  filterButton1.style.marginLeft = "7px";

  const filterButton2 = document.createElement("button");
  filterButton2.id = "ralseiFilterBtn2";
  filterButton2.classList.add('RalseiSender-button-filter');
  filterButton2.addEventListener("click", () => {changeFilterState(2)});
  filterButton2.innerHTML = `Gifs`;

  if (!filterButtonState1) filterButton1.style.opacity = "0.5";
  else filterButton1.style.opacity = "1";
  if (!filterButtonState2) filterButton2.style.opacity = "0.5";
  else filterButton2.style.opacity = "1";

  const closeButton = document.createElement("button");
  closeButton.classList.add('RalseiSender-button-closemenu')
  closeButton.addEventListener("click", () => {closeRalseiMenu()});
  closeButton.innerHTML = closeButtonIcon;

  menu.append(navButtonContainer);
  navButtonContainer.append(reloadImageButton);
  navButtonContainer.append(filterButton1);
  navButtonContainer.append(filterButton2);
  navButtonContainer.append(closeButton);

  const imageContainer = document.createElement("div");
  imageContainer.id = 'ralseiImgContainer';
  imageContainer.classList.add('RalseiSender-imagecontainer');

  const img = document.createElement("img");
  img.id = "ralseiImg";
  img.classList.add('RalseiSender-imagecontainer-hover');
  img.addEventListener("click", () => {sendImage()});
  img.addEventListener("contextmenu", () => {
    if (document.getElementById('ralseiLoading') == undefined) {
      DiscordNative.clipboard.copy(img.src);
      BdApi.UI.showToast("Copied image URL to clipboard.");
    }
  })
  img.addEventListener('load', hideLoadingText)

  menu.append(imageContainer);
  imageContainer.append(img);
  showLoadingText();

  fetchURL((url) => {
    img.src = url;
    img.alt = url.substr(url.lastIndexOf("/") + 1);
    if (img.src != spinnyBoy) img.style.backgroundColor = '#2f2f2f'
  })
}

function reloadImage(){
  if (delayActive) return;
  else {
    delayActive = true;
    setTimeout(() => {
      delayActive = false;
    }, 1000);
  }

  const img = document.getElementById("ralseiImg");
  if (img == undefined) return;

  img.src = undefined;
  img.style.visibility = "hidden";
  hideLoadingText();
  showLoadingText();

  fetchURL((url) => {
    img.style.visibility = "visible";
    
    img.src = url;
    img.alt = url.substr(url.lastIndexOf("/") + 1);
    if (img.src != spinnyBoy) img.style.backgroundColor = '#2f2f2f';
  })
}

function changeFilterState(num){
  switch (num){
    case 1:
      const filterButton1 = document.getElementById("ralseiFilterBtn1");
      filterButtonState1 = !filterButtonState1;
      if (!filterButtonState1) filterButton1.style.opacity = "0.5";
      else filterButton1.style.opacity = "1";
      break;

    case 2:
      const filterButton2 = document.getElementById("ralseiFilterBtn2");
      filterButtonState2 = !filterButtonState2;
      if (!filterButtonState2) filterButton2.style.opacity = "0.5";
      else filterButton2.style.opacity = "1";
      break;

    default:
      return;
  }
}

function sendImage(){
  const img = document.getElementById("ralseiImg");
  if (img == undefined) return;

  const msg = img.src;

  if (msg == spinnyBoy) addChaos();
  if(document.getElementById('ralseiLoading') != undefined || msg == spinnyBoy || msg == "" || msg == undefined) return;

  sendMessage(msg);
  writeToConsole(`RalseiSender: Message sent: '${msg}'`);
}

function fetchURL(callback){
  let filterExclusionsExtra = "";
  if (filterButtonState1) filterExclusionsExtra = "+" + filterExclusions1;
  if (filterButtonState2) filterExclusionsExtra = "+" + filterExclusions2;
  if (filterButtonState1 && filterButtonState2) filterExclusionsExtra = "";
  if (!filterButtonState1 && !filterButtonState2){
    const img = document.getElementById('ralseiImg');
    if (img == undefined) return;
    img.classList.remove('RalseiSender-imagecontainer-hover');
    img.style.backgroundColor = '#1f1f1f';
    hideLoadingText();

    return callback(spinnyBoy);
  }

  const params = `?filter-type=2&filter=${filterExclusionsDefault + filterExclusionsExtra}`;
  const url = apiPHPFileLocation + params;

  writeToConsole(`RalseiSender: Fetching data from '${url}'...`);
  fetch(url)
  .then(response => response.json())
  .then(jsonData => {
      if (!jsonData[0]) return;
      writeToConsole(`RalseiSender: Response data from '${url}': ${jsonData}`);

      const msg = "https://" + webLocationRootDir + jsonData[0].substr(1).replaceAll(" ", "%20"); 

      return callback(msg);
  });
}

function sendMessage(msgContent){
  if (msgSendDelayActive) return;
  else {
    msgSendDelayActive = true;
    setTimeout(() => {
      msgSendDelayActive = false;
    }, 2000);
  }

  if (msgContent == "" || msgContent == undefined) return;

  // const channelId = BdApi.findModuleByProps("getChannelId").getChannelId(); // Outdated
  const channelId = BdApi.Webpack.getStore("SelectedChannelStore").getChannelId();
  BdApi.findModuleByProps("sendMessage", "sendBotMessage").sendMessage(channelId,{content:msgContent, mobile_network_type:"unknown", tts:false, flags:0})
}

function writeToConsole(message, textStyle = "color: #00ff00"){
  console.log(`%c${message}`, textStyle);
}

function addChaos(){
  const img = document.getElementById("ralseiImg");
  if (img == undefined) return;

  const bouncyBoy = document.createElement("img");
  bouncyBoy.id = "spinnyBoyImg";
  bouncyBoy.classList.add('RalseiSender-bouncyboy');
  bouncyBoy.src = spinnyBoy;
  bouncyBoy.style.left = img.getBoundingClientRect().left + "px";
  bouncyBoy.style.top = img.getBoundingClientRect().top + "px";

  const scrn = document.querySelector("#app-mount");
  let vWidth = scrn.clientWidth;
  let vHeight = scrn.clientHeight;
  let goingLeft = false;
  let goingUp = false;
  const stepSize = 2;

  const randDirectionInt = Math.floor(Math.random() * 4 + 1);
  switch (randDirectionInt){
    case 1:
      goingLeft = false;
      goingUp = false;
      break;
    case 2:
      goingLeft = true;
      goingUp = false;
      break;
    case 3:
      goingLeft = false;
      goingUp = true;
      break;
    case 4:
      goingLeft = true;
      goingUp = true;
      break;
    default:
      goingLeft = false;
      goingUp = false;
      break;
  }

  function startMovement(){ 
    const oldBoy = document.getElementById("spinnyBoyImg");
    if (oldBoy != undefined) document.body.removeChild(oldBoy);
    document.body.append(bouncyBoy);

    img.remove();

    clearInterval(movement);
    movement = setInterval(step, 10);

    function step(){
      if (!goingUp){
        if (!goingLeft)
            move(false, false);
        else 
            move(true, false);
      }
      else{
        if (!goingLeft)
            move(false, true);
        else 
            move(true, true);
      }

      let x = parseInt(bouncyBoy.style.left);
      let y = parseInt(bouncyBoy.style.top);

      if (x >= vWidth - bouncyBoy.width) 
        goingLeft = true;
      if (x <= 0) 
        goingLeft = false;
      if (y >= vHeight - bouncyBoy.height) 
        goingUp = true;
      if (y <= 0) 
        goingUp = false;
    }
  }

  function move(left, up){
    let x = parseInt(bouncyBoy.style.left);
    let y = parseInt(bouncyBoy.style.top);

    if (!left) bouncyBoy.style.left = `${x + stepSize}px`;
    else bouncyBoy.style.left = `${x - stepSize}px`;
    if (!up) bouncyBoy.style.top = `${y + stepSize}px`;
    else bouncyBoy.style.top = `${y - stepSize}px`;
  }

  function reset(){
    bouncyBoy.style.left = "0px";
    bouncyBoy.style.top = "0px";
    goingLeft = false;
    goingUp = false;
  }

  function recalcArea(){
    vWidth = scrn.clientWidth;
    vHeight = scrn.clientHeight;

    let x = parseInt(bouncyBoy.style.left);
    let y = parseInt(bouncyBoy.style.top);

    if (x >= vWidth - x) 
      reset();
    if (x <= 0) 
      reset();
    if (y >= vHeight - y) 
      reset();
    if (y <= 0) 
      reset();
  }

  window.onresize = recalcArea;

  setTimeout(() => {
    writeToConsole("CHAOS! CHAOS!", "font-size: 3rem;");
    startMovement();
  }, 100);
} 

function removeChaos(){
  clearInterval(movement);
  const oldBoy = document.getElementById("spinnyBoyImg");
  if (oldBoy != undefined) document.body.removeChild(oldBoy);
}

const ralseiSenderStyle = `
.RalseiSender-button-openmenu {
  height: 100%;
  
  background-color: rgb(0, 0, 0, 0);
  color: white;
}

.RalseiSender-button-openmenu img {
  width: 20px;
  height: 20px;
  margin-top: 4px;
}

.RalseiSender-menu {
  height: 350px;
  width: 300px;
  padding: 5px;
  border: 1px solid #1f1f1f;
  border-radius: 5px 5px 5px 5px;
  position: absolute;
  right: 35px;
  bottom: 80px;
  z-index: 100;
  
  background-color: #1f1f1f;
  color: white;
}

.RalseiSender-navbuttoncontainer {
  width: 100%;
  height: 24px;
  border-bottom: 1px solid #2f2f2f;
  margin-bottom: 5px;
}

.RalseiSender-button-reloadimage {
  height: 22px;
  padding: 0px;
  border: 1px solid #1f1f1f;
  border-radius: 50%;
  margin: 0px;
  float: left;
  
  background-color: #1f1f1f;
  opacity: 0.75;
}

.RalseiSender-button-filter {
  height: 22px;
  padding: 0px;
  padding-left: 5px;
  padding-right: 5px;
  border: 0px;
  border-radius: 5px;
  margin: 0px;
  margin-left: 7px;
  margin-right: 2px;
  float: left;
  
  color: white;
  background-color: #1f1f1f;
}

.RalseiSender-button-closemenu {
  height: 22px;
  padding: 0px;
  border: 0px;
  border-radius: 50%;
  margin: 0px;
  float: right;
  
  background-color: #1f1f1f;
  opacity: 0.75;
}

.RalseiSender-imagecontainer {
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.RalseiSender-imagecontainer img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid #1f1f1f; 
  border-radius: 5px;
  
  color: white;
  cursor: pointer;

  transition-duration: 0.1s;
}

.RalseiSender-loading{
  height: 2.5rem;
  width: auto;
  position: absolute;
}

.RalseiSender-loading-letter{
  position: absolute;

  font-size: 2.5rem;
  text-shadow: 0 0 5px #000000;

  animation-name: RalseiSender-loading-letter;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;

  --move-distance-up: -20px;
  --move-distance-down: 20px;
}

.RalseiSender-bouncyboy {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  z-index: 666;
  position: absolute;
  pointer-events: none;
}

@keyframes RalseiSender-loading-letter {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(var(--move-distance-up));
  }
  75% {
    transform: translateY(var(--move-distance-down));
  }
  100% {
    transform: translateY(0px);
  }
}

.RalseiSender-button-reloadimage:hover {
  background-color: #2f2f2f;
  opacity: 1;
}

.RalseiSender-button-filter:hover {
  background-color: #2f2f2f;
}

.RalseiSender-button-closemenu:hover {
  background-color: #2f2f2f;
  opacity: 1;
}

.RalseiSender-imagecontainer-hover:hover {
  border: 2px solid #5865F2;
  
  transition-duration: 0.1s;
}
`;