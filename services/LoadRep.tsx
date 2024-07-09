import axios from 'axios';
import { GitHubUser, GitHubRepo } from '../types/user';

const GITHUB_API = process.env.GITHUB_API || 'https://api.github.com/users/';

export const loadRep = async (userName: string): Promise<{ user: GitHubUser; repos: GitHubRepo[] }> => {
  try {
    const userRes = await axios.get(`${GITHUB_API}${userName}`);
    const reposRes = await axios.get(`${GITHUB_API}${userName}/repos`);

    const userData: GitHubUser = userRes.data;
    const reposData: GitHubRepo[] = reposRes.data;

    return { user: userData, repos: reposData };
  } catch (error) {
    throw error;
  }
};
