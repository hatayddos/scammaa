//------------------------------------------------------------------------------------------------------------------------------------------------------------
// Initialisation des entrees dans la page contact
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function initIdContact(typeAuth) {
	if((typeof(PortPub) == 'undefined') || PortPub.length==0)PortPub="https://www.impots.gouv.fr";
	//if((typeof(PathCFP)=='undefined') || PathCFP.length==0)PathCFP="/portail/contacts";
	if((typeof(PathCFP)=='undefined') || PathCFP.length==0)PathCFP="/contacts";
	cfp['default']='<a class="CFP" target="_blank" rel="noopener" title="Nouvelle fen&ecirc;tre" href="'+PortPub+PathCFP+'NOID'+'">centre&nbsp;des&nbsp;Finances&nbsp;publiques&nbsp;<span class="dgfipicon dgfipicon-sortie-page" title="Nouvelle fen&ecirc;tre">.</a>';
	cfp['NOINFO']='<a class="CFP" target="_blank" rel="noopener" title="Nouvelle fen&ecirc;tre" href="'+PortPub+PathCFP+'NOID'+'">centre&nbsp;des&nbsp;Finances&nbsp;publiques&nbsp;<span class="dgfipicon dgfipicon-sortie-page" title="Nouvelle fen&ecirc;tre"></a>';
	cfp['AMALGAME']='<a class="CFP" target="_blank" rel="noopener" title="Nouvelle fen&ecirc;tre" href="'+PortPub+PathCFP+'NOID'+'">centre&nbsp;des&nbsp;Finances&nbsp;publiques&nbsp;<span class="dgfipicon dgfipicon-sortie-page" title="Nouvelle fen&ecirc;tre">.</a>';
	cfp['PERTENUM']='<a class="CFP" target="_blank" rel="noopener" title="Nouvelle fen&ecirc;tre" href="'+PortPub+PathCFP+'NOID'+'">centre&nbsp;des&nbsp;Finances&nbsp;publiques&nbsp;<span class="dgfipicon dgfipicon-sortie-page" title="Nouvelle fen&ecirc;tre">.</a>';
	cfp['BLOCAGE']='<a class="CFP" target="_blank" rel="noopener" title="Nouvelle fen&ecirc;tre" href="'+PortPub+"/node"+'NOID'+'">centre&nbsp;des&nbsp;Finances&nbsp;publiques&nbsp;<span class="dgfipicon dgfipicon-sortie-page" title="Nouvelle fen&ecirc;tre">.</a>';
	idContact={};
	switch(typeAuth) {
		//----------------------------------------------------------------------------------------------------------
		//Les messages pour les DAC SSO et la voie PayFip
		//----------------------------------------------------------------------------------------------------------
		case 'payfip' :
				//inconnu
				idContact['INCONNU']=776;
				//N
				idContact['NOINFO']=4949;
				//AMALGAME
				idContact['AMALGAME']=4947;
				//NONUM	
				idContact['NONUM']=4950;
				//idContact['PERTENUM']=174;
				idContact['PERTENUM']=4947;
				idContact['BLOCAGE']=25774;
				idContact['default']='';
				// piste 2 idContact['default']=4947;
				idContact['5501']=776;

				break;
		case 'idp' :
		case 'sso' :
				//inconnu
				idContact['INCONNU']=776;
				//N
				idContact['NOINFO']=4949;
				//AMALGAME
				idContact['AMALGAME']=4947;
				//NONUM	
				idContact['NONUM']=4950;
				//idContact['PERTENUM']=174;
				idContact['PERTENUM']=4947;
				idContact['BLOCAGE']=25774;
				idContact['default']='';
				// piste 2 idContact['default']=4947;
				idContact['5501']=776;

				break;
			
	}
	for (cas in idContact) {
		if (cfp[cas] !== undefined ) {
			if(cas=='BLOCAGE'){
			  cfp[cas]=cfp[cas].replace('NOID','/'+idContact[cas] );
			} else cfp[cas]=cfp[cas].replace('NOID',idContact[cas] ? '?'+idContact[cas] : idContact[cas] );
		}
		else { 
			cfp[cas]=cfp['default'].replace('NOID',idContact[cas] ? '?'+idContact[cas] : idContact[cas] );
		}
	}
}	