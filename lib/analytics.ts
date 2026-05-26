type Properties = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    mixpanel?: {
      track?: (eventName: string, properties?: Properties) => void;
    };
  }
}

export function track(eventName: string, properties: Properties = {}): void {
  if (typeof window === "undefined") {
    return;
  }

  console.debug("[track]", eventName, properties);
  window.gtag?.("event", eventName, properties);
  window.mixpanel?.track?.(eventName, properties);
}
