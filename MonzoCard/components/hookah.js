import { useEffect, useState } from "react";

export const usePromiseAll = (
  promises,
  cb
) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });
