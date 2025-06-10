import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import CabecalhoVerde from "../../componentes/CabecalhoVerde";
import { db } from "../../Server/firebase";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  nome: string;
  email: string;
  statusUsuario: boolean;
  nivel: string;
  statusPagamento: boolean | string;
}

export default function Gerenciamento() {
  const [usuarios, setUsuarios] = useState<UserInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "usuario"));
        const list: UserInfo[] = [];
        for (const docUser of usersSnapshot.docs) {
          const dataUser = docUser.data();
          let nivel = "";
          let statusPagamento: boolean | string = "N/A";
          const acessoQuery = query(
            collection(db, "acesso"),
            where("id", "==", dataUser.id)
          );
          const acessoSnapshot = await getDocs(acessoQuery);
          if (!acessoSnapshot.empty) {
            const acessoData = acessoSnapshot.docs[0].data();
            nivel = String(acessoData.nivel);
            statusPagamento = acessoData.status;
          }
          list.push({
            nome: dataUser.nome,
            email: dataUser.email,
            statusUsuario: dataUser.status,
            nivel,
            statusPagamento,
          });
        }
        setUsuarios(list);
      } catch (e) {
        console.error("Erro ao buscar usuários", e);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={style.container}>
      <CabecalhoVerde>
        <span className={style.title}>Gerenciamento</span>
      </CabecalhoVerde>
      <div className={style.menu}>
        <button
          className={style.linkButton}
          onClick={() => navigate("/register")}
        >
          Criar Usuário
        </button>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Nível de Acesso</th>
            <th>Status de Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, idx) => (
            <tr key={idx}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.statusUsuario ? "Ativo" : "Inativo"}</td>
              <td>{u.nivel}</td>
              <td>
                {typeof u.statusPagamento === "boolean"
                  ? u.statusPagamento
                    ? "Pago"
                    : "Pendente"
                  : u.statusPagamento}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
