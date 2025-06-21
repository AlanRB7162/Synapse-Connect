# 🔐 Guia: Como obter Client ID e Client Secret (Google e GitHub)

Este guia tem como objetivo auxiliar na criação e configuração das credenciais necessárias para que o login com Google e GitHub funcione corretamente no projeto **Synapse Connect**.

---

# 📑 Índice

- 🟦 [Credenciais do GitHub](#credenciais-do-github)
- 🟥 [Credenciais do Google](#credenciais-do-google)
- 📁 [Onde colocar as credenciais](#onde-colocar-as-credenciais)

---

# 🟦 Credenciais do GitHub

### 1. Acesse:
[https://github.com/settings/developers](https://github.com/settings/developers)

### 2. Clique em **"OAuth Apps"** > **"New OAuth App"**

### 3. Preencha o formulário:

- **Application name:** Synapse Connect  
- **Homepage URL:** `http://localhost:3000`  
- **Authorization callback URL:** `http://localhost:3001/auth/github/callback`

### 4. Clique em **Register application**

Após isso, o GitHub exibirá:

- **Client ID**
- **Client Secret**

---

# 🟥 Credenciais do Google

### 1. Acesse:
[https://console.cloud.google.com/](https://console.cloud.google.com/)

### 2. Crie um novo projeto (ou selecione um existente)

### 3. No menu lateral, vá em:
**APIs e serviços** > **Credenciais**

### 4. Clique em **"Criar credencial"** > **"ID do cliente OAuth"**

> ⚠️ Se for a primeira vez, será necessário configurar a **tela de consentimento OAuth**. Basta preencher com:
> - Nome do app
> - E-mail de suporte
> - Domínio autorizado (opcional)

### 5. Configure a credencial:

- **Tipo de aplicativo:** Aplicativo da Web  
- **Nome:** Synapse Connect  

**URIs autorizados de JavaScript:**
```
http://localhost:3000
```

**URIs de redirecionamento autorizados:**
```
http://localhost:3001/auth/google/callback
```

### 6. Clique em **Criar**

Você receberá:

- **Client ID**
- **Client Secret**

---

# 📁 Onde colocar as credenciais

### 🔹 `.env` na raiz do projeto (frontend)

```env
REACT_APP_GOOGLE_CLIENT_ID=...
REACT_APP_CLIENT_ID_GITHUB=...
```

### 🔸 `.env` na pasta `/backend`

```env
PORT=3001

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=db_synapse
DB_PORT=3306

CLIENT_ID_GITHUB=...
CLIENT_SECRET_GITHUB=...

CLIENT_SECRET_GOOGLE=... (opcional)

JWT_SECRET=... (sua chave aleatória para assinar tokens JWT)
```

---

Após configurar tudo, **reinicie o frontend e backend** para que as variáveis de ambiente sejam carregadas corretamente.

<h4 align="center"> 
 ✅ Agora o login via Google e GitHub está pronto para uso! ✅
</h4>