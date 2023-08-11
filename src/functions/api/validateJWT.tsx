import { Dispatch } from "react";

import { getValueFor } from "app/(auth)/sign-in";

const validateJWT: (setIsLoggedIn: Dispatch<boolean>) => void = async (
  setIsLoggedIn,
) => {
  try {
    const response = await fetch(
      "https://go-crud.fly.dev/api/validate", // production use
      // "http://localhost:8080/api/validate", // local use
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: await getValueFor("accessToken"),
        },
      },
    );

    if (!response.ok) {
      setIsLoggedIn(false);
      return false;
    }
    setIsLoggedIn(true);
    console.log("JWT is valid");
    return true;
  } catch (error) {
    console.error(error);
  }
};

export default validateJWT;
