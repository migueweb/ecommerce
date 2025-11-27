type Method = (...args: unknown[]) => unknown | Promise<unknown>;

type GetCreatedByFn = (args: unknown[]) => string | undefined;

interface DecoratedPayload {
  createdAt?: string | number;
  updatedAt?: string;
  createdBy?: string;
  [key: string]: unknown;
}

export interface AddMetadataOptions {
  getCreatedBy?: GetCreatedByFn;
}

/**
 * Method decorator that adds metadata to the first argument object.
 * - Adds `createdAt` and `updatedAt` with ISO timestamps
 * - Adds `createdBy` using `getCreatedBy` or falls back to `"system"`
 * - Logs execution to the console so you can verify it's running
 */
export function AddMetadata(options: AddMetadataOptions = {}) {
  return function (
    _target: unknown,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original: Method = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      const key = propertyKey as string | symbol;
      console.log(`[AddMetadata] Decorating call to \`${String(key)}\``);

      if (args.length > 0 && args[0] && typeof args[0] === "object") {
        const payload = args[0] as DecoratedPayload;
        const nowIso = new Date().toISOString();

        if (payload.createdAt == null) {
          payload.createdAt = nowIso;
        }

        payload.updatedAt = nowIso;

        try {
          const createdBy = options.getCreatedBy ? options.getCreatedBy(args) : undefined;
          if (payload.createdBy == null) {
            payload.createdBy = createdBy ?? "system";
          }
        } catch {
          if (payload.createdBy == null) {
            payload.createdBy = "system";
          }
        }

        console.log("[AddMetadata] Added/updated metadata:", {
          createdAt: payload.createdAt,
          updatedAt: payload.updatedAt,
          createdBy: payload.createdBy,
        });
      } else {
        console.log("[AddMetadata] No object argument found; skipping metadata addition.");
      }

      // Call original method and return its value (support Promise or sync)
      const result = original.apply(this, args);
      if (result instanceof Promise) {
        return await result;
      }
      return result;
    };

    return descriptor;
  };
}

export default AddMetadata;
