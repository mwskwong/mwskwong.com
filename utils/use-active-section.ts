import { throttle } from "lodash-es";
import { startTransition, useEffect, useState } from "react";

import nav, { home } from "@/constants/nav";

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState(home);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrolledToBottom) {
        const lastSection = nav.at(-1);
        if (lastSection) {
          startTransition(() => setActiveSection(lastSection));
        }
      } else {
        for (let i = nav.length - 1; i >= 0; i--) {
          const section = nav[i];
          const sectionElem = document.getElementById(section.id);
          const sectionActive =
            sectionElem &&
            sectionElem.offsetTop <
              document.documentElement.scrollTop +
                document.documentElement.clientHeight / 8;

          if (sectionActive) {
            startTransition(() => setActiveSection(section));
            break;
          }
        }
      }
    }, 1000 / 6); // 6 fps

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, []);

  return activeSection;
};

export default useActiveSection;
