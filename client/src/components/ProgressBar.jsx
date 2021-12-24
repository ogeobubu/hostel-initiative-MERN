import { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import styled from "styled-components";

const Progress = styled.div`
  height: 5px;
  background-color: purple;
  margin-top: 20px;
`;

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return <Progress style={{ width: progress + "%" }}></Progress>;
};

export default ProgressBar;
