function trim(s) {
  return s.replace(/(^\s+)|(\s+$)/g, "");
}

function trimU(s) {
  return trim(s);
}

function hasClassName(oNode, className) {
	if (!oNode)
		return false;
		return (oNode.nodeType==1)?((" "+oNode.className+" ").indexOf(" "+className+" ")!=-1):false;
}

function addClassName(oNode,className) {
	if (!oNode)
		return;
	if ((oNode.nodeType==1) && !hasClassName(oNode,className))
		oNode.className = trim(oNode.className+" "+className);
}

function deleteClassName(oNode,className) {
	if (!oNode)
		return;
	if (oNode.nodeType==1 && hasClassName(oNode,className))
		oNode.className = trim((" "+oNode.className+" ").replace(" "+className+" "," "));
}

//--------------------------------------------------------------------------------------
function NoError() {
	// Le contour rouge (si defaut bootstrap) du champs en erreur . par sur l'input
	$('.form-group').removeClass('has-error');
	$('.form-row').find('.has-error').removeClass('has-error');
	// Le(s) message(s) d'erreur de categorie 1 relatif(s) a chaque champs
	$('.cat1').html('').addClass('hide');
	// Le(s) message(s) d'erreur de categorie 2 "globaux"
	$('.cat2').html('').addClass('hide');
	$('.form-group').removeAttr('aria-labelledby');
}

//--------------------------------------------------------------------------------------
function erreurEtVideChamps(leChamps) {
	prefixe='fg_';
	suffixe='_tmp';
	$('#'+prefixe+leChamps).addClass('has-error');
	$('#'+leChamps+suffixe).val('');
}

//--------------------------------------------------------------------------------------
function erreurEtGardeChamps(leChamps) {
	prefixe='fg_';
	suffixe='_tmp';
	$('#'+prefixe+leChamps).addClass('has-error');
	// $('#'+leChamps+suffixe).val(''); //
}

//--------------------------------------------------------------------------------------
function obligatoire(leChamps) {
	if ($("#"+leChamps+"_tmp").val().length==0) {
		$('#fg_'+leChamps).addClass('has-error');
	$("#"+leChamps).attr("aria-labelledby","erreur");
		return(false)
	}
	return(true);
}

//--------------------------------------------------------------------------------------
function obligatoireNoFg(leChamps) {
	if ($("#"+leChamps+"_tmp").val().length==0) {
		$("#"+leChamps+'_tmp').addClass('form-control');
	$("#"+leChamps).attr("aria-labelledby","erreur");
		$("#"+leChamps+'_tmp').parent().addClass('has-error');
		return(false)
	}
	else {
		$("#"+leChamps+'_tmp').parent().removeClass('has-error');
	}
	return(true);
}

//--------------------------------------------------------------------------------------
function estVide(leChamps) {
	if ($("#"+leChamps+"_tmp").val().length==0) {
		return(true)
	}
	return(false);
}

//--------------------------------------------------------------------------------------
function exactement(leChamps,longueur,message) {
	if ($("#"+leChamps+"_tmp").val().length!=longueur) {
	$('#fg_'+leChamps).addClass('has-error');
	$('#Cat1_'+leChamps).html(message).removeClass('hide').addClass('alert alert-danger');
	$("#"+leChamps).attr("aria-describedby","Cat1_"+leChamps);
		return(false)
	}
	return(true);
}

//--------------------------------------------------------------------------------------
function exactementv2(leChamps,longueur,message,leChampsErr) {
	if ($("#"+leChamps+"_tmp").val().length!=longueur) {
		//$('#fg_'+leChamps).addClass('has-error');
		$("#"+leChamps+'_tmp').parent().addClass('has-error');
		$("#"+leChampsErr).html(message).removeClass('hide').addClass('alert alert-danger');
		$("#"+leChamps).attr("aria-describedby","Cat1_"+leChamps);
		return(false)
	}
	$("#"+leChampsErr).removeClass('has-error');
	return(true);
}

//--------------------------------------------------------------------------------------
function doTest(s,longueurMini,longueurMaxi){
	// length entre longueurMini et longueurMaxi
	//var longueur = unicodeLength(s);
	var longueur = s.length;
	if((longueur<longueurMini)||(longueur>longueurMaxi)){
		return(false);
	}
	return(true);
}

function verifiePWD(leChamps,longueurMini,longueurMaxi,message){
	var aTester;
	// var Expression = new RegExp( "^(?=.*\\p{L})(?=.*\\p{Nd})\\P{M}{"+longueurMini+","+longueurMaxi+"}$","u");
	var Expression = "No expression, just check length";
	aTester=trimU($("#"+leChamps+"_tmp").val());
	debutRetourLog='\tControle du mot  de passe ' + aTester + ' avec  : ' + Expression ;
	if(aTester) {
		if(!doTest(aTester,longueurMini,longueurMaxi)){
			$('#fg_'+leChamps).addClass('has-error');
			$('#Cat1_'+leChamps).html(message).removeClass('hide text-center').addClass('alert alert-danger');
			return(false);
		}
		return(true);
	}
}

//--------------------------------------------------------------------------------------
function verifieDate(leChamps,message,minimum){
	//Au viveau de la saisie, on n'a verifie uniquement qu'il n'y avait que des valeurs num&eacute;riques et des /
	// on vient de v&eacute;rifier la longueur.
	// Verif N&deg;1 : regex
	var aTester=new String();
	aTester=$("#"+leChamps+"_tmp").val();
	bad=0;
	var dateFormatTexte=aTester.replace(/^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])/,"$3/$2/$1");
	if (aTester!=dateFormatTexte) { aTester=dateFormatTexte; }
	var regexpBonneDate=/^(\d{2}\/){2}\d{4}$/;
	if(!regexpBonneDate.test(aTester)) {
		bad=1;
	}
	else {
		var date_temp = aTester.split('/');
		date_temp[1] -=1;
		var ma_date = new Date();
		ma_date.setFullYear(date_temp[2]);
		ma_date.setMonth(date_temp[1],date_temp[0]);
		//ma_date.setDate(date_temp[0]);
		if(!(ma_date.getFullYear()==date_temp[2] && ma_date.getMonth()==date_temp[1] && ma_date.getDate()==date_temp[0])){
			bad=1;
		}
		else {
			maintenant=new Date();
			jeanne=minimum.split('/');
			calmant=new Date(jeanne[2],jeanne[1]-1,jeanne[0]);
			if (ma_date > maintenant) {
				bad=1;
			}
			else  {
				if (ma_date < calmant) {
		bad=1;
				}
			}
		}
	}
	if(bad) {
		$('#fg_'+leChamps).addClass('has-error');
		$('#Cat1_'+leChamps).html(message).removeClass('hide text-center').addClass('alert alert-danger');
		return(false);
	}
	return(true);
}

//--------------------------------------------------------------------------------------
function verifieDatev2(leChampsJJ,leChampsMM,leChampsAA,leChampsErr,message,minimum){
	//Au viveau de la saisie, on n'a verifie uniquement qu'il n'y avait que des valeurs num&eacute;riques et des /
	// on vient de v&eacute;rifier la longueur.
	// Verif N&deg;1 : regex
	var aTester=new String();
	aTester=$("#"+leChampsJJ+"_tmp").val()+"/"+$("#"+leChampsMM+"_tmp").val()+"/"+$("#"+leChampsAA+"_tmp").val();
	bad=0;
	badJ=0;
	badM=0;
	badA=0;
	var dateFormatTexte=aTester.replace(/^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])/,"$3/$2/$1");
	if (aTester!=dateFormatTexte) { aTester=dateFormatTexte; }
	var regexpBonneDate=/^(\d{2}\/){2}\d{4}$/;
	if(!regexpBonneDate.test(aTester)) {
		bad=1;
	}
	else {
		var date_temp = aTester.split('/');
		date_temp[1] -=1;
		var ma_date = new Date();
		ma_date.setFullYear(date_temp[2]);
		ma_date.setMonth(date_temp[1],date_temp[0]);
		//ma_date.setDate(date_temp[0]);
		if(!(ma_date.getFullYear()==date_temp[2] && ma_date.getMonth()==date_temp[1] && ma_date.getDate()==date_temp[0])){
			bad=1;
			if(ma_date.getFullYear()!=date_temp[2]) { badA=1; }
			if(ma_date.getMonth()!=date_temp[1]) { badM=1; }
			if(ma_date.getDate()!=date_temp[0]) { badJ=1; }
		}
		else {
			maintenant=new Date();
			jeanne=minimum.split('/');
			calmant=new Date(jeanne[2],jeanne[1]-1,jeanne[0]);
			if (ma_date > maintenant) {
				bad=1;
			}
			else  {
				if (ma_date < calmant) {
		bad=1;
				}
			}
		}
	}
	if(bad) {
		//$('#fg_'+leChamps).addClass('has-error');
		$('#Cat1_'+leChampsErr).html(message).removeClass('hide text-center').addClass('alert alert-danger');
		if(badA==1)$("#"+leChampsAA+"_tmp").parent().addClass('has-error');
		if(badM==1)$("#"+leChampsMM+"_tmp").parent().addClass('has-error');
		if(badJ==1)$("#"+leChampsJJ+"_tmp").parent().addClass('has-error');
		return(false);
	}
	return(true);
}

//--------------------------------------------------------------------------------------
// mod 20220210T1800 unicode
function unicodeLength(str) {
	//return [...str].length
}

function auMoins0(leChamps,longueur,message) {
	if (unicodeLength($("#"+leChamps+"_tmp").val())<longueur) {
	$('#fg_'+leChamps).addClass('has-error');
	$('#Cat1_'+leChamps).html(message).removeClass('hide').addClass('alert alert-danger');
		return(false)
	}
	return(true);
}

function auMoins(leChamps,longueur,message) {
	if ($("#"+leChamps+"_tmp").val().length<longueur) {
	$('#fg_'+leChamps).addClass('has-error');
	$('#Cat1_'+leChamps).html(message).removeClass('hide').addClass('alert alert-danger');
		return(false)
	}
	return(true);
}

//--------------------------------------------------------------------------------------
function videChamps(leFormulaire,leSuffixe) {
	var aVider = Array.prototype.slice.call(arguments, 2);
	$("[name='"+leFormulaire+"']").find('input:hidden').each(function(index,unChamps) {
		if (aVider.indexOf($(unChamps).attr('name')) > -1) {
			source=$(unChamps).attr('name')+leSuffixe;
			$("[name='"+source+"']").val('');
			$(unChamps).val('');
		}
	});
}

//--------------------------------------------------------------------------------------
//Pour les champs DONT LE NOM (name) indique du formulaire indique, on met le champ avec la valeur de
//champ + suffixe et on vide champ+suffixe
//--------------------------------------------------------------------------------------
function switchEtVideChamps(leFormulaire,leSuffixe) {
	//Recuperation de la liste des champs a partir de arg 2
	var aSwitcher = Array.prototype.slice.call(arguments, 2);
	//Pour chaque champs du formulaire, si le nom est un de ceux indiques en arg >=2
	// on met la valeur a partir celui avec le meme nom mais avec le suffixe (ex '_tmp' )
	// puis on vide celui avec le suffixe ( qui est celui affiche / saissi par l'utilisateur
	$("[name='"+leFormulaire+"']").find('input:hidden').each(function(index,unChamps) {
		if (aSwitcher.indexOf($(unChamps).attr('name')) > -1) {
				source=$(unChamps).attr('name')+leSuffixe;
				if($("[name='"+source+"']").length)$(unChamps).val($("[name='"+source+"']").val());
				$("[name='"+source+"']").val('');
				$(unChamps).removeAttr("disabled");
		}
		else {
			$(unChamps).attr("disabled","true");
		}
	});
}

//--------------------------------------------------------------------------------------
//Pour les champs DONT L'ID (id) indique du formulaire indique, on met le champ avec la valeur de
//champ + suffixe et on vide champ+suffixe
//--------------------------------------------------------------------------------------
function switchEtVideChampsSurId(leFormulaire,leSuffixe) {
	//Recuperation de la liste des champs a partir de arg 2
	var aSwitcher = Array.prototype.slice.call(arguments, 2);
	//Pour chaque champs du formulaire, si le nom est un de ceux indiques en arg >=2
	// on met la valeur a partir celui avec le meme nom mais avec le suffixe (ex '_tmp' )
	// puis on vide celui avec le suffixe ( qui est celui affiche / saissi par l'utilisateur
	$("[name='"+leFormulaire+"']").find('input:hidden').each(function(index,unChamps) {
		if (aSwitcher.indexOf($(unChamps).attr('id')) > -1) {
			source=$(unChamps).attr('id')+leSuffixe;
			if($("[id='"+source+"']").length)$(unChamps).val($("[id='"+source+"']").val());
				$("[id='"+source+"']").val('');
				$(unChamps).removeAttr("disabled");
			}
			else {
				$(unChamps).attr("disabled","true");
			}
	});
}

//--------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------
function noSend(leFormulaire) {
	$("[name='"+leFormulaire+"']").find('input').each(function(index,unChamps) {
	});
	$("[name='"+leFormulaire+"']").find('input').not("[type='hidden']").each(function(index,unChamps) {
		$(unChamps).attr("disabled",true);
	});
}

//--------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------
function rePermit(leFormulaire) {
	$("[name='"+leFormulaire+"']").find('input').not("[type='hidden']").each(function(index,unChamps) {
		$(unChamps).removeAttr("disabled");
	});
}

//--------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------
function reverseEtGardeChamps(leFormulaire,leSuffixe) {
		var aSwitcher = Array.prototype.slice.call(arguments, 2);
	$("[name='"+leFormulaire+"']").find('input:hidden').each(function(index,unChamps) {
		if (aSwitcher.indexOf($(unChamps).attr('name')) > -1) {
			destination=$(unChamps).attr('name')+leSuffixe;
			$("[name='"+destination+"']").val($(unChamps).val());
		}
	});
}

//--------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------
function reverseEtGardeChampsSurId(leFormulaire,leSuffixe) {
	var aSwitcher = Array.prototype.slice.call(arguments, 2);
	$("[name='"+leFormulaire+"']").find('input:hidden').each(function(index,unChamps) {
		if (aSwitcher.indexOf($(unChamps).attr('id')) > -1) {
			destination=$(unChamps).attr('id')+leSuffixe;
			$("[id='"+destination+"']").val($(unChamps).val());
		}
	});
}

//--------------------------------------------------------------------------------------
function afficheChampsenSus(leFormulaire,leChamps) {
	// le suffixe des champs NON hidden est _tmp
	var suffixe="_tmp";
	// a partir du 2eme argument (a partir de 0) est/sont indique(s) les champs a afficher
	//      --> on les range dans un tableau
	var aAjouter = Array.prototype.slice.call(arguments, 2);
	//Parcours de tous les champs input qui ne sont pas cach&eacute;s"
	//Si dans la liste de ceux &agrave; conserver ou ajouter, on vire hide sur le parent qui va bien sinon on le met
	//
	$("[name='"+leFormulaire+"']").find("input[type!='hidden']").each(function(index,unChamps) {
		if ($(unChamps).attr('name')==leChamps+suffixe) {
		}
		else {
			if (aAjouter.indexOf($(unChamps).attr('name').replace(suffixe,"")) > -1) {
				//$(unChamps).parents('.form-group').removeClass('hide');
				//      on rend visible l'ancetre le + proche de classe form-row (les champs de la date de naissance)
				//      ou form-group ( les autres)
				$(unChamps).closest('.form-group,.form-row').removeClass('hide');
			}
			else {
				//$(unChamps).parents('.form-group').addClass('hide');
				//      on rend invisible l'ancetre le + proche de classe form-row (les champs de la date de naissance)
				//      ou form-group ( les autres)
				$(unChamps).closest('.form-group,.form-row').addClass('hide');
			}
		}
	});
}

//--------------------------------------------------------------------------------------
function donneFocus(leFormulaire,leChamps,leSuffixe) {
	var suffixe="";
	if (typeof leSuffixe === 'undefined' ) {
		suffixe="_tmp";
	}
	else
		if(leSuffixe!="none") {
			suffixe=leSuffixe;
	}
	$("[name='"+leFormulaire+"']").find("input[type!='hidden']").each(function(index,unChamps) {
		if ($(unChamps).attr('name')==leChamps+suffixe) {
			$(unChamps).focus();
			$(unChamps).focusin();
		}
	});
}

//--------------------------------------------------------------------------------------
function afficheForm(nomForm) {
	$('#formulairePrincipal').attr('name',nomForm);
	if (typeof timeoutId === 'undefined' ) {
	} else {
		clearTimeout(timeoutId);
	}
	switch(nomForm) {
		case 'CTX' :
			$('#titre_authent').html(messageContenu[nomForm+'titre_authent']);
			document.title=messageContenu['titreFenetre'+nomForm];
			afficheChampsenSus('CTX','spi','yapas');
			videChamps('CTX','_tmp','pwd','teledec','rfr','jourNaissance','moisNaissance','anneeNaissance','dateNaissance');
			urlCible=urlContexte;
			if (authType == 'idp'){
				$('#consentement').addClass('hide');
				$('.aideFC').removeClass('hide');
			}
			$('#btnAction').html('Continuer').addClass('btn-default').removeClass('btn-primary btn-glow').addClass('disabled').parent().attr({ 'data-original-title': 'Pour continuer, veuillez saisir votre numéro fiscal.', 'data-toggle': 'tooltip', 'data-placement': 'bottom' });
			$('.aideSPI,.aide_services, .aide_cookies').removeClass('hide').attr('aria-hidden', false);
			$('.aideMdp,.aideIdentifiants, .ocfiNonIR,.aideSpiPAS, .aideCode').addClass('hide').attr('aria-hidden', true);
			$('#spi_tmp').on('focus', function()  {
				$('#aide_spi').attr('open', 'open');
				$('details').not('#aide_spi').removeAttr("open");
			});
			//if (changespi == 1) {
			//      $("#changeSPI").removeClass("hide");
			//}
			$('#fg_pwd').addClass('sr-only').removeClass('hide').attr('aria-hidden', true);
			$('#pwd_tmp').attr('tabindex',"-1");
			// NoError();
			break;
		case '3S' :
			$('#titre_authent').html(messageContenu[nomForm+'titre_authent']);
			document.title=messageContenu['titreFenetre'+nomForm];
			messageACaractereInformatif(messageContenu['infoSaisie3S']);
			afficheChampsenSus('3S','spi','teledec','rfr');
			// set lmauth value
			$('#authKey').val('3S');
			urlCible=urlLogin3S;
			//$('#btnAction').html('Continuer').addClass('btn-primary btn-glow').removeClass('btn-default');
			$('#btnAction').html('Continuer').addClass('btn-primary btn-glow').removeClass('disabled btn-default').parent().attr('');
			// On masque les rubriques d'aide non pertinentes et affiche celles qui le sont
			$('.aideMdp, .aideSPI, .ocfiNonIR, .aideSpiPAS, .aideCode').addClass('hide').attr('aria-hidden', true);
			$('.aideIdentifiants').removeClass('hide').attr('aria-hidden', false);
			// On masque les rubriques d'aide qui seraient d&eacute;j&agrave; d&eacute;pli&eacute;es
			$('details').removeAttr("open");
			// Et on d&eacute;plie les rubriques d'aide en fonction du focus
			$('#rfr_tmp').on('focus', function () {
			$('details').not('#aide_rfr').removeAttr("open");
			$('#aide_rfr').attr('open', 'open');
			});
			$('#teledec_tmp').on('focus', function () {
			$('details').not('#aide_nael').removeAttr("open");
			$('#aide_nael').attr('open', 'open');
			});
			if (changespi == 1) {
				$("#changeSPI").removeClass("hide");
			}
			$('#fg_pwd').addClass('sr-only').removeClass('hide').attr('aria-hidden', true);
			$('#pwd_tmp').attr('tabindex',"-1");
			donneFocus('3S','teledec');
			break;
		case 'LMDP' :
			$('#titre_authent').html(messageContenu[nomForm+'titre_authent']);
			document.title=messageContenu['titreFenetre'+nomForm];
			afficheChampsenSus('LMDP','spi','pwd');
			//set lmAuth Value
			$('#authKey').val('LDAP');
			urlCible=urlLoginMotDePasse;
			if (authType == 'idp'){
				$('#consentement').removeClass('hide');
				$('#authType').val('idp');
			}
			$('#btnAction').html('Connexion').addClass('btn-primary btn-glow').removeClass('btn-default');
			//$('#btnAction').html('Continuer').addClass('btn-primary btn-glow').removeClass('disabled btn-default').parent().attr('');
			// On masque les rubriques d'aide non pertinentes et affiche celles qui le sont
			$('.aideMdp').removeClass('hide').attr('aria-hidden', false);
			$('.aideSPI, .aideIdentifiants, .ocfiNonIR, .aideSpiPAS, .aideCode').addClass('hide').attr('aria-hidden', true);
			// Et on d&eacute;plie les rubriques d'aide en fonction du focus
			$('#pwd_tmp').on('focus', function () {
				$('#aide_mdp').attr('open', 'open');
				$('details').not('#aide_mdp').removeAttr("open");
			});
			if (changespi == 1) {
				 $("#changeSPI").removeClass("hide");
			}
			$('#fg_pwd').removeClass('sr-only hide').attr('aria-hidden', false);
			$('#pwd_tmp').removeAttr("tabindex");
			if (visumdp==1) {
				$('#visumdp').removeAttr("tabindex");
				$("#ig_pwd").removeClass("col-md-12");
			}
			else {
				$("#ig_pwd").addClass("col-md-12");
			}
			donneFocus('LMDP','pwd');
			break;
			case 'PAS' :
				$('#titre_authent').html(messageContenu[nomForm+'titre_authent']);
				document.title=messageContenu['titreFenetre'+nomForm];
				//set lmAuth Value
			        $('#authKey').val('PAS');
				$('#fr_dateNaissance').removeClass('hide');
				urlCible=urlLoginPAS;
				$('#btnAction').html('Continuer').addClass('btn-primary btn-glow').removeClass('disabled btn-default').parent().attr('');
				// On masque les rubriques d'aide non pertinentes
				$('.aideSPI,.aideMdp,.aideIdentifiants, .ocfiNonIR,.aideSpiPAS, .aideCode').addClass('hide').attr('aria-hidden', true);
				//$('.ocfiNonIR').removeClass('hide').attr('aria-hidden', false);
				// On d&eacute;plie par d&eacute;faut la rubrique d'aide relative &agrave; la perte du mot de passe
				$('#aide_ocfiNonIR').attr('open', 'open');
				$('details').not('#aide_ocfiNonIR').removeAttr("open");
				if (changespi == 1) {
		 $("#changeSPI").removeClass("hide");
				}
				$('#fg_pwd').addClass('sr-only').removeClass('hide').attr('aria-hidden', true);
				$('#pwd_tmp').attr('tabindex',"-1");
				donneFocus('PAS','jourNaissance');
				break;
	}
}

//--------------------------------------------------------------------------------------
function controleFormulaireEtSubmit(verifierChangementIdentifiant,leBouton)
{
	var leFormulaire=$(leBouton).parents('form').attr('id');
	var nomFormulaire=$(leBouton).parents('form').attr('name');
	// window.alert("Form : " + leFormulaire );
	NoError();
	nbErr=0;
	nbCat2=0;
	focusTo="";
	if (verifierChangementIdentifiant==1) {
		if ( ($('#spi').val()) && $('#spi_tmp').val() && $('#spi_tmp').val() != $('#spi').val() ) {
			$('#formulairePrincipal').attr('action',urlContexte); $('#formulairePrincipal').attr('name','CTX');afficheForm('CTX');switchEtVideChamps('CTX','_tmp','url','spi'); return(true);
		}
	}
	switch (nomFormulaire)
	{
		// La creation du compte par la saisie des3 identifiants fiscaux
		case '3S':
			NoError();
			if (!obligatoire('spi') ) { nbCat2++; nbErr++;  }
			else if(!exactement('spi',13, messageContenu['badFormatSpi'])) { nbErr++; }
			if (!obligatoire('teledec') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="teledec"; }
			else if(!exactement('teledec',7,'Votre num&eacute;ro d\'acc&egrave;s en ligne comporte 7 chiffres&nbsp;;&nbsp;veuillez v&eacute;rifier votre saisie.')) { nbErr++;  if(focusTo.length==0)focusTo="teledec";  }
			if (!obligatoire('rfr') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="rfr";   }
			if(nbCat2) $('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
			if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ; return(false) ;  }
			switchEtVideChamps('3S','_tmp','url','lmAuth','spi','teledec','rfr');
			noSend(nomFormulaire);
			break;
			// ---------------------------------------------
			// L'obtention du contexte usager
		case 'CTX':
			NoError();
			if (!obligatoire('spi') ) { nbCat2++; nbErr++;  if(focusTo.length==0)focusTo="spi"; }
			else if(!exactement('spi',13, messageContenu['badFormatSpi'])) { nbErr++; if(focusTo.length==0)focusTo="spi";}
			if(nbCat2) $('#erreur').html('Vous devez saisir votre num&eacute;ro fiscal &agrave; 13 chiffres.').removeClass('alert alert-info hide').addClass('alert alert-danger text-center');
			if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ;  return(false); }
			videChamps('CTX','_tmp','pwd','teledec','rfr','jourNaissance','moisNaissance','anneeNaissance','dateNaissance');
			switchEtVideChamps('CTX','_tmp','url','lmAuth','spi');
			noSend(nomFormulaire);
			NoError();
			break;
			// ---------------------------------------------
			// L'accès par l'utilisation du compte déjà créé
		case 'LMDP':
			document.getElementById("pwd_tmp").value=trimU(document.getElementById("pwd_tmp").value);
			NoError();
			if (!obligatoire('spi') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="spi" ; }
			else if(!exactement('spi',13, messageContenu['badFormatSpi'])) { nbErr++;  if(focusTo.length==0)focusTo="spi";}
			if (!obligatoire('pwd') ) { nbCat2++; nbErr++;  if(focusTo.length==0)focusTo="pwd"; }
			else if(!auMoins('pwd',8,messageContenu['badFormatPwd'])) { nbErr++;  if(focusTo.length==0)focusTo="pwd";}
			else if(!verifiePWD('pwd',8,128,messageContenu['badFormatPwd'])) { nbErr++;  if(focusTo.length==0)focusTo="pwd"; }
			if(nbCat2) $('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
			if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ;  return(false); }
			switchEtVideChamps('LMDP','_tmp','url','lmAuth','fg','authType','spi','pwd');
			noSend(nomFormulaire);
			break;
			// ------------------------------------------------------------------------------------
			// La création du compte par la saisie de la date de naissance si le contexte s'y prête
		case 'PAS':
			NoError();
			if (!obligatoire('spi') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="spi";  }
			else if(!exactement('spi',13, messageContenu['badFormatSpi'])) { nbErr++; }
			if (!obligatoireNoFg('jourNaissance') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="jourNaissance"; }
			else if(!exactementv2('jourNaissance',2,messageContenu['badFormatDate'],'Cat1_dateNaissance')) { nbErr++; if(focusTo.length==0)focusTo="jourNaissance"; }
			if (!obligatoireNoFg('moisNaissance') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="moisNaissance"; }
			else if(!exactementv2('moisNaissance',2,messageContenu['badFormatDate'],'Cat1_dateNaissance')) { nbErr++; if(focusTo.length==0)focusTo="moisNaissance"; }
			if (!obligatoireNoFg('anneeNaissance') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="anneeNaissance"; }
			else if(!exactementv2('anneeNaissance',4,messageContenu['badFormatDate'],'Cat1_dateNaissance')) { nbErr++; if(focusTo.length==0)focusTo="anneeNaissance"; }
			if(!nbErr) if(!verifieDatev2('jourNaissance','moisNaissance','anneeNaissance','dateNaissance',messageContenu['badFormatDate'],'01/01/1905')) { if(focusTo.length==0)focusTo="jourNaissance" ; nbErr++;}
			if(nbCat2) $('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
			if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ;  return(false); }
			$('#dateNaissance_tmp').val($('#jourNaissance_tmp').val()+"/"+$('#moisNaissance_tmp').val()+"/"+$('#anneeNaissance_tmp').val());
			switchEtVideChamps('PAS','_tmp','url','lmAuth','spi','jourNaissance','moisNaissance','anneeNaissance','dateNaissance');
			var avant;
			var apres;
			avant=$("#"+'dateNaissance').val();
			apres=avant.replace(/^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])/,"$3/$2/$1");
			$("#"+'dateNaissance').val(apres);
			noSend(nomFormulaire);
			break;
			// ------------------------------------------------------------------------------------
			// La fonction de recuperation du mot de passe en cas d'oubli
		case 'oubliMotDePasseForm':
			NoError();
			if (!obligatoire('numfiscal') ) { nbCat2++; nbErr++;  if(focusTo.length==0)focusTo="numfiscal";}
			else if(!exactement('numfiscal',13, messageContenu['badFormatSpi'])) { nbErr++; if(focusTo.length==0)focusTo="numfiscal"; }
			if (!obligatoire('LostPassword_captchaText') ) { nbCat2++; nbErr++;  if(focusTo.length==0)focusTo="LostPassword_captchaText";}
			if (!obligatoireNoFg('LostPassword_jourNaissance') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="LostPassword_jourNaissance"; }
			else if(!exactementv2('LostPassword_jourNaissance',2,messageContenu['badFormatDate'],'Cat1_LostPassword_DateNaissance')) { nbErr++; if(focusTo.length==0)focusTo="LostPassword_jourNaissance"; }
			if (!obligatoireNoFg('LostPassword_moisNaissance') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="LostPassword_moisNaissance"; }
			else if(!exactementv2('LostPassword_moisNaissance',2,messageContenu['badFormatDate'],'Cat1_LostPassword_DateNaissance')) { nbErr++; if(focusTo.length==0)focusTo="LostPassword_moisNaissance"; }
			if (!obligatoireNoFg('LostPassword_anneeNaissance') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="LostPassword_anneeNaissance"; }
			else if(!exactementv2('LostPassword_anneeNaissance',4,messageContenu['badFormatDate'],'Cat1_LostPassword_DateNaissance')) { nbErr++; if(focusTo.length==0)focusTo="LostPassword_anneeNaissance"; }
			if(!nbErr) if(!verifieDatev2('LostPassword_jourNaissance','LostPassword_moisNaissance','LostPassword_anneeNaissance','LostPassword_DateNaissance',messageContenu['badFormatDate'],'01/01/1905')) { if(focusTo.length==0)focusTo="LostPassword_jourNaissance" ; nbErr++;}
			if(nbCat2) $('#erreurModPwd').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
			if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ; return(false); }
			$('#LostPassword_dateNaissance_tmp').val($('#LostPassword_jourNaissance_tmp').val()+$('#LostPassword_moisNaissance_tmp').val()+$('#LostPassword_anneeNaissance_tmp').val());
			switchEtVideChampsSurId('oubliMotDePasseForm','_tmp','url','numfiscal','LostPassword_captchaText','LostPassword_dateNaissance');
			noSend(nomFormulaire);
			break;
		// ------------------------------------------------------------------------------------
		// La fonction de recuperation du numero fiscal en cas d'oubli
			case 'oubliNumFiscalForm':
			NoError();
				if (!obligatoire('LostSpi_email') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="LostSpi_email"; }
				//else if(!exactement('numfiscal',13,'Votre num&eacute;ro fiscal comporte 13 chiffres&nbsp;;&nbsp;veuillez v&eacute;rifier votre saisie.')) { nbErr++; }
				if (!obligatoire('LostSpi_captchaText') ) { nbCat2++; nbErr++;  if(focusTo.length==0)focusTo="LostSpi_captchaText";}
				if (!obligatoireNoFg('LostSpi_jourNaissance') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="LostSpi_jourNaissance"; }
				else if(!exactementv2('LostSpi_jourNaissance',2,messageContenu['badFormatDate'],'Cat1_LostSpi_DateNaissance')) { nbErr++; if(focusTo.length==0)focusTo="LostSpi_jourNaissance"; }
				if (!obligatoireNoFg('LostSpi_moisNaissance') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="LostSpi_moisNaissance"; }
				else if(!exactementv2('LostSpi_moisNaissance',2,messageContenu['badFormatDate'],'Cat1_LostSpi_DateNaissance')) { nbErr++; if(focusTo.length==0)focusTo="LostSpi_moisNaissance"; }
				if (!obligatoireNoFg('LostSpi_anneeNaissance') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="LostSpi_anneeNaissance"; }
				else if(!exactementv2('LostSpi_anneeNaissance',4,messageContenu['badFormatDate'],'Cat1_LostSpi_DateNaissance')) { nbErr++; if(focusTo.length==0)focusTo="LostSpi_anneeNaissance"; }
				if(!nbErr) if(!verifieDatev2('LostSpi_jourNaissance','LostSpi_moisNaissance','LostSpi_anneeNaissance','LostSpi_DateNaissance',messageContenu['badFormatDate'],'01/01/1905')) { if(focusTo.length==0)focusTo="LostSpi_jourNaissance" ; nbErr++;}
				if(nbCat2) $('#erreurModFisc').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
				if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ; return(false); }
				$('#LostSpi_dateNaissance_tmp').val($('#LostSpi_jourNaissance_tmp').val()+$('#LostSpi_moisNaissance_tmp').val()+$('#LostSpi_anneeNaissance_tmp').val());
				if(! $('#oubliNumFiscalForm')[0].checkValidity()) {
					// If the form is invalid, submit it. The form won't actually submit;
					// this will just cause the browser to display the native HTML5 error messages.
					erreurEtGardeChamps("email");
					$('#oubliNumFiscalForm')[0].find(':submit').click();
					return(false);
				}
				switchEtVideChampsSurId('oubliNumFiscalForm','_tmp','url','LostSpi_email','LostSpi_captchaText','LostSpi_dateNaissance');
				noSend('oubliNumFiscalForm');
				noSend('oubliMotDePasseForm');
				noSend(nomFormulaire);
				break;
		case 'checkSMSForm':
			NoError();
			if($("#"+nomFormulaire).find('button').val()!="newSMS") {
				if (!obligatoire('code_SMS') ) { nbCat2++; nbErr++; if(focusTo.length==0)focusTo="LostSpi_SMS"; }
				if(nbCat2) $('#erreurModSMS').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
				if(nbErr) { if(focusTo.length!=0)donneFocus(nomFormulaire,focusTo) ; return(false); }
			}
			if (typeof timeoutId === 'undefined' ) {
			} else {
				clearTimeout(timeoutId);
			}
			switchEtVideChampsSurId('checkSMSForm','_tmp','code_SMS');
			noSend('checkSMSForm');
			break;
	}
}

//--------------------------------------------------------------------------------------------------
function messageACaractereInformatif(leMessage) {
	$('#erreur').html(leMessage).removeClass('alert alert-danger hide').addClass('alert alert-info text-center');
}

//--------------------------------------------------------------------------------------------------
// Mise en place du traitement des reponses d'obtention du contexte ou de l'authentification
//--------------------------------------------------------------------------------------------------
function ecouteReponseForm()
{
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
	eventer(messageEvent,function(e) {
		if (e.origin !== "https://cfspart-idp.impots.gouv.fr"  &&  e.origin !== "https://cfspart.impots.gouv.fr" ) return;
		message = e.data.split(',')[0];
		value = e.data.split(',')[1];
		indTel = e.data.split(',')[2];
		numTel = e.data.split(',')[3];
		switch(message) {
			case 'ctx': {
				rePermit('CTX');
				var verifieSiLink = new RegExp(".*_LINK:[0-9]+");
				if (verifieSiLink.test(value)) {
					// Récupération de l'age du lien
					 ageLien=value.split(':')[1];
					// Durée max de 8H
					ValidationMax=8*3600;
					// Calcul de la durée restante
					 ValideEncore=ValidationMax-ageLien;
					// Affectation du nouveau code à transmettre sans le lien
					newValue=value.split(':')[0];
					value=newValue;
					// Gestion du texte à afficher
					texteValide="";
					nbH=parseInt(ValideEncore/3600);
					nbM=parseInt((ValideEncore-(nbH*3600))/60);
					if(nbH){texteValide=', valable '+nbH+(nbH>1 ? ' heures' : ' heure'); }
					if(nbM){texteValide=texteValide+ (nbH ? ', ' : ', valable ') + nbM + (nbM>1 ? ' minutes' : ' minute'); }
					if(texteValide.length) texteValide+=',';
				}
				if( $('#spi').val())  $('#spi_tmp').val($('#spi').val()) ;
				switch(value) {
					case 'FORMAT':
						NoError();
						$('#blocage').html('').removeClass('alert alert-info').addClass('alert alert-danger hide');
						$('#erreur').html(messageContenu['badFormatSpi']).removeClass('alert alert-info hide').addClass('alert alert-danger');
						break;
					case 'LMDP':
						NoError();
						$('#FranceConnect').removeClass('hide');
						afficheForm('LMDP');
						break;
					case '3S_LINK':
					case 'PAS_LINK':
					case 'MPA_LINK':
						NoError();
						messageACaractereInformatif(messageContenu['enCours1']+texteValide+messageContenu['enCours2']+messageContenu['enCours3']);
						if(authType=="idp") {
							afficheForm('CTX');
						} else {
							$('#FranceConnect').removeClass('hide');
							afficheForm(value.replace("_LINK","").replace("MPA","PAS"));
							messageACaractereInformatif(messageContenu['enCours1']+texteValide+messageContenu['enCours2']+messageContenu['enCours3']);
						}
						break;
					case '3S':
					case 'MPA':
					case 'PAS':
						NoError();
						if (authType=="idp") {
							$('#erreur').html(messageContenu['ctx_noLV']).removeClass('alert alert-info hide').addClass('alert alert-danger');
							// On masque les rubriques d'aide non pertinentes
							$('.aideMdp, .aideSPI, .ocfiNonIR, .aideSpiPAS, .aideCode').addClass('hide').attr('aria-hidden', true);
							afficheForm('CTX');
						} else {
							$('#FranceConnect').removeClass('hide');
							afficheForm(value.replace("MPA","PAS"));
						}
						break;
					case 'ERR' :
						NoError();
						afficheForm('CTX');
						$('#FranceConnect').removeClass('hide');
						$('#erreur').html('L\'application est indisponible ; veuillez r&eacute;essayer ult&eacute;rieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
						break;
					case 'NOINFO':
						NoError();
						$('#FranceConnect').removeClass('hide');
						//messageACaractereInformatif(messageContenu[message+'_'+value]);
						$('#erreur').html(messageContenu[message+'_'+value]).addClass('text-center alert-danger').removeClass('hide alert-info');
						$('.ocfiNonIR').removeClass('hide').attr('aria-hidden', false);
						$('#aide_ocfiNonIR').attr('open','open');
						// On masque les rubriques d'aide non pertinentes
						$('.aideSPI,.aideMdp,.aideIdentifiants, .aideCode').addClass('hide').attr('aria-hidden', true);
						break;
					case 'AMALGAME':
						NoError();
						$('#erreur').html(messageContenu['ctx_AMALGAME']).removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
						break;
					case 'EXISTEPAS':
						NoError();
						//messageACaractereInformatif(messageContenu[message+'_'+value]);
						$('#erreur').html(messageContenu[message+'_'+value]).removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
						// On masque les rubriques d'aide non pertinentes
						$('.aideSPI,.aideMdp,.aideIdentifiants, .ocfiNonIr, .aideCode').addClass('hide').attr('aria-hidden', true);
						erreurEtGardeChamps('spi');
						donneFocus('CTX','spi');
						break;
					case 'BLOCAGE':
						NoError();
						//messageACaractereInformatif(messageContenu[message+'_'+value]);
						$('#erreur').html(messageContenu[message+'_'+value]).removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
						// On masque les rubriques d'aide non pertinentes
						$('.aideSPI,.aideMdp,.aideIdentifiants, .ocfiNonIr, .aideCode').addClass('hide').attr('aria-hidden', true);
						erreurEtGardeChamps('spi');
						rePermit('CTX');
						donneFocus('CTX','spi');
						break;
					default:
						var verifieSiDoublon = new RegExp("DOUBLON:");
						NoError();
						if (verifieSiDoublon.test(value)) {
							var verifieSiDoublonL = new RegExp("DOUBLON:L");
							if (verifieSiDoublonL.test(value)) {
								messageACaractereInformatif(messageContenu['ctx_DOUBLON_L']);
							}
							else {
								actif=value.split(':')[2];
								messageACaractereInformatif(messageContenu['ctx_DOUBLON_nonL'].replace('__ACTIF__',actif));
								$('#spi_tmp').val(actif);
							}
						}
				}
			}
			break;
			//------------------------------------------------------------------------------------------------------------------
			//Acces via LMDP
			//------------------------------------------------------------------------------------------------------------------
			case 'lmdp':
				traiteLMDP(value);
				break;
			//------------------------------------------------------------------------------------------------------------------
			//Acces creation via date si PAS/MP
			//------------------------------------------------------------------------------------------------------------------
			case 'pas':
				traitePAS(value);
				break;
			//------------------------------------------------------------------------------------------------------------------
			//Acces creation via 3S
			//------------------------------------------------------------------------------------------------------------------
			case '3S':
				traite3S(value);
				break;
			//------------------------------------------------------------------------------------------------------------------
			//Les oublis/récupérations
			//------------------------------------------------------------------------------------------------------------------
			case 'passPerdu':
			case 'numFiscal':
				traiteOubli(message,value,indTel,numTel);
				break;
			//------------------------------------------------------------------------------------------------------------------
			//Retour OK d'une auth.
			//------------------------------------------------------------------------------------------------------------------
			case 'ok':
				//$('#erreur').html('Authentification r&eacute;ussie.').removeClass('hide alert-danger text-center').addClass('alert alert-info');
				$('#erreur').html('').removeClass('alert-danger text-center').addClass('alert alert-danger hide');
				$('#blocage').html('').removeClass('alert-info').addClass('alert alert-danger hide ');
				document.location.href=value;
				break;
			//------------------------------------------------------------------------------------------------------------------
            //Retour otp form 
            //------------------------------------------------------------------------------------------------------------------
            case 'otp':
                // gotham                             
                myiframedom = document.getElementById('hidden-formulairePrincipal');
                if(myiframedom !== null){
                  document.body.innerHTML = myiframedom.contentWindow.document.body.innerHTML;
				  document.getElementById("otpSubmit").addEventListener("click", function (e) {

 				  	var max=$("#extcode").attr('data-max');
  				 	var longueur =(max) ? max : -1 ;

					if ($("#extcode").val().length==0) {
						e.preventDefault();
						$('#CAT1_extcode').html('La saisie du code temporaire est obligatoire.').removeClass('hide').addClass('alert alert-danger');
						console.log('code vide '.longueur);
					}

					else if ($("#extcode").val().length!=longueur) {
						e.preventDefault();
						$('#CAT1_extcode').html('Le format du code temporaire renseigné est incorrect.').removeClass('hide').addClass('alert alert-danger');
						$("#extcode").attr("aria-describedby","CAT1_extcode");
						console.log('code non conforme');
					}
				});

				controleEntreeLive();
                }
            break;

			//------------------------------------------------------------------------------------------------------------------
			//Indispo générée par MP
			//------------------------------------------------------------------------------------------------------------------
			case 'indispoMP':
				$("#passPerdu").modal('hide');
				$("#numFiscal").modal('hide');
				$("#indispoMP").modal('show');
				break;
			//Fin traitement des messages retours des soumissions
			default :
		}
	},false);
}

//--------------------------------------------------------------------------------------------------------------------------------------
//Controle des champs de saisie a chaque modification - s'appuie sur  balises libres data-* coté html pour le parametrage des traitements
//--------------------------------------------------------------------------------------------------------------------------------------
function controleEntreeLive(){
	var oldInput="";
	$("input").on('change input', function (e) {
		var masks = {
			//liste des masques : le complement de ce que l'on accepte
			'int': /[^0-9]/g,
			'alpha': /[^a-z]/g,
			'alphanum': /[^a-zA-Z0-9]/g,
			'mail': /[^-_\.@a-zA-Z0-9]/g,
			'date': /[^0-9\/]/g,
			'mois': /[^0-9\/]/g,
			'jour': /[^0-9\/]/g
		};
		var mask=$(this).attr('data-mask');
		var feedbackOK=$(this).attr('data-feedbackok');
		//Si data-mask existe, on verifie la saisie pour cet input
		if (mask) {
			var regex = (masks[mask]) ? masks[mask] : mask;
			var max=$(this).attr('data-max');
			var lgMax =(max) ? max : -1 ;
			var sale= $(this).val();
			var propre=sale.replace(regex,"");
			propre=propre.substring(0,lgMax);
			switch (mask) {
				//-----------------------------------------------------------------------------------------------------------------
				case 'jour' :
					newpropre=propre.replace(/^0\//,"0").replace(/^\//,"").replace(/^00/,"0");
					//newpropre=newpropre
					if(propre!=newpropre) {
						propre=newpropre;
					}
					else {
						newpropre=propre.replace(/^([1-9])\//,"0$1");
						if(propre!=newpropre) {
							propre=newpropre;
							sale=propre;
							$(this).parent().next().children('input').focus();
							$(this).parent().next().children('input').focusin();
						}
						else {
							//Le controle de la valeur sera realise a la soumission
							//var regJJ = /^[0123][0-9]$/
							var regJJ = /^[0-9][0-9]$/
							if (propre.match(regJJ)) {
								$(this).parent().next().children('input').focus();
								$(this).parent().next().children('input').focusin();
							}
						}
					}
					break ;
				//-----------------------------------------------------------------------------------------------------------------
				case 'mois' :
					if(precedent.length==propre.length+1) {
						if (precedent.substring(precedent.length-1,precedent.length)=="/") {
							propre=propre.substring(0,propre.length-1);
							sale=propre;
						}
					}
					else {
						newpropre=propre.replace(/^0\//,"0").replace(/^\//,"").replace(/^00/,"0");
						//newpropre=newpropre
						if(propre!=newpropre) {
							propre=newpropre;
						}
						else {
							newpropre=propre.replace(/^([1-9])\//,"0$1");
							if(propre!=newpropre) {
								propre=newpropre;
								sale=propre;
								var inputs = $(':input')
								var nextInput = inputs.get(inputs.index(this) + 1);
								if (nextInput) {
									nextInput.focus();
								}
							}
							else {
								//Le controle de la valeur sera realise a la soumission
								//var regMM = /^[01][0-9]$/
								var regMM = /^[0-9][0-9]$/
								if (propre.match(regMM)) {
									var inputs = $(':input')
									var nextInput = inputs.get(inputs.index(this) + 1);
									if (nextInput) {
										nextInput.focus();
									}
								}
							}
						}
					}
					break ;
					//-----------------------------------------------------------------------------------------------------------------
					case 'date' :
						if(precedent.length==propre.length+1) {
							if (precedent.substring(precedent.length-1,precedent.length)=="/") {
								propre=propre.substring(0,propre.length-1);
								sale=propre;
							}
						}
						else {
							//1=<J=<9
							newpropre=propre.replace(/^([1-9])\//,"0$1/");
							if (newpropre==propre)newpropre=propre.replace(/^([0-9][1-9])$/,"$1/");
							//1=<M=<9
							finalpropre=newpropre.replace(/^(..)\/([1-9])\//,"$1/0$2/");
							if (finalpropre==newpropre) {
								finalpropre=newpropre.replace(/^(..)\/([0-9][0-9])$/,"$1/$2/");
							}
							if(propre!=finalpropre) {
								propre=finalpropre;
								sale=propre;
							}
						}
						break;
					default:
			}
			$(this).val(propre);
			//var propre=sale.replace(regex,"").substring(0,lgMax);
			if(propre.length==lgMax) {
				if (feedbackOK) {
					$(this).css({ color: 'green' });
					if($('#formulairePrincipal').attr('name')=='CTX') {
						$('#btnAction').removeAttr("aria-label").addClass('btn-primary btn-glow').removeClass('btn-default').removeClass('disabled').parent().attr({ 'data-original-title': '', 'data-toggle': 'tooltip', 'data-placement': 'bottom' })
					}
					if($('#otpform').length) {
						$('#otpSubmit').removeAttr("aria-label").addClass('btn-primary btn-glow').removeClass('btn-default').removeClass('disabled').parent().attr({ 'data-original-title': '', 'data-toggle': 'tooltip', 'data-placement': 'bottom' })
					}
				}
			}
			if (sale.length > lgMax ){
				var prefix="liveCheck_";
				idDivMessage= prefix + $(this).attr('id');
				$('#'+idDivMessage).html('Longueur maximale').removeClass('hidden');
				setTimeout(function() {
					$('#'+idDivMessage).html('Longueur maximale').addClass('hidden');
				}, 1500);
			} else if (propre!=sale) {
					var prefix="liveCheck_";
					idDivMessage= prefix + $(this).attr('id');
					$('#'+idDivMessage).html('Caract&egrave;re non autoris&eacute').removeClass('hidden');
					setTimeout(function() {
						$('#'+idDivMessage).html('Caract&egrave;re non autoris&eacute;').addClass('hidden');
					}, 1500);
			}
			if(propre.length<lgMax) {
				if (feedbackOK) {
					$(this).css({ color: '#555' });
					if($('#formulairePrincipal').attr('name')=='CTX') {
						$('#btnAction').attr('aria-label','Pour continuer, veuillez saisir votre numéro fiscal.').addClass('btn-default').removeClass('btn-primary btn-glow').addClass('disabled').parent().attr({ 'data-original-title': 'Pour continuer, veuillez saisir votre numéro fiscal.', 'data-toggle': 'tooltip', 'data-placement': 'bottom' })
					}
					if($('#otpform').length ) {
						$('#otpSubmit').attr('aria-label','Pour continuer, veuillez saisir votre code OTP.').addClass('btn-default').removeClass('btn-primary btn-glow').addClass('disabled').parent().attr({ 'data-original-title': 'Pour continuer, veuillez saisir votre code OTP.', 'data-toggle': 'tooltip', 'data-placement': 'bottom' })
					}
				}
			}
			oldInput=propre;
		}
		precedent=propre;
	});
}

//---------------------------------------------------------------------------------------------------------------------------
//Gestion des rubriques d'aide
//---------------------------------------------------------------------------------------------------------------------------
function accordeon(){
	$('details').click(function (event) {
		$('details').not(this).removeAttr("open").attr('aria-hidden', true);
	});
}

//---------------------------------------------------------------------------------------------------------------------------
//Gestion de la deconnexion
//---------------------------------------------------------------------------------------------------------------------------
function disconnect(courant,nbApp,cible){
	if( courant == 0 ){
		iframes[courant] = document.getElementById("app0");
		iframes[courant].called = 0;
		if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera){
			// ------------------------------------------------ IE
			iframes[courant].onreadystatechange = function(oframe){
				if(!oframe && iframes[courant].called == 0){
		iframes[courant].called = 1;
		oframe = iframes[courant];
				}else{
		if(!oframe){
			return;
		}
				}
				if (iframes[courant].readyState == "complete"){
		courant++;
		setTimeout(disconnect(courant,nbApp,cible),deco_delay);
				}else{
		setTimeout("iframes["+courant+"].onreadystatechange(iframes["+courant+"])",deco_delay);
				}
			};
		}else{
			// ----------------------------------------------non IE
			iframes[courant].onload = function(){
				courant++;
				setTimeout(disconnect(courant,nbApp,cible),deco_delay);
			};
		}
		document.getElementById("app0").src = "/root/deconnexionGlobaleDAC";
	}else{
		if( courant <= nbApp ){
			iframes[courant] = document.getElementById("app"+courant);
			iframes[courant].called = 0;
			if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera){
				iframes[courant].onreadystatechange = function(oframe){
		if(!oframe && iframes[courant].called == 0){
			iframes[courant].called = 1;
			oframe = iframes[courant];
		}else{
			if(!oframe){
				return;
			}
		}
		if (iframes[courant].readyState == "complete"){
			courant++;
			setTimeout(disconnect(courant,nbApp,cible),deco_delay);
		}else{
				setTimeout("iframes["+courant+"].onreadystatechange(iframes["+courant+"])",deco_delay);
			}
				};
			}else{
				iframes[courant].onload = function(){ courant++; setTimeout(disconnect(courant,nbApp,cible),deco_delay); };
			}
		document.getElementById("app" + courant).src = "/"+files[courant-1]+"/deconnexionGlobaleDAC";
		}else{
			window.location.href = cible;
		}
	}
}

//--------------------------------------------------------------------------------
//Traitement des soumissions des lostIds
//--------------------------------------------------------------------------------
function traiteOubli(oubli,retour,indTel,numTel){
	NoError();
	message="";
	focusTo="";
	nomFormOubli="";
	nomFormSMS="";
	nomModSMS="";
	nomModSMS="checkSMSMod";
	nomFormSMS="checkSMSForm";
	nomModOubli="";
	inSMS=0;
	ITX=0;
	//--------------------------------------------------------------------------------------------
	var cibleForm = {
		'passPerdu' : '/monprofil-webapp/noAuth/LostPassword',
		'numFiscal' : '/monprofil-webapp/noAuth/LostSpi'
	};
	//--------------------------------------------------------------------------------------------
	var nameBoutonSMS = {
		'passPerdu' : 'lostpass',
		'numFiscal' : 'lostspi'
	};
	//--------------------------------------------------------------------------------------------
	var firstForm = {
		'passPerdu' : 'oubliMotDePasseForm',
		'numFiscal' : 'oubliNumFiscalForm'
	}
	//--------------------------------------------------------------------------------------------
	var lastModOK = {
		'passPerdu' : 'confirmationPassword',
		'numFiscal' : 'confirmationSpi'
	}
	nomModOubli=oubli;
	//--------------------------------------------------------------------------------------------
	$('#buttonSMS').attr('name',nameBoutonSMS[oubli]);
	//--------------------------------------------------------------------------------------------
		$("#"+nomFormSMS).attr('action',cibleForm[oubli]);
	//--------------------------------------------------------------------------------------------
	$("#"+nomModSMS).find(".modal-title").text(messageContenu['titreModale'+nomModOubli]);
	//--------------------------------------------------------------------------------------------
	nomFormOubli=firstForm[oubli];
	reverseEtGardeChampsSurId(nomFormOubli,'_tmp','numfiscal','LostSpi_email');
	if (typeof numTel !== 'undefined') {
		var verifieSiITX = new RegExp(":[0-9]{6}$");
		if (verifieSiITX.test(numTel)) {
			ITX=1;
			numTelNew=numTel.split(':')[0];
			ss=numTel.split(':')[1];
			numTel=numTelNew;
		}
		else {
		}
	}
	rePermit(nomFormOubli);
	ok=0;
	switch(retour) {
		// ----------------------------------------------------------------------------------------
		// Validation code SMS 2em form OK  -> on affiche modale confirmation apres retrait mod SMS
		// ----------------------------------------------------------------------------------------
		case (retour.match(/^OK_TELVAL[:]{0,1}/) || {}).input :
			if ( $("#"+oubli).hasClass('in') ){
				$("#"+oubli).modal('hide');
			}
			$("#"+nomModSMS).modal('hide');
			$("#"+lastModOK[oubli]).modal('show');
			$("#"+lastModOK[oubli]).find(".modal-title").text(messageContenu['titreModale'+oubli]);
			var checkITX = new RegExp(/^OK_TELVAL:/);
			if (checkITX.test(retour)) {
			l=10;
			$("#confirmationPassword").find('.lienMP').remove();
			$("#confirmationPassword").find('.modal-body').append("<p class='lienMP'>"+retour.substring(l)+"</p>");
		}
			break;
		// -----------------------------------------------------------------------------------
		// Validation 1er form OK et pas de tel candidat SMS -> on ajoute rappel besoin Secu
		// -----------------------------------------------------------------------------------
		//case "OK":
		case (retour.match(/^OK[:]{0,1}/) || {}).input :
			$("#"+nomModOubli).modal('hide');
			$("#"+lastModOK[oubli]).modal('show');
			$("#"+lastModOK[oubli]).find(".modal-title").text(messageContenu['titreModale'+oubli]);
			ok=1;
			if (debrayerSMS==0) {
				message=messageContenu['SMSNEEDSECURE'];
				$("#"+oubli+"MsgInfoNeedSecure").html(message);
				$("#"+oubli+"MsgInfoNeedSecure").removeClass('alert-danger hide text-center').addClass('alert alert-info');
			} else {
			}
			var checkITX = new RegExp(/^OK:/);
			if (checkITX.test(retour)) {
			l=3;
			$("#confirmationPassword").find('.lienMP').remove();
			$("#confirmationPassword").find('.modal-body').append("<p class='lienMP'>"+retour.substring(l)+"</p>");
		}
			break;
		// -----------------------------------------------------------------------------------
		// Validation code SMS 2em form KO presence cote SRVR
		// -----------------------------------------------------------------------------------
		case "KO_ABSENT":
			rePermit(nomFormSMS);
			$('#erreurModSMS').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('hide text-center').addClass('alert alert-danger');
			break;
		// -----------------------------------------------------------------------------------
		// Validation code SMS 2em form KO format cote SRVR
		// -----------------------------------------------------------------------------------
		case "KO_FORMAT":
			rePermit(nomFormSMS);
			$('#erreurModSMS').html(messageContenu['SMSBADFORMAT']).removeClass('hide text-center').addClass('alert alert-danger');
			break;
		// -----------------------------------------------------------------------------------
		// Un nouvel envoi de SMS a ete possible
		//      -> soit C direct apres submit OK form 1
		//      soit C suite demande explicite dans le dialogue form 2 deja engage
		// -----------------------------------------------------------------------------------
		case (retour.match(/^RENEW_OK/) || {}).input :
			if (inSMS==0) {
				$("#"+nomModOubli).modal('hide');
				$("#"+nomModSMS).modal('show');
				inSMS=1;
				$("#msgInfoSMS").html(messageContenu['infoSMS'+nomModOubli]+messageContenu['SMSSENDOK'].replace("__INDICATIF__",indTel).replace('__NUMTEL__',numTel));
				$("#msgInfoSMS").removeClass('alert alert-danger hide text-center').addClass('alert alert-info');
			}
			rePermit(nomFormSMS);
			$('#infoRenewSMS').html(messageContenu['SMSRENEWOK']).removeClass('hide text-center alert-info alert-error').addClass('alert alert-success');
			if (ITX==1) $('#msgInfoSMSITX').html(messageContenu['SMSITX'].replace('__CODE__',ss)).removeClass('hide text-center alert-info alert-error').addClass('alert alert-success');
			// next submit 4 sms check
			$('#'+nomFormSMS).find('button').val('checkSMS');
			$('#'+nomFormSMS).find('button').text(messageContenu['boutonSMS'+nomModOubli]);
			$("#"+"P_codeNonRecu").removeClass('hide');
			break;
		// -----------------------------------------------------------------------------------
		// Un nouvel envoi de SMS n'a pas ete possible
		//      -> soit C direct apres submit OK form 1
		//      soit C suite demande explicite dans le dialogue form 2 deja engage
		// -----------------------------------------------------------------------------------
		case (retour.match(/^RENEW_KO_[0-9]{1,2}/) || {}).input :
			attente=retour.split('_')[2];
			attente++;
			messageAttente=attente+" minute";
			if(attente>1)messageAttente+="s";
			if(inSMS==0) {
				$("#"+nomModOubli).modal('hide');
				$("#"+nomModSMS).modal('show');
				inSMS=1;
				$("#msgInfoSMS").html(messageContenu['infoSMS'+nomModOubli]+messageContenu['SMSSENDOK'].replace("__INDICATIF__",indTel).replace('__NUMTEL__',numTel));
				//$("#msgInfoSMS").html(messageContenu['SMSSENDOK'].replace("__INDICATIF__",indTel).replace('__NUMTEL__',numTel));
				$("#msgInfoSMS").removeClass('alert alert-danger hide text-center').addClass('alert alert-info');
				$('#infoRenewSMS').html('Un code de validation vous a d&eacute;j&agrave; &eacute;t&eacute; envoy&eacute;.').removeClass('hide text-center alert-info alert-error').addClass('alert alert-success');
			}
			//$('#infoLastSMS').html(messageContenu['SMSRENEWLAST'].replace("__N__",messageAttente)).removeClass('hide text-center alert-info alert-success').addClass('alert alert-error');
			decompte('infoLastSMS',attente);
			// next submit 4 sms check
			$('#'+nomFormSMS).find('button').val('checkSMS');
			$('#'+nomFormSMS).find('button').text(messageContenu['boutonSMS'+nomModOubli]);
			$("#msgInfoSMS").removeClass('alert alert-danger hide text-center').addClass('alert alert-info');
			rePermit(nomFormSMS);
			$("#"+"P_codeNonRecu").addClass('hide');
			if (ITX==1) $('#msgInfoSMSITX').html(messageContenu['SMSITX'].replace('__CODE__',ss)).removeClass('hide text-center alert-info alert-error').addClass('alert alert-success');
			break;
		// -----------------------------------------------------------------------------
		// Un nouvel envoi de SMS a ete possible  MAIS c'est le dernier
		//      -> prevenir le user
		//      -> soit C direct apres submit OK form 1
		//      soit C suite demande explicite dans le dialogue form 2 deja engage
		// -----------------------------------------------------------------------------
		case (retour.match(/^RENEW_LAST_[0-9]{1,2}/) || {}).input :
			attente=retour.split('_')[2];
			attente++;
			messageAttente=attente+" minute";
			if(attente>1)messageAttente+="s";
			if(inSMS==0) {
				$("#"+nomModOubli).modal('hide');
				$("#"+nomModSMS).modal('show');
				inSMS=1;
				$("#msgInfoSMS").html(messageContenu['infoSMS'+nomModOubli]+messageContenu['SMSSENDOK'].replace("__INDICATIF__",indTel).replace('__NUMTEL__',numTel));
				//$("#msgInfoSMS").html(messageContenu['SMSSENDOK'].replace("__INDICATIF__",indTel).replace('__NUMTEL__',numTel));
				$("#msgInfoSMS").removeClass('alert alert-danger hide text-center').addClass('alert alert-info');
				$('#infoRenewSMS').html(messageContenu['SMSRENEWOK']).removeClass('hide text-center alert-info alert-error').addClass('alert alert-success');
			}
			// next submit 4 sms check
			$('#'+nomFormSMS).find('button').val('checkSMS');
			$('#'+nomFormSMS).find('button').text(messageContenu['boutonSMS'+nomModOubli]);
			//$('#infoLastSMS').html(messageContenu['SMSRENEWLAST'].replace("__N__",messageAttente)).removeClass('hide text-center alert-info alert-success').addClass('alert alert-error');
				//$("#erreurModSMS").html(message+" (apres la fin du délai indiqué)").removeClass('hide text-center').addClass('alert alert-danger');
	 decompte('infoLastSMS',attente);
			$("#msgInfoSMS").removeClass('alert alert-danger hide text-center').addClass('alert alert-info');
			$("#"+"P_codeNonRecu").addClass('hide');
			if (ITX==1) $('#msgInfoSMSITX').html(messageContenu['SMSITX'].replace('__CODE__',ss)).removeClass('hide text-center alert-info alert-error').addClass('alert alert-success');
			rePermit(nomFormSMS);
			break;
		// Un nouvel envoi de SMS a ete possible ET ce n'est PAS le dernier
		//      -> NE PAS prevenir le user
		//      -> soit C direct apres submit OK form 1
		//      soit C suite demande explicite dans le dialogue form 2 deja engage
		case (retour.match(/^RENEW_OK[:]{0,1}/) || {}).input :
			var verifieSiITX = new RegExp(":[0-9]{6}$");
			if (verifieSiITX.test(retour)) {
		ITX=1;
		retourNew=retour.split(':')[0];
		ss=retour.split(':')[1];
		retour=retourNew;
			}
			if(inSMS==0) {
				$("#"+nomModOubli).modal('hide');
				$("#"+nomModSMS).modal('show');
				inSMS=1;
				$('#infoRenewSMS').html('Un code de validation vous a deja ete sendee calice !').removeClass('hide text-center alert-info alert-error').addClass('alert alert-success');
			} else {
				$('#infoLastSMS').html(messageContenu['SMSRENEWLAST'].replace("__N__",messageAttente)).removeClass('hide text-center alert-info alert-success').addClass('alert alert-error');
				$("#"+"P_codeNonRecu").addClass('hide');
			}
			$('#infoRenewSMS').html(messageContenu['SMSRENEWOK']).removeClass('hide text-center alert-info alert-error').addClass('alert alert-success');
			// next submit 4 sms check
			$('#'+nomFormSMS).find('button').val('checkSMS');
			rePermit(nomFormSMS);
			break;
		// Validation code SMS KO
		case (retour.match(/^KO_MAX[_]{0,1}/) || {}).input :
			rePermit(nomFormSMS);
			var mustWait=0;
			var verifieWait = new RegExp("_[0-9]{1,2}$");
			if (verifieWait.test(retour)) {
				attente=retour.split('_')[2];
				attente++;
				mustWait=1;
			}
			message=messageContenu['SMSKOMAXTRY'];
			$("#erreurModSMS").html(message).removeClass('hide text-center').addClass('alert alert-danger');
			if (mustWait==1) {
				message=message+messageContenu['SMSKOMAXTRYWAIT']+".";
				$("#erreurModSMS").html(message).removeClass('hide text-center').addClass('alert alert-danger');
				decompte('infoLastSMS',attente);
			} else {
				message=message+".";
				$("#erreurModSMS").html(message).removeClass('hide text-center').addClass('alert alert-danger');
			}
			break;
		case "KO" :
			rePermit(nomFormSMS);
			message=messageContenu['SMSKO'];
			$("#erreurModSMS").html(message).removeClass('hide text-center').addClass('alert alert-danger');
			$("#infoLastSMS").addClass('hide text-center');
			break;
		// -----------------------------------------------------------------------------------
		// -----------------------------------------------------------------------------------
		case "SendSms":
			if (inSMS==0) {
				$("#"+nomModOubli).modal('hide');
				$("#"+nomModSMS).modal('show');
				inSMS=1;
				$("#msgInfoSMS").html(messageContenu['infoSMS'+nomModOubli]+messageContenu['SMSSENDOK'].replace("__INDICATIF__",indTel).replace('__NUMTEL__',numTel));
				$("#msgInfoSMS").removeClass('alert alert-danger hide text-center').addClass('alert alert-info');
			}
			rePermit(nomFormSMS);
			if (ITX==1) $('#msgInfoSMSITX').html(messageContenu['SMSITX'].replace('__CODE__',ss)).removeClass('hide text-center alert-info alert-error').addClass('alert alert-success');
			$('#'+nomFormSMS).find('button').val('checkSMS');
			$('#'+nomFormSMS).find('button').text(messageContenu['boutonSMS'+nomModOubli]);
			$("#"+"P_codeNonRecu").removeClass('hide');
			break;
		case 'CAT1':
			message=messageContenu[retour];
			erreurEtVideChamps(oubli == "numFiscal" ? "captchaTextPwd" : "captchaTextFisc") ;
			if(focusTo.length==0)focusTo="captchaTextFisc";
			break;
		case "CAT2":
		case "CAT3":
		case "CAT4":
			message=messageContenu[retour];
			break;
		case "CAT5":
			message=messageContenu[retour];
			erreurEtGardeChamps("email");
			if(focusTo.length==0)focusTo="email";
			break;
		case "CAT6":
			message=messageContenu[retour];
			break;
		case "CAT7":
			message=messageContenu[retour];
			break;
		case "CAT8":
			message=messageContenu[retour];
			break;
		case "CAT9":
			message=messageContenu[retour];
			break;
		case "CAT10":
		case "CAT11":
		case "CAT12":
			message=messageContenu[retour];
			break;
		// CATI Erreur Mail invalide
		//case (retour.match(/^CATI__([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/))  :
		//case (retour.match(/^CATI__(.+)@(.+)\.([a-zA-Z]{2,5})$/));
		case "CATI":
			// message=messageContenu[retour];
			message = messageContenu[retour].replace("@@@,","");
			break;
		case (retour.match(/^CATI__/)).input:
			var paramail = retour.replace(/^CATI__/,"");
			message = messageContenu["CATI"].replace("@@@", paramail);
			break;
		case 'INDISPO':
		default:
			message="L'application est momentan&eacutement indisponible. Veuillez r&eacuteessayer ult&eacuterieurement.";
			itx=0;
			if (oubli=='passPerdu') {
				if (retour.substring(0,3)=='OK:'){
					itx=1;
					l=3;
				}
				else {
					if (retour.substring(0,10)=='OK_TELVAL:'){
						itx=1;
						l=10;
					}
				}
				if (itx==1){
					$("#passPerdu").modal('hide');
					$("#confirmationPassword").modal('show');
					$("#confirmationPassword").find('.lienMP').remove();
					$("#confirmationPassword").find('.modal-body').append("<p class='lienMP'>"+retour.substring(l)+"</p>");
					ok=1;
				}
			}
			break;
	}
	if ($("#"+oubli).hasClass('in')) {
			if (ok==0) {
				$(".captcha").attr('src', $("#"+nomFormOubli).attr('action') + '?format=image' + '&?id' + (new Date()).getTime());
		}
	}
	if(focusTo.length!=0)donneFocus(nomFormOubli,focusTo) ;
	if(oubli=='passPerdu'){
		$("#erreurModPwd").html(message).removeClass('alert-info hide text-center').addClass('alert-danger');
	}
	else {
		if (oubli=='numFiscal'){
			$("#erreurModFisc").html(message).removeClass('alert-info hide text-center').addClass('alert-danger');
		}
	}
}

//--------------------------------------------------------------------------------
//Traitement des retours soumissions auth. 3S
//--------------------------------------------------------------------------------
function traite3S(retour)
{
	NoError();
	reverseEtGardeChamps(message,'_tmp','spi','teledec','rfr');
	rePermit('3S');
	switch(retour) {
		//---------------------------------------------------------------------
		case '5001':
		case '5009':
			$('#erreur').html('Les donn&eacute;es saisies sont incorrectes.<br>V&eacute;rifier la saisie de vos identifiants.').removeClass('hide alert-info').addClass('alert alert-danger');
			erreurEtVideChamps('teledec');
			erreurEtVideChamps('rfr');
			donneFocus('3S','teledec');
			break;
		//---------------------------------------------------------------------
		case '4' :
		case '6' :
		case '7' :
		case '8' :
		case '9' :
			$('#erreur').html('L\'application est indisponible ; veuillez r&eacute;essayer ult&eacute;rieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
			break;
		//---------------------------------------------------------------------
		case '2' :
			$('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide').addClass('alert alert-danger');
			break;
			//---------------------------------------------------------------------
		case '5021':
		case '5022':
		case '5023':
		case '8999':
			$('#erreur').html('L\'application est indisponible ; veuillez r&eacute;essayer ult&eacute;rieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
			afficheForm('CTX');
			break;
		//---------------------------------------------------------------------
		case '5024':
			$('#erreur').html('Format des donn&eacute;es incorrect.<br>V&eacute;rifier la saisie de vos identifiants.').removeClass('hide alert-info').addClass('alert alert-danger');
			break;
		//---------------------------------------------------------------------
		case '666':
			NoError();
			erreurEtVideChamps('teledec');
			erreurEtVideChamps('rfr');
			erreurEtVideChamps('spi');
			afficheForm('CTX');
			$('#erreur').html(messageContenu['ctx_BLOCAGE']).removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
			// On masque les rubriques d'aide non pertinentes
			$('.aideSPI,.aideMdp,.aideIdentifiants, .ocfiNonIr, .aideCode').addClass('hide').attr('aria-hidden', true);
			erreurEtGardeChamps('spi');
			rePermit('CTX');
			donneFocus('CTX','spi');
			$('#blocage').html('').removeClass('alert-info').addClass('alert alert-danger hide');
			rePermit('CTX');
			break;
                case '99' :
                        afficheForm('CTX');
                        $('#erreur').html('L\'application est indisponible ; veuillez réessayer ultérieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
                        rePermit('CTX');
                        break;
	}
}

//--------------------------------------------------------------------------------
//Traitement des retours soumissions PAS
//--------------------------------------------------------------------------------
function traitePAS(retour)
{
	reverseEtGardeChamps('PAS','_tmp','spi','jourNaissance','moisNaissance','anneeNaissance','dateNaissance');
	rePermit('PAS');
	code=retour.split(':')[0];
	message=retour.split(':')[1];
	NoError();
	donneFocus('PAS','jourNaissance');
	switch(code) {
		case '0':
			$('#blocage').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
			$('#erreur').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
			afficheForm('PAS');
			break;
		case '7001':
			$('#blocage').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
			$('#erreur').html('Les donn&eacute;es saisies sont incorrectes.<br>V&eacute;rifier la saisie de vos identifiants.').removeClass('hide alert-info').addClass('alert alert-danger');
			break;
		case '7005':
			$('#blocage').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
			$('#erreur').html('Les donn&eacute;es saisies sont incorrectes.<br>Veuillez v&eacute;rifier la saisie de votre date de naissance.').removeClass('hide alert-info text-center').addClass('alert alert-danger');
			$('#blocage').html('Il vous reste ' + message +  (message > 1 ? ' essais' : ' essai')  + ' pour vous identifier.').removeClass('hide alert-info').addClass('alert alert-danger');
			break;
		case '7002':
			$('#blocage').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
			$('#erreur').html('La saisie de l\'ensemble des champs est obligatoire.').removeClass('alert alert-info hide').addClass('alert alert-danger');
			break;
		case '7009':
			$('#erreur').html('Les donn&eacute;es saisies sont incorrectes.<br>V&eacute;rifier la saisie de vos identifiants.').removeClass('hide alert-info').addClass('alert alert-danger');
			$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
			break;
		case '7024':
			$('#erreur').html('Format des donn&eacute;es incorrect.<br>V&eacute;rifier la saisie de vos identifiants.').removeClass('hide alert-info').addClass('alert alert-danger');
			$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
			break;
		case '7020':
			$('#erreur').html('&Agrave; la suite de plusieurs saisies erron&eacute;es, votre acc&egrave;s est suspendu pendant '+ message ).removeClass('hide alert-info').addClass('alert alert-danger');
			$('#blocage').html('').removeClass('alert-info').addClass('alert alert-danger hide');
			break;
		case '7666':
			afficheForm('CTX');
			$('#erreur').html(messageContenu['ctx_BLOCAGE']).removeClass('hide alert-info').addClass('alert alert-danger');
			$('#blocage').html('').removeClass('alert-info').addClass('alert alert-danger hide');
			rePermit('CTX');
			break;
                case '7099' :
                        afficheForm('CTX');
                        $('#erreur').html('L\'application est indisponible ; veuillez réessayer ultérieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
                        rePermit('CTX');
                        break;
		default :
			afficheForm('CTX');
			$('#erreur').html('L\'application est indisponible ; veuillez r&eacute;essayer ult&eacute;rieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
			rePermit('CTX');
			break;
	}
}

function traiteLMDP(retour)
{
	reverseEtGardeChamps('LMDP','_tmp','spi','pwd');
	videChamps('LMDP','_tmp','pwd');
	rePermit('LMDP');
	code=retour.split(':')[0];
	message=retour.split(':')[1];
	ctxDoublon=retour.split(':')[2];
	switch(code) {
		case '0':
			$('#erreur').html('').removeClass('alert-danger text-center').addClass('alert alert-danger hide');
			$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
			break;
		case '4002':
			$('#blocage').html('').removeClass('alert alert-danger').addClass('alert alert-info hide ');
			$('#erreur').html(messageContenu['CAT3']).removeClass('alert alert-info hide').addClass('alert alert-danger');
			break;
		case '4004':
			NoError();
			$('#erreur').html(messageContenu[code]).removeClass('alert alert-info hide text-center').addClass('alert alert-danger');
			$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
			erreurEtGardeChamps('spi');
			donneFocus('LMDP','spi');
			break;
		case '4005':
			$('#erreur').html(messageContenu[code]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
			$('#blocage').html(messageContenu[code+'_debut'] + message +  (message > 1 ? ' essais' : ' essai')  + messageContenu[code+'_fin']).removeClass('hide alert-info').addClass('alert alert-danger');
			erreurEtVideChamps('pwd');
			break;
		case '4001' :
		case '4003' :
		case '4006' :
		case '4007' :
		case '4008' :
		case '4009' :
			$('#erreur').html(messageContenu['CAT8']).removeClass('hide alert-info').addClass('alert alert-danger');
			break;
		case '4020':
			$('#erreur').html(messageContenu[code]+ message ).removeClass('hide alert-info').addClass('alert alert-danger');
			$('#blocage').html(messageContenu['infoBlocage']).removeClass('hide alert-info').addClass('alert alert-danger');
			break;

        case '14001':
        case '14002':
        case '14003':
        case '14004':
        case '14005':
        case '14006':
        case '14007':
        case '14008':
        case '14009':
        case '14010':
		case '14011':
		case '14012':
        case '24001':
		case '24002':
		case '34001':
		case '34002':
             $('#erreur').html(messageContenu[code]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
             erreurEtVideChamps('pwd');
             break;

		case '5500' :
		case '6500' :
			if (ctxDoublon.length) {
				if (ctxDoublon=="L") {
				$('#erreur').html(messageContenu[code].replace(/(nouvel identifiant fiscal) .*\./,'$1 '+message+'.')).removeClass('hide alert-info text-center').addClass('alert alert-danger');
				$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
				}
				else  {
					$('#erreur').html(messageContenu[5600]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
					$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
				}
			}
			break;
		case '5501' :
		case '5502' :
			$('#erreur').html(messageContenu[code]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
			$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
			erreurEtGardeChamps('spi');
			donneFocus('LMDP','spi');
			break;
		case '5601' :
		case '5602' :
		case '5603' :
		case '5604' :
			$('#erreur').html(messageContenu[code]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
			$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
			break;
		case '4660' :
		case '4661' :
		case '4662' :
		case '4663' :
		case '4664' :
		case '4665' :
			//$('#erreur').html(messageContenu['PBCONSOCTX']).removeClass('hide alert-info text-center').addClass('alert alert-danger');
			$('#erreur').html(messageContenu['CAT8']).removeClass('hide alert-info text-center').addClass('alert alert-danger');
			$('#blocage').html('').addClass('hide alert-info');
			console.log("*********** Pb ConsoCtx "+code+" **********");
			break;
		case '4666' :
			videChamps('LMDP','_tmp','pwd');
			videChamps('LMDP','_tmp','spi');
			afficheForm('CTX');
			videChamps('CTX','_tmp','spi');
			$('#erreur').html(messageContenu['ctx_BLOCAGE']).removeClass('hide alert-info').addClass('alert alert-danger');
			$('#blocage').html('').removeClass('alert-info').addClass('alert alert-danger hide');
			rePermit('CTX');
			donneFocus('CTX','spi');
			break;
                case '4099' :
                        afficheForm('CTX');
                        $('#erreur').html('L\'application est indisponible ; veuillez réessayer ultérieurement.').removeClass('hide alert-info').addClass('alert alert-danger');
                        rePermit('CTX');
                        break;
						
		 case 'otp4001':
                        $('#erreur').html('L’envoi du code OTP est temporairement impossible.').removeClass('hide alert-info text-center').addClass('alert alert-danger');
                        erreurEtVideChamps('pwd');
                        break;
		default:
			$('#erreur').html(messageContenu[code]).removeClass('hide alert-info text-center').addClass('alert alert-danger');
			$('#blocage').html('').removeClass('hide alert-info').addClass('alert alert-danger hide ');
	}
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function switchVisuMdp(bouton,leChamp){
	valeur=$("#"+leChamp).val();
	actuel=$(bouton).attr('data-visu-mdp');
	if(actuel=="off") {
		nouveauType="text";
		nouveauTitre=messageContenu['visuMdpOFF'];
		nouvelEtat="on";
		nouvelIcone="&#xE964";
		$("#"+leChamp).attr('autocomplete','off');
	}
	else{
		$("#"+leChamp).removeAttr('autocomplete');
		nouveauType="password" ;
		nouveauTitre=messageContenu['visuMdpON'];
		nouvelEtat="off";
		nouvelIcone="&#xE965";
		$("#"+leChamp).attr('autocomplete','current-password');
	}
	$("#"+leChamp).val('xxx');
	$("#"+leChamp).attr('type',nouveauType);
	$(bouton).attr('title',nouveauTitre);
	$(bouton).attr('data-visu-mdp',nouvelEtat);
	$("i",bouton ).html(nouvelIcone);
	$("#"+leChamp).val(valeur);
	return true;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function resendSMS(lien)
{
	$(lien).closest('form').find('button').val('newSMS');
	$(lien).closest('form').find(':submit').click();
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function decompte(laDiv,compteur) {
	$('#'+laDiv).html(messageContenu['SMSRENEWLAST'].replace("__N__",compteur+" minute"+(compteur>1 ?"s." :".") )).removeClass('hide text-center alert-info alert-success').addClass('alert alert-error');
	$("#"+"P_codeNonRecu").addClass('hide');
	compteur=compteur - 1;
	if(compteur>=0) {
		timeoutId=setTimeout(function() {
			decompte(laDiv,compteur);
		}, 60000);
	} else {
		$("#"+"P_codeNonRecu").removeClass('hide');
		$('#'+laDiv).addClass('hide');
		$('#infoRenewSMS').addClass('hide');
		if ( $("#erreurModSMS").hasClass("hide") ) {
		} else {
			message=messageContenu['SMSKOMAXTRY'];
			message=message+".";
		  $("#erreurModSMS").html(message).removeClass('hide text-center').addClass('alert alert-danger');
		}
	}
}

//Obtenir le compteur de pages depuis FC
function getPrecedent() {
	var precedent = sessionStorage.getItem('precedent');
	console.log("getPrecedent1 "+ precedent);
	if(!precedent) {
		precedent = -1;
		sessionStorage.setItem('precedent', precedent);
	}
	return parseInt(sessionStorage.getItem('precedent'));
}

// Incrémenter le compteur de pages depuis FC
function incrementPrecedent(){
	var precedent = getPrecedent();
	sessionStorage.setItem('precedent', precedent - 1);
}

// Fonction appelee lors d'un evenement page precedente (clic sur le bouton ou sur le navigateur)
function pagePrecedente(){
	var precedent = getPrecedent();
	sessionStorage.removeItem('precedent');
	history.go(precedent);
}

