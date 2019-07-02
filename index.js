let Alexa = require('ask-sdk-core')
let axios = require('axios')





//KMC: I think I need to change something here ... I think that, instead of a function that gets the Kayne quote,
// I want to input my If/Else statements here 

function SortingQuestion1_Season (){
  If answer1_Season = "Warmer"
    add (1 to Gryffindor AND 1 to Hufflepuff)
      else if answer1_Season = "Colder"
        add (1 to Ravenclaw AND 1 to Slytherin)
}

function SortingQuestion2_Recharge (){
  If answer2_Recharge = "With people"
    add (1 to Gryffindor AND 1 to Hufflepuff)
      else if answer2_Recharge = "Alone"
        add (1 to Ravenclaw AND 1 to Slytherin)
}

function SortingQuestion3_Rules (){
  If answer3_Rules = "Yes"
    add (1 Hufflepuff AND 1 to Ravenclaw)
      else if answer3_Rules = "No"
        add (1 to Gryffindor AND 1 to Slytherin)
}

function SortingQuestion4_Choose (){
  If answer4_Choose = "Gryffindor"
    add (1 Gryffindor)
      else if answer4_Choose = "Hufflepuff"
        add (1 to Hufflepuff)
      else if answer4_Choose = "Ravenclaw"
        add (1 to Ravenclaw)
      else if answer4_Choose = "Slytherin"
        add (1 to Slytherin)
}


// KMC: Original code ... 
// function getKanyeQuote() {
//   return axios.get('https://api.kanye.rest').then(function (response) { 
//     return response.data.quote
//   })
// }









let CancelOrStopIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'StopIntent')
  },
  handle(handlerInput) {
    let responseText = 'Thank you for using Polly. Have a great day!' //KMC: I think I need to change something here ...

    return handlerInput.responseBuilder
      .speak(responseText)
      .getResponse()
  }
}

let CrackerIntentHandler = { //KMC: I think I need to change something here ...
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'CrackerIntent' //KMC: I think I need to change something here ...
  },
  handle(handlerInput) {
    return getKanyeQuote().then(function (quote) { //KMC: I think I need to change something here ...
      return handlerInput.responseBuilder
        .speak(quote)
        .getResponse()
    })
  }
}

let LaunchIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    let responseText = 'Welcome to Polly! You can ask Polly to repeat after you to have your words echoed back.' //KMC: I think I need to change something here ...

    return handlerInput.responseBuilder
      .speak(responseText)
      .getResponse()
  }
}

let HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'HelpIntent'
  },
  handle(handlerInput) {
  let responseText = 'You can say "Polly, repeat after me" and Polly will echo what you say back to you.' //KMC: I think I need to change something here ...

    return handlerInput.responseBuilder
      .speak(responseText)
      .getResponse()
  }
}

let RepeatIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'RepeatIntent'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.requestEnvelope.request.intent.slots.RepeatWords.value) //KMC: I think I need to change something here ...
      .getResponse()
  }
}

let ErrorHandler = {
  canHandle() { return true },
  handle(handlerInput, error) {
    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.') //KMC: I think I need to change something here ...
      .reprompt('Sorry, I can\'t understand the command. Please say again.') //KMC: I think I need to change something here ...
      .getResponse()
  }
}

let builder = Alexa.SkillBuilders.custom()

exports.handler = builder
  .addRequestHandlers(
    CancelOrStopIntent,
    CrackerIntentHandler,
    HelpIntentHandler,
    LaunchIntentHandler,
    RepeatIntentHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda()
