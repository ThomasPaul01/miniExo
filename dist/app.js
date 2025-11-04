"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./router/index"));
const db_1 = require("./config/db");
dotenv_1.default.config();
(async () => {
    try {
        await (0, db_1.connectDB)();
        const port = Number(process.env.PORT || 3000);
        index_1.default.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    }
    catch (err) {
        console.error('DB connection failed:', err);
        process.exit(1);
    }
})();
