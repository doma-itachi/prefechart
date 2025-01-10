import { fireEvent, render, screen } from "@testing-library/react";
import { TabButton } from "./tabButton";

describe("TabButton Component", () => {
    it("最初のタブがデフォルトで選択されているか", () => {
      const items = ["Tab1", "Tab2", "Tab3"];
      render(<TabButton items={items} />);
  
      const firstTab = screen.getByText("Tab1");
      expect(firstTab).toHaveClass("bg-white", "rounded", "shadow-sm");
  
      const secondTab = screen.getByText("Tab2");
      expect(secondTab).not.toHaveClass("bg-white", "rounded", "shadow-sm");
  
      const thirdTab = screen.getByText("Tab3");
      expect(thirdTab).not.toHaveClass("bg-white", "rounded", "shadow-sm");
    });
  
    it("タブをクリックした際にonChangeが呼び出されるか", () => {
      const items = ["Tab1", "Tab2", "Tab3"];
      const onChangeMock = jest.fn();
      render(<TabButton items={items} onChange={onChangeMock} />);
  
      const secondTab = screen.getByText("Tab2");
  
      fireEvent.click(secondTab);
      expect(onChangeMock).toHaveBeenCalledWith("Tab2");
  
      expect(secondTab).toHaveClass("bg-white", "rounded", "shadow-sm");
      const firstTab = screen.getByText("Tab1");
      expect(firstTab).not.toHaveClass("bg-white", "rounded", "shadow-sm");
    });
  });
  