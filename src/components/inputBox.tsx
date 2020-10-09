import React, { useCallback, useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import { Button, Input } from "antd";
import "./inputBox.less";
// import { HomeOutlined } from "@ant-design/icons";
const { TextArea } = Input;

export default () => {
  const [text, setText] = useState("initial value?");
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );
  // const handleSend = useCallback(() => {
  //   console.log("send text:", text);
  //   setText("");
  // }, [text]);
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
    <div className="textAreaRoot">
      <TextArea
        onChange={handleChange}
        value={text}
        rows={2}
        autoSize
        bordered={false}
        allowClear
        // onPressEnter={handleSend}
      />
    </div>
  );
};
