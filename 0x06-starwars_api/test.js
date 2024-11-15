const request = require("request");
const baseUrl = "https://swapi-api.alx-tools.com/api/films/3/";

request(baseUrl, function (error, res, body) {
  if (!error && res.statusCode === 200) {
    try {
      const data = JSON.parse(body);
      const characterIds = data.characters.map((characterUrl) =>
        characterUrl.split("/").filter(Boolean).pop()
      );

      characterIds.forEach((characterId) => {
        const characterUrl = `https://swapi-api.alx-tools.com/api/people/${characterId}/`;

        request(characterUrl, (err, response, characterBody) => {
          if (!err && response.statusCode === 200) {
            try {
              const characterData = JSON.parse(characterBody);
              console.log(characterData.name);
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
        });
      });
    } catch (err) {
      console.log("Failed to parse JSON:", err);
    }
  } else {
    console.log("Error:", error);
  }
});
