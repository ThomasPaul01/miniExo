"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_1 = __importDefault(require("./movies"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Logger très verbeux: activable en mettant LOG_REQUEST_HEADERS=1
app.use((req, res, next) => logger(req, res, next));
// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Movies API
app.use('/movies', movies_1.default);
function logger(req, _res, next) {
    if (process.env.LOG_REQUEST_HEADERS === '1') {
        console.log('\n--- headerLogger: request.headers ---');
        console.log(req.headers);
        console.log('--- end headers ---\n');
    }
    next();
}
exports.default = app;
