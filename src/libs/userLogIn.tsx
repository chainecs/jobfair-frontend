export async function userLogIn(email: string, password: string) {
  const response = await fetch("http://localhost:5001/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  console.log("Data received from API:", data);
  return data;
}

export async function userLogOut() {
  const response = await fetch("http://localhost:5001/api/v1/auth/logout", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return response;
}
