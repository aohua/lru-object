import Node from "./node";
test("prev and next is not set", () => {
  const node = new Node<number, number>();
  expect(node.prev).toBe(undefined);
  expect(node.next).toBe(undefined);
});
