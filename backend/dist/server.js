"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Connection verification test
app.get("/ping", (req, res) => {
    db_1.default.query("SELECT 1", (err) => {
        if (err)
            res.status(500).json({ error: "Erro ao conectar ao MySQL" });
        else
            res.json({ message: "Conexão bem-sucedida!" });
    });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
app.post("/register", (req, res) => {
    const { nome, usuario, email, senha } = req.body;
    db_1.default.query("INSERT INTO Usuario (nome, usuario, email, senha) VALUES (?, ?, ?, ?)", [nome, usuario, email, senha], (err, result) => {
        if (err) {
            console.error("Registering error: ", err);
            return res.status(500).json({ error: "Database registration error" });
        }
        console.log("User registered successfully: ", { nome, usuario, email });
        res.status(200).json({ message: "Registration successful" });
    });
});
