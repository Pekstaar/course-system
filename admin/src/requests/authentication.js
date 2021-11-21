import axios from "axios";

const url = "http://localhost:3001";

export const login = async (code, password) => {
  await axios
    .post(`${url}/auth/login/admin`, {
      body: {
        code,
        password,
      },
    })
    .then((response) => console.log(response));
};
