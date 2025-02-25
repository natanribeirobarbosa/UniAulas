import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

// Função para buscar dados diretamente no servidor
async function fetchProfessores() {
  const professoresRef = collection(db, "professores"); // Certifique-se de passar o db corretamente
  const snapshot = await getDocs(professoresRef);
  return snapshot.docs.map((doc) => doc.data());
}

export default async function Home() {
  // Buscando os dados diretamente no componente (Server Component)
  const professores = await fetchProfessores();

  return (
    <div>
      <h1>Lista de Professores</h1>
      <Link href="/dashboard">Ir para Dashboard</Link>
      <ul>
        {professores.map((prof, index) => (
          <li key={index}>{prof.nome}</li>
          
        ))}
      </ul>
    </div>
  );
}