"use strict";
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const axios_1 = __importDefault(require("axios"));
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
app.post("/login", (req, res) => {
    const { loginInput, senha } = req.body;
    db_1.default.query("SELECT * FROM Usuario WHERE (email = ? OR usuario = ?) AND senha = ?", [loginInput, loginInput, senha], (err, result) => {
        if (err) {
            console.error("Login validation error: ", err);
            return res.status(500).json({ error: "Internal server error on login validation" });
        }
        if (result.length > 0) {
            console.log("Login successful: ", result[0]);
            res.status(200).json({ message: "Login successful", user: result[0] });
        }
        else {
            console.log("Invalid login credentials");
            res.status(401).json({ error: "Invalid login credentials" });
        }
    });
});
//github Login features
const CLIENT_ID_GITHUB = "Ov23liWwkyOZLTDR9qs2";
const CLIENT_SECRET_GITHUB = "680385149e68946ffc9b37b8c2903ec43ab6441c";
app.get("/auth/github/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        // Trocar o code por access token
        const tokenRes = yield axios_1.default.post(`https://github.com/login/oauth/access_token`, {
            client_id: CLIENT_ID_GITHUB,
            client_secret: CLIENT_SECRET_GITHUB,
            code,
        }, {
            headers: {
                accept: "application/json",
            },
        });
        const access_token = tokenRes.data.access_token;
        // Buscar dados do usuário com o token
        const userRes = yield axios_1.default.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        // Exemplo: redireciona para frontend com nome no query
        res.redirect(`http://localhost:3000/?name=${userRes.data.name}`);
    }
    catch (err) {
        res.status(500).json({ error: "Erro na autenticação com GitHub" });
    }
}));
app.listen(3001, () => {
    console.log("Servidor backend ouvindo na porta 3001");
});
app.post("/auth/google", (req, res) => {
    const { googleId, email, nome, fotoPerfil } = req.body;
    db_1.default.query("SELECT * FROM GoogleUsuario WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Error verifying Google user:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length > 0) {
            console.log("Google user already exists:", result[0]);
            return res.status(200).json({ message: "Successful Google Login", user: result[0] });
        }
        else {
            // Se não existir, insere o usuário
            db_1.default.query("INSERT INTO GoogleUsuario (googleId, email, nome, fotoPerfil) VALUES (?, ?, ?, ?)", [googleId, nome, email, fotoPerfil], (err, insertResult) => {
                if (err) {
                    console.error("Error inserting Google user: ", err);
                    return res.status(500).json({ error: "Error inserting Google user" });
                }
                console.log("Google user registered successfully:", { googleId, email, nome, fotoPerfil });
                res.status(201).json({ message: "Google user registered successfully", user: { googleId, email, nome, fotoPerfil } });
            });
        }
        ;
    });
});
