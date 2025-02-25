import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Login from "../routes/login/page";
import Register from "../routes/register/page";
import Dashboard from "../routes/dashboard/page";
import LogoutButton from "./App/LogoutButton";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Meu App</h1>
      {!user ? (
        <>
          <Register />
          <Login />
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
