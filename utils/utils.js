import fs from 'fs';

function writeJsonArrayToFile(filename, jsonArray) {
  const jsonData = JSON.stringify(jsonArray, null, 2);

  fs.writeFileSync(filename, jsonData, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log(`JSON array successfully written to ${filename}`);
    }
  });
}

const writeMapToFile = (map, filePath) => {
  try {
    // Convert the Map to a plain JavaScript object
    const plainObject = {};
    map.forEach((value, key) => {
      plainObject[key] = value;
    });

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(plainObject, null, 2);

    // Write the JSON string to the file
    fs.writeFileSync(filePath, jsonString, 'utf8');

    console.log('Map has been successfully written to the file.');
  } catch (error) {
    console.error(`Error writing Map to file: ${error.message}`);
  }
};

const readJsonArrayFromFile = (filePath) => {
  try {
    // Read the file synchronously
    const jsonData = fs.readFileSync(filePath, 'utf8');

    // Parse the JSON data
    const jsonArray = JSON.parse(jsonData);

    // Check if the parsed data is an array
    if (Array.isArray(jsonArray)) {
      return jsonArray;
    } else {
      throw new Error('The content of the file is not a JSON array.');
    }
  } catch (error) {
    console.error(`Error reading JSON array from file: ${error.message}`);
    return null;
  }
};

export {
  writeJsonArrayToFile,
  writeMapToFile,
  readJsonArrayFromFile
}