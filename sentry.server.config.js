import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://3aa7cfcbbad6440daeedf09620db5f5b@o1103803.ingest.sentry.io/6130393",
  tracesSampleRate: 1.0,
});
