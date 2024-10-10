import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    setToken(tokenFromCookie);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setToken(undefined);
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Species App
        </Typography>
        {token ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
