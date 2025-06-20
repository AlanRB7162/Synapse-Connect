# Synapse Connect

![Capa do Projeto](./banner.png)

# Sobre o Projeto

O **Synapse Connect** é uma plataforma onde usuários podem se cadastrar, criar cursos ou acessar conteúdos educacionais criados por outros usuários. O foco do projeto é oferecer um ambiente simples e acessível para quem deseja compartilhar e adquirir conhecimento na área de tecnologia.

<h4 align="center"> 
 📌 Projeto entregue como parte da disciplina de Ciência da Computação 📌
</h4>

# 📑 Índice

- 📌 [Sobre o Projeto](#sobre-o-projeto)
- ⚙️ [Como Iniciar o Projeto](#como-iniciar-o-projeto)
- ✅ [Requisitos Funcionais](#requisitos-funcionais)
- 🛠️ [Tecnologias Usadas](#tecnologias-usadas)
- 👥 [Autores](#autores)
- 🙏 [Agradecimentos](#agradecimentos)

# ⚙️ Como Iniciar o Projeto

1. **Banco de Dados:**

   - Execute o arquivo SQL `db_synapse.sql` (localizado na pasta `/database`) em uma ferramenta como o MySQL Workbench.
   - Isso criará o banco `db_synapse` com as tabelas necessárias.

> 💡 Caso queira popular o banco de dados com usuários e cursos de exemplo, execute também o arquivo:
>
> ```bash
> /database/popular_banco.sql
> ```

2. **Configuração de Ambiente (.env):**

   - Copie os arquivos `.env.example` e renomeie para `.env`, tanto na **raiz do projeto** quanto na **pasta `/backend`**.
   - Preencha as variáveis de ambiente com suas credenciais e secrets.

   - **.env na raiz (Frontend):**

     ```env
     REACT_APP_GOOGLE_CLIENT_ID=
     REACT_APP_CLIENT_ID_GITHUB=
     ```

   - **.env na pasta /backend:**

     ```env
     PORT=3001

     DB_HOST=localhost
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_NAME=db_synapse
     DB_PORT=3306

     CLIENT_ID_GITHUB=
     CLIENT_SECRET_GITHUB=

     JWT_SECRET=
     ```

⚠️ **Importante:**
- **Não altere a porta `3001` no backend.** O sistema depende dela para funcionar corretamente.
- Certifique-se de inserir corretamente o usuário e senha do MySQL.

3. **Instalação de Dependências e Execução:**

   - **Frontend:**
     ```bash
      # Acesse a raiz do projeto
      cd ./ 
      npm install
      npm start
     ```

   - **Backend:**
     ```bash
     cd backend
     tsc && node dist/server.js
     ```

     Se o comando acima não funcionar, tente:
     ```bash
     npx tsc && node dist/server.js
     ```

4. **Pronto!** Agora você pode acessar o sistema localmente e explorar seus recursos.

---

🔐 Para configurar os logins com Google e GitHub, acesse o guia abaixo:  
➡️ [`docs/Configurando_OAuth.md`](./docs/Configurando_OAuth.md)

---

# ✅ Requisitos Funcionais 

- [x] **Cadastro de Usuário**
- [x] **Login com conta local, Google e GitHub**
- [x] **Criação de Cursos**
- [x] **Visualização de Cursos por Categoria**
- [x] **Perfil do Usuário**
- [x] **Visualização de perfil público de outros usuários**
- [x] **Visualização de cursos criados por outros usuários**
- [x] **Layout responsivo (desktop e mobile)**
- [ ] Compra e matrícula em cursos
- [ ] Edição de perfil

# 🛠️ Tecnologias Usadas

- [React](https://reactjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Chakra UI](https://chakra-ui.com/)  
- [Express.js](https://expressjs.com/)  
- [MySQL](https://www.mysql.com/)  
- [JWT (JSON Web Token)](https://jwt.io/)  
- [OAuth 2.0 (Google e GitHub)](https://oauth.net/2/)

# 👥 Autores

- **Patrick de Melo Freitas Santos** — RA: 825157265  
- **Gabriel Amaro Lopes** — RA: 824130903  
- **Alan Rocha Binato** — RA: 824150209  
- **Lucas de Claris** — RA: 824137517  
- **Max Maya Monteiro Pereira** — RA: 824213243  

# 🙏 Agradecimentos

Agradecemos ao professor pela orientação e a todos que contribuíram direta ou indiretamente para o desenvolvimento deste projeto.
