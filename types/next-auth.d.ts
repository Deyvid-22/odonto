export declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      stripe_customer_id?: string;
      times?: string[];
      adress?: string;
      phone?: string;
      status: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }
}
