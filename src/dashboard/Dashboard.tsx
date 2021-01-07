import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import { fetchProjects, IProject } from '../services/project.service';
import { DashboardLayout } from './DashboardLayout';

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const auth = useSelector((state: any) => state.auth);

  const { data: projects } = useQuery<IProject[]>(['projects', auth], fetchProjects);


  if (!auth.user) {
    return <Redirect to='/login' />;
  }

  return (
    <>
      <Helmet>
        <title>SMART - Dashboard</title>
      </Helmet>
      <DashboardLayout projects={projects ?? []} />
    </>
  );
};
