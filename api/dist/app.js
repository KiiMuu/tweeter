"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const db_1 = __importDefault(require("./config/db"));
// app init
const app = express_1.default();
// db connection
db_1.default;
// get routes
const user_1 = __importDefault(require("./routes/user"));
// middlewares
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(compression_1.default());
// use routes
app.use('/api', user_1.default);
// app launching!
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is up on port: ${port}`);
});
