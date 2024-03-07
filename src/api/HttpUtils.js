import Config from "../../utils/config";

const BASE_URL = `${Config.BASE_URL}/api/`; // local url

// const BASE_URL = 'https://pakprintwishes.com:3001/api/v2/'; // aws


export const doHttpGet = (endPoint) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  return result;
};

export const doHttpGetById = (id, endPoint) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const result = fetch(BASE_URL + endPoint + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
  return result;
};

export const doHttpPost = (data , endPoint) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(data);
  myHeaders.append('Authorization', `Bearer ${Config.token}`);
  console.log('raw', raw)
  // myHeaders.append('Content-Type', 'multipart/form-data');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error);
      return error;
    });
  return result;
};

export const doHttpMultipartWithOutAuth = (data, endPoint) => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: data,
    redirect: 'follow',
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error.message);
      return error;
    });
  return result;
};

export const doHttpMultipart = (data, token, endPoint) => {
  // console.log('token with type', typeof (token), token)
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Content-Type', 'multipart/form-data');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => {
      // console.log(response); // Add this line
      return response.json();
    })
    .then(result => {
      // console.log(result); // Add this line
      return result;
    })
    .catch(error => {
      // console.log('error', error.message);
      return error;
    });
  return result;
};
export const doHttpMultipartwithPatch = (data, token, endPoint) => {
  // console.log('token with type', typeof (token), token)
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Content-Type', 'multipart/form-data');
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => {
      console.log(response); // Add this line
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error.message);
      return error;
    });
  return result;
};

export const getToken = () => {
  return localStorage.get('TOKEN');
};

export const doHttpAuth = (params, endPoint, callback) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(params);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };
  // console.log('raw', raw)
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error);
      return error;
    });
  return result;
};
export const doHttpNewPass = (params, endPoint, callback) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(params);
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error);
      return error;
    });
  return result;
};
export const doHttpAuthPatch = (params, endPoint, callback) => {
  console.log('PARAMS   ', params)
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify({ email: params });
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log('result', result)
      return result;
    })
    .catch(error => {
      console.log('error', error);
      return error;
    });
  return result;
};
export const doHttpGetAfterLogin = (token, endPoint) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error);
      return error;
    });
  return result;
};

export const doHttpPatch = (params, token, endPoint) => {
  console.log(params)
  const data = JSON.stringify(params)
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      showWarning(error.message)
      console.log('error', error);
      return error;
    });
  return result;
};

export const doHttpPatchWithoutMultipart = (params, token, endPoint) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: params,
    redirect: 'follow',
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error);
      return error;
    });
  return result;
};
export const doHttpPatchWithoutBody = (token, endPoint) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    // body: params,
    redirect: 'follow',
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error);
      return error;
    });
  return result;
};
export const doHttpPostWithoutMultpart = (params, token, endPoint) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(params);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error);
      return error;
    });
  return result;
};
export const doHttpMultipartWithoutdata = (token, endPoint) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  // myHeaders.append('Content-Type', 'multipart/form-data');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error);
      return error;
    });
  return result;
};

export const doHttpDelete = (token, endPoint) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);
  // myHeaders.append('Content-Type', 'multipart/form-data');
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };
  const result = fetch(BASE_URL + endPoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.log('error', error);
      return error;
    });
  return result;
};
