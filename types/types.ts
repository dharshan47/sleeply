export interface Record {
  date: string | number | Date;
  id: string;
  text: string;
  amount: number;
  userId: string;
  createdAt: Date;
}

export interface PrivacySettings {
  showMemberSince: boolean;
  showLastActive: boolean;
}

export interface AuthActionData{
   user: {
    name: string;
    email: string;
  };
  url: string;
}