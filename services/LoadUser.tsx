import axios from 'axios';
import { UserProps } from '../types/user';

const GITHUB_API = process.env.GITHUB_API || 'https://api.github.com/users/';

export const loadUser = async (userName: string): Promise<UserProps> => {
  try {
    const res = await axios.get(`${GITHUB_API}${userName}`);
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
