import { GetResult, load } from '@fingerprintjs/fingerprintjs';
import { useEffect, useState } from 'react';

export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<GetResult>();

  useEffect(() => {
    void (async () => {
      const fp = await load({ debug: process.env.NODE_ENV === 'development' });
      const fingerprint = await fp.get();

      setFingerprint(fingerprint);
    })();
  }, []);

  return fingerprint;
};
