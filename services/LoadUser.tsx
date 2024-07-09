// api.ts
import axios from 'axios';
import { UserProps } from '@/types/user';

export const loadUser = async (userName: string) => {
  try {
    const res = await axios.get(`https://api.github.com/users/${userName}`);
    const data = res.data;

    const { avatar_url, login, id, name, location } = data;

    const userData: UserProps = {
      id,
      avatar_url,
      login,
      name,
      location,
    };

    return userData;
  } catch (error) {
    throw error;
  }
};
