/*
   1. Send an impression on page load and ad click as of now.
   2. Render ads on document's readystate. Make APi calls one by one.
   3. Send all the tracking parameters in all the api calls.
   4. Handle Ad rendering for multiple ads in single page. (make use of a for loop)
   5. Handling for corrupt image.
*/

function getAds () {
    let adDiv = document.getElementsByClassName("adsbybgn");
    for(let i = 0; i < adDiv.length; i++){
        let w = adDiv[i].style.width.split('px')[0];
        let h = adDiv[i].style.height.split('px')[0];
        let sid = adDiv[i].getAttribute("data-bgn-ad-slot");
        let ed = {
            w,
            h,
            sid: sid,
        }
        let params = getUrlFromParams();
        params = `${params}&ed=${JSON.stringify(ed)}`;
        fetch(`https://bgn-1-dot-bluestacks-cloud-qa.appspot.com/ad/c?${params}`, {
            method: 'GET',
            credentials: 'include',
        }).then((res)=>(res.json())).then((data)=>{
            loadAd(data.u, adDiv[i]);
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
                window.open(data.c);
                sendImpression('ac', params);
            }
        })
    }
}

function loadAd (url, adDiv) {
    let s = document.createElement("IMG");
    s.src = url;
    s.onerror = function(){
          console.log("file with "+url+" invalid");
          adDiv.style.backgroundImage = "url('https://semantic-ui.com/images/wireframe/square-image.png')";
    }
    s.onload = function(){
        console.log("file with "+url+" valid");
        adDiv.style.backgroundImage = `url('${url}')`;
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

function appendParam(paramKey, paramValue, string) {
    if(paramKey){
        string = string + `&${paramKey}=${paramValue}`;
    }
    return string;
}

function getUrlFromParams() {
    let params = getParams();
    let paramString = "";
    Object.keys(params).forEach(p => {
        paramString = appendParam(p, params[p], paramString);
    })
    return paramString;
}

function getRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}

function getParams() {
    let adDiv = document.getElementsByClassName("adsbybgn");
    let id = adDiv[0].getAttribute('data-bgn-ad-client');
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

function sendImpression (type, params) {
    if(!params) {
        params = getUrlFromParams();
    }
    params = params + `&ev=${type}`;
    fetch(`https://bgn-1-dot-bluestacks-cloud-qa.appspot.com/ad/i?${params}`, {
        method: 'GET',
        credentials: 'include'
    })
}

document.addEventListener("DOMContentLoaded", function(){
    sendImpression('pv');
    getAds();
});


