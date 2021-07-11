const requestPost = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    return res;
  } else {
    throw new Error(res);
  }
};

const api = {
  fetchLogin: async (data) => {
    return await requestPost('/baemin/auth', data);
  },
  fetchSignUp: async (data) => {
    return await requestPost('/baemin/users', data);
  },
};

export { api };
