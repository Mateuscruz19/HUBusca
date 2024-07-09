export type UserProps = {
    id: number;
    name: string,
    avatar_url: string;
    login: string;
    location: string;
}

export interface GitHubUser {
    id: number;
    name: string;
    login: string;
    avatar_url: string;
    location: string;
    followers: number;
    following: number;
    public_repos: number;
  }
  
  export interface GitHubRepo {
    id: number;
    name: string;
    language: string;
    description: string;
    created_at: string;
    pushed_at: string;
    html_url: string;
  }
  
  