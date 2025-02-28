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
    country: _mock.countryNames(1),
    address: "中山路 90 号",
    province: "广东省",
    city: "广州市",
    zipCode: "510000",
    about: "这里环境优美。周围绿树成荫，是一个休闲散步的好去处。附近有许多特色小店。",
    role: 'admin',
    isPublic: true,
  };

  return { user };
}
