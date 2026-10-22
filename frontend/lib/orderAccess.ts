const orderAccessPrefix = "order-access:";
const accessLifetimeMs = 24 * 60 * 60 * 1000;

type StoredOrderAccess = {
  accessKey: string;
  expiresAt: number;
};

function storageKey(orderNumber: string) {
  return `${orderAccessPrefix}${orderNumber}`;
}

export function saveOrderAccessKey(orderNumber: string, accessKey: string) {
  if (!orderNumber || !accessKey) return;

  const key = storageKey(orderNumber);

  try {
    window.sessionStorage.setItem(key, accessKey);
  } catch {
    // Local storage remains available in most browsers when session storage is blocked.
  }

  try {
    const storedAccess: StoredOrderAccess = {
      accessKey,
      expiresAt: Date.now() + accessLifetimeMs
    };
    window.localStorage.setItem(key, JSON.stringify(storedAccess));
  } catch {
    // The URL fragment remains the fallback for the immediate confirmation load.
  }
}

export function readOrderAccessKey(orderNumber: string) {
  const key = storageKey(orderNumber);

  try {
    const sessionAccessKey = window.sessionStorage.getItem(key);
    if (sessionAccessKey) {
      saveOrderAccessKey(orderNumber, sessionAccessKey);
      return sessionAccessKey;
    }
  } catch {
    // Try bounded local persistence next.
  }

  try {
    const value = window.localStorage.getItem(key);
    if (!value) return "";

    const storedAccess = JSON.parse(value) as Partial<StoredOrderAccess>;
    if (
      typeof storedAccess.accessKey !== "string" ||
      !storedAccess.accessKey ||
      typeof storedAccess.expiresAt !== "number" ||
      storedAccess.expiresAt <= Date.now()
    ) {
      window.localStorage.removeItem(key);
      return "";
    }

    return storedAccess.accessKey;
  } catch {
    return "";
  }
}

export function migrateSessionOrderAccessKeys() {
  try {
    for (let index = 0; index < window.sessionStorage.length; index += 1) {
      const key = window.sessionStorage.key(index);
      if (!key?.startsWith(orderAccessPrefix)) continue;

      const accessKey = window.sessionStorage.getItem(key);
      const orderNumber = key.slice(orderAccessPrefix.length);
      if (accessKey && orderNumber) saveOrderAccessKey(orderNumber, accessKey);
    }
  } catch {
    // Storage may be unavailable in private or restricted browser contexts.
  }
}
