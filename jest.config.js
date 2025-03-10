module.exports = {
    testMatch: ["<rootDir>/test/specs/*.ts"], // Adjust path based on your structure
    transform: {
      "^.+\\.ts$": "ts-jest", // Ensure TypeScript files are processed correctly
    },
    moduleFileExtensions: ["ts", "js"],
  };
  