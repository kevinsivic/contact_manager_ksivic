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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContact = CreateContact;
const react_1 = __importStar(require("react"));
const request_js_1 = require("@rails/request.js");
const Navigation_1 = require("./Navigation");
function CreateContact() {
    const [name, setName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [message, setMessage] = (0, react_1.useState)("");
    function onChange(event, setter) {
        setter(event.target.value);
    }
    function onSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const body = {
                "name": name,
                "email": email
            };
            const response = yield (0, request_js_1.post)('/api/v1/contacts', {
                body: JSON.stringify(body)
            });
            if (response.ok) {
                setMessage("Contact successfully created!");
            }
            else {
                const json = yield response.json;
                setMessage("Contact could not be created: " + JSON.stringify(json));
            }
        });
    }
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "Create a new Contact!"),
        react_1.default.createElement("div", { className: "message" }, message),
        react_1.default.createElement("form", { onSubmit: onSubmit },
            react_1.default.createElement("label", { htmlFor: "contactName" }, "Name"),
            react_1.default.createElement("input", { type: "text", name: "name", id: "contactName", required: true, onChange: (event) => onChange(event, setName) }),
            react_1.default.createElement("label", { htmlFor: "contactEmail" }, "Email"),
            react_1.default.createElement("input", { type: "text", name: "email", id: "contactEmail", required: true, onChange: (event) => onChange(event, setEmail) }),
            react_1.default.createElement("button", { type: "submit" }, "Create Contact")),
        react_1.default.createElement(Navigation_1.Navigation, null));
}
