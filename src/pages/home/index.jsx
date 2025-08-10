import "./style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Home() {
  const users = [
    {
      id: "122erytruyht",
      nome: "João",
      idade: 25,
      email: "joao@email",
    },
    {
      id: "122erytruyht",
      nome: "Ana Maria",
      idade: 30,
      email: "ana@email",
    },
    {
      id: "122erytruyht",
      nome: "Ana Maria",
      idade: 30,
      email: "ana@email",
    },
  ];

  return (
    <>
      <div className="container">
        <form action="">
          <h1>Cadastro de Usuários</h1>

          <div className="input-with-icon">
            <AccountCircle style={{ fontSize: 100, color: "#777" }} />
          </div>

          <input placeholder="Nome" name="nome" type="text" />
          <input placeholder="Idade" name="idade" type="number" />
          <input placeholder="Email" name="email" type="email" />
          <button type="button">Cadastrar</button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>
                Nome: <span>{user.nome}</span>
              </p>
              <p>
                Idade: <span>{user.idade}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
            </div>

            <button>
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
