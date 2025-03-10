export default {
  testMatch: ["<rootDir>/test/specs/*.ts"], // Adjust path based on your test structure
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
};
