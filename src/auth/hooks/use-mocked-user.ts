import { _mock } from 'src/_mock';

// To get the user from the <AuthContext/>, you can use

// Change:
// import { useMockedUser } from 'src/auth/hooks';
// const { user } = useMockedUser();

// To:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: '邱明杰',
    email: 'demo@minimals.cc',
    photoURL: _mock.image.avatar(24),
    phoneNumber: _mock.phoneNumber(1),
    country: _mock.countryNames(2),
    address: "中山路 90 号",
    province: "广东省",
    state: "广东省",
    city: "广州市",
    zipCode: "510000",
    about: "热爱生活每一天，喜欢在阳光下漫步，享受简单而美好的日常，用心感受生活的每一刻。",
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
