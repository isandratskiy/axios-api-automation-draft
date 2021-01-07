module.exports = {
    rootDir: ".",
    testMatch: [
        "<rootDir>/test/github/**/*.spec.ts"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    }
}
