'use client';

import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth"; // Para atualizar o nome de exibição
import { db } from "../firebase"; // Supondo que você tenha configurado o Firestore
import { doc, setDoc } from "firebase/firestore"; // Para salvar dados no Firestore

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
    <div>
      <h2>Cadastrar</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Data de Nascimento"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Signup;
