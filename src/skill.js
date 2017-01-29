// Copyright (c) Martin Costello, 2017. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

"use strict";

var api = require("./api");
var constants = require("./constants");
var responses = require("./responses");

var skill = {
  name: constants.appName,
  onError: function (exception, request, response) {
    console.log("Unhandled exception: ", exception);
    response.say(responses.onError);
  },
  onLaunch: function (request, response) {
    response.say(responses.onLaunch);
  },
  preReqest: function (request, response, type) {
  },
  postResponse: function (request, response, type, exception) {
  },
  setMessages: function (app) {
    app.messages.NO_INTENT_FOUND = responses.noIntent;
  },
  intents: [
    {
      name: "StatusIntent",
      enabled: true,
      slots: {
        "LINE": "LITERAL"
      },
      utterances: [
        "what is the status of the {LINE} {line|}"
      ],
      handler: function (request, response) {
        var line = request.slot("LINE");
        if (line) {
          response
            .say("I'm sorry, I can't tell you the status of " + line + " at the moment.")
            .reprompt(responses.onUnknown);
        } else {
          response.say(responses.onUnknown);
        }
      }
    },
    {
      name: "TestIntent",
      enabled: true,
      slots: {},
      utterances: [
        "to test connectivity"
      ],
      handler: function (request, response) {
        api.getLineStatus("victoria")
          .then(function (data) {
            response
              .say(data.length && data.length > 0 ? "Test successful." : "Test failed.")
              .send();
          })
          .catch(function (err) {
            console.log("Failed to test connectivity: ", err);
            response.say(responses.onError);
          });
        return false;
      }
    }
  ]
};

module.exports = skill;
