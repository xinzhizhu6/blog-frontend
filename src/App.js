import React from 'react';
import { Header } from '@/components/header';
import { Sider } from "@/components/sider"
import { RightSider } from "@/components/rightSider"
import { Content } from "@/components/content"

function App() {
  return (
    <div className="app">
      <Header />
			<Sider />
			<Content />
			<RightSider />
    </div>
  );
}

export default App;
