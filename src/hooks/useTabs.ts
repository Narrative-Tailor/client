import {useState} from "react";

const useTabs = (initialTabs: string[], defaultTab?: string) => {
  if (initialTabs.length === 0) {
    throw new Error("탭 목록이 유효하지 않습니다.");
  }
  if (defaultTab && !initialTabs.find((value) => value === defaultTab)) {
    throw new Error("기본 설정된 탭이 유효하지 않습니다.");
  }

  const [tabs, setTabs] = useState(initialTabs);
  const [currentTab, setCurrentTab] = useState(defaultTab);

  const handleClickTab = (clicked: string) => {
    if (!tabs.find((value) => value === clicked)) {
      throw new Error("유효하지 않은 탭 동작입니다.");
    }
    setCurrentTab(clicked);
  };

  const addTab = (newTab: string) => {
    setTabs((prev) => [...prev, newTab]);
  };

  return {currentTab, handleClickTab, addTab};
};
export default useTabs;
