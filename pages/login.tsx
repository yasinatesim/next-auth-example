import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { useLocalStorage } from '@/hooks';

import { setUser } from '@/store/reducers/user';

import { getUserInfo } from '@/services/login';
import { Errors } from '@/types/models';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { setValue, getStoredValue } = useLocalStorage();

  useEffect(() => {
    const user = getStoredValue('user_auth_token');

    if (user) {
      router.push('/');
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: Errors = {};
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    if (!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(password)) {
      errors.password = 'Password must be at least 6 characters and contain letters and numbers only';
    }
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    // Login API call
    const { user, token } = await getUserInfo({ username, password })

    if (user) {


      dispatch(setUser(user));

      setValue('user_auth_token', token);

      router.push('/');
    } else {
      setErrors({ general: 'Invalid credentials' });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </label>
      {errors.general && <span style={{ color: 'red' }}>{errors.general}</span>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
