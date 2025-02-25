'use client';

import { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Importando Firebase
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import LogoutButton from "@/app/LogoutButton.js";
import Link from 'next/link';

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-red-500">Usuário não autenticado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Bem-vindo, {userData ? userData.name : user.name}!
        </h2>
        <p className="text-gray-700 dark:text-gray-300">Email: {user?.email}</p>

        {userData && (
          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              Cargo: {userData.cargo ? userData.cargo : "Cargo ainda não atribuído! Contate o Administrador!"}
            </p>
          </div>
        )}

<div className="mt-6 flex justify-center gap-4">
  <LogoutButton />
  

  <Link href="/">
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
    Tela inicial
  </button>
  
  </Link>

</div>


        
       
        </div>
      
    </div>
  );
};

export default Dashboard;
