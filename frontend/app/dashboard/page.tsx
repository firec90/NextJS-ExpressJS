import Layout from "../components/Layout";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          Card 1
        </div>
        <div className="bg-white p-6 rounded shadow">
          Card 2
        </div>
        <div className="bg-white p-6 rounded shadow">
          Card 3
        </div>
      </div>
    </Layout>
  );
}