const _0x1ef7=['href','Opera','cookie','pointer','Nokia','BlackBerry','Roku','Symbian\x20OS','Firefox\x20OS','forEach','iOS','getElementsByClassName','Kindle','watchOS','&ed=','uid','Other','data-bgn-ad-client','keys','cursor','OS:::','utm_content','BlackBerry\x20Tablet\x20OS','FreeBSD','Apple\x20Safari','indexOf','url(\x27','title','...calling\x20ads\x20api','Darwin','Bada','...calling\x20impression\x20api','BSD','data-bgn-ad-slot','colorDepth','KaiOS','searchParams','Microsoft\x20Internet\x20Explorer','RIM\x20Tablet\x20OS','random','Samsung','bgn_id','Linux','split','backgroundImage','log','userAgent','BB10','NetBSD','&ev=','DOMContentLoaded','width','stringify','Mac/iOS','referrer','Firefox','BREW','json','utm_source','includes','location','MeeGo','UNIX','get','OpenBSD','Brew\x20MP','Mac','Panasonic','WatchOS','length','innerWidth','Windows','iPad','WebTV','javaEnabled','innerHeight','Solaris','VRE','BMP','webOS','SunOS','then','UC\x20Browser','test','style','Samsung\x20Browser','screen','utm_medium','onclick','devicePixelRatio','BlackBerry\x20OS','getAttribute','https://bgn-1-dot-bluestacks-cloud-qa.appspot.com/ad/c?','floor','Google\x20Chrome','cookieEnabled','https://bgn-1-dot-bluestacks-cloud-qa.appspot.com/ad/i?','params:','adsbybgn','navigator','find','Android','Ubuntu','X11','pathname','charset'];(function(_0x116bc6,_0x1ef7cc){const _0x2b130b=function(_0x1fb328){while(--_0x1fb328){_0x116bc6['push'](_0x116bc6['shift']());}};_0x2b130b(++_0x1ef7cc);}(_0x1ef7,0x122));const _0x2b13=function(_0x116bc6,_0x1ef7cc){_0x116bc6=_0x116bc6-0x0;let _0x2b130b=_0x1ef7[_0x116bc6];return _0x2b130b;};const _0x10c192=_0x2b13;function getAds(){const _0x46ca52=_0x2b13;let _0x1fb328=document[_0x46ca52('0x27')](_0x46ca52('0x14'));for(let _0x2d52e3=0x0;_0x2d52e3<_0x1fb328[_0x46ca52('0x61')];_0x2d52e3++){let _0x50df3a=_0x1fb328[_0x2d52e3][_0x46ca52('0x6')][_0x46ca52('0x4f')][_0x46ca52('0x47')]('px')[0x0],_0x206e47=_0x1fb328[_0x2d52e3]['style']['height'][_0x46ca52('0x47')]('px')[0x0],_0x7b20d1=_0x1fb328[_0x2d52e3][_0x46ca52('0xd')](_0x46ca52('0x3d')),_0x3f71ea={'w':_0x50df3a,'h':_0x206e47,'sid':_0x7b20d1},_0x4f585c=getUrlFromParams();_0x4f585c=_0x4f585c+_0x46ca52('0x2a')+JSON['stringify'](_0x3f71ea),console[_0x46ca52('0x49')](_0x46ca52('0x38'),_0x2d52e3),fetch(_0x46ca52('0xe')+_0x4f585c)[_0x46ca52('0x3')](_0xeff9a1=>_0xeff9a1[_0x46ca52('0x55')]())[_0x46ca52('0x3')](_0x10749a=>{const _0x22ba68=_0x46ca52;_0x1fb328[_0x2d52e3][_0x22ba68('0x6')][_0x22ba68('0x48')]=_0x22ba68('0x36')+_0x10749a['u']+'\x27)',_0x4f585c=getUrlFromParams(),_0x3f71ea['p']=_0x10749a['p'],_0x3f71ea['u']=_0x10749a['u'],_0x4f585c=_0x4f585c+_0x22ba68('0x2a')+JSON[_0x22ba68('0x50')](_0x3f71ea),sendImpression('ai',_0x4f585c),_0x1fb328[_0x2d52e3][_0x22ba68('0x6')][_0x22ba68('0x2f')]=_0x22ba68('0x1f'),_0x1fb328[_0x2d52e3][_0x22ba68('0xa')]=function(_0xd1a3ec){const _0x39fd00=_0x22ba68;console[_0x39fd00('0x49')]('inside\x20click\x20event:::',_0x10749a['c']),window['open'](_0x10749a['c']),sendImpression('ac',_0x4f585c);};});}}function getDeviceType(){const _0x27e7e7=_0x2b13,_0x557fc2=window[_0x27e7e7('0x15')]['userAgent'];if(/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i[_0x27e7e7('0x5')](_0x557fc2))return't';if(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/[_0x27e7e7('0x5')](_0x557fc2))return'm';return'd';};function getBrowser(){const _0x447d47=_0x2b13;var _0x5e2880=function(_0x15cc8e){const _0x6ae70e=_0x2b13;return _0x15cc8e['test'](window[_0x6ae70e('0x15')][_0x6ae70e('0x4a')]);};switch(!![]){case _0x5e2880(/edg/i):return'Microsoft\x20Edge';case _0x5e2880(/trident/i):return _0x447d47('0x41');case _0x5e2880(/firefox|fxios/i):return'Mozilla\x20Firefox';case _0x5e2880(/opr\//i):return _0x447d47('0x1d');case _0x5e2880(/ucbrowser/i):return _0x447d47('0x4');case _0x5e2880(/samsungbrowser/i):return _0x447d47('0x7');case _0x5e2880(/chrome|chromium|crios/i):return _0x447d47('0x10');case _0x5e2880(/safari/i):return _0x447d47('0x34');default:return _0x447d47('0x2c');}}function getOS(){const _0x359c7d=_0x2b13;let _0x3c273b=_0x359c7d('0x46'),_0x2b6cbf=window['navigator']['userAgent'];if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x53'))!=-0x1)_0x3c273b=_0x359c7d('0x24');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x29'))!=-0x1)_0x3c273b=_0x359c7d('0x60');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x5e'))!=-0x1)_0x3c273b=_0x359c7d('0x51');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x26'))!=-0x1)_0x3c273b=_0x359c7d('0x51');if(_0x2b6cbf['indexOf']('iPhone')!=-0x1)_0x3c273b=_0x359c7d('0x26');if(_0x2b6cbf['indexOf'](_0x359c7d('0x64'))!=-0x1)_0x3c273b=_0x359c7d('0x26');if(_0x2b6cbf['indexOf'](_0x359c7d('0x39'))!=-0x1)_0x3c273b=_0x359c7d('0x26');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x19'))!=-0x1)_0x3c273b=_0x359c7d('0x5a');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x46'))!=-0x1)_0x3c273b=_0x359c7d('0x46');if(_0x2b6cbf['indexOf'](_0x359c7d('0x17'))!=-0x1)_0x3c273b=_0x359c7d('0x17');if(_0x2b6cbf['indexOf'](_0x359c7d('0x63'))!=-0x1)_0x3c273b=_0x359c7d('0x63');if(_0x2b6cbf[_0x359c7d('0x35')]('Ubuntu')!=-0x1)_0x3c273b=_0x359c7d('0x18');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x3a'))!=-0x1)_0x3c273b=_0x359c7d('0x3a');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x4b'))!=-0x1)_0x3c273b=_0x359c7d('0xc');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x21'))!=-0x1)_0x3c273b=_0x359c7d('0xc');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x42'))!=-0x1)_0x3c273b=_0x359c7d('0x32');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x54'))!=-0x1)_0x3c273b='BREW';if(_0x2b6cbf['indexOf'](_0x359c7d('0x5d'))!=-0x1)_0x3c273b=_0x359c7d('0x5d');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x0'))!=-0x1)_0x3c273b=_0x359c7d('0x5d');if(_0x2b6cbf['indexOf'](_0x359c7d('0x3c'))!=-0x1)_0x3c273b=_0x359c7d('0x3c');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x3f'))!=-0x1)_0x3c273b=_0x359c7d('0x3f');if(_0x2b6cbf[_0x359c7d('0x35')]('KAIOS')!=-0x1)_0x3c273b=_0x359c7d('0x3f');if(_0x2b6cbf['indexOf'](_0x359c7d('0x28'))!=-0x1)_0x3c273b=_0x359c7d('0x28');if(_0x2b6cbf[_0x359c7d('0x35')]('MeeGo')!=-0x1)_0x3c273b=_0x359c7d('0x59');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x20'))!=-0x1)_0x3c273b=_0x359c7d('0x20');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x2'))!=-0x1)_0x3c273b=_0x359c7d('0x68');if(_0x2b6cbf[_0x359c7d('0x35')]('Symb')!=-0x1)_0x3c273b=_0x359c7d('0x23');if(_0x2b6cbf['indexOf'](_0x359c7d('0x69'))!=-0x1)_0x3c273b=_0x359c7d('0x69');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x1'))!=-0x1)_0x3c273b='webOS';if(_0x2b6cbf[_0x359c7d('0x35')]('hpwOS')!=-0x1)_0x3c273b=_0x359c7d('0x1');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x65'))!=-0x1)_0x3c273b='WebTV';if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x44'))!=-0x1)_0x3c273b=_0x359c7d('0x44');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x5f'))!=-0x1)_0x3c273b=_0x359c7d('0x5f');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x5c'))!=-0x1)_0x3c273b=_0x359c7d('0x5c');if(_0x2b6cbf['indexOf'](_0x359c7d('0x33'))!=-0x1)_0x3c273b=_0x359c7d('0x33');if(_0x2b6cbf[_0x359c7d('0x35')]('NetBSD')!=-0x1)_0x3c273b=_0x359c7d('0x4c');if(_0x2b6cbf[_0x359c7d('0x35')](_0x359c7d('0x22'))!=-0x1)_0x3c273b=_0x359c7d('0x22');return console[_0x359c7d('0x49')](_0x359c7d('0x30'),_0x2b6cbf),_0x3c273b;}function appendParam(_0x3ec0f6,_0x3a61e2,_0x2ba88b){return _0x3ec0f6&&(_0x2ba88b=_0x2ba88b+('&'+_0x3ec0f6+'='+_0x3a61e2)),_0x2ba88b;}function getUrlFromParams(){const _0x3430e5=_0x2b13;let _0x30b588=getParams(),_0x49fdc5='';return Object[_0x3430e5('0x2e')](_0x30b588)[_0x3430e5('0x25')](_0x20f060=>{_0x49fdc5=appendParam(_0x20f060,_0x30b588[_0x20f060],_0x49fdc5);}),_0x49fdc5;}function getRandomNumber(){const _0x40e118=_0x2b13;return Math[_0x40e118('0xf')](0x3e8+Math[_0x40e118('0x43')]()*0x2328);}function getParams(){const _0x31ceeb=_0x2b13;let _0x208cf2=document[_0x31ceeb('0x27')](_0x31ceeb('0x14')),_0x13c201=_0x208cf2[0x0][_0x31ceeb('0xd')](_0x31ceeb('0x2d')),_0x2735d1=new URL(window[_0x31ceeb('0x58')]['href'])[_0x31ceeb('0x40')][_0x31ceeb('0x5b')]('utm_campaign'),_0x2d4004=new URL(window[_0x31ceeb('0x58')][_0x31ceeb('0x1c')])[_0x31ceeb('0x40')]['get'](_0x31ceeb('0x56')),_0x40a1ff=new URL(window['location'][_0x31ceeb('0x1c')])[_0x31ceeb('0x40')][_0x31ceeb('0x5b')]('utm_term'),_0x2eb021=new URL(window[_0x31ceeb('0x58')]['href'])[_0x31ceeb('0x40')][_0x31ceeb('0x5b')](_0x31ceeb('0x9')),_0x4e8581=new URL(window[_0x31ceeb('0x58')]['href'])[_0x31ceeb('0x40')][_0x31ceeb('0x5b')](_0x31ceeb('0x31')),_0x3daaf3=document[_0x31ceeb('0x1e')][_0x31ceeb('0x47')](';')[_0x31ceeb('0x16')](_0x7a22c8=>{const _0x37ee7b=_0x31ceeb;return _0x7a22c8[_0x37ee7b('0x57')](_0x37ee7b('0x45'));}),_0x229189=getDeviceType(),_0x5cb347=getBrowser(),_0x19b749=getOS(),_0x53c295=getRandomNumber(),_0x2b64bd={'id':_0x13c201,'dl':encodeURIComponent(window[_0x31ceeb('0x58')][_0x31ceeb('0x1c')]),'dh':encodeURIComponent(window[_0x31ceeb('0x58')]['hostname']),'dp':encodeURIComponent(window['location'][_0x31ceeb('0x1a')]),'de':encodeURIComponent(document[_0x31ceeb('0x1b')]),'sr':encodeURIComponent(window[_0x31ceeb('0x8')]['width']+','+window[_0x31ceeb('0x8')]['height']),'vp':encodeURIComponent(window[_0x31ceeb('0x62')]+','+window[_0x31ceeb('0x67')]),'sd':encodeURIComponent(window[_0x31ceeb('0x8')][_0x31ceeb('0x3e')]),'dt':encodeURIComponent(document[_0x31ceeb('0x37')]),'ul':encodeURIComponent(window[_0x31ceeb('0x15')]['language']),'ce':+window[_0x31ceeb('0x15')][_0x31ceeb('0x11')],'je':+window[_0x31ceeb('0x15')][_0x31ceeb('0x66')](),'dpr':encodeURIComponent(window[_0x31ceeb('0xb')]),'ua':encodeURIComponent(window[_0x31ceeb('0x15')][_0x31ceeb('0x4a')]),'dr':document[_0x31ceeb('0x52')],'bdt':_0x229189,'bn':_0x5cb347,'bdo':_0x19b749,'z':_0x53c295};if(_0x3daaf3)_0x2b64bd[_0x31ceeb('0x2b')]=_0x3daaf3[_0x31ceeb('0x47')]('=')[0x1];if(_0x2735d1)_0x2b64bd['cn']=_0x2735d1;if(_0x2d4004)_0x2b64bd['cs']=_0x2d4004;if(_0x40a1ff)_0x2b64bd['ct']=_0x40a1ff;if(_0x2eb021)_0x2b64bd['cm']=_0x2eb021;if(_0x4e8581)_0x2b64bd['cc']=_0x4e8581;return console[_0x31ceeb('0x49')](_0x31ceeb('0x13'),_0x2b64bd),_0x2b64bd;}function sendImpression(_0x2910f4,_0x5b1da8){const _0x29328b=_0x2b13;!_0x5b1da8&&(_0x5b1da8=getUrlFromParams()),_0x5b1da8=_0x5b1da8+(_0x29328b('0x4d')+_0x2910f4),console[_0x29328b('0x49')](_0x29328b('0x3b')),fetch(_0x29328b('0x12')+_0x5b1da8)[_0x29328b('0x3')](_0x5ce2e4=>_0x5ce2e4['text']())[_0x29328b('0x3')](_0x3693b7=>{const _0x19d920=_0x29328b;console[_0x19d920('0x49')]('response\x20from\x20impression\x20API:',_0x3693b7);});}document['addEventListener'](_0x10c192('0x4e'),function(){sendImpression('pv'),getAds();});