import React, { useCallback, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { Input } from "antd";
import { useMeasure } from "react-use";
import "./inputBox.less";

const { remote } = require("electron");
// import { HomeOutlined } from "@ant-design/icons";
const { TextArea } = Input;

export default () => {
  const [ref, { width, height }] = useMeasure();
  const [text, setText] = useState("");
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );
  useEffect(() => {
    console.log("width, height", width, height);
    remote.getCurrentWindow().setSize(width + 5 * 2, height + 5 * 2);
  }, [width, height]);

  useEffect(() => {
    const listener = (_: any, data: any) => {
      console.log("data", data.text, data.action);
      setText(data.text);
    };
    ipcRenderer.on("sync", listener);
    return () => {
      ipcRenderer.removeListener("sync", listener);
    };
  }, []);
  return (
    <div ref={ref} className="textAreaRoot">
      {text}
    </div>
  );
};
