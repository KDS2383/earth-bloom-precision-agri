
import { Layout } from "@/components/layout/Layout";
// In your importing file
import AccountPage from "../components/account/AccountForm";
 
const Account = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-farm-dark mb-6">Account Settings</h1>
        <AccountPage />
      </div>
    </Layout>
  );
};

export default Account;