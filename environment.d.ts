declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_HOST?: string,
    POSTGRES_PORT?: string,
    POSTGRES_USER?: string,
    POSTGRES_PASSWORD?: string,
    POSTGRES_DATABASE?: string,
    RUN_MIGRATIONS?: string,

    GOOGLE_CLIENT_ID?: string,
    GOOGLE_SECRET?: string,

    HOST?: string,
    PORT?: string,
    MODE?: string,
    USE_SSL?: string,
    SESSION_SECRET?: string,
  }
}
