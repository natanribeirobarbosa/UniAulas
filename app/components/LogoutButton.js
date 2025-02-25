'use client'; // Certifique-se de usar 'use client' para componente cliente

import { useRouter } from 'next/navigation'; // Corrigido o import do useRouter
import { signOut } from 'firebase/auth';
import { auth } from '@/app/config/firebase';

const LogoutButton = () => {
  const router = useRouter(); // Definindo o router aqui

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Você foi desconectado!');
      router.push('/'); // Redireciona para a página inicial após o logout
    } catch (error) {
      alert('Erro ao desconectar: ' + error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 active:bg-red-800 transition duration-300"
    >
      Deslogar da conta
    </button>
  );
};

export default LogoutButton;
