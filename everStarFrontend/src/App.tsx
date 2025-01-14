import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyPage } from 'pages/MyPage';
import { EverstarPage } from 'pages/EverstarPage';
import { TutorialPage } from 'pages/TutorialPage';
import { EarthPage } from 'pages/EarthPage';
import { SplashPageRedirector } from 'pages/SplashPageRedirector';
import { SignUpPage } from 'pages/SignUpPage';
import { LoginPage } from 'pages/LoginPage';
import { OAuthCallback } from 'pages/OAuthCallback';
import { PrivateRoute, PetDetailsRoute } from 'ProtectedRoutes';
import { OpenViduApp } from 'components/templates/OpenViduApp';
import './firebase-messaging-sw';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* 로그인 없이 접근 가능한 경로들 */}
          <Route path="/" element={<SplashPageRedirector />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/:userEmail" element={<SignUpPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/oauth/*" element={<OAuthCallback />} />
          <Route path="/earth/*" element={<EarthPage />} />
          <Route path="/openvidu/sessionid" element={<OpenViduApp />} />
          <Route path="/openvidu/sessionid/:sessionId" element={<OpenViduApp />} />
          {/* 보호된 경로들 */}
          {/* Profile 경로는 로그인만 필요 */}
          <Route
            path="/mypage/*"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />

          {/* 아래 경로들은 로그인과 PetDetails가 모두 필요 */}
          <Route
            path="/everstar/:pet/*"
            element={
              <PrivateRoute>
                <PetDetailsRoute>
                  <EverstarPage />
                </PetDetailsRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/pets/*"
            element={
              <PrivateRoute>
                <PetDetailsRoute>
                  <EarthPage />
                </PetDetailsRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
