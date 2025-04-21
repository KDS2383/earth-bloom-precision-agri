
import { Layout } from "@/components/layout/Layout";
import { AccountForm } from "@/components/account/AccountForm";

const Account = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-farm-dark mb-6">Account Settings</h1>
        <AccountForm />
      </div>
    </Layout>
  );
};

export default Account;
