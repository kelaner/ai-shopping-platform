import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const USER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'banned', label: 'Banned' },
  { value: 'rejected', label: 'Rejected' },
];

export const _userAbout = {
  id: _mock.id(1),
  role: _mock.role(1),
  email: _mock.email(1),
  school: _mock.companyNames(2),
  company: _mock.companyNames(1),
  country: _mock.countryNames(2),
  coverUrl: _mock.image.cover(3),
  totalFollowers: _mock.number.nativeL(1),
  totalFollowing: _mock.number.nativeL(2),
  quote:
    '我是一个热爱生活、享受甜蜜的人。就像对糖梅、燕麦蛋糕的喜爱，我对生活中的美好事物总是充满热情。无论是甜卷、焦糖，还是软糖，都能让我感受到简单的幸福。',
  socialLinks: {
    facebook: `https://www.facebook.com/caitlyn.kerluke`,
    instagram: `https://www.instagram.com/caitlyn.kerluke`,
    linkedin: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitter: `https://www.twitter.com/caitlyn.kerluke`,
  },
};

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  country: _mock.countryNames(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  postedAt: _mock.time(index),
  title: _mock.postTitle(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  media: _mock.image.travel(index + 1),
  message: _mock.sentence(index),
  personLikes: [...Array(20)].map((__, personIndex) => ({
    name: _mock.fullName(personIndex),
    avatarUrl: _mock.image.avatar(personIndex + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(index + 5),
        name: _mock.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: '真是厉害。',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(index + 6),
        name: _mock.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        '太棒了！简直让我叹为观止',
    },
  ],
}));

export const _userCards = [...Array(21)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  coverUrl: _mock.image.cover(index),
  avatarUrl: _mock.image.avatar(index),
  totalFollowers: _mock.number.nativeL(index),
  totalPosts: _mock.number.nativeL(index + 2),
  totalFollowing: _mock.number.nativeL(index + 1),
}));

export const _userPayment = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['mastercard', 'visa', 'visa'][index],
  primary: index === 1,
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: _mock.fullName(index),
  phoneNumber: _mock.phoneNumber(index),
  fullAddress: _mock.fullAddress(index),
  addressType: (index === 0 && 'Home') || 'Office',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  invoiceNumber: `INV-199${index}`,
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userPlans = [
  { subscription: 'basic', price: 0, primary: false },
  { subscription: 'starter', price: 4.99, primary: true },
  { subscription: 'premium', price: 9.99, primary: false },
];

export const _userList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  zipCode: '85807',
  state: 'Virginia',
  city: 'Rancho Cordova',
  role: _mock.role(index),
  email: _mock.email(index),
  address: '908 Jack Locks',
  name: _mock.fullName(index),
  isVerified: _mock.boolean(index),
  company: _mock.companyNames(index),
  country: _mock.countryNames(index),
  avatarUrl: _mock.image.avatar(index),
  phoneNumber: _mock.phoneNumber(index),
  status:
    (index % 2 && 'pending') || (index % 3 && 'banned') || (index % 4 && 'rejected') || 'active',
}));
