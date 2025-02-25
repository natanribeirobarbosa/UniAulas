'use client';

import { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Importando Firebase
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import LogoutButton from "@/app/LogoutButton.js";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          try {
            // Obtém o token atualizado do usuário autenticado
            const token = await currentUser.getIdToken(true);
            if (token) {
              setUser(currentUser);

              // Buscar dados do usuário no Firestore
              const userDocRef = doc(db, "users", currentUser.uid);
              const userSnap = await getDoc(userDocRef);

              if (userSnap.exists()) {
                setUserData(userSnap.data());
              } else {
                console.warn("Usuário não encontrado no Firestore");
              }
            }
          } catch (error) {
            console.error("Erro ao verificar autenticação:", error);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    };

    checkAuth();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <p>Usuário não autenticado.</p>;
  }

  return (
    <div>
      <h2>Bem-vindo, {userData ? userData.name : user.name}!</h2>
      <p>Email: {user?.email}</p>
      {userData && (
        <div>
          <p>Cargo: {userData.cargo ? userData.cargo : "Cargo ainda não atribuido! contate o Administrador!"}</p>
        </div>
      )}
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
