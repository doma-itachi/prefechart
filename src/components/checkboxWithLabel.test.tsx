import { render, screen, fireEvent } from "@testing-library/react";
import { CheckboxWithLabel } from "./checkboxWithLabel";

describe("CheckboxWithLabel", () => {
  it("ラベルが正しく表示されているか", () => {
    const labelText = "テスト";
    render(<CheckboxWithLabel label={labelText} />);

    // ラベルが正しく表示されているか
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it("クリックでイベントが発火されるか", () => {
    const labelText = "テスト";
    const onChangeMock = jest.fn();
    render(<CheckboxWithLabel label={labelText} onChange={onChangeMock} />);

    //初期状態でオフ
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    //イベントが発火される
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledWith(true);
    expect(checkbox.checked).toBe(true);

    //二回目
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledWith(false);
    expect(checkbox.checked).toBe(false);
  });

  it("表示が切り替わるか", () => {
    const labelText = "テスト";
    render(<CheckboxWithLabel label={labelText} />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    const checkIcon = screen.getByRole("img");

    expect(checkIcon).toHaveClass("opacity-0");

    //表示が変更されるか
    fireEvent.click(checkbox);
    expect(checkIcon).not.toHaveClass("opacity-0");

    //非表示になっている
    fireEvent.click(checkbox);
    expect(checkIcon).toHaveClass("opacity-0");
  });
});
