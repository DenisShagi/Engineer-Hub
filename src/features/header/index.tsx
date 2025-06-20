import { ROUTES } from '@/shared/model/routes'
import { useSession } from "@/shared/model/session";
import { Button } from "@/shared/ui/kit/button";
import { Link } from "react-router-dom";

export function AppHeader() {
  const { session, logout } = useSession();

  if (!session) {
    return null;
  }

  return (
    <header className="bg-background border-b border-border/40 shadow-sm py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to={ROUTES.BOARDS}
          className="flex items-center gap-4 text-xl font-semibold hover:opacity-60 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="Логотип Engineer Hub"
            width={60}
            height={60}
          />
          Engineer Hub
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{session.email}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            className="hover:bg-destructive/10"
          >
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
}
