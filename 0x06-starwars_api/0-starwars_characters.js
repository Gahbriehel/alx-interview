#!/usr/bin/node

const request = require('request');

// Get Movie ID from the command line argument
const movieId = process.argv[2];
if (!movieId) {
  console.error('Please provide a Movie ID.');
  process.exit(1);
}

// Base URL for the Star Wars API, with the specified Movie ID
const baseUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

request(baseUrl, function (error, res, body) {
  if (!error && res.statusCode === 200) {
    try {
      const data = JSON.parse(body);
      const characterIds = data.characters.map((characterUrl) =>
        characterUrl.split('/').filter(Boolean).pop()
      );

      // Array to hold character names in the correct order
      const characterNames = new Array(characterIds.length);
      let completedRequests = 0;

      // Fetch each character name and store in the correct position
      characterIds.forEach((characterId, index) => {
        const characterUrl = `https://swapi-api.alx-tools.com/api/people/${characterId}/`;
        request(characterUrl, (err, response, characterBody) => {
          if (!err && response.statusCode === 200) {
            try {
              const characterData = JSON.parse(characterBody);
              characterNames[index] = characterData.name;
            } catch (parseErr) {
              console.log(
                `Failed to parse character data for ID: ${characterId}`,
                parseErr
              );
            }
          } else {
            console.log(
              `Error fetching character with ID ${characterId}:`,
              err
            );
          }

          // Increment the completed requests counter
          completedRequests += 1;

          // Once all requests are complete, log the results in order
          if (completedRequests === characterIds.length) {
            characterNames.forEach((name) => console.log(name));
          }
        });
      });
    } catch (err) {
      console.log('Failed to parse JSON:', err);
    }
  } else {
    console.log('Error:', error);
  }
});
