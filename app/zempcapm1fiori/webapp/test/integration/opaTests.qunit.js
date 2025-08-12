sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'zempcapm1fiori/test/integration/FirstJourney',
		'zempcapm1fiori/test/integration/pages/ReadEmpSetMain'
    ],
    function(JourneyRunner, opaJourney, ReadEmpSetMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('zempcapm1fiori') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheReadEmpSetMain: ReadEmpSetMain
                }
            },
            opaJourney.run
        );
    }
);