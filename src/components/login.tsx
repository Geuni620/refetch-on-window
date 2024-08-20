import { Button } from 'src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card';

type LoginProps = {
  onClick: () => void;
};

export function Login({ onClick }: LoginProps) {
  return (
    <Card onClick={onClick} className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Sign in with your GitHub account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button className="w-full" variant="outline">
            Login with GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
