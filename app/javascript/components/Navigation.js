"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = Navigation;
const react_router_dom_1 = require("react-router-dom");
const react_1 = __importDefault(require("react"));
function Navigation() {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("hr", { className: "my-4" }),
        react_1.default.createElement(react_router_dom_1.Link, { to: "/contacts", className: "btn btn-lg custom-button", role: "button" }, "View Contacts"),
        react_1.default.createElement(react_router_dom_1.Link, { to: "/contacts/new", className: "btn btn-lg custom-button", role: "button" }, "Create New Contact"));
}
