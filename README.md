# _Doctor Lookup_

#### _A Doctor Lookup Web App, 6-7-19_

#### _By Brian Hensley_

## _Description_

The Doctor Looker-upper is a web app that will find a list of doctors in the Portland, Oregon area that meet search criteria, from either doctor name, or by medical issue.

## _Setup/Installation Requirements_

* _Clone this repo to your home machine_
* _run [$ npm init -y] from the app's root folder_
* _run [$ npm install] from the app's root folder_
* _go to https://developer.betterdoctor.com/ and sign up for an API key_
* _create a .env file in the app's root folder and insert "exports.apiKey = [Your API Key goes here]"_
* _run [$ npm run build] from the app's root folder_
* _run [$ npm run start] from the app's root folder_
* _enter a name, medical issue, or both into the input fields to get a list of doctors who can help you_


## _Specs_

|Objectives|example input|example output|
|-|-|-|
|It will take a user's search term for Doctor's Name and return matching results|Kevorkian|returns Dr. Kevorkian's contact information|
|It will take a user's search term for a medical issue and return doctors who can help with that problem|Alopecia|returns list of Alopecia specialists in Portland, Oregon|
|It will take a user's search term for a medical issue and doctor name then return doctors who can help with that problem that also match the name|Alopecia, Jerry|returns list of Alopecia specialists in Portland, Oregon named Jerry|


## _Known Bugs_

No known bugs

## _Support and contact details_

Create a pull request on GitHub.

## _Technologies Used_

I used Javascript, HTML, CSS, Node, WebPack, and DuckDuckGo to build this program.

### _License_

GPL, keep information free.

Copyright (c) 2019 Brian Hensley
