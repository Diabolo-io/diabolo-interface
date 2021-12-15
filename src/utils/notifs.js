import { useState, useEffect } from "react";
import useSWR from "swr";
import { NOTIFS_LIST } from "./constants";

export function useNotifs() {
  const [notifs, setNotifs] = useState();
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(NOTIFS_LIST, fetcher);

  useEffect(() => {
    if (data) {
      setNotifs(data);
    } else {
      setNotifs(undefined);
    }
  }, [data]); // fetch notifs

  return notifs;
}
