# My-Mobility avec Jovo Framework

[![Jovo Framework](https://www.jovo.tech/img/github-logo.png)](https://www.jovo.tech)

<p align="center">Templates for the <a href="https://github.com/jovotech/jovo-framework-nodejs">Jovo Framework</a> ⭐️</p>

<p align="center">
<a href="https://www.jovo.tech/framework/docs/"><strong>Documentation</strong></a> -
<a href="https://github.com/jovotech/jovo-cli"><strong>CLI </strong></a></p>
<br/>

## My-Mobility

My-Mobility est un programme destiné à un assistant vocal tel que Google Home, ou Amazon Alexa.
Cette application, permet de poser des questions à un assistant vocal sur les transports en commun (ici Rennes Métropole)

## Installer My-Mobility

Installer nodejs et npm

### Installer dépendances
```sh
$ npm install

## Accéder à Alexa Developer Console ou DialogFlow pour Google Home

Cette partie permet de pouvoir tester sont application pour assistant vocal.
Si l'utilisateur le souhaite il peut tout à fait aussi déployer son application sur un assistant vocal physique.
Pour notre part, on va tester sur Alexa.

- Pour ceci rendez-vous sur 'https://developer.amazon.com/fr/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html'
- Aller dans l'onglet 'Vos consoles Alexa' et cliquez sur "Skills"
- Créez vous un compte
- Puis créez vous un nouveau skill (ce qui correspond à une nouvelle application)
- Sur votre nouveau skill garder bien le 'skill id' que vous pouvez obtenir en cliquant sur 'voir skill id'
- Maintenant retourner dans votre solution, dans le fichier app.json remplacer "Votre skillId" par le votre.

## Deployer application
$ jovo build // Build l'application
$ jovo deploy // Deploy l'application sur la plateforme de Alexa et de Google Home
$ jovo run // Run l'application en lançant un serveur sur le port 3000
```
## Sur la plateforme Alexa

- Cliquez sur le bouton test
- Dans la barre de conversation écriver "my mobility", ce qui correspond à votre invocation. Ce qui permet de lancer l'application (voir la documentation)
- Puis converser en fonction des Intents que vous avez définis.
