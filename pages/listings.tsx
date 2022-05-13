import AuthGuard from "@App/lib/auth/AuthGuard";

export default function ListingsPage() {
  return (
    <AuthGuard>
      <div>
        <h1>Listings</h1>
      </div>
    </AuthGuard>
  );
}
