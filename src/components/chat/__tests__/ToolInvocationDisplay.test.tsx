import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationDisplay } from "../ToolInvocationDisplay";

afterEach(() => {
  cleanup();
});

test("shows 'Created' for str_replace_editor create command", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        state: "result",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/components/Button.tsx" },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Created /components/Button.tsx")).toBeDefined();
});

test("shows 'Updated' for str_replace_editor str_replace command", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        state: "result",
        toolName: "str_replace_editor",
        args: {
          command: "str_replace",
          path: "/components/Button.tsx",
          old_str: "foo",
          new_str: "bar",
        },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Updated /components/Button.tsx")).toBeDefined();
});

test("shows 'Updated' for str_replace_editor insert command", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        state: "result",
        toolName: "str_replace_editor",
        args: { command: "insert", path: "/components/Card.tsx" },
        result: "Success",
      }}
    />
  );

  expect(screen.getByText("Updated /components/Card.tsx")).toBeDefined();
});

test("shows 'Viewed' for str_replace_editor view command", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        state: "result",
        toolName: "str_replace_editor",
        args: { command: "view", path: "/components/Card.tsx" },
        result: "file contents",
      }}
    />
  );

  expect(screen.getByText("Viewed /components/Card.tsx")).toBeDefined();
});

test("shows 'Deleted' for file_manager delete command", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        state: "result",
        toolName: "file_manager",
        args: { command: "delete", path: "/components/Old.tsx" },
        result: { success: true },
      }}
    />
  );

  expect(screen.getByText("Deleted /components/Old.tsx")).toBeDefined();
});

test("shows 'Renamed' with both paths for file_manager rename command", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        state: "result",
        toolName: "file_manager",
        args: {
          command: "rename",
          path: "/components/Old.tsx",
          new_path: "/components/New.tsx",
        },
        result: { success: true },
      }}
    />
  );

  expect(
    screen.getByText("Renamed /components/Old.tsx → /components/New.tsx")
  ).toBeDefined();
});

test("shows in-progress text with spinner when loading", () => {
  const { container } = render(
    <ToolInvocationDisplay
      toolInvocation={{
        state: "call",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/components/Button.tsx" },
      }}
    />
  );

  expect(screen.getByText("Creating /components/Button.tsx")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeDefined();
});

test("shows in-progress text for update operations", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        state: "call",
        toolName: "str_replace_editor",
        args: { command: "str_replace", path: "/components/Button.tsx" },
      }}
    />
  );

  expect(screen.getByText("Updating /components/Button.tsx")).toBeDefined();
});

test("shows green dot when completed", () => {
  const { container } = render(
    <ToolInvocationDisplay
      toolInvocation={{
        state: "result",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/components/Button.tsx" },
        result: "Success",
      }}
    />
  );

  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});

test("falls back to tool name for unknown tools", () => {
  render(
    <ToolInvocationDisplay
      toolInvocation={{
        state: "result",
        toolName: "unknown_tool",
        args: {},
        result: "done",
      }}
    />
  );

  expect(screen.getByText("unknown_tool")).toBeDefined();
});
