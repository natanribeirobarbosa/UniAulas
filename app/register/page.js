'use client';

import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth"; // Para atualizar o nome de exibição
import { db } from "../config/firebase"; // Supondo que você tenha configurado o Firestore
import { doc, setDoc } from "firebase/firestore"; // Para salvar dados no Firestore
import Link from 'next/link';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [phone, setPhone] = useState(""); // Campo adicional para telefone
  const [birthdate, setBirthdate] = useState(""); // Campo adicional para data de nascimento

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Cria o usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Atualiza o nome de exibição
      await updateProfile(user, {
        displayName: name,
      });

      // Salva os dados adicionais no Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        birthdate,
      });

      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Cadastrar</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

<div className="flex justify-between mt-4">
<Link href="/">
            <button className="text-gray-600 dark:text-gray-900 ">
              ← Voltar para Início
            </button>
          </Link>

<button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Cadastrar
          </button>
          


</div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
