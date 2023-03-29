import { useState } from "react";

export const useApi = () => {
  const [state, updateState] = useState({
    error: null,
    loading: false,
    res: null,
  });

  const setState = useCallBack((newState) =>
    updateState((prevState) => ({
      ...prevState,
      ...newState,
    }))
  );
};


