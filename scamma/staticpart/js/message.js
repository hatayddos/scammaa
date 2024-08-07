//------------------------------------------------------------------------------------------------------------------------------------------------------------
// Initialisation des messages et adaptation selon la voie
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function initMessages(typeAuth) {
    // Messages d'erreurs pour la connexion FI   
    messageContenu[14001] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1001).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14002] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1002).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14003] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1003).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14004] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1004).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14005] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1005).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14006] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1006).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14007] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1007).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14008] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1008).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14009] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1009).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14010] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1010).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14011] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1011).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[14012] = '<p>Votre numéro fiscal ne vous permet pas de vous connecter via FranceConnect (erreur FI1012).<br>Veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';
    messageContenu[24001] = '<p>Une erreur technique est survenue. Si l\'erreur persiste, veuillez vous adresser à votre ' + cfp['AMALGAME'] + '</p>';

    messageContenu[34001] = 'L’envoi du code OTP ne peut pas être effectué (absence d’adresse électronique).';
    messageContenu[34002] = 'L’envoi du code OTP ne peut pas être effectué (adresse électronique invalidée).';

    messageContenu[4005] = 'Votre mot de passe est incorrect, r&eacute;essayez ou cliquez sur &laquo;Vous avez oubli&eacute; votre mot de passe &raquo;';
    messageContenu[4004] = 'Le numéro fiscal renseigné n\'est pas connu de nos services.&nbsp; Veuillez vérifier votre saisie.<br>';
    messageContenu[4004] += 'Si votre identifiant fiscal ne comporte pas d\'erreur, nous vous invitons à contacter votre ' + cfp['INCONNU'];
    messageContenu[4020] = 'Votre accès est suspendu pendant ';
    messageContenu['infoBlocage'] = 'Attention, vous devez veiller à respecter les minuscules et les majuscules lors de la saisie de votre identifiant et de votre mot de passe. Si vous avez perdu votre mot de passe, vous pouvez le renouveler en quelques clics.';
    messageContenu['infoSaisie3S'] = 'Vous devez créer votre espace en saisissant votre numéro d\'accès en ligne et votre revenu fiscal de référence.';
    messageContenu['4005_debut'] = 'Il vous reste ';
    messageContenu['4005_fin'] = ' pour vous identifier par mot de passe.';
    messageContenu['badFormatPwd'] = 'Le format de votre mot de passe est incorrect. Il doit comporter 8 &agrave; 128 caract&egrave;res dont une lettre et un chiffre.';
    messageContenu['badFormatSpi'] = 'Votre numéro fiscal comporte 13 chiffres&nbsp;;&nbsp;veuillez vérifier votre saisie.';
    messageContenu['badFormatDate'] = 'Le format de la date saisie est incorrect (exemple de format attendu 01/03/1980).';
    messageContenu['enCours1'] = 'Vous avez d&eacute;j&agrave; initi&eacute; la proc&eacute;dure de cr&eacute;ation de votre espace particulier. Vous devez cliquer sur le lien';
    messageContenu['enCours2'] = ' qui vous a &eacute;t&eacute; adress&eacute; par courriel.';
    messageContenu['enCours3'] = '<br>Si vous le souhaitez, vous pouvez à nouveau initier la création de votre espace en saisissant le\(s\) champ\(s\) ci-après.';

    messageContenu['visuMdpON'] = 'Afficher le mot de passe';
    messageContenu['visuMdpOFF'] = 'Cacher le mot de passe';

    messageContenu['titreFenetreCTX'] = 'Particuliers | authentification';
    messageContenu['titreFenetreLMDP'] = 'Particuliers | authentification';
    messageContenu['titreFenetreCreation'] = 'Particuliers | création de votre espace particulier';
    messageContenu['titreFenetre3S'] = messageContenu['titreFenetreCreation'];
    messageContenu['titreFenetrePAS'] = messageContenu['titreFenetreCreation'];
    messageContenu['CTXtitre_authent'] = 'Connexion ou cr&eacute;ation de votre espace';
    messageContenu['LMDPtitre_authent'] = 'Connexion &agrave; votre espace particulier&nbsp;';
    messageContenu['3Stitre_authent'] = 'Cr&eacute;ation de votre espace particulier';
    messageContenu['PAStitre_authent'] = messageContenu['3Stitre_authent'];
    messageContenu['titreModalenumFiscal'] = 'Réception par courriel de votre numéro fiscal';
    messageContenu['titreModalepassPerdu'] = 'Renouvellement de votre mot de passe';
    messageContenu['infoSMSpassPerdu'] = 'Pour recevoir le lien de renouvellement de votre mot de passe';
    messageContenu['infoSMSnumFiscal'] = 'Pour recevoir votre numéro fiscal par courriel';
    messageContenu['boutonSMSpassPerdu'] = 'Recevoir le lien de renouvellement';
    messageContenu['boutonSMSnumFiscal'] = 'Recevoir mon numéro fiscal';
    messageContenu['ctx_EXISTEPAS'] = messageContenu[4004];
    messageContenu['ctx_EXISTEPAS'] = messageContenu[4004];
    messageContenu['ctx_NOINFO'] = 'Pour créer votre espace particulier, vous devez préalablement fournir à votre ' + cfp['NOINFO'] + ' des éléments permettant de prouver votre identité.';
    messageContenu['ctx_DOUBLON_L'] = 'Pour accéder à votre espace particulier, vous devez saisir votre nouvel identifiant fiscal qui se trouve sur vos derniers documents fiscaux et qui vous a été envoyé par courriel.';
    messageContenu['ctx_DOUBLON_nonL'] = 'Pour des raisons techniques votre numéro fiscal est désormais le suivant : __ACTIF__. Veuillez l\'utiliser pour créer votre espace particulier.';
    //messageContenu['ctx_BLOCAGE']='Pour votre sécurité, l\'accès à votre espace a été bloqué ; veuillez contacter votre ' + cfp['PERTENUM']; 
    messageContenu['ctx_BLOCAGE'] = 'Pour votre sécurité, l\'accès à votre espace a été bloqué ; veuillez contacter votre ' + cfp['BLOCAGE'];
    messageContenu['CAT1'] = "La saisie des caract&egrave;res de l'image ou de l'extrait sonore est incorrecte. Veuillez recommencer.";
    messageContenu['CAT2'] = "Cette proc&eacute;dure est r&eacute;serv&eacute;e aux personnes ayant d&eacute;j&agrave; cr&eacute;&eacute; un espace particulier.";
    messageContenu['CAT3'] = "La saisie de l'ensemble des champs est obligatoire.";
    messageContenu['CAT4'] = "Vous ne pouvez pas acc&eacute;der &agrave; votre espace particulier et utiliser les services en ligne.&nbsp;"
    messageContenu['CAT4'] += "Veuillez nous en excuser.&nbsp;"
    messageContenu['CAT4'] += "Nous vous invitons &agrave; contacter votre " + cfp['default'];
    //messageContenu['ctx_AMALGAME']=messageContenu['CAT4'];
    messageContenu['ctx_AMALGAME'] = "Vous ne pouvez pas acc&eacute;der &agrave; votre espace particulier et utiliser les services en ligne.&nbsp;"
    messageContenu['ctx_AMALGAME'] += "Veuillez nous en excuser.&nbsp;"
    messageContenu['ctx_AMALGAME'] += "Nous vous invitons &agrave; contacter votre " + cfp['AMALGAME'];
    messageContenu['CAT5'] = "Le format de votre adresse &eacute;lectronique est incorrect. Veuillez le v&eacute;rifier (par exemple : abcd24@fai.fr).";
    messageContenu['CAT6'] = "Votre num&eacute;ro fiscal ne permet pas d'acc&eacute;der &agrave; cette fonctionnalit&eacute;. Nous vous prions de bien vouloir nous en excuser. Veuillez contacter votre " + cfp['default'];
    messageContenu['CAT7'] = 'Les données saisies sont incorrectes, veuillez vérifier votre saisie.';
    messageContenu['CAT8'] = "L'application est momentan&eacute;ment indisponible. Veuillez r&eacute;essayer ult&eacuterieurement.";
    messageContenu['CAT9'] = "Le num&eacute;ro fiscal saisi est incorrect&nbsp;; veuillez recommencer.";
    messageContenu['CAT10'] = "Vous ne pouvez pas acc&eacute;der &agrave; votre espace particulier et utiliser les services en ligne.&nbsp;";
    messageContenu['CAT10'] += "Veuillez nous en excuser.&nbsp;";
    messageContenu['CAT10'] += "Nous vous invitons &agrave; contacter votre " + cfp['default'];
    messageContenu['CAT11'] = "Cette proc&eacute;dure est r&eacute;serv&eacute;e aux personnes ayant d&eacute;j&agrave; cr&eacute;&eacute; un espace particulier.";
    messageContenu['CAT12'] = "Une anomalie liée à votre date de naissance empêche l\'utilisation de cette fonction ; veuillez contacter votre " + cfp['PERTENUM'];
    messageContenu['CATI'] = "Votre adresse &eacutelectronique, @@@, n'est plus valide ; veuillez en communiquer une nouvelle à votre centre des Finances publiques.";
    messageContenu['SMSKOMAXTRY'] = "Veuillez solliciter l\'envoi d\'un nouveau code en appuyant sur le lien &laquo;Je n\'ai pas re&ccedil;u le code&raquo;";
    messageContenu['SMSKO'] = "Le code saisi est incorrect&nbsp;; veuillez vérifier votre saisie.";
    messageContenu['SMSNEEDSECURE'] = 'Pour renforcer la s&eacute;curit&eacute; de votre espace, pensez &agrave; valider votre num&eacute;ro de t&eacute;l&eacute;phone portable dans la rubrique &laquo;&nbsp;Mon profil&nbsp;&raquo;.';
    messageContenu['SMSRENEWOK'] = 'Un nouveau code de validation vous a &eacute;t&eacute; adress&eacute; par SMS';
    messageContenu['SMSRENEWLAST'] = 'Attention&nbsp;: Vous ne pourrez pas solliciter l\'envoi d\'un nouveau code de validation avant une dur&eacute;e de __N__';
    messageContenu['SMSBADFORMAT'] = 'Le code doit comporter six chiffres&nbsp; veuillez v&eacute;rifier votre saisie';
    messageContenu['SMSSENDOK'] = ', veuillez saisir le code qui vous a &eacute;t&eacute; adress&eacute; au (__INDICATIF__) __NUMTEL__';
    messageContenu['SMSITX'] = 'Le code SMS envoy&eacute; est : __CODE__';
    messageContenu['SMSKOMAXTRYWAIT'] = ' (après la fin du délai indiqué)';
    messageContenu['PBCONSOCTX'] = 'Erreur technique.<br>Nous vous prions de bien vouloir nous en excuser.';

    switch (typeAuth) {
        //----------------------------------------------------------------------------------------------------------
        //Les messages pour les DAC SSO et la voie PayFip
        //----------------------------------------------------------------------------------------------------------
    case 'payfip':
        messageContenu[4005] = 'Les données saisies sont incorrectes. Vérifiez la saisie de vos identifiants.';
        messageContenu[5500] = 'Pour acc&eacute;der au service, vous devez saisir votre nouvel identifiant fiscal qui vous a &eacute;t&eacute; envoy&eacute; par courriel&nbsp;.';
        messageContenu[6500] = messageContenu[5500];
        messageContenu[5501] = 'Vous ne pouvez pas acc&eacute;der au service&nbsp;;&nbsp;veuillez nous en excuser.&nbsp;Nous vous invitons &agrave; contacter votre ' + cfp[5501];
        messageContenu[5502] = 'Le num&eacute;ro fiscal renseign&eacute; n\'est pas connu de nos services.&nbsp;Veuillez v&eacute;rifier votre saisie.&nbsp;Si votre identifiant fiscal ne comporte pas d\'erreur, nous vous invitons &agrave; contacter votre ' + cfp['INCONNU'];
        messageContenu['badFormatSpi'] = 'Le format de votre numéro fiscal est incorrect. Seuls sont autorisés 13 caractères numériques.'
        messageContenu[5600] = 'Vous n\'avez pas encore cr&eacute;&eacute; un acc&egrave;s &agrave; votre espace particulier.&nbsp;Veuillez cliquer sur le bouton &laquo;Cr&eacute;er mon espace particulier&raquo;.';
        messageContenu[5601] = messageContenu[5600];
        messageContenu[5602] = messageContenu[5600];
        messageContenu[5603] = messageContenu[5600];
        messageContenu[5700] = 'Vous avez d&eacute;j&agrave; initi&eacute; la proc&eacute;dure de cr&eacute;ation de votre espace particulier. Vous devez cliquer sur le lien qui vous a &eacute;t&eacute; adress&eacute; par courriel.';
        messageContenu['titreFenetreLMDP'] = 'Authentification PayFip';
        break;
        //----------------------------------------------------------------------------------------------------------
        //Les messages pour les DAC FI
        //----------------------------------------------------------------------------------------------------------
    case 'idp':
        lien = '<a href="' + fqdnCFSPart + '/"> impots.gouv.fr </a>';
        messageContenu['ctx_noLV'] = 'Vous n\'avez pas encore activé votre espace particulier. Nous vous invitons à vous rendre sur ' + lien + ' pour effectuer cette démarche.';
        messageContenu['enCours3'] = '<br>Vous pourrez ensuite vous connecter avec votre mot de passe.';
        messageContenu['ctx_DOUBLON_nonL'] = 'Pour des raisons techniques votre numéro fiscal est désormais le suivant : __ACTIF__. Vous pouvez à partir de ce numéro fiscal créer votre espace particulier sur ' + lien + ' et accéder ainsi aux services en ligne.';
        messageContenu['CTXtitre_authent'] = 'Je me connecte avec mon compte impots.gouv.fr &nbsp;';
        messageContenu['LMDPtitre_authent'] = messageContenu['CTXtitre_authent'];
        break;
    default:
        break;
    }
}
