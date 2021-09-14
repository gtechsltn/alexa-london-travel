// Copyright (c) Martin Costello, 2017. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

using Alexa.NET.Request;
using MartinCostello.LondonTravel.Skill.Intents;
using Microsoft.Extensions.DependencyInjection;

namespace MartinCostello.LondonTravel.Skill;

/// <summary>
/// A class representing a factory for <see cref="IIntent"/> instances. This class cannot be inherited.
/// </summary>
internal sealed class IntentFactory
{
    /// <summary>
    /// Initializes a new instance of the <see cref="IntentFactory"/> class.
    /// </summary>
    /// <param name="serviceProvider">The <see cref="IServiceProvider"/> to use.</param>
    public IntentFactory(IServiceProvider serviceProvider)
    {
        ServiceProvider = serviceProvider;
    }

    /// <summary>
    /// Gets the <see cref="IServiceProvider"/> to use.
    /// </summary>
    private IServiceProvider ServiceProvider { get; }

    /// <summary>
    /// Creates an intent responder for the specified intent.
    /// </summary>
    /// <param name="intent">The intent to create a responder for.</param>
    /// <returns>
    /// The <see cref="IIntent"/> to use to generate a response for the intent.
    /// </returns>
    public IIntent Create(Intent intent)
    {
        switch (intent.Name)
        {
            case "AMAZON.CancelIntent":
            case "AMAZON.StopIntent":
                return ServiceProvider.GetRequiredService<EmptyIntent>();

            case "AMAZON.HelpIntent":
                return ServiceProvider.GetRequiredService<HelpIntent>();

            case "CommuteIntent":
                return ServiceProvider.GetRequiredService<CommuteIntent>();

            case "DisruptionIntent":
                return ServiceProvider.GetRequiredService<DisruptionIntent>();

            case "StatusIntent":
                return ServiceProvider.GetRequiredService<StatusIntent>();

            default:
                return ServiceProvider.GetRequiredService<UnknownIntent>();
        }
    }
}
