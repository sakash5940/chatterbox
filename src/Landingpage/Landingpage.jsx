import { useState, useEffect } from "react";
// import { auth, provider } from "../firebaseConfig";
// import { signInWithPopup, signOut } from "firebase/auth";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { motion } from "framer-motion";
 
export default function LandingPage() {
  const [user, setUser] = useState(null);
  const [guestMode, setGuestMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      setGuestMode(false);
    } catch (error) {
      console.error("Google Sign-In Error", error);
    }
  };

  const handleGuestMode = () => {
    setGuestMode(true);
    setUser({ displayName: "Guest", email: "guest@chatterbox.com" });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setGuestMode(false);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Sign-Out Error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="p-8 shadow-lg rounded-2xl bg-white">
          <CardContent>
            {user ? (
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Welcome, {user.displayName}</h1>
                <p className="text-gray-600">{user.email}</p>
                <Button onClick={handleSignOut} className="mt-4">Logout</Button>
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to Chatterbox</h1>
                <Button onClick={handleGoogleSignIn} className="mr-2">Sign in with Google</Button>
                <Button onClick={handleGuestMode} variant="outline">Continue as Guest</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
