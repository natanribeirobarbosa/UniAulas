import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Deslogado com sucesso!");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;