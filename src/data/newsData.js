export const newsData = {
  categories: [
    {
      id: "world",
      name: "World",
      description: "Global news and international events"
    },
    {
      id: "politics",
      name: "Politics",
      description: "Political news and analysis"
    },
    {
      id: "tech",
      name: "Technology",
      description: "Latest trends and updates in the tech world"
    },
    {
      id: "health",
      name: "Health",
      description: "Health news, research, and wellness tips"
    },
    {
      id: "sports",
      name: "Sports",
      description: "Scores, highlights, and analysis from the sports world"
    }
  ],
  articles: [
    {
      id: "001",
      slug: "syria-constitution-analysis",
      title: "Syria's interim constitution raises fears of sectarian division",
      category: "politics",
      source: "VOA KURDISH",
      author: {
        name: "James Wilson",
        role: "Senior Political Correspondent",
        avatar: "https://gdb.voanews.com/a4110ae1-6d5d-4caf-0a0b-08dd5c8b1668_cx4_cy20_cw91_w256_r1.png"
      },
      publishDate: "2025-04-13T08:00:00Z",
      thumbnail: "https://gdb.voanews.com/f3c20ebc-4e21-451d-0735-08dd5c8b1668_w650_r1.png",
      heroImage: "https://gdb.voanews.com/23938ddc-e6cc-4a24-0a2a-08dd5c8b1668_cx8_cy0_cw87_w1023_r1.png",
      summary: "Analysis shows potential risks in Syria's new temporary constitution...",
      content: [
        {
          type: "paragraph",
          text: "The newly proposed Syrian interim constitution has sparked concerns among political analysts and international observers. While intended to stabilize governance, critics warn it may entrench sectarian divisions and complicate peace efforts."
        },
        {
          type: "quote",
          text: "This document could potentially deepen existing divisions and hinder national unity.",
          author: "Dr. Sarah Ahmed",
          role: "Political Analyst"
        },
        {
          type: "paragraph",
          text: "Observers point out ambiguities in the power-sharing framework and the absence of minority safeguards. The international community is calling for inclusive dialogue to revise the draft."
        }
      ],
      tags: ["Syria", "Constitution", "Middle East"],
      relatedArticles: ["002", "003"]
    },
    {
      id: "002",
      slug: "ai-breakthrough-neuralink",
      title: "Neuralink achieves major AI-brain interface milestone",
      category: "tech",
      source: "TechCrunch",
      author: {
        id: "auth002",
        name: "Emily Tran",
        role: "Technology Reporter"
      },
      publishDate: "2025-04-12T15:30:00Z",
      thumbnail: "https://gdb.voanews.com/f3c20ebc-4e21-451d-0735-08dd5c8b1668_w650_r1.png",
      heroImage: "https://gdb.voanews.com/23938ddc-e6cc-4a24-0a2a-08dd5c8b1668_cx8_cy0_cw87_w1023_r1.png",
      summary: "Elon Musk’s Neuralink claims successful human brain-computer interaction trial...",
      content: [
        {
          type: "paragraph",
          text: "In a landmark announcement, Neuralink has reported successful results from its first human trials of a brain-computer interface. The technology enables direct communication between the brain and external devices."
        },
        {
          type: "paragraph",
          text: "This breakthrough could revolutionize treatments for neurological disorders, including paralysis and Parkinson’s disease. The trial participant was able to move a cursor using only brain signals."
        },
        {
          type: "quote",
          text: "We are closer than ever to restoring autonomy to individuals with motor disabilities.",
          author: "Dr. Alicia Monroe",
          role: "Neuroscientist"
        }
      ],
      tags: ["AI", "Neuralink", "Technology", "Brain Interface"]
    },
    {
      id: "003",
      slug: "covid-variant-alert",
      title: "New COVID-19 variant detected in Europe",
      category: "health",
      source: "WHO",
      author: {
        id: "auth003",
        name: "Dr. Anika Sharma",
        role: "Health Correspondent"
      },
      publishDate: "2025-04-11T10:45:00Z",
      thumbnail: "https://gdb.voanews.com/f3c20ebc-4e21-451d-0735-08dd5c8b1668_w650_r1.png",
      heroImage: "https://gdb.voanews.com/23938ddc-e6cc-4a24-0a2a-08dd5c8b1668_cx8_cy0_cw87_w1023_r1.png",
      summary: "Health officials warn about increased transmissibility of new variant...",
      content: [
        {
          type: "paragraph",
          text: "European health authorities have identified a new COVID-19 sub-variant exhibiting increased transmissibility. The variant, dubbed 'Omega-2', shows mutations similar to those found in earlier strains of concern."
        },
        {
          type: "quote",
          text: "Early data suggests a faster spread but not necessarily higher severity.",
          author: "Dr. Erik Lindstrom",
          role: "WHO Virologist"
        },
        {
          type: "paragraph",
          text: "Vaccination and masking are still recommended. Research is ongoing to determine the full implications of the variant."
        }
      ],
      tags: ["COVID-19", "Variant", "Health", "Europe"]
    },
    {
      id: "004",
      slug: "champions-league-final-preview",
      title: "Champions League Final 2025: What to expect",
      category: "sports",
      source: "ESPN",
      author: {
        id: "auth004",
        name: "Carlos Mendes",
        role: "Sports Analyst"
      },
      publishDate: "2025-04-13T09:00:00Z",
      thumbnail: "https://gdb.voanews.com/f3c20ebc-4e21-451d-0735-08dd5c8b1668_w650_r1.png",
      heroImage: "https://gdb.voanews.com/23938ddc-e6cc-4a24-0a2a-08dd5c8b1668_cx8_cy0_cw87_w1023_r1.png",
      summary: "Real Madrid faces Manchester City in a blockbuster final showdown...",
      content: [
        {
          type: "paragraph",
          text: "Football fans worldwide are gearing up for the 2025 UEFA Champions League Final, where Real Madrid will face Manchester City. The match is set to take place at Wembley Stadium."
        },
        {
          type: "paragraph",
          text: "Madrid's experience and City's tactical depth promise an intense contest. Players like Vinícius Júnior and Haaland are expected to shine."
        },
        {
          type: "quote",
          text: "This final could define a generation of footballers.",
          author: "Thierry Henry",
          role: "Former UEFA Champion"
        }
      ],
      tags: ["Champions League", "Football", "Real Madrid", "Manchester City"]
    },
    {
      id: "005",
      slug: "g7-summit-ukraine-support",
      title: "G7 leaders reaffirm support for Ukraine at annual summit",
      category: "world",
      source: "Reuters",
      author: {
        id: "auth005",
        name: "Laura Chen",
        role: "Foreign Affairs Correspondent"
      },
      publishDate: "2025-04-13T06:00:00Z",
      thumbnail: "https://gdb.voanews.com/f3c20ebc-4e21-451d-0735-08dd5c8b1668_w650_r1.png",
      heroImage: "https://gdb.voanews.com/23938ddc-e6cc-4a24-0a2a-08dd5c8b1668_cx8_cy0_cw87_w1023_r1.png",
      summary: "The G7 reaffirmed its unified stance on aiding Ukraine during talks...",
      content: [
        {
          type: "paragraph",
          text: "At the G7 Summit in Tokyo, world leaders pledged continued military and economic support to Ukraine. They emphasized the importance of territorial integrity and democratic values."
        },
        {
          type: "paragraph",
          text: "Sanctions against Russia are set to continue, with additional measures under review. Humanitarian efforts will also be expanded."
        },
        {
          type: "quote",
          text: "Unity among democracies is more critical now than ever.",
          author: "Laura Chen",
          role: "Reuters"
        }
      ],
      tags: ["G7", "Ukraine", "Geopolitics", "World News"]
    }
  ]
};
