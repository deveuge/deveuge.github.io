---
title: Toxigent
date: "2021-01-03T00:00:00.000Z"
description: "React web application built to display the data collected by a self-made web scraper, Poisonous Plants Scraper, about poisonous plants to pets."
tags: ["React", "Web Scraper", "Pupeteer"]

imagePreview: "img/projects/toxigent-00.png"
codePreview: "https://github.com/deveuge/toxigent"
livePreview: "https://toxigent.netlify.app"

images:
  [
    "img/projects/toxigent-00.png",
    "img/projects/toxigent-01.png",
    "img/projects/toxigent-02.png",
  ]
---

# Toxigent

**Toxigent** is a React-based web application built with [Create React App](https://github.com/facebook/create-react-app) that allows to visualize information about plants that are toxic to pets. The information is collected by a self-developed web scraper [Poisonous Plants Scraper](https://github.com/deveuge/poisonous-plants-scraper), built with [Puppeteer](https://pptr.dev), which gathers information about poisonous plants for pets and saves the data in JSON format.

<a href="https://toxigent.netlify.app" target="_blank">![See demo](https://img.shields.io/badge/See%20demo-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)</a>

## Features

- Homepage that lists all poisonous plants to dogs and cats and lets you filter and/or order them by:
  - Common or scientific name.
  - Toxicity level: all, moderate or severe.
  - Plant type: all, house plant, garden plant or wild plant.
  - Toxicity: all, toxic to dogs, non-toxic to dogs, toxic to cats, non-toxic to cats.
  - Show only plants that contain detailed info: if this option is marked, only plants that contain data in "detailedInfo" will be displayed.
- Use of [material-table](https://material-table.com/) to display all plants in a table that offers the following functionality:
  - Ordering by table headers.
  - Custom action that allow the user to navigate to the detail of each plant.
  - Export option to download the data in CSV or PDF format.
  - Possibility to switch to night mode, that swaps the light palette to one darker.
  - Possibility to navigate to the detail of a random plant. This option is located at the bottom of the webpage.
- Detail page of each plant displaying the following information:
  - Image of the plant, obtained from the detailed info. If there isn't one specified, a placeholder image will be shown.
    - Icon of the plant.
    - List of common symptoms.
    - Type and toxicity of the plant.
    - Table with detailed info of the plant. If the plant doesn't have detailed info, the message _"No details available"_ will be displayed.
    - List of Wikipedia results related to the scientific name of the plant, limiting the results to a maximum of 3. If no results were found, the message _"No Wikipedia results available"_ will be displayed.

## Technical aspects

- The plant data is stored as a JSON file in the application itself to avoid building a backend to serve it. The application loads this file at startup only once and then uses it to display the requested information to the user.
- No additional frontend libraries are contemplated to build the web interface as they are considered unnecessary in the case of a Single Page Application. That is why only CSS grid and flexbox are used to make a responsive design that displays correctly on all screens.
