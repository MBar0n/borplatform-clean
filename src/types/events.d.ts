declare global {
  interface WindowEventMap {
    navigate: CustomEvent<{ page?: string }>;
  }
}

export {};

