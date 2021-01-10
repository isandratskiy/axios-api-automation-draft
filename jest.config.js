module.exports = {
    rootDir: ".",
    testMatch: [
        "<rootDir>/test/**/*.spec.ts"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    setupFilesAfterEnv: ["jest-allure/dist/setup"],
    reporters: ["jest-spec-reporter"]
}
