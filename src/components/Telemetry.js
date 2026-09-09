import { useRouter } from 'next/router';
import { Telemetry } from 'witold1-blog-telemetry/react';

/** Shared GoatCounter / GA4 / Clarity (witold1-blog-telemetry). */
export default function TelemetrySlot() {
  const router = useRouter();
  return <Telemetry path={router.asPath} />;
}
