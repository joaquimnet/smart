import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { fetchProject } from '../../services/project.service';

interface Props {}

export const ProjectRead: React.FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const auth = useSelector((state: any) => state.auth);

  const { data: project } = useQuery(['project', auth, id], fetchProject);

  return <div>{project && <pre>{JSON.stringify(project, null, 2)}</pre>}</div>;
};
