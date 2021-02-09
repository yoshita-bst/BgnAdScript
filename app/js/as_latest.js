/*
   1. Send an impression on page load and ad click as of now.
   2. Render ads on document's readystate. Make APi calls one by one.
   3. Send all the tracking parameters in all the api calls.
   4. Handle Ad rendering for multiple ads in single page. (make use of a for loop)
   5. Handling for corrupt image.
*/

/* 
   Fetches window.location.search
   and returns an object of corresponding key value pairs
*/

let version = "1.1.0";

console.log("version:", version);

getUrlParams();

let CONSTS = {
  icons: {
    i_icon:
      "aHR0cHM6Ly9jZG4tYmdwLmJsdWVzdGFja3MuY29tL2JncC9CR1BfU25pcHBldF9Db2RlL2ljb25zL2lfaWNvbi5wbmc=",
    cross_icon:
      "aHR0cHM6Ly9jZG4tYmdwLmJsdWVzdGFja3MuY29tL2JncC9CR1BfU25pcHBldF9Db2RlL2ljb25zL2Nyb3NzX2ljb24ucG5n",
    bgn_icon:
      "aHR0cDovL2Nkbi1iZ3AuYmx1ZXN0YWNrcy5jb20vYmdwL0JHUF9TbmlwcGV0X0NvZGUvaWNvbnMvYmduLnBuZw==",
    back_icon:
      "aHR0cDovL2Nkbi1iZ3AuYmx1ZXN0YWNrcy5jb20vYmdwL0JHUF9TbmlwcGV0X0NvZGUvaWNvbnMvQmFjay5wbmc=",
  },
  apis: {
    prod_host: "aHR0cHM6Ly9iZ24uZ2c=",
    engg_host:
      "aHR0cHM6Ly9iZ24tMS1kb3QtYmx1ZXN0YWNrcy1jbG91ZC1xYS5hcHBzcG90LmNvbQ==",
  },
  json: {
    engg_strings:
      "aHR0cHM6Ly9kOHlxdjZqaTE5NWxmLmNsb3VkZnJvbnQubmV0L2VuZ2cvc3RyaW5ncy5qc29u",
    prod_strings:
      "aHR0cHM6Ly9kOHlxdjZqaTE5NWxmLmNsb3VkZnJvbnQubmV0L3Byb2Qvc3RyaW5ncy5qc29u",
  },
};

function getLangString(str) {
  let allStrings = window.ad_strings;
  let lang = window.ad_strings.locale;
  let langStrings = lang ? allStrings[lang] : allStrings["en"];
  return langStrings ? langStrings[str] : allStrings["en"][str];
}

function getHost() {
  let HOST = atob(CONSTS.apis.prod_host);
  let env = window.location.href;
  window.ads_env = "prod";
  if (
    env.includes(atob("L2FmcjJiL2VuZ2cv")) ||
    env.includes(atob("L2FmcjJiL3FhLw==")) ||
    env.includes(atob("MTI3LjAuMC4x")) ||
    env.includes(atob("aHR0cHM6Ly95b3NoaXRhLWJzdC5naXRodWIuaW8v"))
  ) {
    logger("inside if of get host");
    HOST = atob(CONSTS.apis.engg_host);
    window.ads_env = "engg";
  }
  return HOST;
}

function getUrlParams() {
  window.urlParams = {};
  return window.location.search
    .slice(1)
    .split("&")
    .forEach((it) => {
      window.urlParams[it.split("=")[0]] = it.split("=")[1];
    });
}

function logger() {
  let string = arguments[0];
  let params = [...arguments].slice(1);
  window.urlParams.bgnLogs === "true" && console.log(string, ...params);
}

function getEd(adDiv, adData, type) {
  let w = adDiv.style.width.split("px")[0];
  let h = adDiv.style.height.split("px")[0];
  let sid = adDiv.getAttribute("data-bgn-as-slot");
  let ed = {
    w,
    h,
    sid: sid,
  };
  if (adData) {
    ed.p = adData.p;
    ed.u = adData.u;
    ed.c = encodeURIComponent(adData.c);
    ed.i = adData.i;
    ed.a = adData.a;
  }
  if (type) {
    ed.cta = "t";
  } else {
    ed.cta = "f";
  }
  return ed;
}

function apiCall(adDiv, url, successHandler, failureHandler, ev, ns, adData) {
  let ed = getEd(adDiv, adData);
  if (ns) {
    ed.ns = ns;
  }
  let params = getUrlFromParams();
  params = `${params}&ed=${encodeURIComponent(JSON.stringify(ed))}`;
  if (ev) {
    params = params + `&ev=${ev}`;
  }
  fetch(`${getHost()}/${url}?${params}`, {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      let contentType = res.headers.get("content-type");
      if (contentType.indexOf("application/json") !== -1) {
        return res.json();
      } else {
        return res.text();
      }
    })
    .then((data) => {
      successHandler(data);
    })
    .catch((err) => {
      failureHandler(err);
    });
}

/*
    Fetches all the ads through and API call
*/
function getAds() {
  let adDiv = document.getElementsByClassName("asbybgn");
  logger("inside GET Ads");
  for (let i = 0; i < adDiv.length; i++) {
    let ed = getEd(adDiv[i]);
    let params = getUrlFromParams();
    params = `${params}&ed=${encodeURIComponent(JSON.stringify(ed))}`;
    logger("Ads call PARAMS", params);
    apiCall(
      adDiv[i],
      "as/c",
      (data) => {
        logger("GET Ads SUCCESS:", data);
        loadAd(data, adDiv[i]);
        adDiv[i].style.cursor = "pointer";
        adDiv[i].onclick = function (e) {
          clickAdDiv(adDiv[i], data);
        };
      },
      (err) => {
        logger("GET Ads FAILURE:", err);
      }
    );
  }
}

function clickAdDiv(adDiv, data, type) {
  let ed = getEd(adDiv, data, type);
  params = getUrlFromParams();
  params = `${params}&ed=${encodeURIComponent(JSON.stringify(ed))}`;
  logger("Ad click PARAMS:", params);
  window.open(data.c);
  sendImpression("ac", params);
}

/* Adds styling to the 'Ad' text of the ad unit */
function styleAdButton(adButton) {
  adButton.style.background = "#EEBA00";
  adButton.style.color = "#171717";
  adButton.style.height = "20px";
  adButton.style.fontSize = "10px";
  adButton.style.fontFamily = "Arial, sans-serif";
  adButton.style.position = "absolute";
  adButton.style.display = "flex";
  adButton.style.alignItems = "center";
  adButton.style.justifyContent = "center";
  adButton.style.cursor = "default";
  adButton.style.top = "0px";
  adButton.style.left = "0px";
  adButton.style.padding = "0px 5px";
}

/* Adds styling to the 'i' image of the add unit */
function styleiImage(iImage, data) {
  iImage.style.background = "black";
  iImage.style.width = "16px";
  iImage.style.height = "16px";
  iImage.style.position = "absolute";
  iImage.style.borderRadius = "unset";
  iImage.style.top = "3px";
  if (data.a !== "default") {
    iImage.style.right = "23px";
  } else {
    iImage.style.right = "4px";
  }
  iImage.style.cursor = "default";
}

function stylexImage(xImage) {
  xImage.style.background = "black";
  xImage.style.borderRadius = "unset";
  xImage.style.width = "16px";
  xImage.style.height = "16px";
  xImage.style.position = "absolute";
  xImage.style.top = "3px";
  xImage.style.right = "4px";
  xImage.style.cursor = "pointer";
}

/* adds styling to the div that appears on hover of the 'i' image of ad unit */
function styleHoverDiv(hoverDiv, data) {
  hoverDiv.style.background = "white";
  hoverDiv.style.color = "#0082E5";
  hoverDiv.style.fontSize = "9.5px";
  hoverDiv.style.fontFamily = "Arial, sans-serif";
  hoverDiv.style.position = "absolute";
  hoverDiv.style.display = "flex";
  hoverDiv.style.alignItems = "center";
  hoverDiv.style.justifyContent = "center";
  hoverDiv.style.top = "3px";
  if (data.a !== "default") {
    hoverDiv.style.right = "43px";
  } else {
    hoverDiv.style.right = "22px";
  }
  hoverDiv.style.visibility = "hidden";
  hoverDiv.style.padding = "0px 7px";
  hoverDiv.style.height = "16px";
}

function addAdButton(adDiv, adData) {
  let adButton = document.createElement("div");
  adButton.setAttribute("id", `ad-text-${adData.i}`);
  styleAdButton(adButton);
  let textNode = document.createTextNode(getLangString("ad_text"));
  adButton.appendChild(textNode);
  adButton.onclick = function (e) {
    e.stopPropagation();
  };
  adDiv.appendChild(adButton);
  return adButton;
}

function addiIconAndHoverDiv(adDiv, data) {
  let iImage = document.createElement("img");
  styleiImage(iImage, data);
  iImage.src = atob(CONSTS.icons.i_icon);
  adDiv.appendChild(iImage);
  let hoverDiv = document.createElement("div");
  let uniqueId = getRandomNumber();
  hoverDiv.id = uniqueId;
  styleHoverDiv(hoverDiv, data);
  hoverDiv.innerHTML = getLangString("hover_text");
  iImage.onclick = function (e) {
    e.stopPropagation();
  };
  iImage.onmouseover = function (e) {
    hoverDiv.style.visibility = "visible";
  };
  iImage.onmouseout = function (e) {
    hoverDiv.style.visibility = "hidden";
  };
  adDiv.appendChild(hoverDiv);
  return iImage;
}

function styleContainer(container, adDiv) {
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.border = "1px solid #DDDDDD";
  container.style.justifyContent = "center";
  container.style.flexDirection =
    adDiv.style.width === "300px" ? "column" : "row";
  container.style.fontSize = "24px";
  container.style.fontFamily = "Arial, sans-serif";
  container.style.color = "#4E4E4E";
  container.style.width = adDiv.style.width;
  container.style.height = adDiv.style.height;
  container.style.background = "rgb(250, 250, 250)";
  container.style.cursor = "default";
}

function styleHeadingText(heading, adDiv) {
  heading.style.display = "flex";
  heading.style.alignItems = "center";
  heading.style.justifyContent = "center";
  heading.style.fontFamily = "Arial, sans-serif";
  heading.style.fontSize = adDiv.style.width === "320px" ? "14px" : "inherit";
}

function styleStopAdButton(button, adDiv) {
  button.style.background = "#0082E5";
  button.style.borderRadius = "5px";
  button.style.color = "white";
  button.style.cursor = "pointer";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.textAlign = "center";
  button.style.fontFamily = "Arial, sans-serif";
  if (adDiv.style.width === "320px") {
    // button.style.maxWidth = "115px";
    button.style.overflowWrap = "break-word";
    button.style.padding = "8px";
  } else {
    button.style.padding = "12px";
  }
  if (adDiv.style.width === "320px" || getDeviceType() === "m") {
    button.style.fontSize = "10px";
  } else {
    button.style.fontSize = "14px";
  }
  button.style.marginTop = adDiv.style.width === "300px" ? "14px" : "0";
  button.style.marginLeft =
    adDiv.style.width === "300px"
      ? "0"
      : adDiv.style.width === "320px"
      ? "10px"
      : "28px";
  button.style.marginRight = adDiv.style.width === "320px" ? "-25px" : "0";
}

function styleBgnImage(bgnImage, adDiv) {
  bgnImage.style.marginRight = adDiv.style.width === "320px" ? "6px" : "9px";
  bgnImage.style.borderRadius = "unset";
}

function addHeadingText(adDiv, adData) {
  let container = document.createElement("div");
  styleContainer(container, adDiv);
  let heading = document.createElement("div");
  heading.setAttribute("id", `ad-heading-${adData.i}`);
  styleHeadingText(heading, adDiv);
  let textNode = document.createTextNode(getLangString("title"));
  let p = document.createElement("p");
  p.style.margin = "0";
  p.appendChild(textNode);
  let bgnImage = document.createElement("img");
  styleBgnImage(bgnImage, adDiv);
  bgnImage.src = atob(CONSTS.icons.bgn_icon);
  heading.appendChild(bgnImage);
  heading.appendChild(p);
  container.appendChild(heading);
  addStopButton(container, adData, adDiv);
  adDiv.appendChild(container);
  return container;
}

function styleConfirmationText(textContainer) {
  if (getDeviceType() === "m") {
    textContainer.style.fontSize = "14px";
  } else {
    textContainer.style.fontSize = "20px";
  }
  textContainer.style.color = "#4E4E4E";
  textContainer.style.fontWeight = "bold";
  textContainer.style.display = "flex";
  textContainer.style.alignItems = "center";
  textContainer.style.justifyContent = "center";
  textContainer.style.fontFamily = "Arial, sans-serif";
  textContainer.style.opacity = "1";
  textContainer.style["-webkit-transition"] = "opacity 1500ms ease 1.5s";
  textContainer.style["-moz-transition"] = "opacity 1500ms ease 1.5s";
  textContainer.style["-o-transition"] = "opacity 1500ms ease 1.5s";
  textContainer.style["transition"] = "opacity 1500ms ease 1.5s";
  textContainer.style.willChange = "opacity";
  textContainer.style.padding = "10px";
  textContainer.style.textAlign = "center";
}

function addConfirmationText(choicesContainer, headingDiv, text, bgnImg) {
  choicesContainer.remove();
  let textContainer = document.createElement("div");
  styleConfirmationText(textContainer);
  let textNode = document.createTextNode(`${text}`);
  textContainer.appendChild(textNode);
  if (bgnImg) {
    let bgnImage = document.createElement("img");
    bgnImage.src = atob(CONSTS.icons.bgn_icon);
    bgnImage.style.marginLeft = "8px";
    textContainer.appendChild(bgnImage);
  }
  headingDiv.appendChild(textContainer);
  return textContainer;
}

function styleChoicesContainer(choicesContainer, adDiv) {
  choicesContainer.style.display = "flex";
  adDiv.style.width === "300px" && (choicesContainer.style.height = "132px");
  choicesContainer.style.width =
    adDiv.style.width === "300px"
      ? "273px"
      : adDiv.style.width === "728px"
      ? "600px"
      : "";
  choicesContainer.style.flexFlow =
    adDiv.style.width === "300px"
      ? "wrap"
      : adDiv.style.width === "728px"
      ? "wrap"
      : "";
  choicesContainer.style.alignItems = "center";
  choicesContainer.style.justifyContent = "space-between";
  adDiv.style.width === "300px" && (choicesContainer.style.marginTop = "18px");
  adDiv.style.width === "728px" && (choicesContainer.style.marginLeft = "18px");
  choicesContainer.style.overflow = "hidden";
}

function styleChoice(choice, adDiv) {
  choice.style.display = "flex";
  choice.style.alignItems = "center";
  choice.style.justifyContent = "center";
  choice.style.color = "#414141";
  choice.style.fontFamily = "Arial, sans-serif";
  choice.style.fontSize = adDiv.style.width === "320px" ? "10px" : "11px";
  choice.style.width = "132px";
  choice.style.height = adDiv.style.width === "320px" ? "50px" : "58px";
  choice.style.border = "1px solid #D3D3D3";
  choice.style.textAlign = "center";
}

function addChoices(choicesContainer, adData, adDiv, headingDiv) {
  let choices = [
    {
      id: `ad-choice-1-${adData.i}`,
      text: getLangString("choice_1"),
      ns: "1A",
    },
    {
      id: `ad-choice-2-${adData.i}`,
      text: getLangString("choice_2"),
      ns: "2A",
    },
    {
      id: `ad-choice-3-${adData.i}`,
      text: getLangString("choice_3"),
      ns: "3A",
    },
    {
      id: `ad-choice-4-${adData.i}`,
      text: getLangString("choice_4"),
      ns: "4A",
    },
  ];

  choices.forEach((ch) => {
    let choice = document.createElement("div");
    choice.setAttribute("id", ch.id);
    styleChoice(choice, adDiv);
    let choiceText = document.createTextNode(ch.text);
    choice.appendChild(choiceText);
    choice.onclick = function (e) {
      adDiv.style.width === "300px" &&
        document.getElementById(`ad-heading-${adData.i}`).remove();
      let textContainer = addConfirmationText(
        choicesContainer,
        headingDiv,
        getLangString("confirmation_text")
      );
      if (getBrowser() !== "Mozilla Firefox") {
        window.requestAnimationFrame(() => {
          textContainer.style.opacity = "0";
        });
      }
      logger("clicked");
      setTimeout(() => {
        textContainer.remove();
        addConfirmationText(
          choicesContainer,
          headingDiv,
          getLangString("closing_text"),
          false
        );
      }, 3000);
      apiCall(
        adDiv,
        "as/f",
        (res) => {
          logger("click api SUCCESS", ch.ns, ch.text);
          logger("res:::", res);
        },
        (err) => {
          logger("click api ERROR", err);
        },
        "nr",
        ch.ns,
        adData
      );
    };
    choice.onmouseover = function (e) {
      choice.style.color = "#0082E5";
      choice.style.border = "1px solid #0082E5";
      choice.style.cursor = "pointer";
    };
    choice.onmouseout = function (e) {
      choice.style.color = "#4E4E4E";
      choice.style.border = "1px solid rgb(211, 211, 211)";
    };
    choicesContainer.appendChild(choice);
  });
}

function addChoiceDivs(headingDiv, adData, adDiv) {
  let choicesContainer = document.createElement("div");
  choicesContainer.setAttribute("id", `ad-choice-container-${adData.i}`);
  styleChoicesContainer(choicesContainer, adDiv);
  addChoices(choicesContainer, adData, adDiv, headingDiv);
  headingDiv.appendChild(choicesContainer);
}

function addStopButton(headingDiv, adData, adDiv) {
  let button = document.createElement("div");
  styleStopAdButton(button, adDiv);
  let textNode = document.createTextNode(getLangString("button_text"));
  button.appendChild(textNode);
  button.onclick = function (e) {
    apiCall(
      adDiv,
      "as/f",
      (res) => {
        logger("click api SUCCESS");
        logger("res:::", res);
      },
      (err) => {
        logger("click api ERROR", err);
      },
      "na",
      undefined,
      adData
    );
    button.remove();
    document.getElementById(`ad-back-button-${adData.i}`).remove();
    adDiv.style.width !== "300px" &&
      document.getElementById(`ad-heading-${adData.i}`).remove();
    addChoiceDivs(headingDiv, adData, adDiv);
  };
  headingDiv.appendChild(button);
}

function styleBackButton(button, adDiv) {
  button.style.width = "22px";
  button.style.height = "18px";
  button.style.position = "absolute";
  button.style.top = adDiv.style.width === "320px" ? "18px" : "12px";
  button.style.left = adDiv.style.width === "320px" ? "8px" : "13px";
}

function addBackButton(
  adDiv,
  iImage,
  adButton,
  xImage,
  container,
  adData,
  playNowButton
) {
  let backButton = document.createElement("img");
  backButton.setAttribute("id", `ad-back-button-${adData.i}`);
  styleBackButton(backButton, adDiv);
  backButton.src = atob(CONSTS.icons.back_icon);
  backButton.onclick = function (e) {
    playNowButton.style.display = "flex";
    backButton.remove();
    iImage.style.visibility = "visible";
    adButton.style.display = "flex";
    xImage.style.visibility = "visible";
    container.remove();
    adDiv.style.backgroundImage = `url('${adData.u}')`;
    adDiv.onclick = function (e) {
      clickAdDiv(adDiv, adData);
    };
    e.stopPropagation();
  };
  adDiv.appendChild(backButton);
}

function addCrossIcon(adDiv, iImage, adButton, adData, playNowButton) {
  let xImage = document.createElement("img");
  stylexImage(xImage);
  xImage.src = atob(CONSTS.icons.cross_icon);
  xImage.onclick = function (e) {
    e.stopPropagation();
    adDiv.style.background = "transparent";
    iImage.style.visibility = "hidden";
    adButton.style.display = "none";
    xImage.style.visibility = "hidden";
    playNowButton.style.display = "none";
    adDiv.onclick = function (e) {
      return;
    };
    let container = addHeadingText(adDiv, adData);
    addBackButton(
      adDiv,
      iImage,
      adButton,
      xImage,
      container,
      adData,
      playNowButton
    );
  };
  adDiv.appendChild(xImage);
}

function stylePlayNowButton(button, adDiv) {
  button.style.display = "flex";
  button.style.justifyContent = "center";
  button.style.alignItems = "center";
  button.style.background = "linear-gradient(#F5F096, #B99731)";
  button.style.padding = adDiv.style.width === "300px" ? "10px" : "5px 10px";
  button.style.fontFamily = "Arial, Sans-serif";
  button.style.fontWeight = "bold";
  button.style.color = "black";
  button.style.minWidth =
    adDiv.style.height === "250px"
      ? "109px"
      : adDiv.style.height === "600px"
      ? "214px"
      : adDiv.style.height === "50px"
      ? "62px"
      : "133px";
  button.style.height =
    adDiv.style.height === "250px"
      ? "18px"
      : adDiv.style.height === "600px"
      ? "39px"
      : adDiv.style.height === "50px"
      ? "12px"
      : "24px";
  button.style.marginBottom =
    adDiv.style.height === "250px"
      ? "10px"
      : adDiv.style.height === "600px"
      ? "98px"
      : "unset";
  button.style.marginRight =
    adDiv.style.height === "50px"
      ? "5px"
      : adDiv.style.height === "90px"
      ? "21px"
      : "unset";
  button.style.marginTop = adDiv.style.height === "50px" ? "18px" : "unset";
  button.style.fontSize = adDiv.style.height === "50px" ? "12px" : "14px";
  button.onmouseover = function () {
    button.style.background = "#F5F096";
  };
  button.onmouseout = function () {
    button.style.background = "linear-gradient(#F5F096, #B99731)";
  };
}

function addPlayNowButton(adDiv, adData) {
  let button = document.createElement("div");
  stylePlayNowButton(button, adDiv);
  let buttonString = adData.a === "default" ? "download_now" : "play_now";
  let textNode = document.createTextNode(getLangString(buttonString));
  button.onclick = function (e) {
    e.stopPropagation();
    clickAdDiv(adDiv, adData, "cta");
  };
  // let textNode = document.createTextNode("Play Now");
  button.appendChild(textNode);
  adDiv.appendChild(button);
  return button;
}

/* 
    loads the ad image into the dom. shows a random default 
    image if the image url received is broken.
*/
function loadAd(data, adDiv) {
  let s = document.createElement("IMG");
  s.src = data.u;
  let ed = getEd(adDiv, data);
  let params = getUrlFromParams();
  params = `${params}&ed=${encodeURIComponent(JSON.stringify(ed))}`;
  s.onerror = function () {
    if (!data.f) {
      adDiv.style.display = "none";
    } else {
      let t = document.createElement("IMG");
      t.src = data.f;
      t.onload = function () {
        adDiv.style.backgroundImage = `url('${data.f}')`;
        adDiv.style.position = "relative";
        adDiv.style.textDecoration = "none";
        let adButton = addAdButton(adDiv, data);
        let iImage = addiIconAndHoverDiv(adDiv, data);
      };
      t.onerror = function () {
        adDiv.style.display = "none";
      };
    }
    sendImpression("ae", params);
  };
  s.onload = function () {
    adDiv.style.backgroundImage = `url('${data.u}')`;
    adDiv.style.position = "relative";
    adDiv.style.display = "flex";
    adDiv.style.textDecoration = "none";
    adDiv.style.alignItems =
      adDiv.style.width === "300px" ? "flex-end" : "center";
    adDiv.style.justifyContent =
      adDiv.style.width === "728px" || adDiv.style.width === "320px"
        ? "flex-end"
        : "center";
    let adButton = addAdButton(adDiv, data);
    let playNowButton = addPlayNowButton(adDiv, data);
    let iImage = addiIconAndHoverDiv(adDiv, data);
    if (data.a !== "default") {
      addCrossIcon(adDiv, iImage, adButton, data, playNowButton);
    }
  };
}

function getDeviceType() {
  const ua = window.navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "t";
  }
  if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "m";
  }
  return "d";
}

function getBrowser() {
  var test = function (regexp) {
    return regexp.test(window.navigator.userAgent);
  };
  switch (true) {
    case test(/edg/i):
      return "Microsoft Edge";
    case test(/trident/i):
      return "Microsoft Internet Explorer";
    case test(/firefox|fxios/i):
      return "Mozilla Firefox";
    case test(/opr\//i):
      return "Opera";
    case test(/ucbrowser/i):
      return "UC Browser";
    case test(/samsungbrowser/i):
      return "Samsung Browser";
    case test(/chrome|chromium|crios/i):
      return "Google Chrome";
    case test(/safari/i):
      return "Apple Safari";
    default:
      return "Other";
  }
}

function getOS() {
  let OSName = "Linux";
  let userAgent = window.navigator.userAgent;
  if (userAgent.indexOf("Firefox") != -1) OSName = "Firefox OS";
  if (userAgent.indexOf("watchOS") != -1) OSName = "WatchOS";
  if (userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
  if (userAgent.indexOf("iOS") != -1) OSName = "Mac/iOS";
  if (userAgent.indexOf("iPhone") != -1) OSName = "iOS";
  if (userAgent.indexOf("iPad") != -1) OSName = "iOS";
  if (userAgent.indexOf("Darwin") != -1) OSName = "iOS";
  if (userAgent.indexOf("X11") != -1) OSName = "UNIX";
  if (userAgent.indexOf("Linux") != -1) OSName = "Linux";
  if (userAgent.indexOf("Android") != -1) OSName = "Android";
  if (userAgent.indexOf("Windows") != -1) OSName = "Windows";
  if (userAgent.indexOf("Ubuntu") != -1) OSName = "Ubuntu";
  if (userAgent.indexOf("Bada") != -1) OSName = "Bada";
  if (userAgent.indexOf("BB10") != -1) OSName = "BlackBerry OS";
  if (userAgent.indexOf("BlackBerry") != -1) OSName = "BlackBerry OS";
  if (userAgent.indexOf("RIM Tablet OS") != -1) OSName = "BlackBerry Tablet OS";
  if (userAgent.indexOf("BREW") != -1) OSName = "BREW";
  if (userAgent.indexOf("Brew MP") != -1) OSName = "Brew MP";
  if (userAgent.indexOf("BMP") != -1) OSName = "Brew MP";
  if (userAgent.indexOf("BSD") != -1) OSName = "BSD";
  if (userAgent.indexOf("KaiOS") != -1) OSName = "KaiOS";
  if (userAgent.indexOf("KAIOS") != -1) OSName = "KaiOS";
  if (userAgent.indexOf("Kindle") != -1) OSName = "Kindle";
  if (userAgent.indexOf("MeeGo") != -1) OSName = "MeeGo";
  if (userAgent.indexOf("Nokia") != -1) OSName = "Nokia";
  if (userAgent.indexOf("SunOS") != -1) OSName = "Solaris";
  if (userAgent.indexOf("Symb") != -1) OSName = "Symbian OS";
  if (userAgent.indexOf("VRE") != -1) OSName = "VRE";
  if (userAgent.indexOf("webOS") != -1) OSName = "webOS";
  if (userAgent.indexOf("hpwOS") != -1) OSName = "webOS";
  if (userAgent.indexOf("WebTV") != -1) OSName = "WebTV";
  if (userAgent.indexOf("Samsung") != -1) OSName = "Samsung";
  if (userAgent.indexOf("Panasonic") != -1) OSName = "Panasonic";
  if (userAgent.indexOf("OpenBSD") != -1) OSName = "OpenBSD";
  if (userAgent.indexOf("FreeBSD") != -1) OSName = "FreeBSD";
  if (userAgent.indexOf("NetBSD") != -1) OSName = "NetBSD";
  if (userAgent.indexOf("Roku") != -1) OSName = "Roku";
  return OSName;
}

/*
    Used inside getUrlFromParams() function
    to append only non-null params to the string
*/
function appendParam(paramKey, paramValue, string) {
  if (paramKey) {
    string = string + `&${paramKey}=${paramValue}`;
  }
  return string;
}

/*
    Form the params url for GET
    api calls done in the script.
*/
function getUrlFromParams() {
  let params = getParams();
  let paramString = "";
  Object.keys(params).forEach((p) => {
    paramString = appendParam(p, params[p], paramString);
  });
  return paramString;
}

/* Get a random 4 digit number */
function getRandomNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

function getParamFromUrl(paramName) {
  return new URL(window.location.href).searchParams.get(paramName);
}

/*
    Form a params object with all the keys
    necessary to be sent as params in stats api calls 
*/
function getParams() {
  let adDiv = document.getElementsByClassName("asbybgn");
  let id = adDiv[0].getAttribute("data-bgn-as-client");
  let cn = getParamFromUrl("utm_campaign");
  let cs = getParamFromUrl("utm_source");
  let ct = getParamFromUrl("utm_term");
  let cm = getParamFromUrl("utm_medium");
  let cc = getParamFromUrl("utm_content");
  let cookie = document.cookie.split(";").find((it) => {
    return it.includes("bgn_id");
  });
  let bdt = getDeviceType();
  let bn = getBrowser();
  let bdo = getOS();
  let z = getRandomNumber();
  let params = {
    id: id,
    dl: encodeURIComponent(window.location.href),
    dh: encodeURIComponent(window.location.hostname),
    dp: encodeURIComponent(window.location.pathname),
    de: encodeURIComponent(document.charset),
    sr: encodeURIComponent(window.screen.width + "," + window.screen.height),
    vp: encodeURIComponent(window.innerWidth + "," + window.innerHeight),
    sd: encodeURIComponent(window.screen.colorDepth),
    dt: encodeURIComponent(document.title),
    ul: encodeURIComponent(window.navigator.language),
    ce: +window.navigator.cookieEnabled,
    je: +window.navigator.javaEnabled(),
    dpr: encodeURIComponent(window.devicePixelRatio),
    ua: encodeURIComponent(window.navigator.userAgent),
    dr: document.referrer,
    bdt: bdt,
    bn: bn,
    bdo: bdo,
    z: z,
  };
  if (cookie) params.uid = cookie.split("=")[1];
  if (cn) params.cn = cn;
  if (cs) params.cs = cs;
  if (ct) params.ct = ct;
  if (cm) params.cm = cm;
  if (cc) params.cc = cc;
  return params;
}

/* stats api call */
function sendImpression(type, params) {
  logger("Sending Impression");
  let host = getHost();
  if (!params) {
    params = getUrlFromParams();
  }
  params = params + `&ev=${type}`;
  fetch(`${getHost()}/as/i?${params}`, {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      logger("Impression SUCCESS", type);
      if (type === "pv") {
        getStrings(window.navigator.language.split("-")[0]);
      }
    })
    .catch((err) => {
      logger("Impression ERROR", err);
    });
}

function getStrings(locale) {
  fetch(
    window.ads_env === "prod"
      ? atob(CONSTS.json.prod_strings)
      : atob(CONSTS.json.engg_strings),
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      window.ad_strings = data;
      window.ad_strings.locale = locale;
      getAds();
    })
    .catch((err) => {
      console.log("error:::", err);
    });
}

/* fires on DOM load or ready state */
if (document.readyState !== "loading") {
  logger("Ready state already");
  sendImpression("pv");
} else {
  document.addEventListener("DOMContentLoaded", function () {
    logger("DOM content loaded");
    sendImpression("pv");
  });
}
