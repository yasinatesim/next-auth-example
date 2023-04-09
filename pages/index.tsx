import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { debounce } from '@/helpers';

import { useLocalStorage } from '@/hooks';

import { getUserInfoWithToken } from '@/services/login';

import { useUser } from '@/store/hooks';
import { removeUser, setUser } from '@/store/reducers/user';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const user = useUser();
  const { getStoredValue, removeValue } = useLocalStorage();
  const router = useRouter();

  const token = getStoredValue('user_auth_token');

  const fetchUserDataDebounced = debounce(async (token: string) => {
    try {
      const data = await getUserInfoWithToken({ token });
      dispatch(setUser(data));
    } catch (err) {
      console.error(err);
    }
  }, 0);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else if (!user) {
      fetchUserDataDebounced(token);
    }
  }, [token, user]);

  const handleUserLogout = () => {
    removeValue('user_auth_token');
    dispatch(removeUser());
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Next Js Auth Example</title>
        <meta name="description" content="Next Js Auth Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Hoş geldin {user.username}</h1>
      </div>

      <div>
        <button onClick={() => handleUserLogout()}>Çıkış yap</button>
      </div>
    </>
  );
};

export default Home;
