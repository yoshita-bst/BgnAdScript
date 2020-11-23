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

function getUrlParams() {
    window.urlParams = {};
    return window.location.search.slice(1).split("&").forEach(it => { window.urlParams[it.split("=")[0]] = it.split("=")[1]})
}

/*
    Fetches all the ads through and API call
*/ 
function getAds () {
    let adDiv = document.getElementsByClassName("asbybgn");
    window.urlParams === "true" && console.log('inside GET Ads');
    for(let i = 0; i < adDiv.length; i++){
        let w = adDiv[i].style.width.split('px')[0];
        let h = adDiv[i].style.height.split('px')[0];
        let sid = adDiv[i].getAttribute("data-bgn-as-slot");
        let ed = {
            w,
            h,
            sid: sid,
        }
        let params = getUrlFromParams();
        params = `${params}&ed=${JSON.stringify(ed)}`;
        window.urlParams.bgnLogs === "true" && console.log('Ads call PARAMS', params);
        fetch(`https://bgn-1-dot-bluestacks-cloud-qa.appspot.com/as/c?${params}`, {
            method: 'GET',
            credentials: 'include',
        }).then((res)=>(res.json())).then((data)=>{
            window.urlParams.bgnLogs === "true" && console.log('GET Ads SUCCESS:', data);
            loadAd(data, adDiv[i]);
            params = getUrlFromParams();
            ed.p = data.p;
            ed.u = data.u;
            params = `${params}&ed=${JSON.stringify(ed)}`;
            adDiv[i].style.cursor = 'pointer';
            adDiv[i].onclick = function(e){
                params = getUrlFromParams();
                ed.p = data.p;
                ed.u = data.u;
                ed.c = data.c;
                ed.i = data.i;
                params = `${params}&ed=${JSON.stringify(ed)}`;
                window.urlParams.bgnLogs === "true" && console.log('Ad click PARAMS:', params);
                window.open(data.c);
                sendImpression('ac', params);
            }
        }).catch(err=>{
            window.urlParams === "true" && console.log('GGET Ads FAILURE:', err);
        })
    }
}

function clickAdDiv (adDiv, data) {
    let w = adDiv.style.width.split('px')[0];
    let h = adDiv.style.height.split('px')[0];
    let sid = adDiv.getAttribute("data-bgn-as-slot");
    let ed = {
        w,
        h,
        sid: sid,
    }
    params = getUrlFromParams();
    ed.p = data.p;
    ed.u = data.u;
    ed.c = data.c;
    ed.i = data.i;
    params = `${params}&ed=${JSON.stringify(ed)}`;
    window.urlParams.bgnLogs === "true" && console.log('Ad click PARAMS:', params);
    window.open(data.c);
    sendImpression('ac', params);
}


/* Adds styling to the 'Ad' text of the ad unit */
function styleAdButton (adButton) {
    adButton.style.background = "#EEBA00";
    adButton.style.color = "#171717";
    adButton.style.width = "20px";
    adButton.style.height = "20px";
    adButton.style.fontSize = "12px";
    adButton.style.position = "relative";
    adButton.style.display = "flex";
    adButton.style.alignItems = "center";
    adButton.style.justifyContent = "center";
    adButton.style.cursor = "default";
}


/* Adds styling to the 'i' image of the add unit */
function styleiImage(iImage) {
    iImage.style.background = "black";
    iImage.style.width = "20px";
    iImage.style.height = "20px";
    iImage.style.position = "absolute";
    iImage.style.top = "3px";
    iImage.style.right = "28px";
    iImage.style.cursor = "default";
}

function stylexImage(iImage) {
    iImage.style.background = "black";
    iImage.style.width = "20px";
    iImage.style.height = "20px";
    iImage.style.position = "absolute";
    iImage.style.top = "3px";
    iImage.style.right = "4px";
    iImage.style.cursor = "pointer";
}

/* adds styling to the div that appears on hover of the 'i' image of ad unit */ 
function styleHoverDiv(hoverDiv) {
    hoverDiv.style.background = "white";
    hoverDiv.style.color = "#0082E5";
    hoverDiv.style.width = "65px";
    hoverDiv.style.fontSize = "12px";
    hoverDiv.style.position = "absolute";
    hoverDiv.style.display = "flex";
    hoverDiv.style.alignItems = "center";
    hoverDiv.style.justifyContent = "center";
    hoverDiv.style.top = "3px";
    hoverDiv.style.right = "50px";
    hoverDiv.style.visibility = "hidden";
    hoverDiv.style.padding = "3px 7px";
}

function addAdButton(adDiv){
    let adButton = document.createElement('div');
    styleAdButton(adButton);
    let textNode = document.createTextNode('Ad')
    adButton.appendChild(textNode);
    adButton.onclick = function(e){
        e.stopPropagation();

    }
    adDiv.appendChild(adButton);
    return adButton;
}

function addiIconAndHoverDiv(adDiv){
    let iImage = document.createElement('img');
    styleiImage(iImage);
    iImage.src = "https://cdn-bgp.bluestacks.com/bgp/BGP_Snippet_Code/icons/i_icon.png";
    adDiv.appendChild(iImage);
    let hoverDiv = document.createElement('div');
    let uniqueId = getRandomNumber();
    hoverDiv.id = uniqueId;
    styleHoverDiv(hoverDiv);
    hoverDiv.innerHTML = "Ads by BGN";
    iImage.onclick = function(e){
        e.stopPropagation();
    }
    iImage.onmouseover = function(e){
        hoverDiv.style.visibility = 'visible';
    }
    iImage.onmouseout = function(e){
        hoverDiv.style.visibility = 'hidden';
    }
    adDiv.appendChild(hoverDiv);
    return iImage
}

function styleContainer(container){
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.border = "1px solid #DDDDDD";
    container.style.justifyContent = "center";
    container.style.flexDirection = "column";
    container.style.fontSize = "24px";
    container.style.color = "#4E4E4E";
    container.style.width = "300px";
    container.style.height = "250px";
}
function styleHeadingText(heading){
    heading.style.display = "flex";
    heading.style.alignItems = "center";
    heading.style.justifyContent = "center";
}

function styleStopAdButton(button){
    button.style.background = "#0082E5";
    button.style.borderRadius = "5px";
    button.style.color = "white";
    button.style.cursor = "pointer";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.padding = "8px 15px";
    button.style.fontSize = "16px";
    button.style.marginTop = "14px";
}

function styleBgnImage(bgnImage){
    bgnImage.style.marginLeft = "9px";
}

function addHeadingText(adDiv){
    let container = document.createElement('div');
    styleContainer(container);
    let heading = document.createElement('div');
    styleHeadingText(heading);
    let textNode = document.createTextNode('Ads by')
    heading.appendChild(textNode);
    let bgnImage = document.createElement('img');
    styleBgnImage(bgnImage);
    bgnImage.src = "http://cdn-bgp.bluestacks.com/bgp/BGP_Snippet_Code/icons/bgn.png";
    heading.appendChild(bgnImage);
    container.appendChild(heading);
    addStopButton(container);
    adDiv.appendChild(container);
    return container;

}

function addStopButton(headingDiv){
    let button = document.createElement('div');
    styleStopAdButton(button);
    let textNode = document.createTextNode('Stop seing this Ad')
    button.appendChild(textNode);
    headingDiv.appendChild(button);
}

function styleBackButton(button) {
    button.style.width = "22px";
    button.style.height = "18px";
    button.style.position = "absolute";
    button.style.top = "12px";
    button.style.left = "13px";
}

function addBackButton(adDiv, iImage, adButton, xImage, container, adData){
    let backButton = document.createElement('img');
    styleBackButton(backButton);
    backButton.src = "http://cdn-bgp.bluestacks.com/bgp/BGP_Snippet_Code/icons/Back.png";
    backButton.onclick = function(e) {
        backButton.style.display = "none";
        iImage.style.visibility = "visible";
        adButton.style.display = "flex";
        xImage.style.visibility = "visible";
        container.style.display = "none";
        adDiv.style.backgroundImage = `url('${adData.u}')`;
        adDiv.onclick = function(e) {
            clickAdDiv(adDiv, adData);
        }
        e.stopPropagation();
        
    }
    adDiv.appendChild(backButton);
}

function addCrossIcon(adDiv, iImage, adButton, adData){
    let xImage = document.createElement('img');
    stylexImage(xImage);
    xImage.src = "https://cdn-bgp.bluestacks.com/bgp/BGP_Snippet_Code/icons/cross_icon.png";
    xImage.onclick = function(e){
        e.stopPropagation();
        adDiv.style.background = "rgba(255, 255, 255, 0.5)";
        // adDiv.style.border = "1px solid #DDDDDD";
        iImage.style.visibility = "hidden";
        adButton.style.display = "none";
        xImage.style.visibility = "hidden";
        adDiv.onclick = function(e) {
            return;
        }
        let container = addHeadingText(adDiv);
        addBackButton(adDiv, iImage, adButton, xImage, container, adData);

   }
    adDiv.appendChild(xImage);
}

/* 
    loads the ad image into the dom. shows a random default 
    image if the image url received is broken.
*/
function loadAd (data, adDiv) {
    let s = document.createElement("IMG");
    s.src = data.u;
    let w = adDiv.style.width.split('px')[0];
    let h = adDiv.style.height.split('px')[0];
    let sid = adDiv.getAttribute("data-bgn-as-slot");
    let ed = {
        w,
        h,
        sid: sid,
    }
    ed.p = data.p;
    ed.u = data.u;
    ed.i = data.i;
    let params = getUrlFromParams();
    params = `${params}&ed=${JSON.stringify(ed)}`;
    s.onerror = function(){
        // adDiv.style.backgroundImage = "url('https://semantic-ui.com/images/wireframe/square-image.png')";
        sendImpression('ae', params);
    }
    s.onload = function(){
        adDiv.style.backgroundImage = `url('${data.u}')`;
        adDiv.style.position = "relative";
        adDiv.style.textDecoration = "none";
        let adButton = addAdButton(adDiv);
        let iImage = addiIconAndHoverDiv(adDiv);
        addCrossIcon(adDiv, iImage, adButton, data);
    }
}

function getDeviceType () {
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
};

function getBrowser() {
    var test = function(regexp) {return regexp.test(window.navigator.userAgent)}
    switch (true) {
        case test(/edg/i): return "Microsoft Edge";
        case test(/trident/i): return "Microsoft Internet Explorer";
        case test(/firefox|fxios/i): return "Mozilla Firefox";
        case test(/opr\//i): return "Opera";
        case test(/ucbrowser/i): return "UC Browser";
        case test(/samsungbrowser/i): return "Samsung Browser";
        case test(/chrome|chromium|crios/i): return "Google Chrome";
        case test(/safari/i): return "Apple Safari";
        default: return "Other";
    }
}

function getOS() {
    let OSName = "Linux";
    let userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Firefox") != -1) OSName="Firefox OS";
    if (userAgent.indexOf("watchOS") != -1) OSName="WatchOS";
    if (userAgent.indexOf("Mac") != -1) OSName="Mac/iOS";
    if (userAgent.indexOf("iOS") != -1) OSName="Mac/iOS";
    if (userAgent.indexOf("iPhone") != -1) OSName="iOS";
    if (userAgent.indexOf("iPad") != -1) OSName="iOS";
    if (userAgent.indexOf("Darwin") != -1) OSName="iOS";
    if (userAgent.indexOf("X11") != -1) OSName="UNIX";
    if (userAgent.indexOf("Linux") != -1) OSName="Linux";
    if (userAgent.indexOf("Android") != -1) OSName="Android";
    if (userAgent.indexOf("Windows") != -1) OSName="Windows";
    if (userAgent.indexOf("Ubuntu") != -1) OSName="Ubuntu";
    if (userAgent.indexOf("Bada") != -1) OSName="Bada";
    if (userAgent.indexOf("BB10") != -1) OSName="BlackBerry OS";
    if (userAgent.indexOf("BlackBerry") != -1) OSName="BlackBerry OS";
    if (userAgent.indexOf("RIM Tablet OS") != -1) OSName="BlackBerry Tablet OS";
    if (userAgent.indexOf("BREW") != -1) OSName="BREW";
    if (userAgent.indexOf("Brew MP") != -1) OSName="Brew MP";
    if (userAgent.indexOf("BMP") != -1) OSName="Brew MP";
    if (userAgent.indexOf("BSD") != -1) OSName="BSD";
    if (userAgent.indexOf("KaiOS") != -1) OSName="KaiOS";
    if (userAgent.indexOf("KAIOS") != -1) OSName="KaiOS";
    if (userAgent.indexOf("Kindle") != -1) OSName="Kindle";
    if (userAgent.indexOf("MeeGo") != -1) OSName="MeeGo";
    if (userAgent.indexOf("Nokia") != -1) OSName="Nokia";
    if (userAgent.indexOf("SunOS") != -1) OSName="Solaris";
    if (userAgent.indexOf("Symb") != -1) OSName="Symbian OS";
    if (userAgent.indexOf("VRE") != -1) OSName="VRE";
    if (userAgent.indexOf("webOS") != -1) OSName="webOS";
    if (userAgent.indexOf("hpwOS") != -1) OSName="webOS";
    if (userAgent.indexOf("WebTV") != -1) OSName="WebTV";
    if (userAgent.indexOf("Samsung") != -1) OSName="Samsung";
    if (userAgent.indexOf("Panasonic") != -1) OSName="Panasonic";
    if (userAgent.indexOf("OpenBSD") != -1) OSName="OpenBSD";
    if (userAgent.indexOf("FreeBSD") != -1) OSName="FreeBSD";
    if (userAgent.indexOf("NetBSD") != -1) OSName="NetBSD";
    if (userAgent.indexOf("Roku") != -1) OSName="Roku";
    return OSName;
}

/*
    Used inside getUrlFromParams() function
    to append only non-null params to the string
*/
function appendParam(paramKey, paramValue, string) {
    if(paramKey){
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
    Object.keys(params).forEach(p => {
        paramString = appendParam(p, params[p], paramString);
    })
    return paramString;
}


/* Get a random 4 digit number */
function getRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}

/*
    Form a params object with all the keys
    necessary to be sent as params in stats api calls 
*/
function getParams() {
    let adDiv = document.getElementsByClassName("asbybgn");
    let id = adDiv[0].getAttribute('data-bgn-as-client');
    let cn = (new URL(window.location.href)).searchParams.get('utm_campaign');
    let cs = (new URL(window.location.href)).searchParams.get('utm_source');
    let ct = (new URL(window.location.href)).searchParams.get('utm_term');
    let cm = (new URL(window.location.href)).searchParams.get('utm_medium');
    let cc = (new URL(window.location.href)).searchParams.get('utm_content');
    let cookie = document.cookie.split(";").find(it => {return it.includes('bgn_id')});
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
        sr: encodeURIComponent(window.screen.width + ',' + window.screen.height),
        vp: encodeURIComponent(window.innerWidth + ',' + window.innerHeight),
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
        z: z
    };
    if(cookie) params.uid = cookie.split("=")[1];
    if(cn) params.cn = cn;
    if(cs) params.cs = cs;
    if(ct) params.ct = ct;
    if(cm) params.cm = cm;
    if(cc) params.cc = cc;
    return params;
}

/* stats api call */
function sendImpression (type, params) {
    window.urlParams === "true" && console.log('Sending Impression');
    if(!params) {
        params = getUrlFromParams();
    }
    params = params + `&ev=${type}`;
    fetch(`https://bgn-1-dot-bluestacks-cloud-qa.appspot.com/as/i?${params}`, {
        method: 'GET',
        credentials: 'include'
    }).then((res)=>{
        window.urlParams === "true" && console.log('Impression SUCCESS', type);
    }).catch(err => {
        window.urlParams.bgnLogs === "true" && console.log('Impression ERROR', err);
    })
}

/* fires on DOM load or ready state */
if( document.readyState !== 'loading' ) {
    window.urlParams.bgnLogs === "true" && console.log('Ready state already');
    sendImpression('pv');
    getAds();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        window.urlParams.bgnLogs === "true" && console.log('DOM content loaded');
        sendImpression('pv');
        getAds();
    });
}


