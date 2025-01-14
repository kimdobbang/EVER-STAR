import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';

export const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  if (!accessToken || accessToken === '') {
    return <Navigate to="/login" />;
  }

  return children;
};

export const PetDetailsRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const petDetails = useSelector((state: RootState) => state.pet.petDetails);

  if (!petDetails) {
    return <Navigate to="/mypage/profile" />;
  }

  return children;
};
