// Copyright (c) Martin Costello, 2017. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

using System;

namespace MartinCostello.LondonTravel.Skill
{
    /// <summary>
    /// A class that improves a text string for speech purposes. This class cannot be inherited.
    /// </summary>
    internal static class Verbalizer
    {
        /// <summary>
        /// Returns a string which better represents the specified text when spoken.
        /// </summary>
        /// <param name="text">The text to verbalize.</param>
        /// <returns>
        /// The representation of the text that is enhanced for being spoken aloud by Alexa.
        /// </returns>
        internal static string Verbalize(string text)
        {
            return text
              .Replace("DLR", "D.L.R.", StringComparison.Ordinal)
              .Replace("e/b", "eastbound", StringComparison.Ordinal)
              .Replace("n/b", "northbound", StringComparison.Ordinal)
              .Replace("s/b", "southbound", StringComparison.Ordinal)
              .Replace("w/b", "westbound", StringComparison.Ordinal)
              .Replace("SWT", "South West Trains", StringComparison.Ordinal)
              .Replace("tfl", "T.F.L.", StringComparison.Ordinal)
              .Replace("TFL", "T.F.L.", StringComparison.Ordinal)
              .Replace("TfL", "T.F.L.", StringComparison.Ordinal)
              .Replace(" & ", " and ", StringComparison.Ordinal);
        }
    }
}
