"use strict";
exports.__esModule = true;
exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.JWT_EXPIRATION = exports.JWT_ALGORITHM = exports.JWT_KEY = exports.JWT_ID = exports.APP_PORT = exports.NODE_ENV = void 0;
var dotenv = require("dotenv");
dotenv.config();
var getEnvKey = function (key) {
    if (process.env[key] === undefined) {
        throw new Error("Property \"".concat(key, "\" is missing in environment."));
    }
    return process.env[key];
};
exports.NODE_ENV = getEnvKey('NODE_ENV');
exports.APP_PORT = Number(getEnvKey('APP_PORT'));
exports.JWT_ID = getEnvKey('JWT_ID');
exports.JWT_KEY = "JWT_KEY";
exports.TOKEN_SECRET = getEnvKey('TOKEN_SECRET');
exports.ACCESSTOKEN_SECRET = getEnvKey('ACCESSTOKEN_SECRET');
exports.REFRESH_TOKEN_SECRET = getEnvKey('REFRESH_TOKEN_SECRET');
exports.REFRESH_TOKEN_EXPIRATION = getEnvKey('REFRESH_TOKEN_EXPIRATION');
exports.JWT_ALGORITHM = getEnvKey('JWT_ALGORITHM');
exports.JWT_EXPIRATION = getEnvKey('JWT_EXPIRATION');
exports.DB_HOST = getEnvKey('DB_HOST');
exports.DB_PORT = Number(getEnvKey('DB_PORT'));
exports.DB_USERNAME = getEnvKey('DB_USERNAME');
exports.DB_PASSWORD = getEnvKey('DB_PASSWORD');
exports.DB_NAME = getEnvKey('DB_NAME');
exports.TOKEN_SECRET = getEnvKey('TOKEN_SECRET');