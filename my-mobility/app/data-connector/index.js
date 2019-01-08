//https://data.opendatasoft.com/api/records/1.0/search/?dataset=mkt-titres-pointsvente-agences-td%40keolis-rennes&sort=nom&facet=nomcommune&facet=accepteespeces&facet=acceptecb&facet=estgestiontr&facet=estcreationkorrigo&facet=estventeabonnementsvls&facet=estventeabonnementstco&facet=estinformationvls&facet=codeinseecommune&facet=acceptecheques&facet=estinformationtco&facet=estsavkorrigo&facet=estventeticketstco
var request = require('request-promise');

class LaStar {
    constructor(){
      this.site_url_metro_kennedy = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=tco-metro-circulation-passages-tr%40keolis-rennes&rows=1000&facet=nomcourtligne&facet=sens&facet=destination&facet=nomarret&facet=precision&refine.sens=1&timezone=Europe%2FBerlin"
      this.site_url_metro_poterie = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=tco-metro-circulation-passages-tr%40keolis-rennes&rows=1000&facet=nomcourtligne&facet=sens&facet=destination&facet=nomarret&facet=precision&refine.sens=0&timezone=Europe%2FBerlin"
      this.site_url = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=mkt-titres-pointsvente-agences-td%40keolis-rennes&sort=nom&facet=nomcommune&facet=accepteespeces&facet=acceptecb&facet=estgestiontr&facet=estcreationkorrigo&facet=estventeabonnementsvls&facet=estventeabonnementstco&facet=estinformationvls&facet=codeinseecommune&facet=acceptecheques&facet=estinformationtco&facet=estsavkorrigo&facet=estventeticketstco";
      this.username = "antoine.boudet@epitech.eu";
      this.password = "AB1797!:sxiriuxopendatasoft";
    }

    _request(method, url, callback, errorCallback){
        var options = {
            'method': method,
            'uri': url,
            auth: {
                user: this.username,
                password: this.password
            }
        }
        request(options)
        .then((answer) => {
          callback(answer)
        })
        .catch((err) => {
          errorCallback(err)
        })
    }

    getAgency(callback, errorCallback){
        this._request('get', this.site_url, (answer) => {
            const pkg = JSON.parse(answer);
            answer = "l'agence " + pkg.records[0].fields["nom"].toString();
            answer += ', ' + pkg.records[1].fields["nom"].toString();
            answer += ', ' + pkg.records[2].fields["nom"].toString();
            answer += ' et ' + pkg.records[3].fields["nom"].toString();
            callback(answer) // Todo just return array of agency
        }, (err) => {
          errorCallback(err)
        })
    }

    getAgencyNumber(agency, callback, errorCallback){
        this._request('get', this.site_url, (answer) => {
            const pkg = JSON.parse(answer);
            if (pkg.records[0].fields["nom"].toString() == agency)
                answer = pkg.records[0].fields["telephone"].toString();
            else if (pkg.records[1].fields["nom"].toString() == agency)
                answer = pkg.records[1].fields["telephone"].toString();
            else if (pkg.records[2].fields["nom"].toString() == agency)
                answer = pkg.records[2].fields["telephone"].toString();
            else
                answer = pkg.records[3].fields["telephone"].toString();
            callback(answer)
        }, (err) => {
          errorCallback(err)
        })
    }

    getAgencySchedule(agency, day, callback, errorCallback){
        this._request('get', this.site_url, (answer) => {
            const pkg = JSON.parse(answer);
            if (pkg.records[0].fields["nom"].toString() == agency)
                answer = pkg.records[0].fields["horaires"+day].toString();
            else if (pkg.records[1].fields["nom"].toString() == agency)
                answer = pkg.records[1].fields["horaires"+day].toString();
            else if (pkg.records[2].fields["nom"].toString() == agency)
                answer = pkg.records[2].fields["horaires"+day].toString();
            else
                answer = pkg.records[3].fields["horaires"+day].toString();
            callback(answer)
        }, (err) => {
          errorCallback(err)
        })
    }

    getSubwayKennedySchedule(station, callback, errorCallback) {
        this._request('get', this.site_url_metro_kennedy, (answer) => {
            const pkg = JSON.parse(answer);
            pkg.records.forEach(function loop(element) {
                if(loop.stop){ return; }
                if (element.fields.nomarret.toLowerCase() == station.toLowerCase()) {
                    answer = element.fields.arrivee.substr(11, 8);
                    loop.stop = true;
                }
            });
            callback(answer)
        }, (err) => {
          errorCallback(err)
        })
    }

    getSubwayPoterieSchedule(station, callback, errorCallback) {
        this._request('get', this.site_url_metro_poterie, (answer) => {
            const pkg = JSON.parse(answer);
            pkg.records.forEach(function loop(element) {
                if(loop.stop){ return; }
                if (element.fields.nomarret.toLowerCase() == station.toLowerCase()) {
                    answer = element.fields.arrivee.substr(11, 8);
                    loop.stop = true;
                }
            });
            callback(answer)
        }, (err) => {
          errorCallback(err)
        })
    }
}

module.exports = {
    LaStar
}
