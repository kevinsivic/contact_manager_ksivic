"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacts = Contacts;
const react_1 = __importStar(require("react"));
const request_js_1 = require("@rails/request.js");
const js_levenshtein_1 = __importDefault(require("js-levenshtein"));
function Contacts() {
    const MIN_DISTANCE = 3;
    const [contacts, setContacts] = (0, react_1.useState)([]);
    const [filter, setFilter] = (0, react_1.useState)("");
    const [filteredContacts, setFilteredContacts] = (0, react_1.useState)([]);
    const [error, setError] = (0, react_1.useState)("");
    const updateFilter = (e) => {
        setFilter(e.target.value);
    };
    function filterMatches(string) {
        const lowerCase = string.toLowerCase();
        if (filter == lowerCase.substring(0, filter.toLowerCase().length))
            return true;
        const distance = (0, js_levenshtein_1.default)(lowerCase, filter.toLowerCase());
        return distance < MIN_DISTANCE;
    }
    (0, react_1.useEffect)(() => {
        if (!filter) {
            setFilteredContacts(contacts);
        }
        else {
            setFilteredContacts(contacts.filter((contact) => {
                const names = contact.name.split(" ");
                const filteredNames = names.filter((name) => {
                    return filterMatches(name);
                });
                console.log(filteredNames.length > 0);
                return filteredNames.length > 0 || filterMatches(contact.email);
            }));
        }
    }, [contacts, filter]);
    (0, react_1.useEffect)(() => {
        (0, request_js_1.get)("/api/v1/contacts")
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            if (response.ok) {
                setContacts(yield response.json);
            }
            else {
                setError("Unable to retrieve contacts, please try again.");
            }
        }))
            .catch((error) => {
            console.log(error.message);
            setError("Unable to retrieve contacts, please try again.");
        });
    }, []);
    return react_1.default.createElement("div", { className: "contacts-list" },
        react_1.default.createElement("input", { type: "text", value: filter, onChange: updateFilter }),
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Name"),
                    react_1.default.createElement("th", null, "Email"),
                    react_1.default.createElement("th", null, "Edit"))),
            react_1.default.createElement("tbody", null, filteredContacts.map((contact, key) => {
                return (react_1.default.createElement("tr", { key: key },
                    react_1.default.createElement("td", null, contact.name),
                    react_1.default.createElement("td", null, contact.email),
                    react_1.default.createElement("td", null)));
            }))));
}
