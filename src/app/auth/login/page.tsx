import LoginForm from "@/components/forms/loginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-950 text-primary-foreground">
            <Card className="w-[400px] bg-neutral-950 text-primary-foreground border-none">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>login to access llm.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <LoginForm />
                </CardContent>
            </Card>
        </main>
    )
}