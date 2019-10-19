// Copyright (c) Martin Costello, 2017. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

using System;

namespace MartinCostello.LondonTravel.Skill
{
    /// <summary>
    /// A class representing the configuration for the skill.
    /// </summary>
    public sealed class SkillConfiguration
    {
        /// <summary>
        /// Gets or sets the ApplicationInsights instrumentation key to use.
        /// </summary>
        public string ApplicationInsightsKey { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the URL for the skill API.
        /// </summary>
        public string SkillApiUrl { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the skill's ID.
        /// </summary>
        public string SkillId { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the TfL API application Id.
        /// </summary>
        public string TflApplicationId { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the TfL API application key.
        /// </summary>
        public string TflApplicationKey { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets a value indicating whether to validate the skill's Id.
        /// </summary>
        public bool VerifySkillId { get; set; }

        /// <summary>
        /// Create a default instance of the skill configuration.
        /// </summary>
        /// <returns>
        /// The default <see cref="SkillConfiguration"/> to use.
        /// </returns>
        public static SkillConfiguration CreateDefaultConfiguration()
        {
            return new SkillConfiguration()
            {
                ApplicationInsightsKey = Environment.GetEnvironmentVariable("APPINSIGHTS_INSTRUMENTATIONKEY"),
                SkillApiUrl = Environment.GetEnvironmentVariable("SKILL_API_HOSTNAME"),
                SkillId = Environment.GetEnvironmentVariable("SKILL_ID"),
                TflApplicationId = Environment.GetEnvironmentVariable("TFL_APP_ID"),
                TflApplicationKey = Environment.GetEnvironmentVariable("TFL_APP_KEY"),
                VerifySkillId = bool.Parse(Environment.GetEnvironmentVariable("VERIFY_SKILL_ID")),
            };
        }
    }
}
