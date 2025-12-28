import AuthForm from "@/client/components/auth/AuthForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center py-20 px-6" style={{ background: 'linear-gradient(to bottom, #fff9f0 0%, #f3f0ff 50%, #d4e9ff 100%)' }}>
            <AuthForm type="login" />
        </div>
    );
}
