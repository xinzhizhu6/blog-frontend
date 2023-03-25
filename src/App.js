import React from 'react';
import { Header } from '@/components/header';
import { Sider } from "@/components/sider"
import { RightSider } from "@/components/rightSider"
import { Content } from "@/components/content"
import { ModalContent } from '@/components/modal'
import { ConfigProvider } from "antd"
import { useSelector } from 'react-redux'

function App() {
  const theme = useSelector(state => state.setting.theme)

  const themes = {
    primary: "#409eff",
    success: "#67c23a",
    warning: "#e6a23c",
    error: "#f56c6c"
  }
  console.log(theme)
  return (
    <div className="app">
      <ConfigProvider 
        theme={{
          token: {
            colorPrimary: themes[theme],
          },
        }}
        >
        <ModalContent />
        <Header />
        <Sider />
        <Content />
        <RightSider />
      </ConfigProvider>
    </div>
  );
}

export default App;
