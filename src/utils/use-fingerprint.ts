import { GetResult, load } from '@fingerprintjs/fingerprintjs';
import { useEffect, useState } from 'react';

export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<GetResult>();

  useEffect(() => {
    void (async () => {
      const fp = await load();
      const fingerprint = await fp.get();

      setFingerprint(fingerprint);
    })();
  }, []);

  return fingerprint;
};
