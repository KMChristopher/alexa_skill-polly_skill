var Alexa = require('ask-sdk-core')
var axios = require('axios')

function getKanyeQuote() {
  return axios.get('https://api.kanye.rest').then(function (response) { //KMC: I think I need to change something here ...
    return response.data.quote
  })
}

var CancelOrStopIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'StopIntent')
  },
  handle(handlerInput) {
    var responseText = 'Thank you for using Polly. Have a great day!' //KMC: I think I need to change something here ...

    return handlerInput.responseBuilder
      .speak(responseText)
      .getResponse()
  }
}

var CrackerIntentHandler = { //KMC: I think I need to change something here ...
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

var LaunchIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    var responseText = 'Welcome to Polly! You can ask Polly to repeat after you to have your words echoed back.' //KMC: I think I need to change something here ...

    return handlerInput.responseBuilder
      .speak(responseText)
      .getResponse()
  }
}

var HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'HelpIntent'
  },
  handle(handlerInput) {
    var responseText = 'You can say "Polly, repeat after me" and Polly will echo what you say back to you.' //KMC: I think I need to change something here ...

    return handlerInput.responseBuilder
      .speak(responseText)
      .getResponse()
  }
}

var RepeatIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'RepeatIntent'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(handlerInput.requestEnvelope.request.intent.slots.RepeatWords.value)
      .getResponse()
  }
}

var ErrorHandler = {
  canHandle() { return true },
  handle(handlerInput, error) {
    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.') //KMC: I think I need to change something here ...
      .reprompt('Sorry, I can\'t understand the command. Please say again.') //KMC: I think I need to change something here ...
      .getResponse()
  }
}

var builder = Alexa.SkillBuilders.custom()

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
