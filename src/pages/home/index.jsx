import { useEffect, useState, useRef } from "react";
import "./style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    try {
      const usersFromApi = await api.get("/usuarios");
      setUsers(usersFromApi.data);
      console.log("Dados recebidos:", usersFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function creatUsers() {
  const name = inputName.current.value.trim();
  const age = inputAge.current.value.trim();
  const email = inputEmail.current.value.trim();

  if (!name || !age || !email) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  try {
    await api.post("/usuarios", { name, age, email });

    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";

    getUsers();
  } catch (error) {
    if (
      error.response &&
      error.response.status === 409 && // seu backend deve enviar 409 no erro de duplicidade
      error.response.data?.code === "P2002"
    ) {
      alert("Erro: Este e-mail já está cadastrado.");
    } else {
      alert("Erro: Este e-mail já está cadastrado.");
      console.error("Erro ao cadastrar usuário:", error);
    }
  }
}


  async function deleteUser(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      getUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box className="main-container">
      {/* === Cartão do Formulário de Cadastro === */}
      <Box className="form-card">
        <Box className="header-form">
          <Typography className="form-title" variant="h5" component="h2">
            Cadastro de Usuários
          </Typography>
        </Box>

        {/* === Campos de Input === */}
        <Box className="form-fields">
          <input name="name" type="text" ref={inputName} placeholder="Nome" />
          <input name="age" type="text" ref={inputAge} placeholder="Idade" />
          <input
            name="email"
            type="email"
            ref={inputEmail}
            placeholder="Email"
          />
        </Box>

        {/* === Mensagem de erro === */}
        {errorMsg && (
          <Typography
            color="error"
            sx={{ marginBottom: 2, fontWeight: "bold" }}
          >
            {errorMsg}
          </Typography>
        )}

        {/* === Botão de Cadastro === */}
        <Button
          className="register-button"
          variant="contained"
          type="button"
          onClick={creatUsers}
        >
          Cadastrar
        </Button>
      </Box>

      <Box className="users-list-card">
        {users.length > 0 ? (
          users.map((user) => (
            <Box key={user.id || user.email} className="user-card">
              <Box className="user-details">
                <p>
                  Nome: <span>{user.name}</span>
                </p>
                <p>
                  Idade: <span>{user.age}</span>
                </p>
                <p>
                  Email: <span>{user.email}</span>
                </p>
              </Box>
              <DeleteIcon
                className="delete-icon"
                onClick={() => deleteUser(user.id)}
              />
            </Box>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            Nenhum usuário cadastrado.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Home;
