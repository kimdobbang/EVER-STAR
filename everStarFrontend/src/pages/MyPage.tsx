import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Footer } from 'components/molecules/Footer/Footer';
import { MyinfoMove } from 'components/templates/MyInfoMove';
import { Profile } from 'components/templates/Profile';
import { MyInfo } from 'components/templates/MyInfo';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import { PetDetailsRoute } from 'ProtectedRoutes';

export const MyPage: React.FC = () => {
  const petDetails = useSelector((state: RootState) => state.pet.petDetails);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !petDetails) {
      navigate('/mypage/profile');
    }
  }, [accessToken, petDetails, navigate]);

  return (
    <div className="relative flex flex-col w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full min-h-screen bg-center bg-cover z-[-1]"
        style={{
          backgroundImage: `url(${require('assets/images/bg-login.webp')})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col items-center justify-start flex-grow min-h-screen">
        <Routes>
          <Route path="/" element={<MyinfoMove />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myinfo" element={<MyInfo />} />
        </Routes>
      </div>

      {/* 고정된 푸터 - PetDetailsRoute로 감싸서 펫이 선택된 상황에서만 렌더링 */}
      <PetDetailsRoute>
        <Footer className="fixed bottom-0 left-0 z-50 w-full" />
      </PetDetailsRoute>
    </div>
  );
};
