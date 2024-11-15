const request = require("request");
const baseUrl = "https://swapi-api.alx-tools.com/api/films/3/";

request(baseUrl, function (error, res, body) {
  if (!error && res.statusCode === 200) {
    try {
      const data = JSON.parse(body);
      const characterIds = data.characters.map((characterUrl) =>
        characterUrl.split("/").filter(Boolean).pop()
      );

      const characterNames = [];

      const fetchCharacterName = (index) => {
        if (index >= characterIds.length) {
          characterNames.forEach((name) => console.log(name));
          return;
        }

        const characterUrl = `https://swapi-api.alx-tools.com/api/people/${characterIds[index]}/`;
        request(characterUrl, (err, response, characterBody) => {
          if (!err && response.statusCode === 200) {
            try {
              const characterData = JSON.parse(characterBody);
              characterNames[index] = characterData.name;
              fetchCharacterName(index + 1);
            } catch (parseErr) {
              console.log(
                `Failed to parse character data for ID: ${characterIds[index]}`,
                parseErr
              );
            }
          } else {
            console.log(
              `Error fetching character with ID ${characterIds[index]}:`,
              err
            );
          }
        });
      };

      fetchCharacterName(0);
    } catch (err) {
      console.log("Failed to parse JSON:", err);
    }
  } else {
    console.log("Error:", error);
  }
});
