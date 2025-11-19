import AddMetadata from "@/lib/decorators/addMetadata";
import { ExtendUserProps } from "@/utils/decorators";

export type NewUser = {
  email: string;
  name?: string;
  // metadata fields will be injected by decorator
  createdAt?: string | number;
  updatedAt?: string;
  createdBy?: string;
  role?: string;
};

export class UserService {
  // Example: we decorate `create` so every new user gets metadata
  @ExtendUserProps()
  @AddMetadata({
    getCreatedBy: (args: unknown[]) => {
      // If caller passes a context/opts as second arg, try to read userId
      const opts = args[1] as { userId?: string } | undefined;
      return opts && opts.userId ? opts.userId : undefined;
    },
  })
  async create(user: NewUser, _opts?: { userId?: string }) {
    // Silence lint for optional argument while keeping signature for callers
    void _opts;
    console.log("[UserService.create] Received user object:", user);

    // In a real app you would persist to DB here (e.g., Supabase)
    // For demo we just return the object with metadata
    const saved = { ...user };

    console.log("[UserService.create] Returning saved user:", saved);
    return saved;
  }
}

export const userService = new UserService();
