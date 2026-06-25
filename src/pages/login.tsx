import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { AppLogoIcon } from "@/components/brand/app-logo";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthError } from "@/lib/auth";
import { type LoginFormValues, loginSchema } from "@/lib/form-schemas";

function getSafeRedirect(redirect: string | null): string {
  if (!redirect || !redirect.startsWith("/") || redirect.startsWith("//")) {
    return "/dashboard";
  }

  return redirect;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, login } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
  });

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={getSafeRedirect(searchParams.get("redirect"))} replace />;
  }

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);

    try {
      await login(values.password);
      navigate(getSafeRedirect(searchParams.get("redirect")), { replace: true });
    } catch (error) {
      if (error instanceof AuthError) {
        setFormError(error.status === 401 ? "Invalid password" : error.message);
        return;
      }

      setFormError("Unable to sign in. Please try again.");
    }
  });

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-2 flex justify-center">
            <AppLogoIcon className="size-10" />
          </div>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your admin password to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field data-invalid={!!form.formState.errors.password || !!formError}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldContent>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={!!form.formState.errors.password || !!formError}
                    disabled={form.formState.isSubmitting}
                    {...form.register("password")}
                  />
                  <FieldError errors={[form.formState.errors.password]} />
                  {formError ? <p className="text-destructive text-sm">{formError}</p> : null}
                </FieldContent>
              </Field>

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>

              <Button variant="link" asChild className="px-0">
                <Link to="/">Back to home</Link>
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
