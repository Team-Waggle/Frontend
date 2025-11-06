import axios from 'axios';
import { BASE_URL, PROJECTS_MEMBER_URL } from '../constants/endpoint';

export const getProjectMember = async (projectId: number) => {
  const { data } = await axios.get(
    `${BASE_URL}${PROJECTS_MEMBER_URL(projectId)}`,
  );
  return data.payload;
};
