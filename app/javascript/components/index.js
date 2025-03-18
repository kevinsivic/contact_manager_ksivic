"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContact = exports.Contacts = void 0;
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const App_1 = __importDefault(require("./App"));
document.addEventListener("turbo:load", () => {
    const root = (0, client_1.createRoot)(document.body.appendChild(document.createElement("div")));
    root.render(react_1.default.createElement(App_1.default, null));
});
var contacts_1 = require("./contacts");
Object.defineProperty(exports, "Contacts", { enumerable: true, get: function () { return contacts_1.Contacts; } });
var createContact_1 = require("./createContact");
Object.defineProperty(exports, "CreateContact", { enumerable: true, get: function () { return createContact_1.CreateContact; } });
