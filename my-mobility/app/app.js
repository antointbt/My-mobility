'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const Api = require('./data-connector');
const dataConnector = new Api.LaStar();

const config = {
    logging: true,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function() {
        this.toIntent('HelloWorldIntent');
    },

    'HelloWorldIntent': function() {
        this.ask('Bonjour Antoine, que puis-je faire pour vous satisfaire');
    },

    'GetAgencyIntent': function() {
        dataConnector.getAgency((agency) => {
            this.ask("Il y a " + agency)
            }, (err) => {
              this.tell("J'ai pas trouvé d'agence")
        })
    },
    'GetAgencyNumberIntent': function(agency) {
        this.setSessionAttribute('agency', agency)
        dataConnector.getAgencyNumber(agency.value, (numero) => {
            this.ask("Le numéro de téléphone de l'agence " + this.getSessionAttribute('agency').value + " et le " + numero)
            }, (err) => {
              this.tell("J'ai pas trouvé le numéro de téléphone")
        })
    },
    'GetAgencyScheduleIntent': function(day) {
        dataConnector.getAgencySchedule(this.getSessionAttribute('agency').value, day.value, (time) => {
            if (time == "Fermé")
                this.ask("L'agence " + this.getSessionAttribute('agency').value + "est fermé ce jours ci")
            else
                this.ask("L'agence " + this.getSessionAttribute('agency').value + " ouvre le " + day.value + " de " + time)
            }, (err) => {
              this.tell("J'ai pas trouvé les horaires de cette agence")
        })
    },
    'getSubwayScheduleIntent': function(station) {
            // this.ask("Le métro arrive à la station " + station.value)
        dataConnector.getSubwayKennedySchedule(station.value, (timeKennedy) => {
            dataConnector.getSubwayPoterieSchedule(station.value, (timePoterie) => {
                this.ask("Le métro arrive à la station " + station.value + " à " + timeKennedy + " pour la direction de J.F Kennedy et " + timePoterie + " pour la direction de la poterie")
                }, (err) => {
                  this.tell("J'ai rien trouvé d'horaire pour cette station de métro")
            })
            }, (err) => {
              this.tell("J'ai rien trouvé d'horaire pour cette station de métro")
        })
    },
});

module.exports.app = app;
