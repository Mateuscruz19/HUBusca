import axios from 'axios';
import { loadUser } from '../services/LoadUser';
import { UserProps } from '../types/user';

jest.mock('axios');

describe('loadUser function', () => {
  it('fetches user data successfully', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockUserData: UserProps = {
      id: 1,
      avatar_url: 'https://example.com/avatar.png',
      login: 'testuser',
      name: 'Test User',
      location: 'Test City',
    };

    mockedAxios.get.mockResolvedValue({ data: mockUserData });

    const userName = 'testuser';
    const userData = await loadUser(userName);

    expect(userData).toEqual(mockUserData);
    expect(mockedAxios.get).toHaveBeenCalledWith(`https://api.github.com/users/${userName}`);
  });

  it('handles errors when fetching user data', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const errorMessage = 'Request failed with status code 404';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    const userName = 'nonexistentuser';

    await expect(loadUser(userName)).rejects.toThrow(errorMessage);
    expect(mockedAxios.get).toHaveBeenCalledWith(`https://api.github.com/users/${userName}`);
  });
});
