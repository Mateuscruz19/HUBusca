import axios from 'axios';
import { GitHubUser, GitHubRepo } from '../types/user';

export const loadRep = async (userName: string): Promise<{ user: GitHubUser; repos: GitHubRepo[] }> => {
  try {
    const userRes = await axios.get(`https://api.github.com/users/${userName}`);
    const reposRes = await axios.get(`https://api.github.com/users/${userName}/repos`);

    const userData: GitHubUser = userRes.data;
    const reposData: GitHubRepo[] = reposRes.data;

    return { user: userData, repos: reposData };
  } catch (error) {
    throw error;
  }
};
