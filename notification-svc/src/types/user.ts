type optionalField = string | null;

export interface User {
  id: string;
  name: string;
  username?: optionalField;
  bio?: optionalField;
  email?: optionalField;
  emailVerified: Date | null;
  image?: optionalField;
  coverImage?: optionalField;
  profileImage?: optionalField;
  profileImageUrl?: optionalField;
}
