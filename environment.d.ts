declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_HOST?: string,
    POSTGRES_PORT?: string,
    POSTGRES_USER?: string,
    POSTGRES_PASSWORD?: string,
    POSTGRES_DATABASE?: string,
    RUN_MIGRATIONS?: string,

    HOST?: string,
    PORT?: string,
    MODE?: string,
  }
}
