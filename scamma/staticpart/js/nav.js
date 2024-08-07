// Message obsolete ON/OFF by r0073r
var affichageMessageObsolete = true;

function guess() {
  // ua
  var ua = navigator.userAgent;
  //document.getElementById('ua').innerHTML="<h1>"+ua+"</h1>";

  var t; 
  var u = ua.match(/(opera|chrome|safari|samsung|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if(/trident/i.test(u[1])){
    t =  /\brv[ :]+(\d+)/g.exec(ua) || [];
    return ['Internet Explorer',t[1] ];
  }
  if(/msie/i.test(u[1])){
    u[1] = 'Internet Explorer';
  }
  if(u[1]=== 'Chrome'){
    t = ua.match(/\b(OPR|Edge?)\/(\d+)/);
    if(t!= null) {
      t = t.slice(1);
      t[0]=t[0].replace('OPR', 'Opera');
      if (t[0].substring(0,3) === 'Edg'){
        t[0] = 'Edge';
      }
    if(ua.match(/\((Linux; )?Android/)){
      t[0]+=' Android';
    }
      return t;
    }
    if(ua.match(/\(Linux; Android/)){
      u[1]="Chrome Android";
    }
  }
  if(u[1]=== 'Firefox'){
    if(ua.match(/\(Android/)){
      u[1]="Firefox for Android";
    }
  }
  if(u[1]=== 'Opera'){
    if(ua.match(/\(Android/)){
      u[1]="Opera Android";
    }
  }
  if(u[1]=== 'Safari'){
    t = ua.match(/\b(OPT|EdgiOS|FxiOS|CriOS)\/(\d+)/);
    if(t!= null) {
      t = t.slice(1);
      t[0]=t[0].replace('OPT', 'Opera on iOS');
      t[0]=t[0].replace('EdgiOS', 'Edge on iOS');
      t[0]=t[0].replace('FxiOS', 'Firefox on iOS');
      t[0]=t[0].replace('CriOS', 'Chrome on iOS');
      return t;
    }
    if(ua.match(/\((iPhone|iPad);/)){
      u[1]="Safari on iOS";
    }
  }
  u = u[2]? [u[1], u[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((t= ua.match(/version\/(\d+)/i))!= null) u.splice(1, 1, t[1]);
  return u;
}

function cat(){
  // ua
  var s = guess();
  //document.getElementById('guess1').innerHTML="<h1>"+s[0]+" "+s[1]+"</h1>";

  //comparer les versions
  var diag = "";
  if (typeof matrix !== 'undefined'){
    // fichier matrix.js ok
    var limit = matrix[s[0].toLowerCase()];
    // document.getElementById('guess1').innerHTML=document.getElementById('guess1').innerHTML+" limit="+limit;
    if((s[1]< limit)||(limit==0)) {
      diag="OBSOLETE";
      document.getElementById('obsolete').style.display = affichageMessageObsolete ? "block" : "none";
    } else {
      diag="GOOD";
    }
  } 
  //diag = "<h1>"+diag+"</h1>";
  //document.getElementById('warning').innerHTML=diag;
}

cat();

