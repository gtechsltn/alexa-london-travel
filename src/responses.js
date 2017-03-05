// Copyright (c) Martin Costello, 2017. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

"use strict";

var SsmlBuilder = require("ssml-builder");
var verbalizer = require("./verbalizer");

var responses = {
  noAudioPlayer: "Sorry, this application does not support audio streams.",
  noIntent: "Sorry, I don't understand how to do that.",
  noSession: "Sorry, the session is not available.",
  onError: "Sorry, something went wrong.",
  onInvalidRequest: "Sorry, that request is not valid.",
  onLaunch: verbalizer.verbalize("Welcome to London Travel. You can ask me about disruption or for the status of any tube line, London Overground or the DLR."),
  onNoDisruption: verbalizer.verbalize("There is currently no disruption on the tube, London Overground or the DLR."),
  onUnknownLine: verbalizer.verbalize("Sorry, I am not sure what line you said. You can ask about the status of any tube line, London Overground or the DLR."),
  onSessionEnded: "Goodbye.",
  toSsml: function (text) {
    var builder = new SsmlBuilder();
    builder.say(text);
    return builder.ssml(true);
  }
};

module.exports = responses;
