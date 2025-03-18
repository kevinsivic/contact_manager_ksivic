"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Navigation_1 = require("./Navigation");
exports.default = () => (react_1.default.createElement("div", { className: "vw-100 vh-100 primary-color d-flex align-items-center justify-content-center" },
    react_1.default.createElement("div", { className: "jumbotron jumbotron-fluid bg-transparent" },
        react_1.default.createElement("div", { className: "container secondary-color" },
            react_1.default.createElement("h1", { className: "display-4" }, "Contact Manager"),
            react_1.default.createElement("p", { className: "lead" }, "A list of contacts to maintain your connections!"),
            react_1.default.createElement(Navigation_1.Navigation, null)))));
