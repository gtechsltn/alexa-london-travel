// Copyright (c) Martin Costello, 2017. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

"use strict";

var api = require("./../api");
var responses = require("./../responses");
var Speech = require("ssml-builder");

var intent = {
  api: api,
  name: "DisruptionIntent",
  enabled: true,
  slots: {},
  utterances: [
    "about {|any} {|line|tube} {closures|disruption|disruptions} {|today}",
    "are there any {|line|tube} closures {|today}",
    "if there {are|is} {|any} {|line|tube} {closures|disruption|disruptions} {|today}"
  ]
};

/**
 * Generates the raw status text to respond to the specified disruption response.
 * @param {Object[]} data - An array of disruptions.
 * @returns {String[]} An array containing the raw text response for the specified disruptions, if any.
 */
intent.generateRawResponse = function (data) {

  var statuses = [];

  if (data && data.length > 0) {
    // Deduplicate any status descriptions. For example, if a tube
    // line has a planned closure and severe delays, the message will appear twice.
    for (var i = 0; i < data.length; i++) {
      var description = data[i].description;
      if (statuses.indexOf(description) === -1) {
        statuses.push(description);
      }
    }
  }

  return statuses;
};

/**
 * Generates the text to respond to the specified disruption status(es).
 * @param {String[]} statuses - An array of disruption descriptions.
 * @returns {String} The SSML response for the specified status(es).
 */
intent.generateResponse = function (statuses) {

  var builder = new Speech();

  if (!statuses || statuses.length === 0) {
    builder.say(responses.onNoDisruption);
  }
  else {

    for (var i = 0; i < statuses.length; i++) {
      builder.paragraph(statuses[i].replace("DLR", "D.L.R."));
    }

    builder.paragraph("There is a good service on all other lines.");
  }

  return builder.ssml(true);
};

/**
 * Generates the card to respond to the specified disruption status(es).
 * @param {String[]} statuses - An array of disruption descriptions.
 * @returns {Object} The card object to use.
 */
intent.generateCard = function (statuses) {

  var text;

  if (statuses.length === 0) {
    text = responses.onNoDisruption.replace("D.L.R.", "DLR");
  } else {
    text = statuses.join("\n");
  }

  return {
    type: "Standard",
    title: "Disruption Summary",
    text: text
  };
};

/**
 * Handles the intent for disruption.
 * @param {Object} request - The Alexa skill request.
 * @param {Object} response - The Alexa skill response.
 * @returns {Object} The result of the intent handler.
 */
intent.handler = function (request, response) {
  return intent.api.getDisruption(["dlr", "overground", "tube"])
    .then(function (data) {

      var statuses = intent.generateRawResponse(data);
      var ssml = intent.generateResponse(statuses);
      var card = intent.generateCard(statuses);

      response
        .say(ssml)
        .card(card);
    })
    .catch(function (err) {
      console.error("Failed to check for disruption:", err);
      response.say(responses.onError);
    });
};

module.exports = intent;
