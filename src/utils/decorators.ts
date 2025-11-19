type Method = (...args: unknown[]) => unknown | Promise<unknown>;

interface UserPayload {
  role?: string;
  createdAt?: string | number;
  [key: string]: unknown;
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

/**
 * Method decorator that ensures a user payload contains default role/createdAt values.
 */
export function ExtendUserProps() {
  return function (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original: Method = descriptor.value;

    if (typeof original !== "function") {
      throw new Error("@ExtendUserProps can only be applied to methods");
    }

    const wrapped: Method = function (...args: unknown[]) {
      if (args.length > 0 && isRecord(args[0])) {
        const payload = args[0] as UserPayload;

        if (payload.role == null) {
          payload.role = "user";
        }

        if (payload.createdAt == null) {
          payload.createdAt = Date.now();
        }
      }

      return original.apply(this, args);
    };

    descriptor.value = wrapped;
    return descriptor;
  };
}
